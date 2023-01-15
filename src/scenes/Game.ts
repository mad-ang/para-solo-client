// import Phaser from "phaser";

// import { debugDraw } from '../utils/debug'
import { createCharacterAnims } from '../anims/CharacterAnims';

import Item from '../items/Item';
import Chair from '../items/Chair';
import '../characters/MyPlayer';
import '../characters/OtherPlayer';
import MyPlayer from '../characters/MyPlayer';
import OtherPlayer from '../characters/OtherPlayer';
import PlayerSelector from '../characters/PlayerSelector';
import Network from '../services/Network';
import { IPlayer } from '../types/ITownState';
import { PlayerBehavior } from '../types/PlayerBehavior';
import { ItemType } from '../types/Items';

import store from '../stores';
import { setFocused, setShowChat } from '../stores/ChatStore';
import { NavKeys, Keyboard } from '../types/KeyboardState';
import Cookies from 'universal-cookie';
import { userInfo } from 'os';
export default class Game extends Phaser.Scene {
  network!: Network;
  private cursors!: NavKeys;
  private keyE!: Phaser.Input.Keyboard.Key;
  private keyR!: Phaser.Input.Keyboard.Key;
  private keySpace!: Phaser.Input.Keyboard.Key;
  private map!: Phaser.Tilemaps.Tilemap;
  myPlayer!: MyPlayer;
  private playerSelector!: Phaser.GameObjects.Zone;
  private otherPlayers!: Phaser.Physics.Arcade.Group;
  private otherPlayerMap = new Map<string, OtherPlayer>();
  tableMap = new Map<string, Chair>();
  chairMap = new Map<string, Chair>();

  constructor() {
    super('game');
  }

  registerKeys() {
    this.cursors = {
      ...this.input.keyboard.createCursorKeys(),
      ...(this.input.keyboard.addKeys('W,S,A,D,Space') as Keyboard),
    };

    // maybe we can have a dedicated method for adding keys if more keys are needed in the future
    this.keyE = this.input.keyboard.addKey('E');
    this.keyR = this.input.keyboard.addKey('R');
    this.keySpace = this.input.keyboard.addKey('Space');
    this.input.keyboard.disableGlobalCapture();
    this.input.keyboard.on('keydown-ENTER', (event) => {
      store.dispatch(setShowChat(true));
      store.dispatch(setFocused(true));
    });
    this.input.keyboard.on('keydown-ESC', (event) => {
      store.dispatch(setShowChat(false));
    });
  }

  disableKeys() {
    this.input.keyboard.enabled = false;
  }

