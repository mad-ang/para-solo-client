import { Client, Room } from 'colyseus.js';
import {
  ITable,
  ITownState,
  IPlayer,
  // IWhiteboard,
} from '../types/ITownState';
import { Message } from '../types/Messages';
import { IRoomData, RoomType } from '../types/Rooms';
import { ItemType } from '../types/Items';
import WebRTC from '../web/WebRTC';
import { phaserEvents, Event } from '../events/EventCenter';
import store from '../stores';
import { setSessionId, setPlayerNameMap, removePlayerNameMap } from '../stores/UserStore';
import {
  setLobbyJoined,
  setJoinedRoomData,
  setNumPlayer,
  setRoomPlayers,
} from '../stores/RoomStore';
import {
  pushChatMessage,
  pushPlayerJoinedMessage,
  pushPlayerLeftMessage,
} from '../stores/ChatStore';
import { useAppSelector } from '../hooks';
import Cookies from 'universal-cookie';
import { UserResponseDto } from 'src/api/chat';
const cookies = new Cookies();
export default class Network {
  private client: Client;
  private room?: Room<ITownState>;
  private lobby!: Room;
  webRTC?: WebRTC;
  userId!: string;
  mySessionId!: string;

  constructor() {
    const endpoint =
      process.env.NODE_ENV === 'production' || import.meta.env.VITE_SERVER === 'PRO'
        ? `wss://${import.meta.env.VITE_SERVER_URL}`
        : `ws://${window.location.hostname}:8080`;

    console.log(process.env.NODE_ENV);
    this.client = new Client(endpoint);
    this.joinLobbyRoom().then(() => {
      store.dispatch(setLobbyJoined(true));
    });

    phaserEvents.on(Event.MY_PLAYER_NAME_CHANGE, this.updatePlayerName, this);
    phaserEvents.on(Event.MY_PLAYER_INFO_CHANGE, this.updatePlayerInfo, this);
    phaserEvents.on(Event.MY_PLAYER_TEXTURE_CHANGE, this.updatePlayer, this);
    phaserEvents.on(Event.PLAYER_DISCONNECTED, this.playerStreamDisconnect, this);
  }

  /**
   * method to join Colyseus' built-in LobbyRoom, which automatically notifies
   * connected clients whenever rooms with "realtime listing" have updates
   */
  async joinLobbyRoom() {
    this.lobby = await this.client.joinOrCreate(RoomType.LOBBY);
  }

  // method to join the public lobby
  async joinOrCreatePublic() {
    this.room = await this.client.joinOrCreate(RoomType.PUBLIC);
    this.initialize();
  }

  // method to join a custom room
  async joinCustomById(roomId: string, password: string | null) {
    this.room = await this.client.joinById(roomId, { password });
    this.initialize();
  }

  // method to create a custom room
  async createCustom(roomData: IRoomData) {
    const { name, description, password, autoDispose } = roomData;
    this.room = await this.client.create(RoomType.CUSTOM, {
      name,
      description,
      password,
      autoDispose,
    });
    this.initialize();
  }

  // set up all network listeners before the game starts
  initialize() {
    if (!this.room) return;

    this.lobby.leave();
    this.mySessionId = this.room.sessionId;
    this.userId = cookies.get('userId');
    store.dispatch(setSessionId(this.room.sessionId));
    this.webRTC = new WebRTC(this.mySessionId, this);

    // new instance added to the players MapSchema
    this.room.state.players.onAdd = (player: IPlayer, key: string) => {
      if (key === this.mySessionId) return;
      // track changes on every child object inside the players MapSchema
      player.onChange = (changes) => {
        changes.forEach((change) => {
          const { field, value } = change;
          //  TODO: 다른 사용자 정보 업데이트 감지
          phaserEvents.emit(Event.PLAYER_UPDATED, field, value, key);
          // when a new player finished setting up player name
          if (field === 'name' && value !== '') {
            phaserEvents.emit(Event.PLAYER_JOINED, player, key);
            store.dispatch(setPlayerNameMap({ id: key, name: value }));
            store.dispatch(pushPlayerJoinedMessage(value));
          }
        });
      };
    };

    // an instance removed from the players MapSchema
    this.room.state.players.onRemove = (player: IPlayer, key: string) => {
      phaserEvents.emit(Event.PLAYER_LEFT, key);
      this.webRTC?.deleteVideoStream(key);
      this.webRTC?.deleteOnCalledVideoStream(key);
      store.dispatch(pushPlayerLeftMessage(player.name));
      store.dispatch(removePlayerNameMap(key));
    };

    this.room.state.tables.onAdd = (table: ITable, key: string) => {
      // track changes on every child object's connectedUser
      table.connectedUser.onAdd = (item, index) => {
        phaserEvents.emit(Event.ITEM_USER_ADDED, item, key, ItemType.CHAIR);
      };
      table.connectedUser.onRemove = (item, index) => {
        phaserEvents.emit(Event.ITEM_USER_REMOVED, item, key, ItemType.CHAIR);
      };
    };

    // new instance added to the chatMessages ArraySchema
    this.room.state.chatMessages.onAdd = (item, index) => {
      store.dispatch(pushChatMessage(item));
    };

    // when the server sends room data
    this.room.onMessage(Message.SEND_ROOM_DATA, (content) => {
      store.dispatch(setJoinedRoomData(content));
    });

    // when a user sends a message
    this.room.onMessage(Message.ADD_CHAT_MESSAGE, ({ clientId, content }) => {
      phaserEvents.emit(Event.UPDATE_DIALOG_BUBBLE, clientId, content);
    });

    // when a peer disconnects with myPeer
    this.room.onMessage(Message.DISCONNECT_STREAM, (clientId: string) => {
      this.webRTC?.deleteOnCalledVideoStream(clientId);
    });
    this.room.onMessage(Message.STOP_TABLE_TALK, (clientId: string) => {
      const tableState = store.getState().table;
      tableState.tableTalkManager?.onUserLeft(clientId);
    });
    this.room.onMessage(Message.CHECK_PRIVATE_MESSAGE, (content) => {
      console.log(content);
    });
    this.room.onStateChange((state) => {
      const playerSize = this.room?.state.players.size;
      if (playerSize === undefined) return;
      let numPlayers: number = playerSize;
      store.dispatch(setNumPlayer(numPlayers));
      const players: any = [];
      this.room?.state.players.forEach((value, key, map) => {
        players.push(value);
        // console.log('valueeeee', value.userId);
      });
      store.dispatch(setRoomPlayers(players));
      // console.log(555555, players);
      // console.log('room.state.players', this.room?.state.players.);
    });
  }
  getChairState() {
    return this.room?.state.chairs;
  }
  getPlayers() {
    return this.room?.state.players;
  }
  // method to register event listener and call back function when a item user added
  onChatMessageAdded(callback: (playerId: string, content: string) => void, context?: any) {
    phaserEvents.on(Event.UPDATE_DIALOG_BUBBLE, callback, context);
  }

