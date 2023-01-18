import axios from 'axios';
import { AxiosResponse } from 'axios';
import { UserResponseDto } from './chat';

// 친구 추가 요청
export const addFriendReq = (body: any) => {
  return axios
    .post(`/chat/addFriend`, body)
    .then((response) => {
      const { payload } = response.data;
      if (response.status === 200) {
        console.log('친구 요청 성공');
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

// 현재서버에 있는 유저들의 리스트를 가져옴
export const fetchFriendsReq = (id: number) => {
  return axios
    .get(`/friend/${id}`)
    .then((response) => {
      const { payload } = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
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
  height?: number;
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

// export interface UserResponseDto {
//   id: number;
//   user_id: string;
//   name: string;
//   status_msg: string;
//   profile_img_url: string;
// }

// 서버에서 채팅방 리스트에 대한 정보를 받아올 때
export interface RoomListResponse {
  // room_id: number;
  identifier: string;
  FriendName: string;
  last_chat: string;
  not_read_chat: number;
  last_read_chat_id: number;
  updatedAt: Date;
}
