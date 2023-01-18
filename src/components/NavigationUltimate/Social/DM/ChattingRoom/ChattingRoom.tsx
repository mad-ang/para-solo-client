import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import HeadAppBar from './ChattingRoom_Header';
import BottomAppBar from './ChattingRoom_Bottom';
import ChatBubbles from './ChattingRoom_Contents';
import React, { useRef, useState, useEffect } from 'react';
import 'emoji-mart/css/emoji-mart.css';
import { setShowDM } from 'src/stores/DMboxStore';
import Game from 'src/scenes/Game';
import phaserGame from 'src/PhaserGame';
import io from 'socket.io-client';
import axios from 'axios';

const socketUrl =
  process.env.NODE_ENV === 'production' || import.meta.env.VITE_SERVER === 'PRO'
    ? `https://${import.meta.env.VITE_SERVER_URL}`
    : `http://${window.location.hostname}:5002`;

const Wrapper = styled.div`
  position: fixed;
  bottom: 100px;
  left: 0px;
  background: white;
  gap: 10px;
  bottom: 60px;
  height: 580px;
  width: 370px;
  border-radius: 25px;
  box-shadow: 20px 0px 10px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
`;

export function InsideChattingRoom() {
  const game = phaserGame.scene.keys.game as Game;
  // export const InsideChattingRoom = async (event) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const directMessages = useAppSelector((state) => state.dm.directMessages);
  const showDM = useAppSelector((state) => state.dm.showDM);
  const dispatch = useAppDispatch();
  const [newMessage, setNewMessage] = useState<any>(null);
  const [value, setValue] = useState('안녀녀녀녕a');
  // const [roomId, setRoomId] = useState('');
  let roomId = '';
  const socketClient = game.networt2.getSocket();
  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(event.target.value);
  // };

  // const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (event.key === 'Escape') {
  //     dispatch(setShowDM(false));
  //   }
  // };

  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  // };

  const userId = useAppSelector((state) => state.user.userId);
  const friendId = useAppSelector((state) => state.dm.friendId);

  // useEffect(() => {
  //   scrollToBottom();
  // }, [directMessages, showDM]);

  // const socketClient = io(`${socketUrl}`);
  // socketClient.on('connect', () => {
  //   console.log('connected to socket server');
  //   //1. 일단 보낸다
  //   socketClient.emit('create-room', value);
  //   //2. roomID를 서버에서 준다.
  //   socketClient.emit('join-room', userID, friendID);
  // });

  // //3. 메시지를 보내본다(테스트)
  // socketClient.emit('chatId', 'senderId');
  // socketClient.emit('message', 'this is message!');
  // //4. 메시지를 받아본다(테스트)
  // socketClient.on('message', (data) => {
  //   console.log(data);
  // });

  return (
    <Wrapper>
      <HeadAppBar />
      <ChatBubbles newMessage={newMessage} />
      <BottomAppBar setNewMessage={setNewMessage} />
    </Wrapper>
  );
}
