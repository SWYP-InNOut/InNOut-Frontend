import { BaseResponse } from '@interfaces/api/base';
import { apiClient } from '@stores/auth';

export const postMyRoom = async (request: RoomRequestDTO): Promise<BaseResponse<string>> => {
  try {
    const response = await apiClient.post('/myroom', { request });
    return response.data;
  } catch (error) {
    console.error('홈화면 / 내 물건 리스트 실패:', error);
    throw error;
  }
};

//게시물 등록
export const postMyRoomAddStuff = async (
  request: PostRequestDTO
): Promise<BaseResponse<string>> => {
  try {
    const response = await apiClient.post('/myroom/addstuff', { request });
    return response.data;
  } catch (error) {
    console.error('게시물 등록 실패:', error);
    throw error;
  }
};

//게시물 상세보기
export const getMyRoomPost = async (
  memberId: string,
  postId: number
): Promise<BaseResponse<string>> => {
  try {
    const response = await apiClient.get(`/myroom/post/${postId}`, {
      params: { memberId: memberId },
    });
    return response.data;
  } catch (error) {
    console.error('게시물 상세보기 실패:', error);
    throw error;
  }
};

// export const postShare Api 추가되면 ㅇㅇ