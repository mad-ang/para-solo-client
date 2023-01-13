import React, { useEffect, useState } from 'react';
import logo from '../images/logo.png';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// import { CustomRoomTable } from './CustomRoomTable'
// import { CreateRoomForm } from './CreateRoomForm'
import { useAppSelector, useAppDispatch } from '../hooks';

import phaserGame from '../PhaserGame';
import Bootstrap from '../scenes/Bootstrap';
import { ENTERING_PROCESS, setEnteringProcess } from '../stores/UserStore';
import { EnergySavingsLeaf } from '@mui/icons-material';
import store from 'src/stores';
import { setLobbyJoined } from 'src/stores/RoomStore';

const Backdrop = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 60px;
  align-items: center;
`;

const Wrapper = styled.div`
  background: #222639;
  border-radius: 16px;
  padding: 36px 60px;
  box-shadow: 0px 0px 5px #0000006f;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #eee;
  text-align: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px 0;
  align-items: center;
  justify-content: center;

  img {
    border-radius: 8px;
    height: 120px;
  }
`;

const ProgressBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    color: #33ac96;
  }
`;

const ProgressBar = styled(LinearProgress)`
  width: 360px;
`;

export default function EntryDialog(props) {
  // const [showCustomRoom, setShowCustomRoom] = useState(false)
  // const [showCreateRoomForm, setShowCreateRoomForm] = useState(false)
  const [showSnackbar, setShowSnackbar] = useState(false);
  const lobbyJoined = useAppSelector((state) => state.room.lobbyJoined);
  // 입장하기 버튼시 발동.
  const dispatch = useAppDispatch();
  const [enabled, setDisabled] = React.useState(false);

  const handleConnect = () => {
    setDisabled(true);
    // setTimeout(() => setDisabled(false), 1500);
    if (lobbyJoined) {
      const bootstrap = phaserGame.scene.keys.bootstrap as Bootstrap;
      bootstrap.network
        .joinOrCreatePublic()
        .then(() => bootstrap.launchGame())
        .catch((error) => console.error(error));
    } else {
      setDisabled(false);
      setShowSnackbar(true);
    }
  };

  const signUpConnect = () => {
    dispatch(setEnteringProcess(ENTERING_PROCESS.SIGNUP));
  };

  const signInConnect = () => {
    dispatch(setEnteringProcess(ENTERING_PROCESS.LOGIN));
  };

  useEffect(() => {
    if (props.hasToken) {
      handleConnect();
    }
  });

  return (
    <>
      {!props.hasToken && (
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={showSnackbar}
          autoHideDuration={3000}
          onClose={() => {
            setShowSnackbar(false);
          }}
        >
          <Alert
            severity="error"
            variant="outlined"
            // overwrites the dark theme on render
            style={{ background: '#fdeded', color: '#7d4747' }}
          >
            Trying to connect to server, please try again!
          </Alert>
        </Snackbar>
      )}

      <Backdrop>
        {!props.hasToken && (
          <Wrapper>
            <>
              <Title>o(*°▽°)ﾉ 맘스타운에 오신 것을 환영합니다</Title>
              <Content>
                <img src={logo} alt="logo" />
                {lobbyJoined && (
                  <Button
                    disabled={enabled}
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      handleConnect();
                    }}
                  >
                    맘스타운 입장할래요
                  </Button>
                )}

                {/* <Button
                  variant="outlineds"
                  color="secondary"
                  onClick={() => (lobbyJoined ? setShowCustomRoom(true) : setShowSnackbar(true))}
                >
                  Create/find custom rooms
                </Button> */}
                {
                  <Button variant="contained" color="secondary" onClick={signUpConnect}>
                    회원가입
                  </Button>
                }
                {
                  <Button variant="contained" color="secondary" onClick={signInConnect}>
                    로그인
                  </Button>
                }
              </Content>
            </>
          </Wrapper>
        )}
        {!lobbyJoined && (
          <ProgressBarWrapper>
            <h3> Connecting to server...</h3>
            <ProgressBar color="secondary" />
          </ProgressBarWrapper>
        )}
      </Backdrop>
    </>
  );
}
