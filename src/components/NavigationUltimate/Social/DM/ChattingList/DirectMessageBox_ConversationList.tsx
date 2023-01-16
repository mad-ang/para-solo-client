import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import DMboxSVG from '../../../assets/directmessage/DM.svg';
import channelTalkPNG from '../../../assets/directmessage/channeltalk.png';
import { useNavigate } from 'react-router-dom';
import { blue } from '@mui/material/colors';
import { DMSlice, setkey, setRoomId } from '../../../../../stores/DMboxStore';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import {
  SetChattingRoomActivated,
  SetChattingListActivateOnly,
} from '../../../../../stores/NavbarStore';
import { useQuery } from 'react-query';
import { ApiResponse, fetchRoomList, RoomListResponse, IChatRoomStatus } from 'src/api/chat';
import axios from 'axios';

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

/* 채팅목록을 불러온다. 클릭시, 채팅상대(state.dm.frinedId)에 친구의 userId를 넣어준다  */
export function ConversationList() {
  const [rooms, setRooms] = useState<RoomListResponse[]>([]);
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.userId);
  const friendId = useAppSelector((state) => state.dm.frinedId);

  let roomId = '';
  useEffect(() => {
    fetchRoomList(userId, (data: RoomListResponse[]) => {
      console.log("데이터 요청@@!!!");
      setRooms(data);
      console.log("데이터 요청결과!!!", data);
    });
  }, []);

  let body = {
    userId: userId,
    friendId: friendId,
    roomId: roomId,
  };

  const handleClick = async (room) => {
    if (room.status == IChatRoomStatus.FRIEND_REQUEST) {
      alert('친구 요청을 수락해주세요'); //송희누나의 모달창이 뜰 예정
      //수락하면 다음으로 진행
      //+ lastchat을, 친구와 대화를 시작해 보세요로 바꾸기
      //거절하면... 해당 메시지 삭제 요청
      //+ 즉, 친구리스트에서 지워주면 끝
    }

    if (room.status != IChatRoomStatus.FRIEND_REQUEST) {
      dispatch(SetChattingListActivateOnly());
      try {
        const response = await axios.post('/joinRoom', body);
        if (response.data.status === 200) {
          dispatch(SetChattingRoomActivated(true));
          // Response userId
          dispatch(setkey(room.friend.userId));
          dispatch(setRoomId(response.data.payload.roomId));
        }
      } catch (error) {
        console.log('error', error);
      }
    }

    return (
      <DMmessageList>
        <UnorderedList>
          {rooms &&
            rooms.map((room, index) => (
              <ListTag
                key={index}
                onClick={(room) => {
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
      </DMmessageList>
    );
  };
}
