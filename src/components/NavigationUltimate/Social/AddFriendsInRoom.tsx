import react from 'react';
import styled from 'styled-components';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import {SetAddFriendsActivated, SetAddFriendsActivateOnly} from '../../../stores/NavbarStore';
import { useAppSelector, useAppDispatch } from '../../../hooks';

const StyledRedBox = styled.div`
  display: flex;
  justify-content: center;
  width: 60px;
  height: 44px;
  background-color: #C4564C;
  box-shadow: 0 0 10px 0 #000000;
  font-size: 1rem;
  font-weight: 900;
`;
const ShowUsersInRoom = styled.div`
    position: fixed;
    bottom: 100px;
    left: 0px;
    background-color: #FFFFFF;
    gap: 10px;
    bottom: 60px;
    height: 400px;
    width: 370px;
    border-radius: 25px;
    box-shadow: 20px 0px 10px 0px rgba(0,0,0,0.75);
    -webkit-box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
`

function ShowUsersInRoomModal(props){
    const dispatch = useAppDispatch();

    function handleClick() {
      dispatch(SetAddFriendsActivated(false));
      }

    return(
      <ShowUsersInRoom>
          <button  onClick={()=>{handleClick()}} > X </button>
          <h1>방안의 접속자들 보여주기</h1>
          <div>사용자1 <button>친구추가</button></div>
          <div>사용자2 <button>친구추가</button></div>
          <div>사용자3 <button>친구추가</button></div>
          <div>사용자4 <button>친구추가</button></div>
      </ShowUsersInRoom>
    )
}

export default function AddFriendsInRoom() {
  const dispatch = useAppDispatch();
  const NavControllerAddFriendsActivated = useAppSelector(
    (state) => state.nav.NavControllerAddFriendsActivated
  );

  function handleClick() {
    dispatch(SetAddFriendsActivateOnly());
  }

  return (
    <StyledRedBox>
      <GroupAddIcon
        fontSize="large"
        onClick={() => {
          handleClick();
        }}
      />
      {NavControllerAddFriendsActivated ? <ShowUsersInRoomModal /> : null}
    </StyledRedBox>
  );
}