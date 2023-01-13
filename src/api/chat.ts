import axios from 'axios';
import { AxiosResponse } from 'axios';

// 채팅방 입장 시, 채팅방 정보를 얻음
export const createRoom =  (param: CreateRoomRequest) => {
  return axios.post(`/chat/room/create`, param)
    .then(response => {
        const { data } = response.data;
        return data as ApiResponse<CreateRoomResponse>;
    })
    .catch(error => {
        console.log(error);
    });
};

// 현재 채팅방 목록을 가져옴
export const fetchRoomList =  (userId: string, next: any) => {
  // return await axios.get(`/chat/roomList/${userId}`)
  return  axios.get(`/chat/roomList/${userId}`)
    .then(response => {
        console.log("hihihi")
        const { data } = response.data;
        next(data);
        // return data as ApiResponse<Array<RoomListResponse>>;
    })
    .catch(error => {
      console.log(error);
  });
};

// 스크롤시 채팅방의 채팅 데이터를 가져옴(옛날 채팅 리스트)
export const fetchChatting = (param: FetchChattingRequest) => {
  const { roomId, cursor } = param;
  return axios.get(`/chat/room?room_id=${roomId}&cursor=${cursor}`)
    .then(response => {
        const { data } = response.data;
        return data as ApiResponse<Array<ChattingResponseDto>>;
    })
    .catch(error => {
      console.log(error);
  });
};

interface Response<T> {
  data: T;
  count?: number;
  msg?: string;
}
export type ApiResponse<T> = AxiosResponse<Response<T>>;

// 서버에서 가져온 유저 정보
export interface UserResponseDto {
  id: number;
  userId: string;
  name: string;
  statusMsg: string;
  profileImgurl: string;
}

// 채팅방 만들기 요청
export interface CreateRoomRequest {
  myId?: number;
  identifier: string;
  roomName: string;
  participant: Array<UserResponseDto>;
}
// 서버에서 채팅방 정보 가져옴
export interface CreateRoomResponse {
  roomId: number;
  identifier: string;
  roomName: string;
  lastChat: string;
  notReadChat: number;
  // updatedAt: Date;
  // lastReadChatId: number;
}

// 서버에서 채팅방 리스트에 대한 정보를 받아올 때
export interface RoomListResponse {
  identifier: string;
  Friend: UserResponseDto;
  lastChat: string;
  // updatedAt: Date;
  // lastReadChatId: number;
}

// 서버에 채팅 가져오기
// cursor를 기준으로 채팅을 가져옵니다.
export interface FetchChattingRequest {
  roomId: number;
  cursor: number | null;
}

// 채팅 수신
export interface ChattingResponseDto {
  id: number;
  roomId: number;
  sendUserId: number;
  message: string;
  notRead: number;
  createdAt: Date;
}
