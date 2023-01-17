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

const socketHost = 'http://localhost';
const socketPort = '5002';


const Wrapper = styled.div`
height: 460px;
width: 370px;
`;

export default function ChatBubbles(props) {
  const game = phaserGame.scene.keys.game as Game;
  // 기존 메세지 리스트 -> 삭제 예정
  const [messageList, setMessageList] = useState([Message
   // Gray bubble
    // new Message({ id: 0, message: "I'm you -- the blue bubble!" }), // Blue bubble
    // new Message({
    //   id: 1,
    //   message: "I'm the recipient! (The person you're talking to)",
    // }), // Gray bubble
    // new Message({
    //   id: 1,
    //   message: "I'm the recipient! (The person you're talking to)",
    // }), // Gray bubble
  ]);

  // socketClient.on('connect', () => {
  //   console.log('connected to socket server');
  // });

  // socketClient.emit('test', '안녕하세요');

  // const socketClient = io(`${socketHost}:${socketPort}`);
  
  // 채팅 시작 시 저장되어 있던 채팅 리스트 보여줌
  const roomId = useAppSelector((state) => state.dm.roomId);
  const friendId = useAppSelector((state) => state.dm.friendId);
  const userId = useAppSelector((state) => state.user.userId);
  useEffect(() => {
    const socketClient = game.networt2.getSocket();
    console.log('방 입장');
    console.log('소켓', socketClient);

    
      console.log('connected to socket server-room', roomId);
      socketClient.emit('join-room', { roomId: roomId, userId: userId, friendId: friendId });
      // socketClient.emit('show-messages', { roomId: roomId , userId: userId, friendId: friendId });
      socketClient.on('show-messages', (data) => {
        console.log('데이터좀 보여주세요!!!', data);
        data.forEach((element) => {
          // console.log('받음2', element.content);s
          if (element.senderId) {
            if (element.senderId === userId) {
              console.log('check');

              element.id = 0;
            } else {
              element.id = 1;
            }
            setMessageList((messageList) => [...messageList, element]);
          }
        });
      });
      socketClient.on('message', (data) => {
        console.log('받음', data);
        data.id = 1;
        setMessageList((messageList) => [...messageList, data]);
      });
    }, []);
    // 실시간 메세지 받으면 채팅 리스트에 추가
    
  // 내가 쓴 메세지 채팅 리스트에 추가
  useEffect(() => {
    console.log('props.newMessage', props.newMessage);
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
              fontSize: 20,
            },
            chatbubble: {
              borderRadius: 25,
              padding: 15,
              maxWidth: 200,
              width: 'fit-content',
              marginTop: 1,
              marginRight: 'auto',
              marginBottom: 1,
              marginLeft: 'auto',
              wordBreak: 'break-all',
            },
            userBubble: {},
          }}
        />
      </Wrapper>
    </>
  );
}
