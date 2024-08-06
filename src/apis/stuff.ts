import { BaseResponse } from '@interfaces/api/base';
import { apiClient } from './axios';

// POST
export const postInOut = async (
  request: InOutRequestDTO
): Promise<BaseResponse<InOutResponseDTO>> => {
  try {
    const response = await apiClient.post<BaseResponse<InOutResponseDTO>>(`/inout`, request);
    return response.data;
  } catch (error) {
    throw error;
  }
};
