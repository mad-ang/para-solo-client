import {Portal} from './Modal_unused'
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { SetFalselistORroom, SetTruelistORroom, Setkey} from '../../../stores/DMbox';
import { Message } from '@mui/icons-material';


const BlockWithContents = styled.div`
display: flex;
flex-direction: row;
`;

const MyMessage = styled.div`
display: flex;
width: 100%;
flex-direction: row;
justify-content: flex-end;
`


const MyBlockWrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-end;
background: #BDDDFC;
top: 0px;
left: 0px;
height: 60px;
width: 200px;
border-radius: 25px;
`

const FriendBlockWrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-start;
background: #C7B9FA;
top: 0px;
left: 0px;
height: 60px;
width: 200px;
border-radius: 25px;
`

export default function ChattingBlock(MessageContents: string, MessageTime: string, MessageUser: string, MessageUserImage: string, MeOrFriend: boolean) {
    

    return (
        <BlockWithContents className= "BlockWithContents">
            {MeOrFriend ? 
            <MyMessageBlock MC={MessageContents} MT={MessageTime}/> 
            :<FriendMessageBlock MC={MessageContents} MT={MessageTime}/>
            }
        </BlockWithContents>
);
}

function MyMessageBlock(props) {
    return (
    <MyMessage>
        <MyBlockWrapper className= "MyBlockWrapper">
            <div>{props.MC}</div>
        </MyBlockWrapper>
    </MyMessage>
);
}

function FriendMessageBlock(props) {
    return (
        <FriendBlockWrapper className= "FriendBlockWrapper">
            <div>{props.MC}</div>
        </FriendBlockWrapper>
);
}
