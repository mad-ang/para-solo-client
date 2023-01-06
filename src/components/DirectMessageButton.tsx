import React, { useState } from 'react';
import styled, {keyframes} from "styled-components";
import DMboxSVG from '../../public/assets/directmessage/DM.svg';
import DirectMessageBox from './DirectMessageBox';

const Wrapper = styled.div`
    position: fixed;
    top: 85%;
    left: 80%;
    transform: translate(-50%, -50%);
`
const ButtonWrapper = styled.div`
    position: relative;
    top: 0;
    left: 0;
    height: 80px;
    width: 80px;
    background: #000000a7;
    border-radius: 10px 10px 0px 0px;
    margin: 0px 0px 0px 0px;
    padding: 0px 0px 0px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 1;
    img {
        height: 100%;
        width: 100%;
    }
`


export default function DMboxButton() {

  const [showMessage, setShowMessage] = useState(false);

  function handleClick() {
    setShowMessage(true);
  }

  return (
    <Wrapper>
        <div>
            <>
                <img src={DMboxSVG} onClick = {handleClick} width="200" />
                {showMessage &&(
                    <div className = "DMpopup">
                         <DirectMessageBox />
                    </div>
                )}
            </>
        </div>
    </Wrapper>
  );
}
