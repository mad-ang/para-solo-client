import react, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { SetAddFriendsActivated, SetAddFriendsActivateOnly } from 'src/stores/NavbarStore';
import { useAppSelector, useAppDispatch } from 'src/hooks';
import phaserGame from 'src/PhaserGame';
import Game from 'scenes/Game';
import Colors from 'src/utils/Colors';
import DefaultAvatar from 'src/assets/profiles/DefaultAvatar.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { Button } from '@mui/material';
import axios from 'axios';
import { fetchRoomList } from 'src/api/chat';

export default function FriendRequest(props) {
  const dispatch = useAppDispatch();
  const [otherPlayers, setOtherPlayers] = useState<any>();
  const imgRef = useRef<any>(null);
  const [userProfile, setUserProfile] = useState<any>(DefaultAvatar);
  const [playerIndex, setPlayerIndex] = useState<number>(0);
  const [playerNum, setPlayerNum] = useState<number>(0);
  const userId = useAppSelector((state) => state.user.userId);
  const friendId = useAppSelector((state) => state.dm.friendId);
  const userCnt = useAppSelector((state) => state.room.userCnt);
  const game = phaserGame.scene.keys.game as Game;
  const players = Array.from(game?.allOtherPlayers());

  async function AcceptRequest(id, name, status) {
    let body = {
      myId: userId,
      friendId: id,
      isAccept: status,
    };

    try {
      const response = await axios.post('/chat/acceptFriend', body);
      // if (response.data.status === 200) {
      console.log('친구 요청 수락/거절 결과', response.data);
      // }
    } catch (error) {
      console.log('error', error);
    }
  }

  function handleClick() {
    fetchRoomList(userId).then((data) => {
      props.setRooms(data);
    });
    props.setFriendRequestModal(false);
  }

  return (
    <Wrapper>
      <SwipeHeader>
        <TitleText>친구 요청</TitleText>
        <CloseButton onClick={handleClick}>X</CloseButton>
      </SwipeHeader>
      <SwipeBody>
        <ImageWrapper>
          <div className="personal-image">
            <ProfileAvatarImage
              ref={imgRef}
              src={props.friendInfo.profileImgUrl}
              className="personal-avatar"
              alt="avatar"
              onError={() => {
                if (imgRef.current) return (imgRef.current.src = DefaultAvatar);
              }}
            />
          </div>
        </ImageWrapper>
        <Name>{props.friendInfo.username}</Name>
        <Message>좋은 만남 가져봐요</Message>
        <Buttons>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              AcceptRequest(props.friendInfo.userId, props.friendInfo.username, 1);
              handleClick();
            }}
            sx={{ marginLeft: 4, marginRight: 1, my: 1, width: '120px' }}
          >
            수락
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              AcceptRequest(props.friendInfo.userId, props.friendInfo.username, 0);
              handleClick();
            }}
            sx={{ marginLeft: 4, marginRight: 1, my: 1, width: '120px' }}
          >
            거절
          </Button>
        </Buttons>
      </SwipeBody>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  left: 0px;
  background-color: ${Colors.white};
  gap: 10px;
  bottom: 60px;
  height: 400px;
  width: 370px;
  border-radius: 6px;
  box-shadow: 20px 0px 10px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
  font-style: normal;
  font-weight: 400;
`;

const CloseButton = styled.button`
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50%;
`;

const SwipeHeader = styled.div`
  padding: 10px 10px 0 10px;
  width: 100%;
  position: relative;
  display: grid;
  grid-template-columns: 90% 10%;
`;

const TitleText = styled.div`
  font-weight: 600;
  font-size: 24px;
  font-size: 1.5rem;
`;

const SwipeBody = styled.div`
  padding: 0 10px 0px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  height: 75%;
`;

const ImageWrapper = styled.div`
  margin-top: 20px;
  width: 160px;
  height: 160px;
  border-radius: 100%;

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
    border-radius: 100%;
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
    width: 160px;
    height: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
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

const Buttons = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;
`;

const ProfileAvatarImage = styled.img`
  width: 160px;
  height: 160px;
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
  font-size: 1.5rem;
`;

const ZeroMessage = styled.div`
  font-weight: 600;
  font-size: 24px;
  font-size: 1.5rem;
`;
