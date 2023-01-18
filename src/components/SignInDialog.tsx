import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import { useAppSelector, useAppDispatch } from '../hooks';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@mui/material/Button';
import axios from 'axios';
import {
  ENTERING_PROCESS,
  setEnteringProcess,
  setAccessToken,
  setUserId as setStoreUserId,
} from '../stores/UserStore';

import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import phaserGame from '../PhaserGame';
import Game from 'src/scenes/Game';

import Bootstrap from '../scenes/Bootstrap';
import { constants } from 'buffer';
import { login } from 'src/api/auth';

const Wrapper = styled.form`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #222639;
  border-radius: 16px;
  padding: 36px 60px;
  box-shadow: 0px 0px 5px #0000006f;
`;

const Title = styled.h3`
  margin: 5px;
  text-align: center;
  font-size: 24px;
  color: #eee;
`;
const Content = styled.div`
  display: flex;
  gap: 20px;
  margin: 20px 0;
  align-items: center;
  justify-content: center;
`;

function SignedUpToast() {
  return (
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
}

export default function SignInDialog() {
  const enteringProcess = useAppSelector((state) => state.user.enteringProcess);

  // useEffect(() => {
  //   dispatch(setSignedUp(false));
  // }, []);

  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [pwFieldEmpty, setPwFieldEmpty] = useState<boolean>(false);
  const [userIdFieldEmpty, setUserIdFieldEmpty] = useState<boolean>(false);
  const [userIdFieldWrong, setUserIdFieldWrong] = useState<boolean>(false);
  const [pwFieldWrong, setPwFieldWrong] = useState<boolean>(false);
  const [failLogin, setFailLogin] = useState<boolean>(false);
  const game = phaserGame.scene.keys.game as Game;
  const goToEntry = (event) => {
    event.preventDefault();
    dispatch(setEnteringProcess(ENTERING_PROCESS.ENTRY));
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();

    setUserIdFieldEmpty(false);
    setUserIdFieldWrong(false);
    setPwFieldEmpty(false);
    setPwFieldWrong(false);

    console.log(userId);

    if (userId === '' || password === '') {
      if (userId === '') setUserIdFieldEmpty(true);
      if (password === '') setPwFieldEmpty(true);
    } else {
      const body = {
        userId: userId,
        password: password,
      };

      // login(body, (accessToken) => {
      //   dispatch(setAccessToken(accessToken));
      //   dispatch(setStoreUserId(userId));
      // });

      setFailLogin(
        !login(body, (accessToken) => {
          dispatch(setAccessToken(accessToken));
          dispatch(setStoreUserId(userId));
        })
      );

      console.log('failLogin', failLogin);

      // console.log('temp', temp);
      // if (
      //   !login(body, (accessToken) => {
      //     dispatch(setAccessToken(accessToken));
      //     dispatch(setStoreUserId(userId));
      //   })
      // ) {
      //   console.log('로그인 실패');

      // }
    }
  };
  return (
    <>
      {/* {signedUp === true
        ? toast('회원가입이 완료되었어요! 로그인해주세요', {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          })
        : null} */}

      {/* <ToastContainer /> */}

      <Wrapper>
        <Title>로그인</Title>
        <TextField
          autoFocus
          fullWidth
          label="아이디"
          variant="outlined"
          color="secondary"
          margin="normal"
          error={userIdFieldEmpty}
          inputProps={{ maxLength: 20 }}
          helperText={
            userIdFieldEmpty && '아이디가 필요해요'
            // || (failLogin && '회원정보가 잘못되었습니다')
          }
          value={userId}
          onInput={(e) => {
            setUserId((e.target as HTMLInputElement).value?.trim());
          }}
        />
        <TextField
          fullWidth
          label="비밀번호"
          variant="outlined"
          color="secondary"
          margin="normal"
          error={pwFieldEmpty}
          helperText={
            pwFieldEmpty && '비밀번호가 필요해요'
            // || (failLogin && '회원정보가 잘못되었습니다')
          }
          onInput={(e) => {
            setPassword((e.target as HTMLInputElement).value);
          }}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Content>
          <Button variant="contained" color="secondary" onClick={onSubmitHandler}>
            로그인 완료
          </Button>

          <Button variant="contained" color="secondary" onClick={goToEntry} sx={{ mx: 2 }}>
            뒤로 가기
          </Button>
        </Content>
      </Wrapper>
    </>
  );
}
