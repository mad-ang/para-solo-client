import React, { useState } from 'react'
import styled from 'styled-components'
import TextField from '@mui/material/TextField'
import Button from "@mui/material/Button";
import axios from 'axios'
import { useAppDispatch } from '../hooks'; 

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
// interface User {
//   id: string;
//   password: string;
// }

// const [user, setUser] = useState<User>({ id: "", password: ""});
// const handleChangeUser = (e:React.ChangeEvent<HTMLInputElement) => {
//   const {name, value} = e.target;
//   setUser({...user, [name]: value});
// }


export default function SignUpDialog() {

  const dispatch = useAppDispatch();


  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  
  const onUserIdHandler = (event) => {
        setUserId(event.currentTarget.value);
  }
  
  const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
  }
    
  const onSubmitHandler = (event) => {
      event.preventDefault();

  let body = {
          userId: userId,
          password: password,
  }

  console.log({userId})
  console.log({password})

  axios.post("http://localhost:2567/auth/signup", body)
  .then((response) => {response.data;});
  // dispatch(registerUser(body))
  //       .then(response => {
  //           if(response.payload.success){
  //               props.history.push('/loginPage')
  //           } else {
  //               alert('Error')
  //           }
  //       })
  //   }
  };

    return (
        <Wrapper>
            <Title>회원가입</Title>
            <TextField
            autoFocus
            fullWidth
            label="아이디"
            variant="outlined"
            color="secondary"
            margin = "normal"
            // error={nameFieldEmpty}
            // helperText={nameFieldEmpty && '이름이 필요해요'}
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
            // error={nameFieldEmpty}
            // helperText={nameFieldEmpty && '이름이 필요해요'}
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
        
    )
}