  // method to register event listener and call back function when a item user added
  onItemUserAdded(
    callback: (playerId: string, key: string, itemType: ItemType) => void,
    context?: any
  ) {
    phaserEvents.on(Event.ITEM_USER_ADDED, callback, context);
  }

  // method to register event listener and call back function when a item user removed
  onItemUserRemoved(
    callback: (playerId: string, key: string, itemType: ItemType) => void,
    context?: any
  ) {
    phaserEvents.on(Event.ITEM_USER_REMOVED, callback, context);
  }

  // method to register event listener and call back function when a player joined
  onPlayerJoined(callback: (Player: IPlayer, key: string) => void, context?: any) {
    phaserEvents.on(Event.PLAYER_JOINED, callback, context);
  }

  // method to register event listener and call back function when a player left
  onPlayerLeft(callback: (key: string) => void, context?: any) {
    phaserEvents.on(Event.PLAYER_LEFT, callback, context);
  }

  // method to register event listener and call back function when myPlayer is ready to connect
  onMyPlayerReady(callback: (key: string) => void, context?: any) {
    phaserEvents.on(Event.MY_PLAYER_READY, callback, context);
  }

  // method to register event listener and call back function when my video is connected
  onMyPlayerVideoConnected(callback: (key: string) => void, context?: any) {
    phaserEvents.on(Event.MY_PLAYER_VIDEO_CONNECTED, callback, context);
  }

  // method to register event listener and call back function when a player updated
  onPlayerUpdated(
    callback: (field: string, value: number | string, key: string) => void,
    context?: any
  ) {
    phaserEvents.on(Event.PLAYER_UPDATED, callback, context);
  }

  // method to send player updates to Colyseus server
  updatePlayer(currentX: number, currentY: number, currentAnim: string) {
    this.room?.send(Message.UPDATE_PLAYER, {
      x: currentX,
      y: currentY,
      anim: currentAnim,
    });
  }

  // method to send player name to Colyseus server
  updatePlayerName(currentName: string, currentUserId: string, authFlag: number) {
    this.room?.send(Message.UPDATE_PLAYER_NAME, {
      name: currentName,
      userId: currentUserId,
      authFlag: authFlag,
    });
  }

  updatePlayerInfo(currentUserInfo: UserResponseDto, currentUserId: string, authFlag: number) {
    this.room?.send(Message.UPDATE_PLAYER_INFO, {
      userInfo: currentUserInfo,
      userId: currentUserId,
      authFlag: authFlag,
    });
  }
  // method to send ready-to-connect signal to Colyseus server
  readyToConnect() {
    this.room?.send(Message.READY_TO_CONNECT);
    phaserEvents.emit(Event.MY_PLAYER_READY);
  }

  // method to send ready-to-connect signal to Colyseus server
  videoConnected() {
    this.room?.send(Message.VIDEO_CONNECTED);
    phaserEvents.emit(Event.MY_PLAYER_VIDEO_CONNECTED);
  }

  // method to send stream-disconnection signal to Colyseus server
  playerStreamDisconnect(id: string) {
    this.room?.send(Message.DISCONNECT_STREAM, { clientId: id });
    this.webRTC?.deleteVideoStream(id);
  }

  connectToTable(id: string) {
    this.room?.send(Message.CONNECT_TO_TABLE, { tableId: id });
  }

  updateChairStatus(tableId?: string, chairId?: string, status?: boolean) {
    this.room?.send(Message.UPDATE_CHAIR_STATUS, {
      tableId: tableId,
      chairId: chairId,
      status: status,
    });
  }

  disconnectFromTable(id: string) {
    this.room?.send(Message.DISCONNECT_FROM_TABLE, { tableId: id });
  }
  onStopTableTalk(id: string) {
    this.room?.send(Message.STOP_TABLE_TALK, { tableId: id });
  }

  addChatMessage(content: string) {
    this.room?.send(Message.ADD_CHAT_MESSAGE, { content: content });
  }

  sendPrivateMessage(senderId: string, receiverId: string, content: string) {
    this.room?.send(Message.SEND_PRIVATE_MESSAGE, {
      senderId: senderId,
      receiverId: receiverId,
      content: content,
    });
    this.checkPrivateMessage(senderId, receiverId);
  }
  checkPrivateMessage(requestId: string, targetId: string) {
    this.room?.send(Message.CHECK_PRIVATE_MESSAGE, { requestId: requestId, targetId: targetId });
  }
}
