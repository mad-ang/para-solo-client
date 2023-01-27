import react, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { SetWhichModalActivated, ModalState } from 'src/stores/NavbarStore';
import { setUserCoin } from 'src/stores/UserStore';
import { useAppSelector, useAppDispatch } from 'src/hooks';
import phaserGame from 'src/PhaserGame';
import Game from 'scenes/Game';
import Colors from 'src/utils/Colors';
import DefaultAvatar from 'src/assets/profiles/DefaultAvatar.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { addFriendReq } from 'src/api/friend';
import ClearIcon from '@mui/icons-material/Close';
import ParasolImg from 'src/assets/directmessage/parasol.png';
import RequestFreindResultModal from './RequestFriendResultModal';
import Cookies from 'universal-cookie';
import { IPlayer } from 'src/types/ITownState';
import MoreInfoModal from './MoreInfo';
const cookies = new Cookies();

function Swipe(props) {
  const dispatch = useAppDispatch();
  const [otherPlayers, setOtherPlayers] = useState<any>();
  const imgRef = useRef<any>(null);
  const [playerNum, setPlayerNum] = useState<number>(0);
  const [addFriendResult, setAddFriendResult] = useState<number>(0); //0: 친구 요청 전, 1: 친구 요청 성공,  2: 친구 요청 실패(코인충전) 3:이미친구

  const myId = useAppSelector((state) => state.user.userId) || cookies.get('userId');
  const myName = useAppSelector((state) => state.user.username);
  const myProfile = useAppSelector((state) => state.user.userProfile);
  const userCoin = useAppSelector((state) => state.user.userCoin);
  const game = phaserGame.scene.keys.game as Game;
  const players = useAppSelector((state) => state.room.players);
  const [selectedPlayer, setSelectedPlayer] = useState<IPlayer | null>(null);

  async function requestFriend(id: string, name: string, targetImgUrl: string) {
    let body = {
      myInfo: {
        userId: myId,
        username: myName,
        profileImgUrl: myProfile.profileImgUrl || '',
      },
      friendInfo: {
        userId: id,
        username: name,
        profileImgUrl: targetImgUrl,
      },
      status: 0,
      message: '친구 요청이 왔습니다',
    };
    try {
      const result = await addFriendReq(body);
      //여기에서 setUserCoin 써야함 (동기화)

      //404 이면, setAddFriendResult(2)로 해주어야 함
      if (result === 1) {
        console.log('친구 요청 성공(swipe.tsx)');
        setAddFriendResult(result!);
        dispatch(setUserCoin(userCoin - 1));
      } else if (result === 2) {
        console.log('코인 부족으로 인한 친구 요청 실패(swipe.tsx)');
        setAddFriendResult(result!);
      } else if (result === 3) {
        setAddFriendResult(result!);
        console.log('이미 친구이거나 친구요청을 보낸 상태입니다(swipe.tsx)');
      }
      //여기에서 localstate인 UserCoin의 개수를 통해, addFriendResult 를 업데이트 해주어야 함
    } catch (error) {
      console.error('error(swipte.tsx 보세요...)', error);
    }
  }

  function handleClick() {
    dispatch(SetWhichModalActivated(ModalState.None));
  }

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
        >
          {otherPlayers?.map((player: any, i: number) => {
            console.log(player.userProfile.statusMessage);
            return player.userId !== myId ? (
              <SwiperSlide key={i}>
                {/* <SwiperSlide key={player.id}> */}
                <SwipeBody className="SwipeBody">
                  <ImageWrapper>
                    <HoverCover onClick={() => setSelectedPlayer(player)}>
                      <div className="see-more">프로필 더보기</div>
                    </HoverCover>
                    <div className="personal-image">
                      <ProfileAvatarImage
                        ref={imgRef}
                        src={player?.userProfile?.profileImgUrl || DefaultAvatar}
                        className="personal-avatar"
                        alt="avatar"
                        onError={() => {
                          if (imgRef.current) return (imgRef.current.src = DefaultAvatar);
                        }}
                      />
                    </div>
                  </ImageWrapper>
                  <Name>{player.name}</Name>
                  <Message>
                    {player.userProfile.statusMessage
                      ? player.userProfile.statusMessage
                      : '상태 메시지가 없습니다'}
                  </Message>
                  <MyButton
                    onClick={(event) => {
                      event.preventDefault();
                      requestFriend(
                        player.userId,
                        player.name,
                        player.userProfile.profileImgUrl || ''
                      );
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
      {addFriendResult === 0 ? null : (
        <RequestFreindResultModal
          setAddFriendResult={setAddFriendResult}
          addFriendResult={addFriendResult}
        />
      )}
      {selectedPlayer && <MoreInfoModal player={selectedPlayer} setSelectedPlayer={setSelectedPlayer} />}
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

const HoverCover = styled.div`
  position: absolute;
  cursor: pointer;
  width: 160px;
  height: 160px;
  border-radius: 100%;
  transition: all ease-in-out 0.3s;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${Colors.white};
  font-size: 18px;

  .see-more {
    opacity: 0;
    transition: all ease-in-out 0.3s;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
    .see-more {
      opacity: 100;
      transition: all ease-in-out 0.3s;
    }
  }
`;
