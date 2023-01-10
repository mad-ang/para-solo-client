import React, { useState } from 'react';
import styled, {keyframes} from "styled-components";
import DMboxSVG from '../../../assets/directmessage/DM.svg';
import channelTalkPNG from '../../../assets/directmessage/channeltalk.png';
import { useNavigate } from 'react-router-dom';
import {InsideChattingRoom} from '../ChattingRoom/ChattingRoom';

const TopController = styled.div`
    background : #FFFFFF;
    display: flex;
    height: 60px;
    flex-direction: row;
    alsign-items: center;
    justify-content: space-between;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
`
const DirtyTalk = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`

const DMtop = styled.div`
    background : #FFFFFF; 
    padding: 0px 35px 0px 25px;
    font-size: 28px;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    font-weight: bold;
`

export function DMboxHeader(props){
    function handleClick() {
        props.setShowMessage(false);
      }
    return(
        <DMtop>
        <TopController>
            <DirtyTalk>
                <img src={channelTalkPNG} width="30" />
                최널톡
            </DirtyTalk>                
            <div>
                <button onClick={handleClick} > X </button>
            </div>
        </TopController>
        </DMtop>
    );
}