import axios from 'axios';
import { AxiosResponse } from 'axios';

// 친구 추가 요청
export const addFriendRequest = async (request: AddFriendRequestDto) => {
  const addedFriend: ApiResponse<boolean> = await axios.post(
    `/friend/add`,
    request
  );
  return addedFriend.data.data;
};

// 친구 목록 가져옴
export const fecthFriendsRequest = async (id: number) => {
  const friends: ApiResponse<Array<UserResponseDto>> = await axios.get(
    `/friend/${id}`
  );
  return friends.data.data;
};

interface Response<T> {
  data: T;
  count?: number;
  msg?: string;
}
type ApiResponse<T> = AxiosResponse<Response<T>>;

interface AddFriendRequestDto {
  my_id: number;
  friend_id: number;
  friend_name: string;
}

// 프로필 변경 요청 시
interface ProfileChangeRequestDto {
  id: number;
  name?: string;
  status_msg?: string;
  profile_img_url?: string;
}

// user state type
export interface UserData {
  id: number;
  user_id: string;
  name: string;
  status_msg: string;
  profile_img_url: string;
  friends_list: Array<UserResponseDto>;
  room_list: Array<RoomListResponse>;
}

// 서버에서 가져온 유저 정보
export interface UserResponseDto {
  id: number;
  user_id: string;
  name: string;
  status_msg: string;
  profile_img_url: string;
}

// 서버에서 채팅방 리스트에 대한 정보를 받아올 때
export interface RoomListResponse {
  room_id: number;
  identifier: string;
  room_name: string;
  participant: Array<number>;
  last_chat: string;
  not_read_chat: number;
  last_read_chat_id: number;
  updatedAt: Date;
}
