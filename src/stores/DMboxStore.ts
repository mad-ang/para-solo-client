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
    // listORroom: true, // true: list, false: room

    withWho: '',
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
    Setkey: (state, action: PayloadAction<string>) => {
      state.withWho = action.payload;
    },
  },
});

export const { Setkey, setShowDM } = DMSlice.actions;

export default DMSlice.reducer;
