import React, { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { MessageType, setFocused, setShowChat, chatSlice } from 'src/stores/ChatStore';

import styled from 'styled-components';
import { Message } from 'react-chat-ui';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import SendIcon from '@mui/icons-material/Send';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import DirectionsIcon from '@mui/icons-material/Directions';
import InputAdornment from '@mui/material/InputAdornment';
import { useAppDispatch, useAppSelector } from 'src/hooks';
const Bottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  background: #bdddfc;
  height: 60px;
  width: 360px;
  border-radius: 25px;
`;

const DMsearch = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #bdddfc;
  height: 60px;
  padding: 0px 15px 0px 15px;
  font-size: 28px;
  font-weight: bold;
`;
const DMsearchDiv = styled.div`
  font-size: 0.7em;
  height: 40px;
  background: #ebebeb;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
`;

const InputWrapper = styled.form`
  box-shadow: 10px 10px 10px #00000018;
  border: 1px solid #42eacb;
  border-radius: 0px 0px 10px 10px;
  display: flex;
  flex-direction: row;
  background: linear-gradient(180deg, #000000c1, #242424c0);
`;

export default function BottomAppBar(props) {
  const [inputValue, setInputValue] = useState('');
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const directMessages = useAppSelector((state) => state.dm.directMessages);
  const showDM = useAppSelector((state) => state.dm.showDM);
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
      {/* <button onClick={handleSubmit}> 보내기</button> */}
      <TextField
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
        // defaultValue={value}
        value={value}
        fullWidth
        margin="dense"
        // id="fullWidth"
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

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   // this is added because without this, 2 things happen at the same
  //   // time when Enter is pressed, (1) the inputRef gets focus (from
  //   // useEffect) and (2) the form gets submitted (right after the input
  //   // gets focused)
  //   if (!readyToSubmit) {
  //     setReadyToSubmit(true);
  //     return;
  //   }
  //   // move focus back to the game
  //   inputRef.current?.blur();

  //   const val = inputValue.trim();
  //   setInputValue('');
  //   if (val) {
  //   }
  // };

  // return (
  //   <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
  //     <InputWrapper onSubmit={handleSubmit}>
  //       {/* <IconButton sx={{ p: '10px' }} aria-label="menu">
  //         <MenuIcon />
  //       </IconButton> */}

  //       <TextField
  //         fullWidth
  //         margin="dense"
  //         // id="fullWidth"
  //         id="outlined-multiline-static"
  //         label="메세지 보내기"
  //         // placeholder="메세지 보내기"
  //         multiline
  //         rows={1}
  //         InputProps={{
  //           endAdornment: (
  //             <InputAdornment position="end">
  //               <IconButton
  //                 color="primary"
  //                 sx={{ p: '10px' }}
  //                 // aria-label="toggle password visibility"
  //                   onClick={()=>{
  //                     setNewMessage()
  //                   }}
  //                 edge="end"
  //               >
  //                 <SendIcon />
  //               </IconButton>
  //             </InputAdornment>
  //           ),
  //         }}
  //       />
  //     </InputWrapper>
  //   </AppBar>
  // );
}
