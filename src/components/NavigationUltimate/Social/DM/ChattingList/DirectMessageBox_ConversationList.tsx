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
import { ApiResponse, fetchRoomList, RoomListResponse } from 'src/api/chat';
// import { ApiResponse} from 'src/api/chat';
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

export  function ConversationList(Props)  {
  const [rooms, setRooms] = useState<RoomListResponse[]>([]);
  const dispatch = useAppDispatch();
  const userID = useAppSelector((state) => state.user.userId);

  useEffect(() => {
    fetchRoomList(userID, (data: RoomListResponse[])=>{
      setRooms(data);
    })
  }, []);

  return(
  <DMmessageList>
        <UnorderedList>
          {rooms.map((room, index) => (
            <ListTag
              key={index}
              onClick={() => {
                dispatch(SetChattingRoomActivated(true));
                dispatch(Setkey(room.friend.username));
              }}
            >
              <img
                src={room.friend.profileImgurl}
                alt={room.friend.username}
                width="60"
              />
              <IDwithLastmessage>
                <UserID>{room.friend.username}</UserID>
                <div>{room.lastChat}</div>
              </IDwithLastmessage>
            </ListTag>
          ))}
        </UnorderedList>
      </DMmessageList>
  );
}