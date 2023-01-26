import axios from 'axios';
import { AxiosResponse } from 'axios';
import { UserResponseDto } from './chat';
import phaserGame from 'src/PhaserGame';
import Game from 'src/scenes/Game';
// 친구 추가 요청
export const addFriendReq = async (body: any) => {
  try {
    const response = await axios.post(`/chat/addFriend`, body);
    if (response) {
      const { status, payload } = response.data;
      if (response.status === 200) {
        console.log('status', status, 'payload', payload);
        if (status === 200) {
          console.log('친구 요청 성공');
          const game = phaserGame.scene.keys.game as Game;
          game.networt2.requestFriendReq(body);
          return 1;
        } else if (status === 404) {
          console.log('코인 부족으로 인한 친구 요청 실패');
          return 2;
        } else if (status === 409) {
          console.log('이미 친구 요청을 보냈거나 친구 상태입니다.');
          return 3;
        }
      } else {
        console.log('오잉...', response);
      }
    }
  } catch (error) {
    console.error('여기로 와버렸다', error);
  }
};

// .then((response) => {
//   const { status, payload } = response.data;
//   if (response.status === 200) {
//     console.log('status', status, 'payload', payload);
//     if (status === 200){
//       console.log('친구 요청 성공');
//       return 1;
//     }
//     else if (status === 404) {
//       console.log('코인 부족으로 인한 친구 요청 실패');
//       return 2;
//     }
//   }
//   else {
//     console.log("오잉...", response)
//   }
// })
// .catch((error) => {
//   console.log("여기로 와버렸다");
//   console.log(error);
// });
// };

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
