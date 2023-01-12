// import { HashRouter } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
// import BasicStack from './CRStack';
import ButtonAppBar from './ChattingRoom_Header';
import BottomAppBar from './ChattingRoom_Bottom';
// import ChattingRoomContents from './CRContents';
import ChatBubbles from './ChattingRoom_Contents';
import React, { useRef, useState, useEffect } from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { setShowDM } from 'src/stores/DMboxStore';

const Wrapper = styled.div`
  position: fixed;
  bottom: 100px;
  left: 0px;
  background: white;
  gap: 10px;
  bottom: 60px;
  height: 680px;
  width: 370px;
  border-radius: 25px;
  box-shadow: 20px 0px 10px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
`;

export function InsideChattingRoom() {
  const [inputValue, setInputValue] = useState('');
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const directMessages = useAppSelector((state) => state.dm.directMessages);
  const showDM = useAppSelector((state) => state.dm.showDM);
  const dispatch = useAppDispatch();
  const [newMessage, setNewMessage] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      dispatch(setShowDM(false));
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [directMessages, showDM]);

  return (
    <Wrapper>
      <ButtonAppBar />
      {/* <BasicStack /> */}
      {/* <ChattingRoomContents /> */}
      <ChatBubbles newMessage={newMessage} />
      <BottomAppBar setNewMessage={setNewMessage} />
    </Wrapper>
  );
}
