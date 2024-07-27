import { BaseResponse } from '@interfaces/api/base';
import { apiClient } from '@stores/auth';

export const postNickName = async (nickname: string): Promise<BaseResponse<string>> => {
  try {
    const response = await apiClient.post('/nickname', { nickname: nickname });
    return response.data;
  } catch (error) {
    console.error('닉네임변경 실패:', error);
    throw error;
  }
};

// 비밀번호가 맞는지 확인
export const getPassword = async (password: string): Promise<BaseResponse<string>> => {
  console.log('dfdfdfdsf');
  try {
    const response = await apiClient.post('/password', { password: password });
    return response.data;
  } catch (error) {
    console.error('비밀번호 확인 실패:', error);
    throw error;
  }
};

export const postPassword = async (password: string): Promise<BaseResponse<string>> => {
  try {
    const response = await apiClient.post('/password', { password: password });
    return response.data;
  } catch (error) {
    console.error('비밀번호 변경 실패:', error);
    throw error;
  }
};
