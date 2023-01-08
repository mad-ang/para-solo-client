import React, { useState } from 'react'
import styled from 'styled-components'
import TextField from '@mui/material/TextField'
import Button from "@mui/material/Button";
import axios from 'axios'
import { useAppSelector, useAppDispatch } from '../hooks'; 
import { setSignUp, setSignIn } from '../stores/UserStore'
import { Alert, AlertTitle } from '@mui/material';
import { Warning } from '@mui/icons-material';
import { css, keyframes } from 'styled-components';


const Wrapper = styled.form`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #222639;
  border-radius: 16px;
  padding: 36px 60px;
  box-shadow: 0px 0px 5px #0000006f;
`

const Title = styled.h3`
  margin: 5px;
  text-align: center;
  font-size: 24px;
  color: #eee;
`


export default function SignUpDialog() {

  const dispatch = useAppDispatch();


  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [userIdFieldEmpty, setUserIdFieldEmpty] = useState<boolean>(false)
  const [userIdFieldWrong, setUserIdFieldWrong] = useState<boolean>(false)
  const [pwFieldEmpty, setPwFieldEmpty] = useState<boolean>(false)

  const onUserIdHandler = (event) => {
        setUserId(event.currentTarget.value);
  }
  
  const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
  }
    
  const onSubmitHandler = (event) => {
      event.preventDefault();

    console.log(userId);
    console.log(userIdFieldEmpty);
      if (userId === '') {
        setUserIdFieldEmpty(true)
      } 
      if (password === '') {
        setPwFieldEmpty(true)
      }
      else  {
        



  let body = {
          userId: userId,
          password: password,
  }

  console.log({userId})
  console.log({password})


    axios.post("/auth/signup", body)

  .then(function (response) {
       // response  
       response.data;
       console.log("hellow", response);
       if(response.data.status == 200){
         
        dispatch(setSignUp(false));
            dispatch(setSignIn(true));
                    
                } else {
                    console.log('11111');
            
      }

  }).catch(function (error) {
      // 오류발생시 실행
      setUserIdFieldWrong(true);
      console.log("hi",error.message);
      if(error.message == "Request failed with status code 409"){
      console.log('22222');
     }
      else {
        console.log('444444');
      }
  }).then(function() {
      // 항상 실행
      console.log('333333');
  });

      }


  };

    return (
      <>
        <Wrapper>
            <Title>회원가입</Title>
            <TextField
            autoFocus
            fullWidth
            label="아이디"
            variant="outlined"
            color="secondary"
            margin = "normal"
            error={userIdFieldEmpty || userIdFieldWrong}
            helperText={(userIdFieldEmpty && '이름이 필요해요') || (userIdFieldWrong && '이미 존재하는 아이디입니다.')}
            onInput={(e) => {
              setUserId((e.target as HTMLInputElement).value)
             }}
          />
          <TextField
            autoFocus
            fullWidth
            label="비밀번호"
            variant="outlined"
            color="secondary"
            margin = "normal"
            error={pwFieldEmpty}
            helperText={pwFieldEmpty && '비밀번호가 필요해요'}
            onInput={(e) => {
              setPassword((e.target as HTMLInputElement).value)
            }}
          />
          <Button
                  variant="contained"
                  color="secondary"
                  onClick={onSubmitHandler}
                >
                  회원가입 완료
                </Button>
        
        </Wrapper>
        </>
        
    )
}