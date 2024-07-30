import { BaseResponse } from '@interfaces/api/base';
import { HTTP_URL } from '.';
import { AxiosResponse } from 'axios';
import { apiClient } from '@stores/auth';

export const signup = async (
  request: Omit<SignUpRequestDTO, 'confirmPassword'>
): Promise<BaseResponse<string>> => {
  const response = await apiClient.post(`/join`, request);
  return response.data;
};

export const login = async (request: LoginRequestDTO): Promise<AxiosResponse<any, any>> => {
  const response = await apiClient.post(
    `/login?username=${request.email}&password=${request.password}`
  );
  apiClient.defaults.withCredentials = true;
  return response;
};

export { HTTP_URL };
