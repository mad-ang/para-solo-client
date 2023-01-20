import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import DMboxSVG from '../../../assets/directmessage/DM.svg';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';
import Colors from 'src/utils/Colors';
import { InsideChattingRoom } from '../ChattingRoom/ChattingRoom';
import { useAppSelector, useAppDispatch } from '../../../../../hooks';
import {
  ModalState,
  SetWhichModalActivated,
} from '../../../../../stores/NavbarStore';

export function DMboxHeader() {
  const dispatch = useAppDispatch();
  function handleClick() {
    console.log('clicked!!!! I want back to the chatting list');
    dispatch(SetWhichModalActivated(ModalState.None));
  }

  return (
    <DMtop>
      <DirtyTalk>
        <TitleImage src={'src/assets/directmessage/parasol.png'} width="30" />
        <TitleText>파라솔 DM</TitleText>
      </DirtyTalk>
      <ButtonWrapper onClick={handleClick}>
        <ClearIcon fontSize="large" sx={{ color: Colors.skyblue[2] }} />
      </ButtonWrapper>
    </DMtop>
  );
}

const TitleImage = styled.img`
  margin-left: 3px;
  margin-right: 13px;
  width: 28px;
`;

const TitleText = styled.div`
  font-size: 23px;
`;

const TopController = styled.div`
  background: ${Colors.skyblue[1]};
  display: flex;
  height: 60px;
  flex-direction: row;
  alsign-items: center;
  justify-content: space-between;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
`;
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