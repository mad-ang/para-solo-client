import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RoomAvailable } from 'colyseus.js';
import { RoomType } from '../types/Rooms';
import { IPlayer } from '../types/ITownState';
interface RoomInterface extends RoomAvailable {
  name?: string;
}

/**
 * Colyseus' real time room list always includes the public lobby so we have to remove it manually.
 */
export const roomSlice = createSlice({
  name: 'room',
  initialState: {
    lobbyJoined: false,
    roomId: '',
    roomName: '',
    roomDescription: '',
    availableRooms: new Array<RoomAvailable>(),
    userCnt: 0,
    players: [],
  },
  reducers: {
    setLobbyJoined: (state, action: PayloadAction<boolean>) => {
      state.lobbyJoined = action.payload;
    },
    setJoinedRoomData: (
      state,
      action: PayloadAction<{ id: string; name: string; description: string; userCnt: number }>
    ) => {
      state.roomId = action.payload.id;
      state.roomName = action.payload.name;
      state.roomDescription = action.payload.description;
      state.userCnt = action.payload.userCnt;
    },
    setNumPlayer: (state, action: PayloadAction<number>) => {
      state.userCnt = action.payload;
    },
    setRoomPlayers: (state, action: PayloadAction<IPlayer[]>) => {
      state.players = action.payload;
    },
  },
});

export const { setLobbyJoined, setJoinedRoomData, setNumPlayer, setRoomPlayers } =
  roomSlice.actions;

export default roomSlice.reducer;
