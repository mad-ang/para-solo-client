import React, { useState } from 'react';
import styled, {keyframes} from "styled-components";
import { blue } from '@mui/material/colors';

export function DMSearchConversation(){
    return(
        <DMsearch>
            <DMsearchDiv>
                🔍검색하기<input type="text" />
            </DMsearchDiv>
        </DMsearch>
    );
}

const DMsearch = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background : #FFFFFF;
    height: 60px;
    padding: 0px 15px 0px 15px;
    font-size: 28px;
    font-weight: bold;
`

const DMsearchDiv = styled.div`
    font-size: 0.7em;
    height: 40px;
    background: #EBEBEB;
    padding: 5px;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
`
