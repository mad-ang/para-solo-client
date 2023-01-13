import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const NavControllerSlice = createSlice({
  name: 'nav',
  initialState: {
    NavControllerProfileActivated: false,
    NavControllerChattingRoomActivated: false,
    NavControllerChattingListActivated: false,
    NavControllerAddFriendsActivated: false,
    NavControllerPublicChatActivated: false,
    NavControllerDirectMessageActivated: false,
    NavControllerButtonsActivated: false,
  },
  reducers: {
    SetProfileActivated: (state, action: PayloadAction<boolean>) => {
      state.NavControllerProfileActivated = action.payload;
    },
    SetChattingRoomActivated: (state, action: PayloadAction<boolean>) => {
      state.NavControllerChattingRoomActivated = action.payload;
    },
    SetChattingListActivated: (state, action: PayloadAction<boolean>) => {
      state.NavControllerChattingListActivated = action.payload;
    },
    SetAddFriendsActivated: (state, action: PayloadAction<boolean>) => {
      state.NavControllerAddFriendsActivated = action.payload;
    },
    SetPublicChatActivated: (state, action: PayloadAction<boolean>) => {
      state.NavControllerPublicChatActivated = action.payload;
    },
    // SetDirectMessageActivated: (state, action: PayloadAction<boolean>) => {
    //   state.NavControllerDirectMessageActivated = action.payload;
    // },
    SetButtonsActivated: (state, action: PayloadAction<boolean>) => {
      state.NavControllerButtonsActivated = action.payload;
    },

    SetProfileActivateOnly: (state) => {
      state.NavControllerProfileActivated = true;
      state.NavControllerChattingRoomActivated = false;
      state.NavControllerChattingListActivated = false;
      state.NavControllerAddFriendsActivated = false;
      state.NavControllerPublicChatActivated = false;
      // state.NavControllerDirectMessageActivated = false;
      state.NavControllerButtonsActivated = false;
    },
    SetChattingRoomActivateOnly: (state) => {
      state.NavControllerProfileActivated = false;
      state.NavControllerChattingRoomActivated = true;
      state.NavControllerChattingListActivated = false;
      state.NavControllerAddFriendsActivated = false;
      state.NavControllerPublicChatActivated = false;
      // state.NavControllerDirectMessageActivated = false;
      state.NavControllerButtonsActivated = false;
    },
    SetChattingListActivateOnly: (state) => {
      state.NavControllerProfileActivated = false;
      // state.NavControllerChattingRoomActivated = false;
      state.NavControllerChattingListActivated = true;
      state.NavControllerAddFriendsActivated = false;
      state.NavControllerPublicChatActivated = false;
      // state.NavControllerDirectMessageActivated = false;
      state.NavControllerButtonsActivated = false;
    },
    SetAddFriendsActivateOnly: (state) => {
      state.NavControllerProfileActivated = false;
      state.NavControllerChattingRoomActivated = false;
      state.NavControllerChattingListActivated = false;
      state.NavControllerAddFriendsActivated = true;
      state.NavControllerPublicChatActivated = false;
      // state.NavControllerDirectMessageActivated = false;
      state.NavControllerButtonsActivated = false;
    },
    SetPublicChatActivateOnly: (state) => {
      state.NavControllerProfileActivated = false;
      state.NavControllerChattingRoomActivated = false;
      state.NavControllerChattingListActivated = false;
      state.NavControllerAddFriendsActivated = false;
      state.NavControllerPublicChatActivated = true;
      // state.NavControllerDirectMessageActivated = false;
      state.NavControllerButtonsActivated = false;
    },
    // SetDirectMessageActivateOnly: (state) => {
    //   state.NavControllerProfileActivated = false;
    //   state.NavControllerChattingRoomActivated = false;
    //   state.NavControllerChattingListActivated = false;
    //   state.NavControllerAddFriendsActivated = false;
    //   state.NavControllerPublicChatActivated = false;
    //   state.NavControllerDirectMessageActivated = true;
    //   state.NavControllerButtonsActivated = false;
    // },
    SetButtonsActivateOnly: (state) => {
      state.NavControllerProfileActivated = false;
      state.NavControllerChattingRoomActivated = false;
      state.NavControllerChattingListActivated = false;
      state.NavControllerAddFriendsActivated = false;
      state.NavControllerPublicChatActivated = false;
      // state.NavControllerDirectMessageActivated = false;
      state.NavControllerButtonsActivated = true;
    }
  },
});

export const {
  SetProfileActivated,
  SetChattingRoomActivated,
  SetChattingListActivated,
  SetAddFriendsActivated,
  SetPublicChatActivated,
  SetButtonsActivated,

  SetProfileActivateOnly,
  SetChattingRoomActivateOnly,
  SetChattingListActivateOnly,
  SetAddFriendsActivateOnly,
  SetPublicChatActivateOnly,
  SetButtonsActivateOnly
} = NavControllerSlice.actions;

export default NavControllerSlice.reducer;
