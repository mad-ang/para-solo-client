import React, { useState } from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useAppDispatch } from '../hooks';
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
import Bootstrap from '../scenes/Bootstrap';
import { login } from 'src/api/auth';
import { AlertToast } from './ToastNotification';
import { isCensored } from 'src/utils/censor';

export default function SignUpDialog() {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [pwErrorMsg, setPwErrorMsg] = useState<string>('');
  const [userIdErrorMsg, setUserIdErrorMsg] = useState<string>('');

  const [failSignup, setFailSignup] = useState<boolean>(false);
  const [failMessage, setFailMessage] = useState<string>('회원가입에 실패했습니다');
  // const onUserIdHandler = (event) => {
  //   setUserId(event.currentTarget.value);
  // }

  // const onPasswordHandler = (event) => {
  //       setPassword(event.currentTarget.value);
  // }

  const goToEntry = (event) => {
    event.preventDefault();
    dispatch(setEnteringProcess(ENTERING_PROCESS.ENTRY));
  };

  const handleSubmit = async (): Promise<boolean> => {
    setFailSignup(false);

    try {
      if (!userId || userId.length === 0) {
        setUserIdErrorMsg('아이디가 필요해요');
        return false;
      }

      if (!password || password.length === 0) {
        setPwErrorMsg('비밀번호가 필요해요');
        return false;
      }

      if (isCensored(userId)) {
        setUserIdErrorMsg('적절하지 않은 문자가 포함되어 있습니다');
        return false;
      }
      const body = {
        userId: userId,
        password: password,
      };
      // try {
      const signUpResponse = await axios.post('/auth/signup', body);
      if (signUpResponse.data.status === 200) {
        const data = await login(body);
        if (data.status == 200) {
          const { payload } = data;
          const token = payload.accessToken;
          if (token) {
            dispatch(setAccessToken(token));
          }

          const bootstrap = phaserGame.scene.keys.bootstrap as Bootstrap;
          bootstrap.network
            .joinOrCreatePublic()
            .then(() => bootstrap.launchGame())
            .catch((error) => console.error(error));
          bootstrap.network2.whoAmI(payload.userId);
          dispatch(setStoreUserId(payload.userId));
          return true;
        } else {
          setFailSignup(true);
          return false;
        }
      }
    } catch (error: any) {
      setFailSignup(true);
      if (error?.response?.status === 409) {
        setFailMessage('이미 존재하는 회원입니다');
      }
    }
    return false;
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setUserIdErrorMsg('');
    setPwErrorMsg('');

    handleSubmit();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <>
      {failSignup && <AlertToast text={failMessage} />}
      <Wrapper>
        <Title>회원가입</Title>
        <TextField
          autoFocus
          fullWidth
          label="아이디"
          variant="outlined"
          color="secondary"
          margin="normal"
          error={!!userIdErrorMsg}
          helperText={userIdErrorMsg}
          inputProps={{ maxLength: 20 }}
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
          error={!!pwErrorMsg}
          helperText={pwErrorMsg}
          onInput={(e) => {
            setPassword((e.target as HTMLInputElement).value);
          }}
          onKeyDown={handleKeyDown}
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
          <EntryButton
            variant="contained"
            color="secondary"
            onClick={onSubmitHandler}
            sx={{ mx: 2 }}
          >
            회원가입 완료
          </EntryButton>
          <EntryButton variant="contained" color="secondary" onClick={goToEntry} sx={{ mx: 2 }}>
            뒤로 가기
          </EntryButton>
        </Content>
      </Wrapper>
    </>
  );
}

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

const EntryButton = styled(Button)`
  width: 120px;
`;
