import axios from 'axios';
import { AxiosResponse } from 'axios';

// 채팅방 입장 시, 채팅방 정보를 얻음
export const createRoom = async (param: CreateRoomRequest) => {
  const room: ApiResponse<CreateRoomResponse> = await axios.post(
    `/chat/room/create`,
    param
  );
  return room.data.data;
};

// 현재 채팅방 목록을 가져옴
export const fetchRoomList = async (userId: number) => {
  const roomList: ApiResponse<Array<RoomListResponse>> = await axios.get(
    `/chat/roomList/${userId}`
  );
  return roomList.data.data;
};

// 채팅방의 채팅 데이터를 가져옴
export const fetchChatting = async (param: FetchChattingRequest) => {
  const { room_id, cursor } = param;
  const chatting: ApiResponse<Array<ChattingResponseDto>> = await axios.get(
    `/chat/room?room_id=${room_id}&cursor=${cursor}`
  );
  return chatting.data.data;
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
  user_id: string;
  name: string;
  status_msg: string;
  profile_img_url: string;
}

// 채팅방 만들기 요청
export interface CreateRoomRequest {
  my_id?: number;
  identifier: string;
  room_name: string;
  participant: Array<UserResponseDto>;
}
// 서버에서 채팅방 정보 가져옴
export interface CreateRoomResponse {
  room_id: number;
  identifier: string;
  room_name: string;
  last_chat: string;
  not_read_chat: number;
  last_read_chat_id: number;
  updatedAt: Date;
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

// 서버에 채팅 가져오기
// cursor를 기준으로 채팅을 가져옵니다.
export interface FetchChattingRequest {
  room_id: number;
  cursor: number | null;
}

// 채팅 수신
export interface ChattingResponseDto {
  id: number;
  room_id: number;
  send_user_id: number;
  message: string;
  not_read: number;
  createdAt: Date;
}
