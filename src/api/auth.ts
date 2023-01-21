import axios from 'axios';
import { AxiosResponse } from 'axios';
import phaserGame from '../PhaserGame';
import Bootstrap from '../scenes/Bootstrap';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const issueAccessToken = async (body: any): Promise<any> => {
  try {
    const response = await axios.post('/auth/issueAccessToken', body, {
      withCredentials: true,
      headers: {
        'Content-type': 'application/json',
      },
    });
    const { payload } = response.data;
    const token = payload.accessToken;
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 사용자 정보 요청
export const getUserInfo = async (next?: any): Promise<any> => {
  const refreshToken = cookies.get('refreshToken');

  if (refreshToken) {
    const issuedResponse = await issueAccessToken({
      refreshToken: refreshToken,
    });
  }

  const response = await axios.get('/auth/me');
  const { data } = response;
  if (data.status == 200) {
    return data.payload;
  }

  return null;
};

// 로그인
export const login = async (body: any): Promise<any> => {
  try {
    const response = await axios.post('/auth/login', body, {
      withCredentials: true,
      headers: {
        'Content-type': 'application/json',
      },
    });
    const { payload } = response.data;
    const token = payload.accessToken;
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const authenticateUser = (): any => {
  return axios
    .get('/auth/isAuth', {
      headers: {
        'Content-type': 'application/json',
      },
    })
    .then((response) => {
      console.log('사용자 정보 인증 성공', response);
      const { data } = response;
      if (data.status == 200) {
        return data.payload;
      }
    })
    .catch((error) => {
      console.log('사용자 정보 인증 실패', error);
      return null;
    });
};

// 사용자 정보 업데이트
export const updateUserInfo = (body): any => {
  return axios
    .patch('/auth/update', body, {
      headers: {
        'Content-type': 'application/json',
      },
    })
    .then((response) => {
      console.log('사용자 정보 업데이트 성공', response);
      const { data } = response;
      if (data.status == 200) {
        return data.payload;
      }
    })
    .catch((error) => {
      console.log('사용자 정보 업데이트 실패', error);
      return null;
    });
};
