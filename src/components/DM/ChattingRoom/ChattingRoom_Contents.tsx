import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import ChattingBlock from './ChattingBlock';

const Contents = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-start;
background: #CEFEDE;
top: 0px;
left: 0px;
height: 550px;
width: 360px;
padding: 20px;
border-radius: 25px;
`;

//styled.div MyChat shows chatting Block from me
const MyChat = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-end;
background: #BDDDFC;
top: 0px;
left: 0px;
height: 60px;
width: 200px;
padding: 20px;
margin: 5px;
border-radius: 25px;
`;

//styled.div FriendChat shows chatting Block from friend
const FriendChat = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-start;
background: #FDFFB1;
top: 0px;
left: 0px;
height: 60px;
width: 200px;
padding: 20px;
margin: 5px;
border-radius: 25px;
`;

export default function ChattingRoomContents() {

    return (
        <Contents>
            {ChattingBlock("안녕하세요", "2021-10-10", "박건율", "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg", false)}
            {ChattingBlock("안녕안해요", "2021-10-10", "윤중선", "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg", true)}
            {ChattingBlock("안녕하세요", "2021-10-10", "박건율", "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg", false)}
            {ChattingBlock("안녕하세요", "2021-10-10", "박건율", "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg", false)}
            {ChattingBlock("안녕하세요", "2021-10-10", "박건율", "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg", false)}
            {ChattingBlock("안녕안해요", "2021-10-10", "윤중선", "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg", true)}
            {ChattingBlock("안녕안해요", "2021-10-10", "윤중선", "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg", true)}
        </Contents>
);
}
