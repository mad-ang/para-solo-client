import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';


const Bottom = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-end;
background: #BDDDFC;
height: 60px;
width: 360px;
border-radius: 25px;
`;

const DMsearch = styled.div`
display: flex;
justify-content: center;
align-items: center;
background : #BDDDFC;
height: 60px;
padding: 0px 15px 0px 15px;
font-size: 28px;
font-weight: bold;
`
const DMsearchDiv = styled.div`
  font-size: 0.7em;
  height: 40px;
  background: #EBEBEB;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
`

export default function ChattingRoomContents() {

    return (
        <Bottom>
                <DMsearch>
                  <DMsearchDiv>
                    <input type="text" />보내기➡️
                  </DMsearchDiv>
                </DMsearch>
        </Bottom>
);
}
