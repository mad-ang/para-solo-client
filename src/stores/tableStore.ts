import Peer from 'peerjs'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import TableTalkManager from '../web/tableTalk'
import phaserGame from '../PhaserGame'
import Game from '../scenes/Game'
import { sanitizeId } from '../util'

interface tableState {
  tableDialogOpen: boolean
  tableId: null | string
  chairId: null | string
  occupied: boolean
  myStream: null | MediaStream
  peerStreams: Map<
    string,
    {
      stream: MediaStream
      call: Peer.MediaConnection
    }
  >
  tableTalkManager: null | TableTalkManager
}

const initialState: tableState = {
  tableDialogOpen: false,
  tableId: null,
  chairId: null,
  occupied: false,
  myStream: null,
  peerStreams: new Map(),
  tableTalkManager: null,
}

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    openTableDialog: (
      state,
      action: PayloadAction<{ tableId: string; myUserId: string }>
    ) => {
      if (!state.tableTalkManager) {
        state.tableTalkManager = new TableTalkManager(action.payload.myUserId)
      }
      const game = phaserGame.scene.keys.game as Game
      game.disableKeys()
      
      state.tableTalkManager.onOpen()
      state.tableDialogOpen = true
      state.tableId = action.payload.tableId
    },
    closeTableDialog: (state) => {
      // Tell server the table dialog is closed.
      const game = phaserGame.scene.keys.game as Game
      game.enableKeys()
      game.network.disconnectFromTable(state.tableId!)
      for (const { call } of state.peerStreams.values()) {
        call.close()
      }
      state.tableTalkManager?.onClose()
      state.tableDialogOpen = false
      state.myStream = null
      state.tableId = null
      state.peerStreams.clear()
    },
    setMyStream: (state, action: PayloadAction<null | MediaStream>) => {
      state.myStream = action.payload
    },
    addVideoStream: (
      state,
      action: PayloadAction<{ id: string; call: Peer.MediaConnection; stream: MediaStream }>
    ) => {
      state.peerStreams.set(sanitizeId(action.payload.id), {
        call: action.payload.call,
        stream: action.payload.stream,
      })
    },
    removeVideoStream: (state, action: PayloadAction<string>) => {
      state.peerStreams.delete(sanitizeId(action.payload))
    },
    setOccupied: (state, action: PayloadAction<boolean>) => {
      state.occupied = action.payload
    }
  },
})

export const {
  closeTableDialog,
  openTableDialog,
  setMyStream,
  addVideoStream,
  removeVideoStream,
  setOccupied,
} = tableSlice.actions

export default tableSlice.reducer