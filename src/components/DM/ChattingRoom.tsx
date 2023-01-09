// import { HashRouter } from 'react-router-dom';
import {Portal} from './Modal'
import styled from 'styled-components';
import { PropaneSharp } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { SetFalselistORroom, SetTruelistORroom, Setkey} from '../../stores/DMbox';

const Wrapper = styled.div`
position: absolute;
top: -200%;
left: -100%;
transform: translate(-50%, -50%);
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

const Header = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-start;
top: 0px;
left: 0px;
height: 60px;
width: 360px;
padding: 20px;
border-radius: 25px;
`;

export function InsideChattingRoom() {
  
  const listORroom = useAppSelector((state) => state.dm.listORroom);
  const withWho = useAppSelector((state) => state.dm.withWho);
  const dispatch = useAppDispatch();

  return (
    <Wrapper>
      <Header>
        <h3>
          {withWho}
        </h3>
        <p>와의 채팅</p>
        <BackToChatlistbutton onClick={()=>{
            console.log("back to chatlist");
            dispatch(SetTruelistORroom());
        }}>
        </BackToChatlistbutton>
      </Header>
    </Wrapper>
);
}
