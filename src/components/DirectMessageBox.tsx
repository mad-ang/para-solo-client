import React, { useState } from 'react';
import styled, {keyframes} from "styled-components";


const Wrapper = styled.div`
    position: fixed;
    top: 10%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const ToastBox = styled.div`
    gap: 10px;
    bottom: 60px;
    height: 200px;
    width: 500px;   
  `
    
const WelcomeMsg = styled.div`
    background : #FFFFFF; 
    border-radius : 16px;
    padding: 15px 35px 15px 15px;
    font-size: 28px;
    display: flex;
    align-items: center;
    text-align: center;
    font-weight: bold;
    justify-content: center;
    text-align: center;
    `


export default function DMbox() {

    const [showMessage, setShowMessage] = useState(false);
  
    function handleClick() {
      setShowMessage(true);
    }
  
    return (
        <Wrapper>
            <ToastBox>
                <WelcomeMsg>
                    <p>나는 DM이다</p>
                </WelcomeMsg>
            </ToastBox>
        </Wrapper>
    );
  }
  