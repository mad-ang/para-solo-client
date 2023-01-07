import React, { useState } from 'react';
import styled, {keyframes} from "styled-components";
import DMboxSVG from '../../public/assets/directmessage/DM.svg';
import channelTalkPNG from '../../public/assets/directmessage/channeltalk.png';

const Wrapper = styled.div`
    position: fixed;
    top: 85%;
    left: 95%;
    transform: translate(-50%, -50%);
`


const DMwrapper = styled.div`
    position: fixed;
    top: -400%;
    left: -180%;
    transform: translate(-50%, -50%);
    background : #FF00FF; 
    gap: 10px;
    bottom: 60px;
    height: 1000px;
    width: 500px;   
  `
    
const DM = styled.div`
    padding: 15px 35px 15px 15px;
    font-size: 28px;
    font-weight: bold;
    `

const DMtop = styled.div`
background : #EFEFF0; 
padding: 15px 35px 15px 15px;
font-size: 28px;
border-top-left-radius: 16px;
border-top-right-radius: 16px;
font-weight: bold;
`
const DMsearch = styled.div`
background : #EFEFF0; 
padding: 15px 35px 15px 15px;
font-size: 28px;
font-weight: bold;
`


    
const DMFormWrapper = styled.div`
    background : #CFCFCF;
    width: "500px";
    margin: "0 auto";
    border-radius : 16px;
    padding: 15px 35px 15px 15px;
    font-size: 28px;
    display: flex;
    align-items: center;
    text-align: center;
    font-weight: bold;
    justify-content: center;
    text-align: center;
`

const DMmessageList = styled.div`
    background : #FFFFFF;
    height: 800px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const DMmessage = styled.div`
    background : #FFFFFF;
    height: 100px;
    font-size: 28px;
`

const TopController = styled.div`
    background : #EFEFF0;
    display: flex;
    flex-direction: row;
    alsign-items: center;
    justify-content: space-between
`

const UnorderedList = styled.ul` 
    list-style: none;
    padding: 0;
    margin: 0;
`

const ListTag = styled.li`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
`
const IDwithLastmessage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
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
  return (
    <UnorderedList>
      {conversations.map((conversation) => (
        <ListTag key={conversation.id}>
          <img src={conversation.picture} alt={conversation.name} />
            <IDwithLastmessage>
              <h3>{conversation.name}</h3>
              <p>{conversation.lastMessage}</p>
            </IDwithLastmessage>

        </ListTag>
      ))}
    </UnorderedList>
  );
};


/* DMbox */
function DMbox(props) {
    const sendDM = (recipient, message) => {
      sendDM(recipient, message);
    }

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
                    <div>
                      <img src={channelTalkPNG} width="30" />
                      최널톡
                    </div>
                    <div>
                      <button onClick={handleClick}> X </button>
                    </div>

                  </TopController>
                </DMtop>
                <DMsearch>
                  <p>여기는 검색하는 곳!</p>
                </DMsearch>
                <DMmessageList>
                  <ConversationList conversations= {conversations} />
                </DMmessageList>
        </DMwrapper>
    );
  }
  
export default function DMboxButton() {

  const [showMessage, setShowMessage] = useState(false);

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
                         <DMbox setShowMessage={setShowMessage} />
                    </div>
                )}
            </>
        </div>
    </Wrapper>
  );
}
