import React, { useEffect, useState } from "react";
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

import { useQuery } from 'react-query';
// import { ApiResponse, RoomListResponse, fetchRoomList } from 'src/api/chat';
import { ApiResponse} from 'src/api/chat';
import axios from 'axios';
// import { Body } from 'matter';

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
  height: 460px;
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

interface Props {
  userId: number;
}


// export function ConversationList(Props) {
//   axios
//   .get('/chat/roomList/3')
//   .then(function(response) {
//     console.log(response);
//   })
//     }


export const fetchRoomList =  (userId: number) => {
  // return await axios.get(`/chat/roomList/${userId}`)
  return  axios.get(`/chat/roomList/3`)
  .then(response => {
    return (response.data.data);
  })
  .catch(error => {
    console.log(error);
  });
};



interface RoomListResponse {
  id: string;
  name: string;
  picture: string;
  lastMessage: string;
}

export  function ConversationList(Props)  {
  // const dispatch = useAppDispatch();
  // const {data, status} = useQuery('roomList', () => fetchRoomList(Props.userId));

  // if (status === 'loading') return <div>Loading...</div>
  // console.log("hohohohohoho")
  const [users, setUsers] = useState<RoomListResponse[]>([]);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    axios
    .get('/chat/roomList/3')
    .then(response => {
      setUsers(response.data.data);
    })
    .catch(error => {
      console.log(error);
    });
  }, []);


  return(
  <DMmessageList>
        <UnorderedList>
          {users.map((user) => (
            <ListTag
              key={user.name}
              onClick={() => {
                dispatch(SetChattingRoomActivated(true));
                dispatch(Setkey(user.name));
                const socketClient = io(`${socketHost}:${socketPort}/chat-id`);

                socketClient.on("connect", () => {
                  console.log("connected to socket server");
                });

                socketClient.emit("chatId", "senderId");
                socketClient.emit("message", "this is message!");
              }}
            >
              <img
                src={user.picture}
                alt={user.name}
                width="60"
              />
              <IDwithLastmessage>
                <UserID>{user.name}</UserID>
                <div>{user.lastMessage}</div>
              </IDwithLastmessage>
            </ListTag>
          ))}
        </UnorderedList>
      </DMmessageList>
  );
}