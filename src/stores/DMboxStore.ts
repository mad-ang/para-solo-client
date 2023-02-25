import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message } from 'react-chat-ui';
import { IChatRoomStatus } from 'src/api/chat';

// export enum DMProcess {
//   JOINED_DM,
//   SEND_DM,
//   RECEIVE_DM,
// }

export const DMSlice = createSlice({
  name: 'dm',
  initialState: {
    dmProcess: 2,
    directMessages: Message,
    showDM: true,
    roomId: '',
    // listORroom: true, // true: list, false: room
    friendId: '',
    friendName: '',
    requestFriendCnt: 0,
    newMessageCnt: 0,
    newMessage: {
      friendId: '',
      id: 0,
      message: '',
      roomId: '',
      userId: '',
    },
  },
  reducers: {
    setShowDM: (state, action: PayloadAction<boolean>) => {
      state.showDM = action.payload;
    },
    setFriendId: (state, action: PayloadAction<string>) => {
      state.friendId = action.payload;
    },
    setFriendName: (state, action: PayloadAction<string>) => {
      state.friendName = action.payload;
    },
    setRoomId: (state, action: PayloadAction<string>) => {
      state.roomId = action.payload;
    },
    setRequestFriendCnt: (state, action: PayloadAction<number>) => {
      state.requestFriendCnt += action.payload;
      if (state.requestFriendCnt < 0) state.requestFriendCnt = 0;
    },
    setNewMessageCnt: (state, action: PayloadAction<number>) => {
      state.newMessageCnt += action.payload;
      if (state.newMessageCnt < 0) state.newMessageCnt = 0;
    },
    setNewMessage: (state, action: PayloadAction<any>) => {
      state.newMessage = action.payload;
    },
    setDmProcess: (state, action: PayloadAction<IChatRoomStatus>) => {
      state.dmProcess = action.payload;
    },
  },
});



export const {
  setFriendId,
  setFriendName,
  setShowDM,
  setRoomId,
  setRequestFriendCnt,
  setNewMessageCnt,
  setNewMessage,
  setDmProcess,
} = DMSlice.actions;

export default DMSlice.reducer;
