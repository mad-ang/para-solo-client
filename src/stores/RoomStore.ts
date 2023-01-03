import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RoomAvailable } from "colyseus.js";
import { RoomType } from "../types/Rooms";

interface RoomInterface extends RoomAvailable {
  name?: string;
}

/**
 * Colyseus' real time room list always includes the public lobby so we have to remove it manually.
 */
export const roomSlice = createSlice({
  name: "room",
  initialState: {
    lobbyJoined: false,
    roomJoined: false,
    roomId: "",
    roomName: "",
    roomDescription: "",
    availableRooms: new Array<RoomAvailable>(),
    userCnt : 0,
  },
  reducers: {
    setLobbyJoined: (state, action: PayloadAction<boolean>) => {
      state.lobbyJoined = action.payload;
    },
    setRoomJoined: (state, action: PayloadAction<boolean>) => {
      state.roomJoined = action.payload;
    },
    setJoinedRoomData: (
      state,
      action: PayloadAction<{ id: string; name: string; description: string, userCnt:number }>
    ) => {
      state.roomId = action.payload.id;
      state.roomName = action.payload.name;
      state.roomDescription = action.payload.description;
      state.userCnt = action.payload.userCnt;
    }
  }
});

export const {
  setLobbyJoined,
  setRoomJoined,
  setJoinedRoomData,
} = roomSlice.actions;

export default roomSlice.reducer;