  enableKeys() {
    this.input.keyboard.enabled = true;
  }
  allOtherPlayers() {
    return this.otherPlayerMap;
  }
  create(data: { network: Network }) {
    if (!data.network) {
      throw new Error('server instance missing');
    } else {
      this.network = data.network;
    }

    createCharacterAnims(this.anims);

    this.map = this.make.tilemap({ key: 'tilemap' });

    const interiorImage = this.map.addTilesetImage('interior', 'interior');

    const basementImage = this.map.addTilesetImage('basement', 'basement');
    const bigTreeImage = this.map.addTilesetImage('bigTree', 'bigTree');

    // 얘는 스프라이트 이미지로 움직이게 해야 함
    const boatImage = this.map.addTilesetImage('boat', 'boat');

    const campingImage = this.map.addTilesetImage('camping', 'camping');
    const campingZoneImage = this.map.addTilesetImage('campingZone', 'campingZone');

    const camping3Image = this.map.addTilesetImage('camping3', 'camping3');

    const genericImage = this.map.addTilesetImage('generic', 'generic');
    const genericBuildingsImgae = this.map.addTilesetImage('genericBuildings', 'genericBuildings');

    const picnicImage = this.map.addTilesetImage('picnic', 'picnic');
    const playgroundImage = this.map.addTilesetImage('playground', 'playground');
    const tentImage = this.map.addTilesetImage('tent', 'tent');

    const modernExteriorsImage = this.map.addTilesetImage('modernExteriors', 'modernExteriors');

    const floorTilesImage = this.map.addTilesetImage('floorTiles', 'floorTiles');

    const fencesImage = this.map.addTilesetImage('fences', 'fences');

    // 빌라에 돗자리,나무,꽃,벤치,의자 이쁜거 다 있음
    const villasImage = this.map.addTilesetImage('villas', 'villas');

    // vehicles 에 푸드트럭, 보트 이미지 있음
    const vehiclesImage = this.map.addTilesetImage('vehicles', 'vehicles');

    const waterToyImage = this.map.addTilesetImage('waterToy', 'waterToy');

    const tileImage = this.map.addTilesetImage('tiles', 'tiles');
    const waterBridgeImage = this.map.addTilesetImage('waterBridge', 'waterBridge');
    const buildingsImage = this.map.addTilesetImage('buildings', 'buildings');

    // 이하 animated tileset
    const boat1Image = this.map.addTilesetImage('boat1', 'boat1');

    const billboardImage = this.map.addTilesetImage('billboard', 'billboard');

    const GroundLayer = this.map.createLayer('ground', [
      floorTilesImage,
      modernExteriorsImage,
      fencesImage,
      waterToyImage,
      tileImage,
      waterBridgeImage,
    ]);
    const fencesLayer = this.map.createLayer('fences', interiorImage);

    const buildingsLayer = this.map.createLayer('buildings', [
      boat1Image,
      billboardImage,
      camping3Image,
    ]);

    // const chairs = this.physics.add.staticGroup({ classType: Chair });
    // const chairLayer = this.map.getObjectLayer('Objects');

    // chairLayer.objects.forEach((obj, i) => {
    //   const item = this.addObjectFromTiled(chairs, obj, 'interior', 'interior') as Chair;
    //   //   item.setDepth(item.y + item.height * 0.27);
    //   const tableId = `${Math.floor(i / 4)}`;
    //   const chairId = `${i}`;
    //   // 다음에 맵을 제작할 땐 아이템의 방향을 지정해주는 프로퍼티를 만들어서 지정해주자
    //   //   item.itemDirection = chairObj.properties[0].value
    //   item.itemDirection = 'down';
    //   item.tableId = tableId;
    //   item.chairId = chairId;
    //   this.tableMap.set(tableId, item);
    //   this.chairMap.set(chairId, item);
    // });

    // const chairs = this.physics.add.staticGroup({ classType: Chair });
    // const chairLayer = this.map.getObjectLayer("Objects");
    // chairLayer.objects.forEach((chairObj, i) => {
    //   const item = this.addObjectFromTiled(
    //     chairs,
    //     chairObj,
    //     "interior",
    //     "interior"
    //   ) as Chair;
    //   const chairId = `${i}`;
    //   item.chairId = chairId;
    //   this.chairMap.set(chairId, item);
    //   //   item.itemDirection = "down";
    //   //   item.itemDirection = chairObj.properties[0].value
    // });

    // ForeGround.setDepth(6000);

    // GrassLayer.setCollisionByProperty({ collisions: true });
    // BuildingLayer.setCollisionByProperty({ collisions: true });
    // SwingLayer.setCollisionByProperty({ collisions: true });
    // cafeLayer.setCollisionByProperty({ collisions: true });
    // cafe_fenceLayer.setCollisionByProperty({ collisions: true });
    const cookies = new Cookies();
    const userId = store.getState().user?.userId || cookies.get('userId') || this.network.userId;
    const userInfo = store.getState().user?.userInfo;
    this.myPlayer = this.add.myPlayer(
      Phaser.Math.RND.between(200, 700),
      Phaser.Math.RND.between(200, 300),
      'adam',
      this.network.mySessionId,
      userId,
      userInfo
    );
    this.playerSelector = new PlayerSelector(this, 0, 0, 16, 16);

    this.otherPlayers = this.physics.add.group({ classType: OtherPlayer });
    this.cameras.main.zoom = 2;
    this.cameras.main.startFollow(this.myPlayer, true);

    // this.physics.add.collider([this.myPlayer, this.myPlayer.playerContainer], GroundLayer);
    // this.physics.add.collider([this.myPlayer, this.myPlayer.playerContainer], ForegroundLayer);

    // this.physics.add.collider([this.myPlayer, this.myPlayer.playerContainer], GrassLayer);
    // this.physics.add.collider([this.myPlayer, this.myPlayer.playerContainer], BuildingLayer);
    // this.physics.add.collider([this.myPlayer, this.myPlayer.playerContainer], SwingLayer);
    // this.physics.add.collider([this.myPlayer, this.myPlayer.playerContainer], cafeLayer);
    this.physics.add.collider([this.myPlayer, this.myPlayer.playerContainer], fencesLayer);

    // this.physics.add.overlap(
    //   this.playerSelector,
    //   [chairs],
    //   this.handleItemSelectorOverlap,
    //   undefined,
    //   this
    // );

    this.physics.add.overlap(
      this.playerSelector,
      this.otherPlayers,
      this.handleClosePlayerOverlap,
      undefined,
      this
    );

    this.physics.add.overlap(
      this.myPlayer,
      this.otherPlayers,
      this.handlePlayersOverlap,
      undefined,
      this
    );

    // register network event listeners
    this.network.onPlayerJoined(this.handlePlayerJoined, this);
    this.network.onPlayerLeft(this.handlePlayerLeft, this);
    this.network.onMyPlayerReady(this.handleMyPlayerReady, this);
    this.network.onMyPlayerVideoConnected(this.handleMyVideoConnected, this);
    this.network.onPlayerUpdated(this.handlePlayerUpdated, this);
    this.network.onItemUserAdded(this.handleItemUserAdded, this);
    this.network.onItemUserRemoved(this.handleItemUserRemoved, this);
    this.network.onChatMessageAdded(this.handleChatMessageAdded, this);
  }

