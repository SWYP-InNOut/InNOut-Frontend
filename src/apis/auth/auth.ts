import { BaseResponse } from '@interfaces/api/base';
import { HTTP_URL } from '..';
import axios, { AxiosResponse } from 'axios';

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

// 임시
export const login = async (request: LoginRequestDTO): Promise<AxiosResponse<any, any>> => {
  const response = await axios.post(
    `${HTTP_URL}/login?username=${request.email}&password=${request.password}`
  );

  return response;
};
export { HTTP_URL };
