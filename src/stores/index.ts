import { enableMapSet } from 'immer'
import { configureStore } from '@reduxjs/toolkit'
import tableReducer from './tableStore'
import userReducer from './UserStore'
import chatReducer from './ChatStore'
import roomReducer from './RoomStore'
import dm from './DMbox'

enableMapSet()

const store = configureStore({
  reducer: {
    user: userReducer,
    table: tableReducer,
    chat: chatReducer,
    room: roomReducer,
    dm: dm,
  },
  // Temporary disable serialize check for redux as we store MediaStream in ComputerStore.
  // https://stackoverflow.com/a/63244831
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
