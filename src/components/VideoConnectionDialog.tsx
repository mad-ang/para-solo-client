import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

import phaserGame from '../PhaserGame'
import Game from '../scenes/Game'

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
`

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px;
  position: relative;
  display: flex;
  flex-direction: column;
`

export default function VideoConnectionDialog() {
  const [connectionWarning, setConnectionWarning] = useState(true)
  return (
    <Backdrop>
      <Wrapper>
        {connectionWarning && (
          <Alert
            severity="warning"
            onClose={() => {
              setConnectionWarning(!connectionWarning)
            }}
          >
            <AlertTitle> 🤣아차!</AlertTitle>
             
             마이크가 연결되지 않았어요
            <br /> <strong>마이크를 연결하면</strong> 친구들과 대화할 수 있어요
          </Alert>
        )}
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            const game = phaserGame.scene.keys.game as Game
            game.network.webRTC?.getUserMedia()
          }}
        >
          마이크 연결하기
        </Button>
      </Wrapper>
    </Backdrop>
  )
}
