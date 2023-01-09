import React, { useState } from 'react';
import styled, {keyframes} from "styled-components";
import DMboxSVG from '../../../public/assets/directmessage/DM.svg';
import channelTalkPNG from '../../../public/assets/directmessage/channeltalk.png';
import { useNavigate } from 'react-router-dom';
// import ConversationView from './ConversationOnDM_backup2';
import { blue } from '@mui/material/colors';
import { Portal } from './Modal';
import {InsideChattingRoom} from './ChattingRoom';
import { DMSlice, SetTruelistORroom, SetFalselistORroom,Setkey} from '../../stores/DMbox';
import { useAppDispatch, useAppSelector } from '../../hooks';

// function FriendList() {
//   const navigate = useNavigate();

//   function handleDirectMessage(friendId: string) {
//     navigate(`/conversation/${friendId}`);
//   }

//   return (
//     <ul>
//       {friends.map(friend => (
//         <li key={friend.id}>
//           <button onClick={() => handleDirectMessage(friend.id)}>
//             Direct Message
//           </button>
//           {friend.name}
//         </li>
//       ))}
//     </ul>
//   );
// }


const Wrapper = styled.div`
    position: fixed;
    top: 90%;
    left: 95%;
    transform: translate(-50%, -50%);
`
const DMwrapper = styled.div`
    position: absolute;
    top: -200%;
    left: -100%;
    transform: translate(-50%, -50%);
    background : none;
    gap: 10px;
    bottom: 60px;
    height: 680px;
    width: 370px;
    border-radius: 25px;
    box-shadow: 20px 0px 10px 0px rgba(0,0,0,0.75);
    -webkit-box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
`
const DM = styled.div`
    padding: 15px 35px 15px 15px;
    font-size: 28px;
    font-weight: bold;
    `
const DMtop = styled.div`
  background : #FFFFFF; 
  padding: 0px 35px 0px 25px;
  font-size: 28px;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  font-weight: bold;
`
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
const DMmessageList = styled.div`
    background : #FFFFFF;
    height: 560px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px 0px 0px 10px;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
`
const DMmessage = styled.div`
    background : #FFFFFF;
    height: 100px;
    font-size: 28px;
`
const UnorderedList = styled.ul` 
    list-style: none;
    border-bottom: none;
    padding: 0;
    margin: 0;
`
const ListTag = styled.li`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    border-bottom: none;
    cursor: pointer;
`
const IDwithLastmessage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    padding: 10px;
    border-bottom: none;
    cursor: pointer;
`
const UserID = styled.div`
    display: block;
    font-size: 1.17em;
    margin-left: 0;
    margin-right: 0;
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
const DirtyTalk = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`

/* Conversation */
interface Conversation {
  id: string;
  name: string;
  picture: string;
  lastMessage: string;
}

interface Props {
  conversations: Conversation[];
}

const ConversationList: React.FC<Props> = ({ conversations }) => {
  /* 서버 열리면 이 코드 사용*/
  // const navigate = useNavigate();
  // function handleDirectMessage(conversation: string) {
  //   navigate(`/conversation/${conversation}`);
  // }
  const dispatch = useAppDispatch();
 

  return (
    <UnorderedList>
      {conversations.map((conversation) => (
        <ListTag key={conversation.name}  onClick= {()=>{
          dispatch(SetFalselistORroom());
          dispatch(Setkey(conversation.name));
        } }>
            {/* handleDirectMessage(conversation.name) //서버 열리면 이코드 사용(삭제 no) */}
            {/* <ConversationView/>  //서버열리면 이코드 사용(삭제 no)*/} 
          <img src={conversation.picture} alt={conversation.name} width= "60"/>
          <IDwithLastmessage>
            <UserID>{conversation.name}</UserID>
            <div>{conversation.lastMessage}</div>
          </IDwithLastmessage>
        </ListTag>
      ))}
    </UnorderedList>
  );
};


/* DMbox */
function DMbox(props) {
    const conversations = [
      {
        id: "1",
        name: "yeosu_swagger",
        picture: "https://user-images.githubusercontent.com/63194662/211139459-96aa37f8-fcd9-4126-9a6b-52296fc3236c.png",
        lastMessage: "오늘밤 뭐해?",
      },
      {
        id: "2",
        name: "kwkim_colyseusPerfume",
        picture: "https://user-images.githubusercontent.com/63194662/211139465-f601878d-4bdb-4607-b0e8-87c1e06d9be5.png",
        lastMessage: "(광고) 당신의 향기, 오늘 저와 함께 찾아보아요",
      },
      {
        id: "3",
        name: "song_song",
        picture: "https://user-images.githubusercontent.com/63194662/211139470-15f07dd8-11e7-4d78-9eff-2cf57fe04233.png",
        lastMessage: "오늘 물 좋은데?",
      },
      {
        id: "4",
        name: "busan_swagger",
        picture: "https://user-images.githubusercontent.com/63194662/211139476-cfb481af-b486-4854-ab9b-86e759a4b151.png",
        lastMessage: "왐마... 서면으로 와라 빨리",
      },
      {
        id: "5",
        name: "fox_sean",
        picture: "https://user-images.githubusercontent.com/63194662/211139480-0f155385-40a9-4fba-ae7b-679769d02318.png",
        lastMessage: "동숲하실래요? ㅎㅎ",
      },
      {
        id: "6",
        name: "정주원 코치님",
        picture: "https://user-images.githubusercontent.com/63194662/211139490-e3606d1d-3f68-4041-8b99-1a09d2a1b61c.png",
        lastMessage: "I'm good, how about you?",
      },
      {
        id: "7",
        name: "류석영 교수님",
        picture: "https://user-images.githubusercontent.com/63194662/211139494-a3f9345d-e84a-41ab-9f50-0a1a9f71acfe.png",
        lastMessage: "I'm good, how about you?",
      },
      {
        id: "8",
        name: "장병규 의장님",
        picture: "https://user-images.githubusercontent.com/63194662/211139498-7f49d48c-a4f5-4f05-8e33-146cab59f239.png",
        lastMessage: "I'm good, how about you?",
      },
      {
        id: "9",
        name: "이범규 대표님",
        picture: "https://user-images.githubusercontent.com/63194662/211139505-282c312a-2d1c-4186-a22b-4fdb7c375803.png",
        lastMessage: "I'm good, how about you?",
      },
    ];

    function handleClick() {
      props.setShowMessage(false);
    }

    return (
        <DMwrapper>
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
                <DMsearch>
                  <DMsearchDiv>
                    🔍검색하기<input type="text" />
                  </DMsearchDiv>
                </DMsearch>
                <DMmessageList>
                  <ConversationList conversations= {conversations}/>
                </DMmessageList>
        </DMwrapper>
    );
  }
  

/* DMboxButton, something pop-up when clicks it */
export default function DMboxButton() {
  const [showMessage, setShowMessage] = useState(false);
  const listORroom = useAppSelector((state) => state.dm.listORroom);

  function handleClick() {
    setShowMessage(true);
  }

  return (
    <Wrapper>
        <div>
            <>
                <img src={DMboxSVG} onClick = {handleClick} width="100" />
                {showMessage &&(
                    <div className = "DMpopup">
                          {listORroom ? 
                          <DMbox setShowMessage={setShowMessage} /> 
                          :<InsideChattingRoom/>}
                    </div>
                )}
            </>
        </div>
    </Wrapper>
  );
}