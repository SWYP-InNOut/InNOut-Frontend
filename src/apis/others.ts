import { BaseResponse } from '@interfaces/api/base';
import {
  OthersStuffListResponseDTO,
  RoomRequestDTO,
  ShareLinkResponseDTO,
} from '@interfaces/api/room';
import { apiClient } from './axios';

//타사용자룸 링크공유
export const getLink = async (ownerId: number): Promise<BaseResponse<ShareLinkResponseDTO>> => {
  try {
    const response = await apiClient.get(`/myroom/link?ownerId=${ownerId}`);
    return response.data;
  } catch (error) {
    console.error('타사용자룸 링크공유:', error);
    throw error;
  }
};

//타사용자룸 전체보기(방문자순)
export const getOthers = async (): Promise<BaseResponse<OthersStuffListResponseDTO[]>> => {
  try {
    const response = await apiClient.get('/others');
    return response.data;
  } catch (error) {
    console.error('타사용자게시물 전체보기(방문자순) 실패:', error);
    throw error;
  }
};

//특정 사용자 룸 / 물건 리스트
export const postOthersRoom = async (request: RoomRequestDTO): Promise<BaseResponse<string>> => {
  try {
    const response = await apiClient.post('/others/room', request);
    return response.data;
  } catch (error) {
    console.error('특정 사용자 룸 / 물건 리스트 실패:', error);
    throw error;
  }
};

// /others/post/{postId}
//특정 사용자 게시물 상세보기
export const getOthersRoompost = async (
  memberId: string,
  postId: number
): Promise<BaseResponse<string>> => {
  try {
    const response = await apiClient.get(`/others/post/${postId}`, {
      params: { memberId: memberId },
    });
    return response.data;
  } catch (error) {
    console.error('특정 사용자 게시물 상세보기 실패:', error);
    throw error;
  }
};
