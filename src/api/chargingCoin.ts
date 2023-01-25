import axios from 'axios';
import { AxiosResponse } from 'axios';
import { UserResponseDto } from './chat';

// 친구 추가 요청
export const chargingCoinReq = async (body: any) => {
  try {
    const response = await axios.post(`/chat/chargingCoin`, body)
    if (response) {
      const { status, payload } = response.data;
      if (response.status === 200) {
        console.log("코인충전 성공");
        return 1;
        }
      }
      else {
        console.log("여기는 올일이 없음(무엇인가 잘못됨)", response)
        return 0;
      }
    }catch(error) {
    console.error("서버의 알수없는 에러로 여기로 와버렸다(chargingCoin.ts)", error);
  }
}