import react, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
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

function Swipe(props) {
  const dispatch = useAppDispatch();
  const [otherPlayers, setOtherPlayers] = useState<any>();
  const imgRef = useRef<any>(null);
  const [userProfile, setUserProfile] = useState<any>(DefaultAvatar);
  const [playerIndex, setPlayerIndex] = useState<number>(0);
  const [playerNum, setPlayerNum] = useState<number>(0);
  const userId = useAppSelector((state) => state.user.userId);
  const userName = useAppSelector((state) => state.user.userName);
  const friendId = useAppSelector((state) => state.dm.frinedId);
  const userCnt = useAppSelector((state) => state.room.userCnt);
  // const game = phaserGame.scene.keys.game as Game;
  // const players = Array.from(game?.allOtherPlayers());
  const players = useAppSelector((state) => state.room.players);

  async function requestFriend(id, name) {
    console.log('친구요청하자~~~');
    console.log(id);
    console.log(name);
    let body = {
      myInfo: {
        userId: userId,
        username: userName,
        profileImgUrl: 'https://user-images.githubusercontent.com/63194662/211139505-282c312a-2d1c-4186-a22b-4fdb7c375803.png',
      },
      friendInfo: {
        userId: id,
        username: name,
        profileImgUrl: 'https://user-images.githubusercontent.com/63194662/211139490-e3606d1d-3f68-4041-8b99-1a09d2a1b61c.png',
        // username: 'friendName',
        // profileImgUrl: props.url,
      },
      status: 0,
      message: '친구 요청',
    };

    try {
      const Response = await axios.post('/chat/addFriend', body);
      console.log(Response);
      if (Response.status === 200) {
        console.log('친구 요청 성공');
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  function handleClick() {
    dispatch(SetAddFriendsActivated(false));
  }

  // const playerUpdate = () => {

  //   const game = phaserGame.scene.keys.game as Game;
  //   const players = Array.from(game?.allOtherPlayers());
  //   setOtherPlayers(players);
  //   console.log(players);
  //   console.log('Players Num: ', players.length);
  //   setPlayerNum(players.length);
  // };

  useEffect(() => {
    console.log('현재 방의 players', players);
    console.log('Players Num: ', players.length);
    setOtherPlayers(players);
    setPlayerNum(players.length);
  }, [players.length]);

  return (
    <Wrapper>
      <SwipeHeader>
        <TitleText>현재 {players.length - 1}명이 접속해있어요</TitleText>
        <CloseButton onClick={handleClick}>X</CloseButton>
      </SwipeHeader>
      {players.length === 0 ? (
        <ZeroMessage>현재 접속해 있는 친구가 없어요</ZeroMessage>
      ) : (
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={10}
          slidesPerView={1}
          loop={true}
          // onSlideChange={(swiper) => {
          //   setPlayerIndex(swiper.activeIndex);
          // }}
        >
          {otherPlayers?.map(
            (player, i: number) =>
              
                <SwiperSlide key={i}>
                  {/* <SwiperSlide key={player.id}> */}
                  <SwipeBody>
                    <ImageWrapper>
                      <div className="personal-image">
                        <ProfileAvatarImage
                          ref={imgRef}
                          src={DefaultAvatar}
                          // src={player.userInfo.profileImgUrl || DefaultAvatar}
                          className="personal-avatar"
                          alt="avatar"
                          onError={() => {
                            if (imgRef.current) return (imgRef.current.src = DefaultAvatar);
                          }}
                        />
                      </div>
                    </ImageWrapper>
                    <Name>{player.name}</Name>
                    <Message>좋은 만남 가져봐요</Message>
                    <Button
                      // fullWidth={true}
                      variant="contained"
                      color="secondary"
                      onClick={() => requestFriend(player.userId, player.name)}
                      sx={{ marginLeft: 4, marginRight: 1, my: 1, width: '200px' }}
                    >
                      친구 요청{' '}
                    </Button>
                  </SwipeBody>
                </SwiperSlide>
              
          )}
        </Swiper>
      )}
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
  padding: 0 10px 15px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  height: 75%;
`;

const ImageWrapper = styled.div`
  margin-top: 40px;
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

export default Swipe;
