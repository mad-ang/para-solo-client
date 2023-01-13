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

export enum ENTERING_PROCESS {
  ENTRY = 'entry',
  SIGNUP = 'signup',
  LOGIN = 'login',
  CHARACTER_SELECTION = 'characterSelection',
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    backgroundMode: getInitialBackgroundMode(),
    sessionId: "",
    userId: "",
    videoConnected: false,
    playerNameMap: new Map<string, string>(),
    enteringProcess: ENTERING_PROCESS.ENTRY,
    characterSelected: false,
    accessToken: '',
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
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    setVideoConnected: (state, action: PayloadAction<boolean>) => {
      state.videoConnected = action.payload;
    },
    setCharacterSelected: (state, action: PayloadAction<boolean>) => {
      state.characterSelected = action.payload;
    },
    setPlayerNameMap: (state, action: PayloadAction<{ id: string; name: string }>) => {
      state.playerNameMap.set(sanitizeId(action.payload.id), action.payload.name);
    },
    setPlayerUserIdMap: (state, action: PayloadAction<{ id: string; userId: string }>) => {
      state.playerNameMap.set(sanitizeId(action.payload.id), action.payload.userId);
    },

    removePlayerNameMap: (state, action: PayloadAction<string>) => {
      state.playerNameMap.delete(sanitizeId(action.payload));
    },
    setEnteringProcess: (state, action: PayloadAction<ENTERING_PROCESS>) => {
      state.enteringProcess = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
  },
});

export const {
  toggleBackgroundMode,
  setSessionId,
  setUserId,
  setVideoConnected,
  setPlayerNameMap,
  setPlayerUserIdMap,
  removePlayerNameMap,
  setEnteringProcess,
  setCharacterSelected,
  setAccessToken,
} = userSlice.actions;

export default userSlice.reducer;
