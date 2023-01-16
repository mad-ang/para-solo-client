import axios from 'axios';
import { AxiosResponse } from 'axios';
import { Message, ChatInput } from 'react-chat-ui';
// 채팅방 입장 시, 채팅방 정보를 얻음
export const createRoom = (param: CreateRoomRequest) => {
  return axios
    .post(`/chat/room/create`, param)
    .then((response) => {
      const { data } = response.data;
      return data as ApiResponse<CreateRoomResponse>;
    })
    .catch((error) => {
      console.log(error);
    });
};

// 현재 채팅방 목록을 가져옴
export const fetchRoomList = async (userId: string, next: any) => {
  // return await axios.get(`/chat/roomList/${userId}`)
  return await axios
    .post(`/chat/roomList/`, { userId: userId })
    .then((response) => {
      console.log('hihihi');
      const { data } = response.data;
      console.log("sss", response)
      next(data);
      // return data as ApiResponse<Array<RoomListResponse>>;
    })
    .catch((error) => {
      console.log(error);
    });
};

// 스크롤시 채팅방의 채팅 데이터를 가져옴(옛날 채팅 리스트)
export const fetchChatting = (param: FetchChattingRequest) => {
  const { roomId, cursor } = param;
  return axios
    .get(`/chat/room?room_id=${roomId}&cursor=${cursor}`)
    .then((response) => {
      const { data } = response.data;
      return data as ApiResponse<Array<ChatDto>>;
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
export type ApiResponse<T> = AxiosResponse<Response<T>>;

// 플레이어에게 매핑되는 유저 정보 타입
export interface UserResponseDto {
  userId?: string;
  username?: string;
  profileImgUrl?: string;
  gender?: string;
  age?: string;
  height?: string;
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
// export interface RoomListResponse {
//   friend: UserResponseDto;
//   message: string; //친구와 나눈마지막 메세지
//   roomId: number;
//   unreadCount?: number;
//   status: IChatRoomStatus; //0, 1, 2세가지가 들어옴
//   updatedAt: Date;
// }

export interface RoomListResponse {
  myInfo: UserResponseDto
  friendInfo: UserResponseDto
  message: string
  status: IChatRoomStatus
  roomId?: string
  unreadCount?: number
  updatedAt: Date | null
}




export enum IChatRoomStatus {
  FRIEND_REQUEST,
  SOCKET_ON,
  SOCKET_OFF,
}

// 서버에 채팅 가져오기
// cursor를 기준으로 채팅을 가져옵니다.
export interface FetchChattingRequest {
  roomId: number;
  cursor: number | null;
}

// 채팅룸
export interface ChatDto {
  id: number | string;
  message: string;
  roomId?: number | string;
  sendUserId?: number | string;
  notRead?: number;
  createdAt?: Date;
}

export interface ServerToClientEvents {
  // noArg: () => void;
  start_chat: (chatList: Array<ChatDto>) => void;
  chatting: (chat: ChatDto) => void;
}

export interface ClientToServerEvents {
  hello: () => void;
  chatting: (chat: ChatDto) => void;
  test: (chat: string) => void;
}
