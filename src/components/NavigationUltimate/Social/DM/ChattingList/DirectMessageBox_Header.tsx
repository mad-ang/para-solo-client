import React from 'react';
import styled from 'styled-components';
import ClearIcon from '@mui/icons-material/Clear';
import Colors from 'src/utils/Colors';
import { useAppDispatch } from '../../../../../hooks';
import { ModalState, SetWhichModalActivated } from '../../../../../stores/NavbarStore';
import ParasolImg from 'src/assets/directmessage/parasol.png';

export function DMboxHeader() {
  const dispatch = useAppDispatch();
  function handleClick() {
    dispatch(SetWhichModalActivated(ModalState.None));
  }

  return (
    <DMtop>
      <DirtyTalk>
        <TitleImage src={ParasolImg} width="30" />
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

const DirtyTalk = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const DMtop = styled.div`
  background: ${Colors.skyblue[1]};
  padding: 0px 0px 0px 20px;
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
  padding: 0px 10px 0px 0px;
`;
