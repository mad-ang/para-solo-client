// import { HashRouter } from 'react-router-dom';
import styled from 'styled-components';
import { PropaneSharp } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { SetFalselistORroom, SetTruelistORroom, Setkey} from '../../../../../stores/DMbox';
import ChattingRoomHeader from './ChattingRoom_Header';
import ChattingRoomContents from './ChattingRoom_Contents';
import ChattingRoomBottom from './ChattingRoom_Bottom';

const Wrapper = styled.div`
position: fixed;
bottom: 100px;
left: 0px;
background : white;
gap: 10px;
bottom: 60px;
height: 680px;
width: 370px;
border-radius: 25px;
box-shadow: 20px 0px 10px 0px rgba(0,0,0,0.75);
-webkit-box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
-moz-box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
`;

const BackToChatlistbutton = styled.button`
top: 0px;
left: 0px;
background : red;
border: 3px solid blue;
height: 30px;
width: 30px;
border-radius: 25px;
box-shadow: 20px 0px 10px 0px rgba(0,0,0,0.75);
-webkit-box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
-moz-box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
`;


export function InsideChattingRoom() {
  
  const listORroom = useAppSelector((state) => state.dm.listORroom);
  const withWho = useAppSelector((state) => state.dm.withWho);
  const dispatch = useAppDispatch();

  return (
    <Wrapper>
        <ChattingRoomHeader />
        <ChattingRoomContents />
        <ChattingRoomBottom />
    </Wrapper>
);
}
