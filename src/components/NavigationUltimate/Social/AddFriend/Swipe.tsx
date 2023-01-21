import react, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { SetWhichModalActivated, ModalState } from 'src/stores/NavbarStore';
import { setCoinLeft } from 'src/stores/UserStore';
import { useAppSelector, useAppDispatch } from 'src/hooks';
import phaserGame from 'src/PhaserGame';
import Game from 'scenes/Game';
import Colors from 'src/utils/Colors';
import DefaultAvatar from 'src/assets/profiles/DefaultAvatar.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { Button } from '@mui/material';
import axios from 'axios';
import { addFriendReq } from 'src/api/friend';
import ClearIcon from '@mui/icons-material/Close';
import CloseIcon from '@mui/icons-material/Close';
import ParasolImg from 'src/assets/directmessage/parasol.png';
import RequestFreindResultModal from './RequestFriendResultModal';


const dummyImages = [
  'https://momstown-images.s3.ap-northeast-2.amazonaws.com/dummy/1.jpeg',
  'https://momstown-images.s3.ap-northeast-2.amazonaws.com/dummy/8.jpg',
  'https://momstown-images.s3.ap-northeast-2.amazonaws.com/dummy/3.png',
  'https://momstown-images.s3.ap-northeast-2.amazonaws.com/dummy/7.jpg',
  'https://momstown-images.s3.ap-northeast-2.amazonaws.com/dummy/4.jpeg',
  'https://momstown-images.s3.ap-northeast-2.amazonaws.com/dummy/5.png',
  'https://momstown-images.s3.ap-northeast-2.amazonaws.com/dummy/6.jpg',
];

function Swipe(props) {
  const dispatch = useAppDispatch();
  const [otherPlayers, setOtherPlayers] = useState<any>();
  const imgRef = useRef<any>(null);
  const [userProfile, setUserProfile] = useState<any>(DefaultAvatar);
  const [playerIndex, setPlayerIndex] = useState<number>(0);
  const [playerNum, setPlayerNum] = useState<number>(0);
  const [addFriendResult, setAddFriendResult] = useState<number>(0); //0: 친구 요청 전, 1: 친구 요청 성공, 2: 친구 요청 실패(코인충전)

  const userId = useAppSelector((state) => state.user.userId);
  const username = useAppSelector((state) => state.user.username);
  const friendId = useAppSelector((state) => state.dm.friendId);
  const userCnt = useAppSelector((state) => state.room.userCnt);
  const noMoreCoin = useAppSelector((state) => state.user.noMoreCoin);
  // const game = phaserGame.scene.keys.game as Game;
  // const players = Array.from(game?.allOtherPlayers());
  const players = useAppSelector((state) => state.room.players);


  async function requestFriend(id, name, targetImgUrl) {
    let body = {
      myInfo: {
        userId: userId,
        username: username,
        profileImgUrl:
          'https://momstown-images.s3.ap-northeast-2.amazonaws.com/dummy/leedohyun.png',
      },
      friendInfo: {
        userId: id,
        username: name,
        profileImgUrl:
          targetImgUrl || 'https://momstown-images.s3.ap-northeast-2.amazonaws.com/dummy/7.jpg',
        // username: 'friendName',
        // profileImgUrl: props.url,
      },
      status: 0,
      message: '친구 요청이 왔습니다',
    };

    try {
      addFriendReq(body);
    } catch (error) {
      console.log('error', error);
    }
  }

  function handleClick() {
    dispatch(SetWhichModalActivated(ModalState.None));
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
    setOtherPlayers(players);
    setPlayerNum(players.length);
  }, [players.length]);

  return (
    <Wrapper>
      <SwipeHeader className="Swipe-Header">
        <DirtyTalk>
          <TitleImage src={ParasolImg} width="30" />

          <TitleText>현재 {players.length - 1}명이 접속해있어요</TitleText>
        </DirtyTalk>
        <ButtonWrapper onClick={handleClick}>
          <ClearIcon fontSize="large" sx={{ color: Colors.skyblue[2] }} />
        </ButtonWrapper>{' '}
      </SwipeHeader>
      {players.length - 1 === 0 ? (
        <ZeroMessage>
          <p>현재 접속해 있는 친구가 없어요</p>
          <p>🥲</p>
        </ZeroMessage>
      ) : (
        <Swiper
          className="Swiper"
          modules={[Navigation]}
          navigation
          spaceBetween={10}
          slidesPerView={1}
          loop={true}
          // onSlideChange={(swiper) => {
          //   setPlayerIndex(swiper.activeIndex);
          // }}
        >
          {otherPlayers?.map((player, i: number) => {
            return player.userId !== userId ? (
              <SwiperSlide key={i}>
                {/* <SwiperSlide key={player.id}> */}
                <SwipeBody className="SwipeBody">
                  <ImageWrapper>
                    <div className="personal-image">
                      <ProfileAvatarImage
                        ref={imgRef}
                        src={i <= 5 ? dummyImages[i] : DefaultAvatar}
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
                  <MyButton
                    onClick={() =>
                      {
                      requestFriend(player.userId, player.name, i <= 5 ? dummyImages[i] : null)
                      setAddFriendResult(1);
                    }}
                  >
                    친구 요청{' '}
                  </MyButton>
                </SwipeBody>
              </SwiperSlide>
            ) : null;
          })}
        </Swiper>
      )}
    {addFriendResult == 0 ? (null):(
      <RequestFreindResultModal setAddFriendResult={setAddFriendResult}/>
    )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  left: 0px;
  background-color: white;
  gap: 10px;
  bottom: 60px;
  height: 400px;
  width: 370px;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  // box-shadow: 20px 0px 10px 0px rgba(0, 0, 0, 0.75);

  -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
  // -moz-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
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
  background-color: ${Colors.skyblue[1]};
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
  margin-top: 25px;
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
export default Swipe;
