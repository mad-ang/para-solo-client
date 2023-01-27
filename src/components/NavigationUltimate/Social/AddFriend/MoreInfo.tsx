import react, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from 'src/hooks';
import phaserGame from 'src/PhaserGame';
import Game from 'scenes/Game';
import Colors from 'src/utils/Colors';
import DefaultAvatar from 'src/assets/profiles/DefaultAvatar.png';
import ClearIcon from '@mui/icons-material/Close';
import ParasolImg from 'src/assets/directmessage/parasol.png';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function MoreInfoModal(props) {
  console.log('프로필더보기');
  const dispatch = useAppDispatch();
  const [otherPlayers, setOtherPlayers] = useState<any>();
  const imgRef = useRef<any>(null);

  const [playerNum, setPlayerNum] = useState<number>(0);

  const game = phaserGame.scene.keys.game as Game;
  const players = useAppSelector((state) => state.room.players);

  function handleClick() {
    console.log(props.player);
    props.setSelectedPlayer(null);
  }

  useEffect(() => {
    setOtherPlayers(players);
    setPlayerNum(players.length);
  }, [players.length]);

  return (
    <Wrapper>
      <SwipeHeader className="Swipe-Header">
        <ButtonWrapper onClick={handleClick}>
          <ClearIcon fontSize="large" sx={{ color: Colors.skyblue[2] }} />
        </ButtonWrapper>{' '}
      </SwipeHeader>

      <SwipeBody className="SwipeBody">
        <ImageWrapper>
          <div className="personal-image">
            <ProfileAvatarImage
              ref={imgRef}
              src={props.player.userProfile?.profileImgUrl || DefaultAvatar}
              className="personal-avatar"
              alt="avatar"
              onError={() => {
                if (imgRef.current) return (imgRef.current.src = DefaultAvatar);
              }}
            />
          </div>
        </ImageWrapper>
        <Name>{props.player.name}</Name>
        <StatusMessage>{props.player.userProfile?.statusMessage}</StatusMessage>
        <Message>성별 : {props.player.userProfile?.gender}</Message>
        <Message>나이 : {props.player.userProfile?.age}</Message>
        <Message>키 : {props.player.userProfile?.height}</Message>
      </SwipeBody>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  left: 371px;
  background-color: white;
  gap: 10px;
  bottom: 60px;
  height: 400px;
  width: 370px;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  // box-shadow: 20px 0px 10px 0px rgba(0, 0, 0, 0.75);

  -webkit-box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.75);
  // -moz-box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.75);
  font-style: normal;
  font-weight: 400;
`;

const SwipeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0px 10px 10px;
  width: 100%;
  height: 60px;
  position: relative;
  // display: grid;
  grid-template-columns: 90% 10%;

  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  align-items: center;
`;

const DirtyTalk = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const TitleImage = styled.img`
  margin-left: 3px;
  margin-right: 13px;
  width: 28px;
`;

const TitleText = styled.div`
  font-size: 23px;
  font-weight: 600;
`;

const ButtonWrapper = styled.button`
  background: none;
  border: none;
  padding: 0px 10px 0px 0px;
`;

const SwipeBody = styled.div`
  padding: 0 10px 0px 10px;
  display: flex;
  background-color: ${Colors.white};
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  height: 340px;
`;

const ImageWrapper = styled.div`
  margin-top: 10px;
  width: 80px;
  height: 80px;
  border-radius: 20%;

  display: flex;
  justify-content: center;
  align-items: center;

  .personal-image {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .personal-image input[type='file'] {
    display: none;
  }
  .personal-figure {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .personal-avatar {
    box-sizing: border-box;
    border-radius: 20%;
    border: 2px solid transparent;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
    transition: all ease-in-out 0.3s;
  }
  .personal-avatar:hover {
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
  }
  .personal-figcaption {
    cursor: pointer;
    position: absolute;
    top: 0px;
    width: 80px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20%;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0);
    transition: all ease-in-out 0.3s;
  }
  .personal-figcaption:hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .personal-figcaption > img {
    width: 50px;
    height: 50px;
  }
`;

const ProfileAvatarImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
`;

const Name = styled.div`
  font-weight: 600;
  font-size: 20px;
  font-size: 1.5rem;
  margin: 10px 0;
`;

const Message = styled.div`
  font-weight: 400;
  font-size: 10px;
  font-size: 1.4rem;
  margin: 5px 0;
`;
const StatusMessage = styled.div`
  font-weight: 400;
  font-size: 10px;
  font-size: 1.4rem;
  margin: 10px;
`;

const MyButton = styled.button`
  width: 180px;
  height: 40px;
  font-size: 1.2rem;
  font-weight: 500;
  margin-top: 12px;
  font-family: 'Ycomputer-Regular';
  border-radius: 10px;
  border: none;
  background-color: ${Colors.skyblue[1]};
  &:hover {
    background-color: ${Colors.skyblue[2]};
  }
`;

const ZeroMessage = styled.div`
  font-weight: 600;
  font-size: 24px;
  font-size: 1.5rem;
  background-color: ${Colors.white};
  padding: 70px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  height: 340px;
`;

export default MoreInfoModal;
