import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sanitizeId } from '../util';
import { BackgroundMode } from '../types/BackgroundMode';

import phaserGame from '../PhaserGame';
import Bootstrap from '../scenes/Bootstrap';
import { StreamTwoTone } from '@mui/icons-material';

export function getInitialBackgroundMode() {
  const currentHour = new Date().getHours();
  return currentHour > 6 && currentHour <= 18 ? BackgroundMode.DAY : BackgroundMode.NIGHT;
}

enum ENTERING_PROCESS {
  ENTRY = 'entry',
  SIGNUP = 'signup',
  LOGIN = 'login',
  CHARACTER_SELECTION = 'characterSelection'
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    backgroundMode: getInitialBackgroundMode(),
    sessionId: '',
    videoConnected: false,
    playerNameMap: new Map<string, string>(),
    enteringProcess: ENTERING_PROCESS.ENTRY,
    signUp: false,
    signIn: false,
    signedUp: false,
    loggedIn: false,
    accessToken: null,
  },
  reducers: {
    toggleBackgroundMode: (state) => {
      const newMode =
        state.backgroundMode === BackgroundMode.DAY ? BackgroundMode.NIGHT : BackgroundMode.DAY;

      state.backgroundMode = newMode;
      const bootstrap = phaserGame.scene.keys.bootstrap as Bootstrap;
      bootstrap.changeBackgroundMode(newMode);
    },
    setSessionId: (state, action: PayloadAction<string>) => {
      state.sessionId = action.payload;
    },
    setVideoConnected: (state, action: PayloadAction<boolean>) => {
      state.videoConnected = action.payload;
    },
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
    },
    setPlayerNameMap: (state, action: PayloadAction<{ id: string; name: string }>) => {
      state.playerNameMap.set(sanitizeId(action.payload.id), action.payload.name);
    },
    removePlayerNameMap: (state, action: PayloadAction<string>) => {
      state.playerNameMap.delete(sanitizeId(action.payload));
    },
    setSignUp: (state, action: PayloadAction<boolean>) => {
      state.signUp = action.payload;
    },
    setSignIn: (state, action: PayloadAction<boolean>) => {
      state.signIn = action.payload;
    },
    setSignedUp: (state, action: PayloadAction<boolean>) => {
      state.signedUp = action.payload;
    },
  },
});

export const {
  toggleBackgroundMode,
  setSessionId,
  setVideoConnected,
  setLoggedIn,
  setPlayerNameMap,
  removePlayerNameMap,
  setSignUp,
  setSignIn,
  setSignedUp,
} = userSlice.actions;

export default userSlice.reducer;
