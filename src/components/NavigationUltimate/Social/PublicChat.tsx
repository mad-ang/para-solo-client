import react from 'react';
import styled from 'styled-components';
import React, { useRef, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import CloseIcon from '@mui/icons-material/Close';
import 'emoji-mart/css/emoji-mart.css';
import ChatIcon from '@mui/icons-material/Chat';
import { Picker } from 'emoji-mart';
import phaserGame from '../../../PhaserGame';
import Game from '../../../scenes/Game';
import { getColorByString } from '../../../util';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { MessageType, setFocused } from '../../../stores/ChatStore';
import { ModalState, SetWhichModalActivated } from '../../../stores/NavbarStore';
import Colors from 'src/utils/Colors';
import { censor } from 'src/utils/censor';
const dateFormatter = new Intl.DateTimeFormat('en', {
  timeStyle: 'short',
  dateStyle: 'short',
});

function ShowUserCnt() {
  const userCntFromServer = useAppSelector((state) => state.room.userCnt);

  return (
    <div>
      <h3>대화창 (현재 마을에 {userCntFromServer} 명이 있어요)</h3>
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
            {chatMessage.author}:
            <span
              style={{
                color: 'black',
              }}
            >
              {chatMessage.content}
            </span>
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
      dispatch(SetWhichModalActivated(ModalState.None));
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

    const val = censor(inputValue.trim());
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
    <Backdrop className="PublicChat">
      <Wrapper className="wrapper777">
        <ChatHeader>
          <ShowUserCnt />
          <IconButton
            aria-label="close dialog"
            className="close"
            onClick={() => {
              dispatch(SetWhichModalActivated(ModalState.None));
            }}
            size="small"
          >
            <CloseIcon sx={{ color: `${Colors.skyblue[2]}` }} />
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
            <InsertEmoticonIcon sx={{ color: `${Colors.skyblue[2]}` }} />
          </IconButton>
        </InputWrapper>
      </Wrapper>
    </Backdrop>
  );
}

export default function PublicChat() {
  const dispatch = useAppDispatch();
  const ActivatedNav = useAppSelector((state) => state.nav.currentState);

  function handleClick() {
    if (ActivatedNav == ModalState.PublicChat) {
      dispatch(SetWhichModalActivated(ModalState.None));
    } else {
      dispatch(SetWhichModalActivated(ModalState.PublicChat));
    }
  }

  return (
    <div>
      <StyledRedBox
        pressed={ActivatedNav}
        onClick={() => {
          handleClick();
        }}
      >
        <ChatIcon sx={{ color: '#fff' }} fontSize="large" />
      </StyledRedBox>
      {ActivatedNav == ModalState.PublicChat ? <Chat /> : null}
    </div>
  );
}

/***** CSS *****/
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
const ChatHeader = styled.div`
  position: relative;
  height: 35px;
  background: ${Colors.skyblue[1]};
  border-radius: 10px 10px 0px 0px;

  h3 {
    color: ${Colors.black};
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
  background: white;
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
    background: ${Colors.skyblue[2]};
  }
`;
const InputWrapper = styled.form`
  border-radius: 0px 0px 10px 10px;
  display: flex;
  flex-direction: row;
  background: ${Colors.skyblue[1]};
`;
const InputTextField = styled(InputBase)`
  border-radius: 0px 0px 10px 10px;
  input {
    padding: 5px;
    color: ${Colors.black};
  }
`;
const EmojiPickerWrapper = styled.div`
  position: absolute;
  bottom: 54px;
  right: 16px;
`;
const StyledRedBox = styled.button<{ pressed: ModalState }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 30%;
  background-color: ${(props) =>
    props.pressed == ModalState.PublicChat ? Colors.skyblue[1] : Colors.indigo};
  font-size: 1rem;
  font-weight: 900;

  &:hover {
    background-color: ${Colors.skyblue[1]};
  }
`;
