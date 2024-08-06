import { BaseResponse } from '@interfaces/api/base';
import { apiClient } from '@stores/auth';

//프로필 수정
export const postModifyUser = async (
  request: modifyUserRequestDTO
): Promise<BaseResponse<string>> => {
  try {
    const response = await apiClient.post('/user/modify', request);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 비밀번호가 맞는지 확인
export const getPassword = async (password: string): Promise<BaseResponse<string>> => {
  console.log('dfdfdfdsf');
  console.log(password);
  try {
    const response = await apiClient.post('/check-password', { password: password });
    return response.data;
  } catch (error) {
    console.error('비밀번호 확인 실패:', error);
    throw error;
  }
};

// 비밀번호 변경
export const postPassword = async (password: string): Promise<BaseResponse<string>> => {
  try {
    const response = await apiClient.post('/password', { password: password });
    return response.data;
  } catch (error) {
    console.error('비밀번호 변경 실패:', error);
    throw error;
  }
};

export const postSearchPassword = async (email: string): Promise<BaseResponse<string>> => {
  try {
    const response = await apiClient.post('/find-password', { email: email });
    return response.data;
  } catch (error) {
    console.error('비밀번호 찾기 실패:', error);
    throw error;
  }
};

export const postNickName = async ({
  nickname,
}: {
  nickname: string;
}): Promise<BaseResponse<string>> => {
  try {
    const response = await apiClient.post('/nickname', { nickname: nickname });
    return response.data;
  } catch (error) {
    throw error;
  }
};
