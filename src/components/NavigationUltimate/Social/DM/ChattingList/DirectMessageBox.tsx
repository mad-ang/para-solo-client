import React from 'react';
import styled from 'styled-components';
import { InsideChattingRoom } from '../ChattingRoom/ChattingRoom';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { ConversationList } from './DirectMessageBox_ConversationList';
import { DMboxHeader } from './DirectMessageBox_Header';

import { ModalState, SetWhichModalActivated } from '../../../../../stores/NavbarStore';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import Colors from 'src/utils/Colors';

const StyledRedBox = styled.button<{ pressed: ModalState }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 30%;
  background-color: ${(props) =>
    props.pressed == ModalState.ChattingList ? Colors.skyblue[1] : Colors.indigo};
  font-size: 1rem;
  font-weight: 900;

  &:hover {
    background-color: ${Colors.skyblue[1]};
  }
`;

const Wrapper = styled.div`
  position: relative;
  top: 0;
  left: 0;
`;
const DMwrapper = styled.div`
  position: fixed;
  bottom: 60px;
  left: 0px;
  background: none;
  gap: 10px;
  height: 580px;
  width: 370px;
  border-radius: 25px;
  -webkit-box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.75);
`;

/* DMbox */
function DMbox() {

  return (
    <DMwrapper className="DMwrapper">
      <DMboxHeader />
      {/* <DMSearchConversation /> */}
      <ConversationList />
    </DMwrapper>
  );
}

/* DMboxButton, something pop-up when clicks it */
export default function DMboxButton() {
  const ActivatedNav = useAppSelector((state) => state.nav.currentState);
  const requestFriendCnt = useAppSelector((state) => state.dm.requestFriendCnt);
  const newMessageCnt = useAppSelector((state) => state.dm.newMessageCnt);

  // const NavControllerChattingRoomActivated = useAppSelector(
  //   (state) => state.nav.NavControllerChattingRoomActivated
  // );
  const dispatch = useAppDispatch();

  function handleClick() {
    if (ActivatedNav == ModalState.ChattingList) {
      dispatch(SetWhichModalActivated(ModalState.None));
    } else {
      dispatch(SetWhichModalActivated(ModalState.ChattingList));
    }
  }

  return (
    <Wrapper>
      <StyledRedBox onClick={handleClick} pressed={ActivatedNav}>
        {(requestFriendCnt > 0 || newMessageCnt > 0) && (
          <UnreadBadge>{requestFriendCnt + newMessageCnt}</UnreadBadge>
        )}
        <VolunteerActivismIcon fontSize="large" sx={{ color: '#fff' }} />
      </StyledRedBox>

      {ActivatedNav === ModalState.ChattingList ? <DMbox /> : null}
      {ActivatedNav === ModalState.ChattingListAndRoom ? <InsideChattingRoom /> : null}

      {/* {(ActivatedNav === ModalState.ChattingList ||
        ActivatedNav === ModalState.ChattingListAndRoom) && (
        <div className="DMpopup">
          <DMbox />
          {ActivatedNav === ModalState.ChattingListAndRoom ? <InsideChattingRoom /> : null}
        </div>
      )} */}
    </Wrapper>
  );
}

const UnreadBadge = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  margin-right: -11px;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 18px;
  height: 18px;
  border-radius: 100%;
  background-color: ${Colors.red[3]};
  color: ${Colors.white};
  font-size: 12px;
`;
