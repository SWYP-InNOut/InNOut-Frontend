import { BaseResponse } from '@interfaces/api/base';
import { HTTP_URL } from '.';
import axios, { AxiosResponse } from 'axios';
import { apiClient } from '@stores/auth';

export const signup = async (request: SignUpRequestDTO): Promise<BaseResponse<string>> => {
  const response = await axios.post(
    `${HTTP_URL}/join`,
    {
      username: request.nickName,
      email: request.email,
      password: request.password,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};

export const login = async (request: LoginRequestDTO): Promise<AxiosResponse<any, any>> => {
  const response = await axios.post(
    `${HTTP_URL}/login?username=${request.email}&password=${request.password}`
  );

  return response;
};

// // export const logout = async (): Promise<BaseResponse<string>> => {
// //   try {
// //     const response = await apiClient.post((`${HTTP_URL}/logout`);
// //     return response.data;
// //   } catch (error) {
// //     console.error('로그아웃 실패', error);
// //     throw error;
// //   }
// // };

// export const logout = async (): Promise<AxiosResponse<any, any>> => {
//   const response = await axios.get(`${HTTP_URL}/logout`);

//   return response;
// };

export { HTTP_URL };
