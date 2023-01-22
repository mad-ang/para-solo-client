import React, { useState, useEffect } from 'react';
import { ChatFeed, Message } from 'react-chat-ui';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import styled from 'styled-components';
import { io, Socket } from 'socket.io-client';
import { ServerToClientEvents, ClientToServerEvents } from 'src/api/chat';
import chatNetwork from 'src/services/Network2';
import Game from 'src/scenes/Game';
import phaserGame from 'src/PhaserGame';
// import {DMSlice} from 'src/stores/DMboxStore';
import { Colors } from 'src/utils/Colors';
import { color } from '@mui/system';
import { setNewMessageCnt, setRequestFriendCnt } from 'src/stores/DMboxStore';
import { IChatRoomStatus } from 'src/api/chat';
const Wrapper = styled.div`
  height: 450px;
  width: 370px;
`;

export default function ChatBubbles(props) {
  const dispatch = useAppDispatch();
  const game = phaserGame.scene.keys.game as Game;
  const socketNetwork = game.networt2;
  // 채팅 시작 시 저장되어 있던 채팅 리스트 보여줌
  const roomId = useAppSelector((state) => state.dm.roomId);
  const friendId = useAppSelector((state) => state.dm.friendId);
  const userId = useAppSelector((state) => state.user.userId);
  const newMessage = useAppSelector((state) => state.dm.newMessage);
  const roomStatus = useAppSelector((state) => state.dm.dmProcess);
  // const unread = useAppSelector((state) => state.dm.newMessageCnt);

  // 기존 메세지 리스트 -> 삭제 예정
  const [messageList, setMessageList] = useState<any>([]);

  const callbackForJoinRoom = (oldMessages) => {
    setMessageList(oldMessages);
  };
  useEffect(() => {
    console.log('마운트');
    socketNetwork.joinRoom(roomId, userId, friendId, callbackForJoinRoom);
  }, []);

  useEffect(() => {
    if (!props.newMessage || props.newMessage?.message.length === 0) return;

    const body = {
      // id : 0,
      roomId: roomId,
      userId: userId,
      friendId: friendId,
      message: props.newMessage.message,
    };

    // 내가 쓴 메세지 채팅 리스트에 추가
    setMessageList((messageList) => [...messageList, props.newMessage]);

    // 내가 쓴 메세지 서버에 전송
    game.networt2.sendMessage(body);
  }, [props.newMessage?.message]);

  useEffect(() => {
    setMessageList((messageList) => [...messageList, newMessage]);
  }, [newMessage]);

  return (
    <>
      <Wrapper>
        <ChatFeed
          maxHeight={450}
          messages={messageList || []} // Array: list of message objects
          // isTyping={false} // Boolean: is the recipient typing
          // hasInputField={false} // Boolean: use our input, or use your own
          // showSenderName={'who'} // show the name of the user who sent the message
          bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
          // JSON: Custom bubble styles
          bubbleStyles={{
            text: {
              fontFamily: 'Ycomputer-Regular',
              fontSize: 16,
              color: `${Colors.black[1]}`,
            },
            chatbubble: {
              borderRadius: 8,
              padding: 10,
              maxWidth: 200,
              width: 'fit-content',
              marginTop: 2,
              marginRight: 7,
              marginBottom: 1,
              marginLeft: 7,
              wordBreak: 'break-all',
              backgroundColor: `${Colors.pink[1]}`,
            },
            userBubble: {
              backgroundColor: `${Colors.skyblue[5]}`,
            },
          }}
        />
      </Wrapper>
    </>
  );
}
