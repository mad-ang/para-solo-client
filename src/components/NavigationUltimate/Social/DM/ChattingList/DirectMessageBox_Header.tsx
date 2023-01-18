import React, { useState } from 'react';
import styled, {keyframes} from "styled-components";
import DMboxSVG from '../../../assets/directmessage/DM.svg';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';
import Colors from 'src/utils/Colors';
import {InsideChattingRoom} from '../ChattingRoom/ChattingRoom';
import { useAppSelector, useAppDispatch } from '../../../../../hooks';
import {SetChattingListActivated, SetChattingListActivateOnly} from '../../../../../stores/NavbarStore';

const TopController = styled.div`
    background : #FFFFFF;
    display: flex;
    height: 60px;
    flex-direction: row;
    alsign-items: center;
    justify-content: space-between;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
`;
const DirtyTalk = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;
const DMtop = styled.div`
    background : #FFFFFF; 
    padding: 0px 35px 0px 25px;
    font-size: 28px;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    font-weight: bold;
`;
const ButtonWrapper = styled.button`
    background: none;
    border: none;
    padding-top: 7px;
`;

export function DMboxHeader(){
    const dispatch = useAppDispatch();
    function handleClick() {
        console.log("clicked!!!! I want back to the chatting list")
        dispatch(SetChattingListActivated(false));
    }

    return(
        <DMtop>
        <TopController>
            <DirtyTalk>
                <img src={'assets/directmessage/channelTalk.png'} width="30" />
                최널톡
            </DirtyTalk>
            <ButtonWrapper onClick={handleClick}>
                <ClearIcon fontSize="large" sx={{ color: Colors.skyblue[1]}} />
            </ButtonWrapper>
        </TopController>
        </DMtop>
    );
}