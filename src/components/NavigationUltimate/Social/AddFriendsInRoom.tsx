import react, { useEffect, useState } from 'react';
import styled from 'styled-components';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { SetAddFriendsActivated, SetAddFriendsActivateOnly } from '../../../stores/NavbarStore';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import phaserGame from 'src/PhaserGame';
import Game from 'scenes/Game';

const StyledRedBox = styled.div`
  display: flex;
  justify-content: center;
  width: 60px;
  height: 44px;
  background-color: #c4564c;
  box-shadow: 0 0 10px 0 #000000;
  font-size: 1rem;
  font-weight: 900;
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
  box-shadow: 20px 0px 10px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
`;

function ShowUsersInRoomModal(props) {
  const dispatch = useAppDispatch();
  const [otherPlayers, setOtherPlayers] = useState<any>();
  function handleClick() {
    dispatch(SetAddFriendsActivated(false));
  }

  useEffect(() => {
    const game = phaserGame.scene.keys.game as Game;
    const players = Array.from(game?.allOtherPlayers());
    setOtherPlayers(players);
    console.log(players);
  }, []);

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
