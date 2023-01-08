import React, { useState } from 'react'
import styled from 'styled-components'
import TextField from '@mui/material/TextField'

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
const Content = styled.div`
  display: flex;
  margin: 36px 0;

`
export default function SignInDialog() {
    return (
        <Wrapper>
            <Title>로그인</Title>
            <TextField
            autoFocus
            fullWidth
            label="아이디"
            variant="outlined"
            color="secondary"
            margin = "normal"
            // error={nameFieldEmpty}
            // helperText={nameFieldEmpty && '아이디가 필요해요'}
            // onInput={(e) => {
            //   setName((e.target as HTMLInputElement).value)
            // }}
          />
          <TextField
            autoFocus
            fullWidth
            label="비밀번호"
            variant="outlined"
            color="secondary"
            margin = "normal"
            // error={nameFieldEmpty}
            // helperText={nameFieldEmpty && '비밀번호가 필요해요'}
            // onInput={(e) => {
            //   setName((e.target as HTMLInputElement).value)
            // }}
          />
        </Wrapper>
    )
}