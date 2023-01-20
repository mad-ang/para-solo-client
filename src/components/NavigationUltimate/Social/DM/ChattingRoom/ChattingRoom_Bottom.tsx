import React, { useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import { setFocused } from 'src/stores/ChatStore';
import { Message } from 'react-chat-ui';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import InputAdornment from '@mui/material/InputAdornment';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { io, Socket } from 'socket.io-client';
import { ServerToClientEvents, ClientToServerEvents } from 'src/api/chat';
import styled from 'styled-components';
import Colors from 'src/utils/Colors';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();

export default function BottomAppBar(props) {
  const [inputValue, setInputValue] = useState('');
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const defaultInput = useRef<HTMLInputElement>(null);
  const { setNewMessage } = props;
  const focused = useAppSelector((state) => state.chat.focused);

  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const Rvalue = value.trim()
    if (Rvalue === '') {
      
      setValue('');
      return;}
      console.log('보냄');
    const newMessage = new Message({
      id: 0,
      message: Rvalue,
    });
    setNewMessage(newMessage);

    setValue('');
  };

  const handleOnKeyDown = (e) => {
    if (e.keyCode == 13) {
      handleSubmit(e);
    }
  };

  return (
   <DMbottom>

{/* <Input placeholder="메세지 보내기"  onKeyDown={handleOnKeyDown} onChange={(event) => {
          setValue(event.target.value);
        }}/> */}


      <TextField
        onFocus={() => {
          if (!focused) {
            dispatch(setFocused(true));
          }
        }}
        onBlur={() => {
          dispatch(setFocused(false));
        }}
        
        value={value}
        fullWidth
        margin="dense"
        id="outlined-multiline-static"
        label="메세지 보내기"
        multiline
        maxRows={2}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        onKeyDown={handleOnKeyDown}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton color="primary" sx={{ p: '10px' }} onClick={handleSubmit} edge="end">
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        />
  
        </DMbottom>
  );
}

// const Input = styled.input.attrs(props => ({
//   type: "text",
//   size: props.size || "1em",
// }))`
//   border: 2px solid palevioletred;
//   margin: 0.5em;
//   padding: 0.5em 1em 0.5em 1em;

//     fontFamily: 'Ycomputer-Regular',

//   multiline: true;
//   maxRows: 2;
//   width: 100%;
//   background: transparent;


// `;



const DirtyTalk = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const DMbottom = styled.div`
  background: ${Colors.skyblue[1]};

  font-size: 28px;
  font-weight: bold;
  display: flex;
  height: 70px;
  flex-direction: row;
  alsign-items: center;
  justify-content: space-between;
  
`;

const ButtonWrapper = styled.button`
  background: none;
  border: none;
`;

const TitleImage = styled.img`
  margin-left: 3px;
  margin-right: 13px;
  width: 28px;
`;

const TitleText = styled.div`
  font-size: 23px;
`;
