import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { Setkey} from '../../../../../stores/DMboxStore';
import {SetChattingRoomActivated, SetChattingRoomActivateOnly} from '../../../../../stores/NavbarStore';

const BackToChatlistbutton = styled.button`
background : white;
border: 3px solid blue;
height: 30px;
width: 30px;
fontsize: 100px;
border-radius: 25px;
`;

const Header = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-start;
background: #FDFFB1;
top: 0px;
left: 0px;
height: 60px;
width: 360px;
padding: 20px;
`;
// border-radius: 25px;

export default function ChattingRoomHeader() {
    const withWho = useAppSelector((state) => state.dm.withWho);
    const dispatch = useAppDispatch();

    function handleClick() {
        dispatch(SetChattingRoomActivated(false));
    }


    return (
        <Header>
            <BackToChatlistbutton onClick={handleClick}>
                ⬅️
            </BackToChatlistbutton>
            <h3>
                {withWho}
            </h3>
            <p>와의 채팅</p>
        </Header>
    );
}
