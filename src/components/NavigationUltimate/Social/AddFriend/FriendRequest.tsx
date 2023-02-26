import react, { useEffect, useRef } from 'react';
import styled from 'styled-components';
// import { SetWhichModalActivated, ModalState } from 'src/stores/NavbarStore';
import { useAppSelector, useAppDispatch } from 'src/hooks';
import phaserGame from 'src/PhaserGame';
import Game from 'scenes/Game';
import Colors from 'src/utils/Colors';
import DefaultAvatar from 'src/assets/profiles/DefaultAvatar.png';
import axios from 'axios';
import { fetchRoomList } from 'src/api/chat';
import ClearIcon from '@mui/icons-material/Close';
import Cookies from 'universal-cookie';
import { setRequestFriendCnt } from 'src/stores/DMboxStore';
const cookies = new Cookies();

export default function FriendRequest(props) {
  const dispatch = useAppDispatch();
  const imgRef = useRef<any>(null);
  const userId = useAppSelector((state) => state.user.userId) || cookies.get('userId');
  const username = useAppSelector((state) => state.user.username) || cookies.get('playerName');
  const game = phaserGame.scene.keys.game as Game;

  async function AcceptRequest(friendId, friendName, status): Promise<any> {
    let body = {
      myInfo: {
        userId: userId,
        username: username,
      },
      friendInfo: {
        userId: friendId,
        username: friendName,
      },
      isAccept: status,
    };

    try {
      const response = await axios.post('/chat/acceptFriend', body);
      const { status, data } = response;
      if (status === 200) {
        if (body.isAccept) game.network2.acceptFriendReq(body);
        return data.payload;
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  }

  useEffect(() => {
    dispatch(setRequestFriendCnt(-1));
  }, []);

  async function handleClick(status?: number) {
    const response = await AcceptRequest(
      props.friendInfo.userId,
      props.friendInfo.username,
      status
    );

    props.setFriendRequestModal(false);
  }

  return (
    <Wrapper>
      <SwipeHeader>
        <TitleText>친구 요청</TitleText>
        <ButtonWrapper
          onClick={() => {
            props.setFriendRequestModal(false);
          }}
        >
          <ClearIcon fontSize="large" sx={{ color: Colors.skyblue[2] }} />
        </ButtonWrapper>
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
          <MyButton
            onClick={(event) => {
              event.preventDefault();
              handleClick(1);
            }}
          >
            수락
          </MyButton>
          <MyButton
            color={`${Colors.pink[2]}`}
            hoverColor={`${Colors.red[1]}`}
            onClick={(event) => {
              event.preventDefault();
              handleClick(0);
            }}
          >
            거절
          </MyButton>
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
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.75);
  font-style: normal;
  font-weight: 400;
`;

const SwipeHeader = styled.div`
  padding: 10px 10px 10px 20px;
  width: 100%;
  position: relative;
  display: grid;
  grid-template-columns: 90% 10%;
`;

const ButtonWrapper = styled.button`
  background: none;
  border: none;
  padding: 0px 10px 0px 0px;
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
  margin-top: 10px;
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
  font-size: 1.4rem;
  margin: 10px 0;
`;

const Message = styled.div`
  font-weight: 400;
  font-size: 10px;
  font-size: 1.2rem;
`;

interface MyButtonProps {
  color?: string;
  hoverColor?: string;
}

const MyButton = styled.button<MyButtonProps>`
  width: 120px;
  height: 40px;
  font-size: 1.2rem;
  font-weight: 500;
  font-family: 'Ycomputer-Regular';
  border-radius: 10px;
  border: none;
  background-color: ${(props) => (props.color ? props.color : `${Colors.skyblue[1]}`)};
  margin: 15px 10px 10px 10px;

  &:hover {
    background-color: ${(props) => (props.hoverColor ? props.hoverColor : `${Colors.skyblue[2]}`)};
  }
`;
