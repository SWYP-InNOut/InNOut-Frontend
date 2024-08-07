import { BaseResponse } from '@interfaces/api/base';
import { IsPublicResponseDTO, MyRoomResponseDTO, RoomRequestDTO } from '@interfaces/api/room';
import { c } from 'node_modules/vite/dist/node/types.d-aGj9QkWt';
import { apiAnonymousClient, apiClient } from './axios';

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

export const getRoom = async (
  request: RoomRequestDTO
): Promise<BaseResponse<MyRoomResponseDTO>> => {
  try {
    const response = await apiAnonymousClient.post('/myroom', request);
    return response.data;
  } catch (error) {
    console.error('홈화면 / 내 물건 리스트 실패:', error);
    throw error;
  }
};

//게시물 등록
export const postMyRoomAddStuff = async (request: FormData): Promise<BaseResponse<any>> => {
  try {
    const response = await apiClient.post('/myroom/addstuff', request, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('게시물 등록 실패:', error);
    throw error;
  }
};

//게시물 수정
export const postMyRoomModifyStuff = async (request: FormData): Promise<BaseResponse<any>> => {
  try {
    const response = await apiClient.post('/myroom/updatestuff', request, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
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

export const getRoomPost = async (
  memberId: number,
  postId: number
): Promise<BaseResponse<string>> => {
  try {
    const response = await apiAnonymousClient.get(`/myroom/post/postId=${postId}`, {
      params: { memberId: memberId },
    });
    return response.data;
  } catch (error) {
    console.error('게시물 상세보기 실패:', error);
    throw error;
  }
};

// export const postShare Api 추가되면 ㅇㅇ
