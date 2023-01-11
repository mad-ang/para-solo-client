import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import DMboxSVG from "../../../assets/directmessage/DM.svg";
import channelTalkPNG from "../../../assets/directmessage/channeltalk.png";
import { useNavigate } from "react-router-dom";
import { blue } from "@mui/material/colors";
import { DMSlice, Setkey} from "../../../../../stores/DMboxStore";
import { useAppDispatch, useAppSelector } from "../../../../../hooks";
import io from "socket.io-client";
const socketHost = "http://localhost";
const socketPort = "5002";
import {SetChattingRoomActivated, SetChattingRoomActivateOnly} from '../../../../../stores/NavbarStore';


const UnorderedList = styled.ul`
  list-style: none;
  border-bottom: none;
  padding: 0;
  margin: 0;
`;
const ListTag = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border-bottom: none;
  cursor: pointer;
`;
const IDwithLastmessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 10px;
  border-bottom: none;
  cursor: pointer;
`;
const UserID = styled.div`
  display: block;
  font-size: 1.17em;
  margin-left: 0;
  margin-right: 0;
  font-weight: bold;
`;
const DMmessageList = styled.div`
  background: #ffffff;
  height: 560px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 0px 0px 10px;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
`;

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

export const ConversationList: React.FC<Props> = ({ conversations }) => {
  /* 서버 열리면 이 코드 사용*/
  // const navigate = useNavigate();
  // function handleDirectMessage(conversation: string) {
  //   navigate(`/conversation/${conversation}`);
  // }
  const dispatch = useAppDispatch();

  return (
    <DMmessageList>
      <UnorderedList>
        {conversations.map((conversation) => (
          <ListTag
            key={conversation.name}
            onClick={() => {
              dispatch(SetChattingRoomActivated(true));
              dispatch(Setkey(conversation.name));
              const socketClient = io(`${socketHost}:${socketPort}/chat-id`);

              socketClient.on("connect", () => {
                console.log("connected to socket server");
              });

              socketClient.emit("chatId", "senderId");
              socketClient.emit("message", "this is message!");
            }}
          >
            {/* handleDirectMessage(conversation.name) //서버 열리면 이코드 사용(삭제 no) */}
            {/* <ConversationView/>  //서버열리면 이코드 사용(삭제 no)*/}
            <img
              src={conversation.picture}
              alt={conversation.name}
              width="60"
            />
            <IDwithLastmessage>
              <UserID>{conversation.name}</UserID>
              <div>{conversation.lastMessage}</div>
            </IDwithLastmessage>
          </ListTag>
        ))}
      </UnorderedList>
    </DMmessageList>
  );
};
