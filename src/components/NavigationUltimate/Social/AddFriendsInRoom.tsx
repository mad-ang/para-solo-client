import react, { useEffect, useState } from 'react';
import styled from 'styled-components';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { SetWhichModalActivated, ModalState } from '../../../stores/NavbarStore';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import phaserGame from 'src/PhaserGame';
import Game from 'scenes/Game';
import Colors from 'src/utils/Colors';
import Swipe from 'src/components/NavigationUltimate/Social/AddFriend/Swipe';
const StyledRedBox = styled.button<{pressed:ModalState}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 30%;
  background-color: ${(props) => (props.pressed == ModalState.AddFriends ? Colors.skyblue[1] : Colors.indigo)};
  font-size: 1rem;
  font-weight: 900;

  &:hover {
    background-color: ${Colors.skyblue[1]};
  }
`;

const ShowUsersInRoom = styled.div`
  position: fixed;
  bottom: 100px;
  left: 0px;
  background-color: #ffffff;
  gap: 10px;
  bottom: 60px;
  height: 400px;
  width: 370px;
  border-radius: 25px;
`;

function ShowUsersInRoomModal(props) {
  const dispatch = useAppDispatch();
  const [otherPlayers, setOtherPlayers] = useState<any>();
  function handleClick() {
    dispatch(SetWhichModalActivated(ModalState.AddFriends));
  }

  useEffect(() => {
    const game = phaserGame.scene.keys.game as Game;
    const players = Array.from(game?.allOtherPlayers());
    setOtherPlayers(players);
    console.log(players);
  }, []);

  console.log('otherPlayers: ', otherPlayers);
  return (
    <ShowUsersInRoom>
      <button
        onClick={() => {
          handleClick();
        }}
      >
        {' '}
        X{' '}
      </button>
      <h1>현재 접속중인 사람들</h1>
      {otherPlayers?.map((playerArr) => (
        <div key={playerArr[0]}>{playerArr[1].userId}</div>
      ))}
    </ShowUsersInRoom>
  );
}

export default function AddFriendsInRoom() {
  const dispatch = useAppDispatch();
  const ActivatedNav = useAppSelector((state) => state.nav.currentState);

  function handleClick() {
    if (ActivatedNav == ModalState.AddFriends){
      dispatch(SetWhichModalActivated(ModalState.None));
    }
    else{
      dispatch(SetWhichModalActivated(ModalState.AddFriends));
    }
  }

  return (
    <>
      <StyledRedBox pressed = {ActivatedNav}>
        <GroupAddIcon
          sx={{ color: '#fff' }}
          fontSize="large"
          onClick={() => {
            handleClick();
          }}
        />
      </StyledRedBox>
      {/* {NavControllerAddFriendsActivated ? <ShowUsersInRoomModal /> : null} */}
      {ActivatedNav == ModalState.AddFriends ? <Swipe /> : null}
    </>
  );
}
