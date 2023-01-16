import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message } from 'react-chat-ui';

export enum DMProcess {
  JOINED_DM,
  SEND_DM,
  RECEIVE_DM,
}

export const DMSlice = createSlice({
  name: 'dm',
  initialState: {
    dmProcess: DMProcess,
    directMessages: Message,
    showDM: true,
    roomId: '',
    // listORroom: true, // true: list, false: room
    friendId: '',
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
    setkey: (state, action: PayloadAction<string>) => {
      state.friendId = action.payload;
    },
    setRoomId: (state, action: PayloadAction<string>) => {
      state.roomId = action.payload;
    },
  },
});

export const { setkey, setShowDM, setRoomId } = DMSlice.actions;

export default DMSlice.reducer;
