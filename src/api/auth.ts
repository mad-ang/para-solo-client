import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const logout = () => {
  cookies.remove('refreshToken', { path: '/' });
  cookies.remove('accessToken', { path: '/' });
  cookies.remove('playerName', { path: '/' });
  cookies.remove('playerTexture', { path: '/' });
  cookies.remove('userId', { path: '/' });
  window.location.href = '/';
};

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
    return false;
  }
};

// 사용자 정보 요청
export const getUserInfo = async (next?: any): Promise<any> => {
  const response = await axios.get('/auth/me');
  const { data } = response;
  if (response.status == 200) {
    return data.payload;
  }

  if (response.status === 401) {
    const refreshToken = cookies.get('refreshToken');

    if (refreshToken) {
      const issuedResponse = await issueAccessToken({
        refreshToken: refreshToken,
      });

      if (!issuedResponse) {
        logout();
        return;
      }

      const response2 = await axios.get('/auth/me');
      const { data } = response2;
      if (response2.status == 200) {
        return data.payload;
      }
    }
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
    return null;
  }
};

export const authenticateUser = async (): Promise<any> => {
  const response = await axios.get('/auth/isAuth', {
    headers: {
      'Content-type': 'application/json',
    },
  });

  if (response.status === 200) {
    const { data } = response;
    if (data.status == 200) {
      return data.payload;
    }
  }

  if (response.status === 401) {
    const refreshToken = cookies.get('refreshToken');

    if (refreshToken) {
      const issuedResponse = await issueAccessToken({
        refreshToken: refreshToken,
      });

      if (!issuedResponse) {
        logout();
        return;
      }

      const response2 = await axios.get('/auth/isAuth', {
        headers: {
          'Content-type': 'application/json',
        },
      });
      const { data } = response2;
      if (response2.status == 200) {
        return data.payload;
      }
    }
  }
  return null;
};

// 사용자 정보 업데이트
export const updateUserInfo = async (body): Promise<any> => {
  const response = await axios.patch('/auth/update', body, {
    headers: {
      'Content-type': 'application/json',
    },
  });

  if (response.status === 200) {
    const { data } = response;
    if (data.status == 200) {
      return data.payload;
    }
  }

  if (response.status === 401) {
    const refreshToken = cookies.get('refreshToken');

    if (refreshToken) {
      const issuedResponse = await issueAccessToken({
        refreshToken: refreshToken,
      });

      if (!issuedResponse) {
        logout();
        return;
      }

      const response2 = await axios.patch('/auth/update', body, {
        headers: {
          'Content-type': 'application/json',
        },
      });

      const { data } = response2;
      if (response2.status == 200) {
        return data.payload;
      }
    }
  }

  return null;
};
