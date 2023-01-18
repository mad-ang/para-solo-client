import react from 'react';
import styled from 'styled-components';
import React, { useRef, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CloseIcon from '@mui/icons-material/Close';
import 'emoji-mart/css/emoji-mart.css';
import ChatIcon from '@mui/icons-material/Chat';
import { Picker } from 'emoji-mart';
import phaserGame from '../../../PhaserGame';
import Game from '../../../scenes/Game';

import { getColorByString } from '../../../util';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { MessageType, setFocused, setShowChat, chatSlice } from '../../../stores/ChatStore';
import { roomSlice } from '../../../stores/RoomStore';
import { SetPublicChatActivated, SetPublicChatActivateOnly } from '../../../stores/NavbarStore';
import Colors from 'src/utils/Colors';

const Backdrop = styled.div`
  position: fixed;
  bottom: 60px;
  left: 0px;
  height: 400px;
  width: 370px;
  max-height: 50%;
  max-width: 50%;
`;
const Wrapper = styled.div`
  height: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
`;
const FabWrapper = styled.div`
  margin-top: auto;
`;
const ChatHeader = styled.div`
  position: relative;
  height: 35px;
  background: #000000a7;
  border-radius: 10px 10px 0px 0px;

  h3 {
    color: #fff;
    margin: 7px;
    font-size: 17px;
    text-align: center;
  }

  .close {
    position: absolute;
    top: 0;
    right: 0;
  }
`;
const ChatBox = styled(Box)`
  height: 100%;
  width: 100%;
  overflow: auto;
  background: #2c2c2c;
  border: 1px solid #00000029;
`;
const MessageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0px 2px;

  p {
    margin: 3px;
    text-shadow: 0.3px 0.3px black;
    font-size: 15px;
    font-weight: bold;
    line-height: 1.4;
    overflow-wrap: anywhere;
  }

  span {
    color: white;
    font-weight: normal;
  }

  .notification {
    color: grey;
    font-weight: normal;
  }

  :hover {
    background: #3a3a3a;
  }
`;
const InputWrapper = styled.form`
  border: 1px solid #42eacb;
  border-radius: 0px 0px 10px 10px;
  display: flex;
  flex-direction: row;
  background: linear-gradient(180deg, #000000c1, #242424c0);
`;
const InputTextField = styled(InputBase)`
  border-radius: 0px 0px 10px 10px;
  input {
    padding: 5px;
  }
`;
const EmojiPickerWrapper = styled.div`
  position: absolute;
  bottom: 54px;
  right: 16px;
`;
const StyledRedBox = styled.button<{pressed:boolean}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 30%;
  background-color: ${(props) => (props.pressed ? Colors.skyblue[1] : Colors.indigo)};
  font-size: 1rem;
  font-weight: 900;

  &:hover {
    background-color: ${Colors.skyblue[1]};
  }
`;

const dateFormatter = new Intl.DateTimeFormat('en', {
  timeStyle: 'short',
  dateStyle: 'short',
});

function Showusercnt() {
  const userCnt_fromserver = useAppSelector((state) => state.room.userCnt);

  return (
    <div>
      <h3>대화창 (현재 마을에 {userCnt_fromserver} 명이 있어요)</h3>
    </div>
  );
}

const Message = ({ chatMessage, messageType }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <MessageWrapper
      onMouseEnter={() => {
        setTooltipOpen(true);
      }}
      onMouseLeave={() => {
        setTooltipOpen(false);
      }}
    >
      <Tooltip
        open={tooltipOpen}
        title={dateFormatter.format(chatMessage.createdAt)}
        placement="right"
        arrow
      >
        {messageType === MessageType.REGULAR_MESSAGE ? (
          <p
            style={{
              color: getColorByString(chatMessage.author),
            }}
          >
            {chatMessage.author}: <span>{chatMessage.content}</span>
          </p>
        ) : (
          <p className="notification">
            {chatMessage.author} {chatMessage.content}
          </p>
        )}
      </Tooltip>
    </MessageWrapper>
  );
};

function Chat() {
  const [inputValue, setInputValue] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatMessages = useAppSelector((state) => state.chat.chatMessages);
  const focused = useAppSelector((state) => state.chat.focused);
  const showChat = useAppSelector((state) => state.chat.showChat);
  const dispatch = useAppDispatch();
  const game = phaserGame.scene.keys.game as Game;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      // move focus back to the game
      inputRef.current?.blur();
      dispatch(setShowChat(false));
      dispatch(SetPublicChatActivated(false));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // this is added because without this, 2 things happen at the same
    // time when Enter is pressed, (1) the inputRef gets focus (from
    // useEffect) and (2) the form gets submitted (right after the input
    // gets focused)
    if (!readyToSubmit) {
      setReadyToSubmit(true);
      return;
    }
    // move focus back to the game
    inputRef.current?.blur();

    const val = inputValue.trim();
    setInputValue('');
    if (val) {
      game.network.addChatMessage(val);
      game.myPlayer.updateDialogBubble(val);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (focused) {
      inputRef.current?.focus();
    }
  }, [focused]);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, showChat]);

  return (
    <Backdrop className = "PublicChat">
      <Wrapper className="wrapper777">
        <ChatHeader>
          <Showusercnt />
          <IconButton
            aria-label="close dialog"
            className="close"
            onClick={() => {
              dispatch(SetPublicChatActivated(false));
              dispatch(setShowChat(false));
            }}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </ChatHeader>
        <ChatBox>
          {chatMessages.map(({ messageType, chatMessage }, index) => (
            <Message chatMessage={chatMessage} messageType={messageType} key={index} />
          ))}
          <div ref={messagesEndRef} />
          {showEmojiPicker && (
            <EmojiPickerWrapper>
              <Picker
                theme="dark"
                showSkinTones={false}
                showPreview={false}
                onSelect={(emoji) => {
                  setInputValue(inputValue + emoji.native);
                  setShowEmojiPicker(!showEmojiPicker);
                  dispatch(setFocused(true));
                }}
                exclude={['recent', 'flags']}
              />
            </EmojiPickerWrapper>
          )}
        </ChatBox>
        <InputWrapper onSubmit={handleSubmit}>
          <InputTextField
            inputRef={inputRef}
            autoFocus={focused}
            fullWidth
            placeholder="대화를 입력해주세요"
            value={inputValue}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            onFocus={() => {
              if (!focused) {
                dispatch(setFocused(true));
                setReadyToSubmit(true);
              }
            }}
            onBlur={() => {
              dispatch(setFocused(false));
              setReadyToSubmit(false);
            }}
          />
          <IconButton aria-label="emoji" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
            <InsertEmoticonIcon />
          </IconButton>
        </InputWrapper>
      </Wrapper>
    </Backdrop>
  );
}

export default function PublicChat() {
  const dispatch = useAppDispatch();
  const NavControllerPublicChatActivated = useAppSelector(
    (state) => state.nav.NavControllerPublicChatActivated
  );
  
  function handleClick() {
    if (NavControllerPublicChatActivated){
      dispatch(SetPublicChatActivated(false));
    }
    else{
      dispatch(SetPublicChatActivateOnly());
    }
  }

  return (
    <div>
      <StyledRedBox pressed={NavControllerPublicChatActivated}
        onClick={() => {
          handleClick();
        }}
      >
        <ChatIcon sx={{ color: '#fff' }} fontSize="large" />
      </StyledRedBox>
      {NavControllerPublicChatActivated ? <Chat /> : null}
    </div>
  );
}
