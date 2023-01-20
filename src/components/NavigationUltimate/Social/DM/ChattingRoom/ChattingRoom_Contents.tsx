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

const Wrapper = styled.div`
  height: 460px;
  width: 370px;
`;

export default function ChatBubbles(props) {
  const game = phaserGame.scene.keys.game as Game;
  // 기존 메세지 리스트 -> 삭제 예정
  const [messageList, setMessageList] = useState<any>([]);

  // 채팅 시작 시 저장되어 있던 채팅 리스트 보여줌
  const roomId = useAppSelector((state) => state.dm.roomId);
  const friendId = useAppSelector((state) => state.dm.friendId);
  const userId = useAppSelector((state) => state.user.userId);

  useEffect(() => {
    const socketClient = game.networt2.getSocket();
    console.log('방 입장');
    console.log('소켓', socketClient);
    console.log('룸아이디', roomId);

    socketClient.emit('join-room', { roomId: roomId, userId: userId, friendId: friendId });

    socketClient.on('show-messages', (data) => {
      console.log('메세지를 보여줘');

      data.forEach((element) => {
        if (element.senderId) {
          if (element.senderId === userId) {
            element.id = 0;
          } else {
            element.id = 1;
          }
          setMessageList((messageList) => [...messageList, element]);
        }
      });
    });

    socketClient.on('message', (data) => {
      data.id = 1;
    });
  }, []);
  // 실시간 메세지 받으면 채팅 리스트에 추가

  // 내가 쓴 메세지 채팅 리스트에 추가
  useEffect(() => {
    if (!props.newMessage || props.newMessage.length === 0) return;

    const body = {
      // id : 0,
      roomId: roomId,
      userId: userId,
      friendId: friendId,
      message: props.newMessage.message,
    };

    setMessageList((messageList) => [...messageList, props.newMessage]);
    game.networt2.sendMessage(body);
  }, [props.newMessage]);
  // 내가 쓴 메세지 서버에 전송

  return (
    <>
      <Wrapper>
        <ChatFeed
          maxHeight={460}
          messages={messageList} // Array: list of message objects
          // isTyping={false} // Boolean: is the recipient typing
          // hasInputField={false} // Boolean: use our input, or use your own
          // showSenderName={'who'} // show the name of the user who sent the message
          bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
          // JSON: Custom bubble styles
          bubbleStyles={{
            text: {
              fontFamily: 'Ycomputer-Regular',
              fontSize: 16,
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
            },
            userBubble: {},
          }}
        />
      </Wrapper>
    </>
  );
}
