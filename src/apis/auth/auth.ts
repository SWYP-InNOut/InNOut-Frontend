import { BaseResponse } from '@interfaces/api/base';
import axios from 'axios';

export const signup = async (request: SignUpRequestDTO): Promise<BaseResponse<string>> => {
  const response = await axios.post(
    `http://3.35.119.32:9000/join?username=${request.nickName}&email=${request.email}&password=${request.password}`
  );
  return response.data;
};
