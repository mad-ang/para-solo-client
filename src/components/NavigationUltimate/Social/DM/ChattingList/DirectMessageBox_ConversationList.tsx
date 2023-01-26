import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import DMboxSVG from '../../../assets/directmessage/DM.svg';
import channelTalkPNG from '../../../assets/directmessage/channeltalk.png';
import { useNavigate } from 'react-router-dom';
import { blue } from '@mui/material/colors';
import {
  DMSlice,
  setFriendId,
  setFriendName,
  setRoomId,
  setNewMessageCnt,
  setdmProcess,
  setNewMessage,
} from '../../../../../stores/DMboxStore';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { SetWhichModalActivated, ModalState } from '../../../../../stores/NavbarStore';
import { useQuery } from 'react-query';
import {
  ApiResponse,
  fetchRoomList,
  RoomListResponse,
  IChatRoomStatus,
  UserResponseDto,
} from 'src/api/chat';
import axios from 'axios';
import FriendRequest from 'src/components/NavigationUltimate/Social/AddFriend/FriendRequest';
import Colors from 'src/utils/Colors';
import DefaultAvatar from 'src/assets/profiles/DefaultAvatar.png';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
/* 채팅목록을 불러온다. 클릭시, 채팅상대(state.dm.friendId)에 친구의 userId를 넣어준다  */
export const ConversationList = () => {
  const [rooms, setRooms] = useState<RoomListResponse[]>([]);
  const [unreadCnt, setUnreadCnt] = useState(0);
  const [friendRequestModal, setFriendRequestModal] = useState(false);
  const [FriendRequestProps, setFriendRequestProps] = useState<UserResponseDto>(
    {} as UserResponseDto
  );
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.userId) || cookies.get('userId');
  const friendId = useAppSelector((state) => state.dm.friendId);
  const newMessage = useAppSelector((state) => state.dm.newMessage);
  const newMessageCnt = useAppSelector((state) => state.dm.newMessageCnt);

  useEffect(() => {
    fetchRoomList(userId).then((data) => {
      setRooms(data);
    });
  }, []);

  useEffect(() => {
    console.log('rooms', rooms);
  }, [rooms]);

  // let roomId = '';
  // let body = {
  //   userId: userId,
  //   friendId: friendId,
  //   roomId: roomId,
  // };

  const handleClick = async (room) => {
    console.log('friendInfo..', room.friendInfo);
    console.log('roomId는..', room.roomId);

    if (room.status == IChatRoomStatus.FRIEND_REQUEST && room.unreadCount == 0) {
      setFriendRequestProps(room.friendInfo);
    } else if (room.status == IChatRoomStatus.FRIEND_REQUEST && room.unreadCount == 1) {
      // 친구 요청 받음
      setFriendRequestModal(true);
      setFriendRequestProps(room.friendInfo);

      // // 친구 수락, 거절 창 띄우고 -> dmProcess를 room.status(IChatRoomStatus.FRIEND_REQUEST) 로 바꿈
      // dispatch(setdmProcess(room.status));
    } else {
      console.log("This room's status is... ", room.status);
      try {
        dispatch(SetWhichModalActivated(ModalState.ChattingListAndRoom));
        // Response userId
        dispatch(setFriendId(room.friendInfo.userId));
        dispatch(setFriendName(room.friendInfo.username));
        dispatch(setRoomId(room.roomId));

        // room의 unreadCount, room.status 설정해준다
        dispatch(setNewMessageCnt(-1 * room.unreadCount));
        dispatch(setNewMessage({ message: '' }));
        dispatch(setdmProcess(room.status));
      } catch (error) {
        console.log('error', error);
      }
    }
  };
  return (
    <DMmessageList>
      <UnorderedList>
        {rooms.length !== 0 ? (
          rooms.map((room) => {
            if (
              newMessage?.message &&
              newMessage?.userId === room.friendInfo?.userId &&
              room.unreadCount === 0
            ) {
              room.unreadCount! += 1;
            }
            if (room.status !== IChatRoomStatus.FRIEND_REQUEST && newMessageCnt === 0) {
              room.unreadCount = 0;
            }

            return (
              <ListTag
                key={room._id}
                onClick={() => {
                  handleClick(room);
                }}
              >
                <ProfileAvatarImage
                  src={room.friendInfo.profileImgUrl || DefaultAvatar}
                  alt={room.friendInfo.username}
                  width="60"
                />
                <IDwithLastmessage>
                  <UserID>{room.friendInfo.username}</UserID>
                  <LastMessageWithBadge>
                    <LastMessage>
                      {newMessage?.message && newMessage?.userId === room.friendInfo?.userId
                        ? newMessage?.message
                        : room.status == IChatRoomStatus.FRIEND_REQUEST && room.unreadCount === 0
                        ? (room.message = '친구 요청을 보냈어요')
                        : room.message}
                    </LastMessage>
                    {room.unreadCount! > 0 ? <UnreadCnt>{room.unreadCount}</UnreadCnt> : null}
                  </LastMessageWithBadge>
                </IDwithLastmessage>
              </ListTag>
            );
          })
        ) : (
          <>
            <Textbox> 채팅방에 아무도 없어요 🥲 </Textbox>
            <Textbox> 친구 신청을 보내보아요 </Textbox>
          </>
        )}
      </UnorderedList>
      {friendRequestModal ? (
        <FriendRequest
          setRooms={setRooms}
          setFriendRequestModal={setFriendRequestModal}
          friendInfo={FriendRequestProps}
        />
      ) : null}
    </DMmessageList>
  );
};

const ProfileAvatarImage = styled.img`
  width: 75px;
  height: 75px;
  border-radius: 100%;
`;

const UnorderedList = styled.ul`
  padding: 0px 5px 5px 5px;
`;

const ListTag = styled.li`
  width: 320px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  padding: 5px;
`;
const IDwithLastmessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0px 0px 0px 30px;
  border-bottom: none;
  cursor: pointer;
`;
const UserID = styled.div`
  display: block;
  font-size: 1.17em;
  margin: 0px 0px 10px 0px;
  font-weight: bold;
  // color: ${Colors.skyblue[2]};
`;

const LastMessageWithBadge = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1em;
  margin: 0px 0px 10px 0px;
  width: 200px;
  height: 20px;
`;
const LastMessage = styled.div`
  display: block;
  font-size: 1em;
  margin: 0px 0px 10px 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 200px;
  height: 20px;
`;
const UnreadCnt = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 18px;
  height: 18px;
  border-radius: 100%;
  background-color: ${Colors.red[2]};
  color: ${Colors.white};
  font-size: 12px;
`;

const DMmessageList = styled.div`
  background: #ffffff;
  height: 520px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Textbox = styled.div`
  font-size: 20px;
  text-align: center;
  margin: 5px;
`;
