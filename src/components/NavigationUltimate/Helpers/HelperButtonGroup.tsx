import React, { useState } from 'react';
import styled from 'styled-components';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Colors from 'src/utils/Colors';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ShareIcon from '@mui/icons-material/Share';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import CloseIcon from '@mui/icons-material/Close';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import GitHubIcon from '@mui/icons-material/GitHub';
import LogoutIcon from '@mui/icons-material/Logout';

import { BackgroundMode } from '../../../types/BackgroundMode';
import { ENTERING_PROCESS, toggleBackgroundMode } from '../../../stores/UserStore';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import { getAvatarString, getColorByString } from '../../../util';

import { logout } from 'src/api/auth';
const Backdrop = styled.div`
  display: relative;
  display: flex;
  gap: 10px;
  bottom: 16px;
  right: 16px;
  align-items: flex-end;
  padding: 9px;
  .wrapper-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

const Wrapper = styled.div`
  position: absolute;
  bottom: 60px;
  right: 0px;
  font-size: 16px;
  color: #eee;
  background: #222639;
  box-shadow: 0px 0px 5px #0000006f;
  border-radius: 16px;
  padding: 15px 35px 15px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .close {
    position: absolute;
    top: 15px;
    right: 15px;
  }

  .tip {
    margin-left: 12px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Title = styled.h3`
  font-size: 24px;
  color: #eee;
  text-align: center;
`;

const RoomName = styled.div`
  margin: 10px 20px;
  max-width: 460px;
  max-height: 150px;
  overflow-wrap: anywhere;
  overflow-y: auto;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;

  h3 {
    font-size: 24px;
    color: #eee;
  }
`;

const StyledRedBox = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 30%;
  color: ${Colors.white};
  background-color: ${Colors.indigo};
  font-size: 1rem;
  font-weight: 900;

  &:hover {
    background-color: ${Colors.skyblue[1]};
  }
`;

const RoomDescription = styled.div`
  margin: 0 20px;
  max-width: 460px;
  max-height: 150px;
  overflow-wrap: anywhere;
  overflow-y: auto;
  font-size: 16px;
  color: #c2c2c2;
  display: flex;
  justify-content: center;
`;

const StyledFab = styled(Fab)<{ target?: string }>`
  &:hover {
    color: #1ea2df;
  }
`;

export default function HelperButtonGroup() {
  const [showControlGuide, setShowControlGuide] = useState(false);
  const [showRoomInfo, setShowRoomInfo] = useState(false);
  const backgroundMode = useAppSelector((state) => state.user.backgroundMode);
  const enteringProcess = useAppSelector((state) => state.user.enteringProcess);
  const roomId = useAppSelector((state) => state.room.roomId);
  const roomName = useAppSelector((state) => state.room.roomName);
  const roomDescription = useAppSelector((state) => state.room.roomDescription);
  const dispatch = useAppDispatch();

  return (
    <Backdrop>
      <div className="wrapper-group">
        {showRoomInfo && (
          <Wrapper>
            <IconButton className="close" onClick={() => setShowRoomInfo(false)} size="small">
              <CloseIcon />
            </IconButton>
            <RoomName>
              <Avatar style={{ background: getColorByString(roomName) }}>
                {getAvatarString(roomName)}
              </Avatar>
              <h3>{roomName}</h3>
            </RoomName>
            <RoomDescription>
              <ArrowRightIcon /> ??????ID {roomId}
            </RoomDescription>
            <RoomDescription>
              <ArrowRightIcon /> {roomDescription}
            </RoomDescription>
            <p className="tip">
              <LightbulbIcon />
              Shareable link coming up ????
            </p>
          </Wrapper>
        )}
        {showControlGuide && (
          <Wrapper>
            <Title>?????????</Title>
            <IconButton className="close" onClick={() => setShowControlGuide(false)} size="small">
              <CloseIcon />
            </IconButton>
            <ul>
              <li>
                <strong>W, A, S, D??? ????????????</strong> ???????????????.
              </li>
              <li>
                <strong>SHIFT?????? ???????????? ?????? ?????????</strong> ????????? ?????????.
              </li>
              <li>
                <strong>E</strong> ?????? ?????? ????????? ?????? ??? ????????????.
              </li>
              <li>
                ????????? ??????????????? <strong>R</strong> ?????? ?????? ????????? ????????? ?????????.
              </li>
              <li>
                <strong>Enter</strong> ?????? ????????? ???????????? ?????? ????????? ???????????????.
              </li>
              <li>
                <strong>ESC</strong> ?????? ?????? ???????????? ?????? ?????? ?????????.
              </li>
            </ul>
            <p className="tip">
              <LightbulbIcon />
              ?????? ????????? ???????????? ??????????????? ???????????????!
            </p>
          </Wrapper>
        )}
      </div>
      <ButtonGroup>
        {enteringProcess === ENTERING_PROCESS.CHARACTER_SELECTION && (
          <>
            <Tooltip title="?????? ??????">
              <StyledFab
                size="small"
                onClick={() => {
                  setShowRoomInfo(!showRoomInfo);
                  setShowControlGuide(false);
                }}
              >
                <ShareIcon />
              </StyledFab>
            </Tooltip>
            <Tooltip title="?????????">
              <StyledFab
                size="small"
                onClick={() => {
                  setShowControlGuide(!showControlGuide);
                  setShowRoomInfo(false);
                }}
              >
                <HelpOutlineIcon />
              </StyledFab>
            </Tooltip>
          </>
        )}
        <Tooltip title="?????? ????????? ???????????????!">
          <StyledFab size="small" href="https://github.com/mad-ang" target="_blank">
            <GitHubIcon />
          </StyledFab>
        </Tooltip>
        <Tooltip title="????????? ????????????!">
          <StyledFab size="small" onClick={() => dispatch(toggleBackgroundMode())}>
            {backgroundMode === BackgroundMode.DAY ? <DarkModeIcon /> : <LightModeIcon />}
          </StyledFab>
        </Tooltip>
        <StyledRedBox
          onClick={() => {
            logout();
          }}
        >
          <LogoutIcon fontSize="large" />
        </StyledRedBox>
      </ButtonGroup>
    </Backdrop>
  );
}
