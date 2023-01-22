import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message } from 'react-chat-ui';
import {  IChatRoomStatus } from 'src/api/chat';
export enum DMProcess {
  JOINED_DM,
  SEND_DM,
  RECEIVE_DM,
}

export const DMSlice = createSlice({
  name: 'dm',
  initialState: {
    dmProcess: IChatRoomStatus,
    directMessages: Message,
    showDM: true,
    roomId: '',
    // listORroom: true, // true: list, false: room
    friendId: '',
    requestFriendCnt: 0,
    newMessageCnt: 0,
    // status 추가

  },
  reducers: {
    setShowDM: (state, action: PayloadAction<boolean>) => {
      state.showDM = action.payload;
    },
    // SetTruelistORroom: (state, action: PayloadAction<boolean>) => {
    //   state.listORroom = action.payload;
    // },
    // SetFalselistORroom: (state) => {
    //   state.listORroom = false;
    // },
    setFriendId: (state, action: PayloadAction<string>) => {
      state.friendId = action.payload;
    },
    setRoomId: (state, action: PayloadAction<string>) => {
      state.roomId = action.payload;
    },
    setRequestFriendCnt: (state, action: PayloadAction<number>) => {
      state.requestFriendCnt += action.payload;
    },
    setNewMessageCnt: (state, action: PayloadAction<number>) => {
      state.newMessageCnt += action.payload;
    },
    setdmProcess: (state, action: PayloadAction<any>) => {
      state.dmProcess = action.payload;
    },
  },
});

export const { setFriendId, setShowDM, setRoomId, setRequestFriendCnt, setNewMessageCnt, setdmProcess } =
  DMSlice.actions;

export default DMSlice.reducer;
