import useAuthStore from '@stores/auth';
import { HTTP_URL } from './auth';
import axios from 'axios';

export const apiAnonymousClient = axios.create({
  baseURL: HTTP_URL, // API의 기본 URL
});

export const apiClient = axios.create({
  baseURL: HTTP_URL, // API의 기본 URL
  withCredentials: true, // 쿠키를 포함한 요청을 보낼 때 필요
});

apiClient.interceptors.response.use(
  (response) => {
    // 응답이 성공적인 경우 그대로 반환
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    // accessToken 만료를 나타내는 상태 코드(예: 401) 검사
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 재시도 플래그 설정
      const isReLoginSuccess = await useAuthStore.getState().reLogin(); // reLogin 실행
      if (isReLoginSuccess) {
        // reLogin 성공 시, 원래 요청을 새로운 accessToken으로 재시도
        return apiClient(originalRequest);
      }
    }
    // reLogin 실패 또는 다른 모든 경우의 에러를 그대로 반환

    return Promise.reject(error);
  }
);
