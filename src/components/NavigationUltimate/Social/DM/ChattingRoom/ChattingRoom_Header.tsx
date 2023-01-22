import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import CloseIcon from '@mui/icons-material/Close';
import { setShowDM } from 'src/stores/DMboxStore';
import { SetWhichModalActivated, ModalState } from 'src/stores/NavbarStore';
import styled from 'styled-components';
import Colors from 'src/utils/Colors';

export default function HeadAppBar() {
  const dispatch = useAppDispatch();
  const friendName = useAppSelector((state) => state.dm.friendName);

  return (
    <DMtop>
      <DirtyTalk>
        <IconButton
          onClick={() => {
            dispatch(SetWhichModalActivated(ModalState.ChattingList));
          }}
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 0 }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        <TitleText>{friendName}</TitleText>
      </DirtyTalk>
    </DMtop>
  );
}

const DirtyTalk = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const DMtop = styled.div`
  background: ${Colors.skyblue[1]};
  padding: 0px 20px 0px 20px;
  font-size: 28px;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  font-weight: bold;
  display: flex;
  height: 60px;
  flex-direction: row;
  alsign-items: center;
  justify-content: space-between;
`;
const ButtonWrapper = styled.button`
  background: none;
  border: none;
`;

const TitleImage = styled.img`
  margin-left: 3px;
  margin-right: 13px;
  width: 28px;
`;

const TitleText = styled.div`
  font-size: 23px;
`;
