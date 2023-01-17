import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import DMboxSVG from '../../../assets/directmessage/DM.svg';
import channelTalkPNG from '../../../assets/directmessage/channeltalk.png';
import { useNavigate } from 'react-router-dom';
import { blue } from '@mui/material/colors';
import { DMSlice, setFriendId, setRoomId } from '../../../../../stores/DMboxStore';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import {
  SetChattingRoomActivated,
  SetChattingListActivateOnly,
} from '../../../../../stores/NavbarStore';
import { useQuery } from 'react-query';
import { ApiResponse, fetchRoomList, RoomListResponse, IChatRoomStatus, UserResponseDto } from 'src/api/chat';
import axios from 'axios';
import FriendRequest from 'src/components/NavigationUltimate/Social/AddFriend/FriendRequest';

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

/* 채팅목록을 불러온다. 클릭시, 채팅상대(state.dm.friendId)에 친구의 userId를 넣어준다  */
export const ConversationList = () => {
  const [rooms, setRooms] = useState<RoomListResponse[]>([]);
  const [friendRequestModal, setFriendRequestModal] = useState(false);
  const [FriendRequestProps, setFriendRequestProps] = useState<UserResponseDto>({} as UserResponseDto);
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.userId);
  const friendId = useAppSelector((state) => state.dm.friendId);

  
  useEffect(() => {
      fetchRoomList(userId, (data)=>{
        setRooms(data)
      });
  }, []);
  useEffect(()=>{
    console.log("rooms", rooms)
    
  }, [rooms])

  // let roomId = '';
  // let body = {
  //   userId: userId,
  //   friendId: friendId,
  //   roomId: roomId,
  // };

  const handleClick = async (room) => {

    // body.friendId = room.friendInfo.userId;
    // body.roomId = room.roomId;
    console.log("friendId는..", room.friendInfo.userId);
    console.log("roomId는..", room.roomId);

    if (room.status == IChatRoomStatus.FRIEND_REQUEST) {
      setFriendRequestModal(true);
      setFriendRequestProps(room.friendInfo);
    }
    else{
      console.log("This room's status is... ", room.status);
      try {
          dispatch(SetChattingRoomActivated(true));
          // Response userId
          dispatch(setFriendId(room.friendInfo.userId));
          dispatch(setRoomId(room.roomId));
          
      } catch (error) {
        console.log('error', error);
      }
    }
      // dispatch(SetChattingListActivateOnly());
    
  }
    return (
      <DMmessageList>
        <>
        <UnorderedList>
          {rooms &&
            rooms.map((room) => (

              <ListTag
                key={room.roomId}
                onClick = { () => {
                  handleClick(room);
                }}
              >
                <img src={room.friendInfo.profileImgUrl} alt={room.friendInfo.username} width="60" />
                <IDwithLastmessage>
                  <UserID>{room.friendInfo.username}</UserID>
                  <div>{room.message}</div>
                </IDwithLastmessage>
              </ListTag>
            ))}
        </UnorderedList>
        {friendRequestModal? 
        <FriendRequest setFriendRequestModal={setFriendRequestModal} friendInfo = {FriendRequestProps}
        /> : null}
        </>
      </DMmessageList>
    );
  };
