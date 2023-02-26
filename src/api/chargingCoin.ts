import axios from 'axios';

interface ChargingCoinReq{
  myInfo: {
    userId: string;
  },
}

// 친구 추가 요청
export const chargingCoinReq = async (body: ChargingCoinReq) => {
  try {
    const response = await axios.post(`/chat/chargingCoin`, body);
    if (response) {
      if (response.status === 200) {
        return 1;
      }
    } else {
      return 0;
    }
  } catch (error) {
    console.error(error);
  }
};
