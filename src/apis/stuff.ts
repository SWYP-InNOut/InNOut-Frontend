import { BaseResponse } from '@interfaces/api/base';
import { apiClient } from '@stores/auth';

//postId : 게시물 id

// /in/{postId}
//버리지마
export const postIn = async (
  request: StuffRequestDTO,
  postId: string
): Promise<BaseResponse<string>> => {
  try {
    const response = await apiClient.post(`/in/${postId}`, request);
    return response.data;
  } catch (error) {
    console.error('닉네임변경 실패:', error);
    throw error;
  }
};

//버려
export const postOut = async (
  request: StuffRequestDTO,
  postId: number
): Promise<BaseResponse<string>> => {
  try {
    const response = await apiClient.post(`/out/${postId}`, request);
    return response.data;
  } catch (error) {
    console.error('out 실패:', error);
    throw error;
  }
};
