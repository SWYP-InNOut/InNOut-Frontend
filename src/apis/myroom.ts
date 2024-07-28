import { BaseResponse } from '@interfaces/api/base';
import { IsPublicResponseDTO, MyRoomResponseDTO, RoomRequestDTO } from '@interfaces/api/room';
import { apiClient } from '@stores/auth';
import { c } from 'node_modules/vite/dist/node/types.d-aGj9QkWt';

// 나의 룸 공개 여부 변경
export const getIsPublic = async (): Promise<BaseResponse<IsPublicResponseDTO>> => {
  try {
    const response = await apiClient.post('/ispublic');
    return response.data;
  } catch (error) {
    console.error('룸 공개 여부 실패:', error);
    throw error;
  }
};

//이름은 get이지만 post임
export const getMyRoom = async (
  request: RoomRequestDTO
): Promise<BaseResponse<MyRoomResponseDTO>> => {
  try {
    const response = await apiClient.post('/myroom', request);
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
    const response = await apiClient.post('/myroom/addstuff', request);
    return response.data;
  } catch (error) {
    console.error('게시물 등록 실패:', error);
    throw error;
  }
};

// //게시물 상세보기
// export const getMyRoomPost = async (
//   memberId: number,
//   postId: number
// ): Promise<BaseResponse<string>> => {
//   try {
//     console.log('getMyRoomPost');
//     console.log('memberId:', memberId);
//     console.log('fff', typeof memberId);
//     console.log('ddscd', typeof postId);
//     const response = await apiClient.get(`/myroom/post/${postId}`, {
//       params: { memberId: memberId },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('게시물 상세보기 실패:', error);
//     throw error;
//   }
// };

export const getMyRoomPost = async (
  memberId: number,
  postId: number
): Promise<BaseResponse<string>> => {
  try {
    console.log('getMyRoomPost 호출됨');
    console.log('memberId:', memberId);
    console.log('postId:', postId);

    const response = await apiClient.get(`/myroom/post/${postId}`, {
      params: { memberId: memberId },
    });

    console.log('응답 데이터:', response.data);
    return response.data;
  } catch (error) {
    console.error('게시물 상세보기 실패:', error);
    throw error;
  }
};

// export const postShare Api 추가되면 ㅇㅇ
