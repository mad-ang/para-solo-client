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
    console.log('보냄');
    if (value === '') return;

    const newMessage = new Message({
      id: 0,
      message: value,
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
    <AppBar position="relative" color="primary" sx={{ bottom: 0 }}>
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
    </AppBar>
  );
}
