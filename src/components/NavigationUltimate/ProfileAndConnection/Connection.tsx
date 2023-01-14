import react, { useEffect } from 'react';
import styled from 'styled-components';
import MicIcon from '@mui/icons-material/Mic';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import store from 'src/stores';
import { setVideoConnected } from 'src/stores/UserStore';
import { useAppSelector } from 'src/hooks';
import { Audiotrack } from '@mui/icons-material';
import WebRTC from 'src/web/WebRTC';
import Game from 'src/scenes/Game';
import phaserGame from 'src/PhaserGame';
import Bootstrap from 'src/scenes/Bootstrap';
// styled.div with Shadow
const StyledRedBox = styled.div`
  display: flex;
  justify-content: center;
  width: 60px;
  height: 44px;
  background-color: #CAB8FF;
  box-shadow: 0 0 10px 0 #000000;
  font-size: 2rem;
  font-weight: 900;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;


export default function ConnectionStatus() {

const bootstrap = phaserGame.scene.keys.bootstrap as Bootstrap;

  return (
    <Wrapper>
      <StyledRedBox>
        <MicIcon fontSize="large" onClick={() => {
          bootstrap.network.webRTC?.toggleAudio();
        }}/>
      </StyledRedBox>
      <StyledRedBox>
        <VideoCameraFrontIcon fontSize="large" onClick = {() => {
          bootstrap.network.webRTC?.toggleVideo();
        }} />
      </StyledRedBox>
    </Wrapper>
  );
}
