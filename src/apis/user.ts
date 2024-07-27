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
