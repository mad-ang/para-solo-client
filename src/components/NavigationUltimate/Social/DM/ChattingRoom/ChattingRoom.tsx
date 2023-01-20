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
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const directMessages = useAppSelector((state) => state.dm.directMessages);
  const showDM = useAppSelector((state) => state.dm.showDM);
  const dispatch = useAppDispatch();
  const [newMessage, setNewMessage] = useState<any>(null);
  let roomId = '';
  const socketClient = game.networt2.getSocket();
  const userId = useAppSelector((state) => state.user.userId);
  const friendId = useAppSelector((state) => state.dm.friendId);


  return (
    <Wrapper>
      <HeadAppBar />
      <ChatBubbles newMessage={newMessage} />
      <BottomAppBar setNewMessage={setNewMessage} />
    </Wrapper>
  );
}