  private handleItemSelectorOverlap(playerSelector, selectionItem) {
    const currentItem = playerSelector.selectedItem as Item;
    // currentItem is undefined if nothing was perviously selected
    if (currentItem) {
      // if the selection has not changed, do nothing
      if (currentItem === selectionItem || currentItem.depth >= selectionItem.depth) {
        return;
      }
      // if selection changes, clear pervious dialog
      if (this.myPlayer.playerBehavior !== PlayerBehavior.SITTING) currentItem.clearDialogBox();
    }

    // set selected item and set up new dialog
    playerSelector.selectedItem = selectionItem;
    selectionItem.onOverlapDialog();
  }

  private addObjectFromTiled(
    group: Phaser.Physics.Arcade.StaticGroup,
    object: Phaser.Types.Tilemaps.TiledObject,
    key: string,
    tilesetName: string
  ) {
    const actualX = object.x! + object.width! * 0.5;
    const actualY = object.y! - object.height! * 0.5;
    const obj = group
      .get(actualX, actualY, key, object.gid! - this.map.getTileset(tilesetName).firstgid)
      .setDepth(actualY);
    return obj;
  }

  private addGroupFromTiled(
    objectLayerName: string,
    key: string,
    tilesetName: string,
    collidable: boolean
  ) {
    const group = this.physics.add.staticGroup();
    const objectLayer = this.map.getObjectLayer(objectLayerName);
    objectLayer.objects.forEach((object) => {
      const actualX = object.x! + object.width! * 0.5;
      const actualY = object.y! - object.height! * 0.5;
      group
        .get(actualX, actualY, key, object.gid! - this.map.getTileset(tilesetName).firstgid)
        .setDepth(actualY);
    });
    if (this.myPlayer && collidable)
      this.physics.add.collider([this.myPlayer, this.myPlayer.playerContainer], group);
  }

  // function to add new player to the otherPlayer group
  private handlePlayerJoined(newPlayer: IPlayer, id: string) {
    const otherPlayer = this.add.otherPlayer(
      newPlayer.x,
      newPlayer.y,
      'adam',
      id,
      newPlayer.userId,
      newPlayer.userInfo,
      newPlayer.name
    );
    this.otherPlayers.add(otherPlayer);
    this.otherPlayerMap.set(id, otherPlayer);
  }

  // function to remove the player who left from the otherPlayer group
  private handlePlayerLeft(id: string) {
    if (this.otherPlayerMap.has(id)) {
      const otherPlayer = this.otherPlayerMap.get(id);
      if (!otherPlayer) return;
      this.otherPlayers.remove(otherPlayer, true, true);
      this.otherPlayerMap.delete(id);
    }
  }

  private handleMyPlayerReady() {
    this.myPlayer.readyToConnect = true;
  }

  private handleMyVideoConnected() {
    this.myPlayer.videoConnected = true;
  }

  // function to update target position upon receiving player updates
  private handlePlayerUpdated(field: string, value: number | string, id: string) {
    const otherPlayer = this.otherPlayerMap.get(id);
    otherPlayer?.updateOtherPlayer(field, value);
  }

  private handlePlayersOverlap(myPlayer, otherPlayer) {
    if (myPlayer.playerBehavior === PlayerBehavior.SITTING) {
      return;
    }

    otherPlayer.makeCall(myPlayer, this.network?.webRTC);
  }
  private handleClosePlayerOverlap(playerSelector, otherPlayer) {
    if (this.myPlayer.playerBehavior === PlayerBehavior.SITTING) {
      return;
    }
    const currentClosePlayer = playerSelector.closePlayer as OtherPlayer;
    // currentItem is undefined if nothing was perviously selected
    if (currentClosePlayer) {
      // if the selection has not changed, do nothing
      if (currentClosePlayer === otherPlayer) {
        return;
      }
      // if (this.myPlayer.playerBehavior !== PlayerBehavior.SITTING)
      //   currentClosePlayer.clearDialogBox();
    }
    // set selected item and set up new dialog
    playerSelector.closePlayer = otherPlayer;
    // .onOverlapDialog()
  }

  private handleItemUserAdded(playerId: string, itemId: string, itemType: ItemType) {
    console.log('handleItemUserAdded');

    if (itemType === ItemType.CHAIR) {
      const table = this.tableMap.get(itemId);
      table?.addCurrentUser(playerId);
    }
  }

  private handleItemUserRemoved(playerId: string, itemId: string, itemType: ItemType) {
    if (itemType === ItemType.CHAIR) {
      const table = this.tableMap.get(itemId);
      table?.removeCurrentUser(playerId);
    }
  }

  private handleChatMessageAdded(playerId: string, content: string) {
    const otherPlayer = this.otherPlayerMap.get(playerId);
    otherPlayer?.updateDialogBubble(content);
  }

  update(t: number, dt: number) {
    if (this.myPlayer && this.network) {
      this.playerSelector.update(this.myPlayer, this.cursors);
      this.myPlayer.update(
        this.playerSelector,
        this.cursors,
        this.keyE,
        this.keyR,
        this.keySpace,
        this.network
      );
    }
  }
}
