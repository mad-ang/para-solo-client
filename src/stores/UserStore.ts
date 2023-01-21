import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sanitizeId } from '../util';
import { BackgroundMode } from '../types/BackgroundMode';

import phaserGame from '../PhaserGame';
import Bootstrap from '../scenes/Bootstrap';
import { StreamTwoTone } from '@mui/icons-material';
import Cookies from 'universal-cookie';
import { UserResponseDto } from 'src/api/chat';
const cookies = new Cookies();

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
    sessionId: '',
    userId: '',
    username: '',
    videoConnected: false,
    webcamAudioStatus: false,
    webcamVideoStatus: false,
    playerNameMap: new Map<string, string>(),
    enteringProcess: ENTERING_PROCESS.ENTRY,
    characterSelected: false,
    accessToken: '',
    userCoin: 0,
    userProfile: {
      profileImgUrl: '',
      heigth: '',
      weight: '',
      region: '',
      gender: '',
      age: '',
    },
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
      cookies.set('userId', action.payload, { path: '/', maxAge: 600 });
      state.userId = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setVideoConnected: (state, action: PayloadAction<boolean>) => {
      state.videoConnected = action.payload;
    },
    setwebcamAudioStatus: (state, action: PayloadAction<boolean>) => {
      state.webcamAudioStatus = action.payload;
    },
    setwebcamVideoStatus: (state, action: PayloadAction<boolean>) => {
      state.webcamVideoStatus = action.payload;
    },
    setCharacterSelected: (state, action: PayloadAction<boolean>) => {
      state.characterSelected = action.payload;
    },
    setPlayerNameMap: (state, action: PayloadAction<{ id: string; name: string }>) => {
      state.playerNameMap.set(sanitizeId(action.payload.id), action.payload.name);
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
    setUserCoin: (state, action: PayloadAction<number>) => {
      state.userCoin = action.payload;
    },
    setUserProfile: (state, action: PayloadAction<any>) => {
      state.userProfile = action.payload;
    },
  },
});

export const {
  toggleBackgroundMode,
  setSessionId,
  setUserId,
  setUsername,
  setVideoConnected,
  setwebcamAudioStatus,
  setwebcamVideoStatus,
  setPlayerNameMap,
  removePlayerNameMap,
  setEnteringProcess,
  setCharacterSelected,
  setAccessToken,
  setUserCoin,
  setUserProfile,
} = userSlice.actions;

export default userSlice.reducer;
