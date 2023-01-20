import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum ModalState {
  None,
  Profile,
  ChattingList,
  ChattingListAndRoom,
  AddFriends,
  PublicChat,
  DirectMessage,
  Buttons,
}

export const NavControllerSlice = createSlice({
  name: 'nav',
  initialState: {currentState: ModalState.PublicChat},
  reducers: {
    SetWhichModalActivated : (state, action: PayloadAction<ModalState>) => {
      // state = action.payload;
      // return;
      // return { ...state, currentState: action.payload };
      state.currentState = action.payload;

    }
  },
});

export const {
  SetWhichModalActivated,
} = NavControllerSlice.actions;

export default NavControllerSlice.reducer;
