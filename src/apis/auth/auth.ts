import { BaseResponse } from '@interfaces/api/base';
import { HTTP_URL } from '.';
import axios from 'axios';

export const signup = async (request: SignUpRequestDTO): Promise<BaseResponse<string>> => {
  const response = await axios.post(
    `${HTTP_URL}/join?username=${request.nickName}&email=${request.email}&password=${request.password}`
  );
  return response.data;
};

export const login = async (request: LoginRequestDTO): Promise<BaseResponse<string>> => {
  const response = await axios.post(
    `${HTTP_URL}/login?email=${request.email}&password=${request.password}`
  );
  return response.data;
};
