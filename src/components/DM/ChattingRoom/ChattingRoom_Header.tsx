import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { SetFalselistORroom, SetTruelistORroom, Setkey} from '../../../stores/DMbox';


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
    const listORroom = useAppSelector((state) => state.dm.listORroom);
    const withWho = useAppSelector((state) => state.dm.withWho);
    const dispatch = useAppDispatch();

    return (
        <Header>
            <BackToChatlistbutton onClick={()=>{
                dispatch(SetTruelistORroom());
            }}>
                ⬅️
            </BackToChatlistbutton>
            <h3>
                {withWho}
            </h3>
            <p>와의 채팅</p>
        </Header>
    );
}
