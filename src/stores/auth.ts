import { create } from 'zustand';
import axios, { AxiosHeaders, AxiosResponse } from 'axios';
import { HTTP_URL } from '@apis/auth';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';

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

interface AuthState {
  isLoggedIn: boolean;
  memberId: number | null;
  nickname: string | null;
}

interface AuthAction {
  login: (response: AxiosResponse) => Promise<void>;
  reLogin: () => Promise<boolean>;
  logout: () => Promise<void>;
}

export const useAuthStore = create(
  persist<AuthState & AuthAction>(
    (set, get) => ({
      isLoggedIn: false,
      memberId: null,
      nickname: null,
      login: async (response: AxiosResponse) => {
        try {
          const { data, headers } = response;
          const accessToken = headers.authorization.split(' ')[1];

          if (accessToken) {
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            set({
              isLoggedIn: true,
              memberId: data.memberId,
              nickname: data.nickname,
            });
          }
        } catch (e) {
          console.error('로그인 중 오류 발생', e);
        }
      },
      reLogin: async () => {
        try {
          const response = await apiClient.get('/regenerate-token');
          const headers = response.headers as AxiosHeaders;
          console.log('토큰 갱신 성공', response.data);
          const accessToken = String(headers.getAuthorization()).split(' ')[1];
          if (accessToken) {
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            apiClient.defaults.withCredentials = true;
            return true;
          } else {
            return false;
          }
        } catch (e) {
          set({ isLoggedIn: false, memberId: null, nickname: null });
          console.error('토큰 갱신 중 오류 발생', e);
          return false;
        }
      },
      logout: async () => {
        try {
          await apiClient.get('/logout', {
            withCredentials: false,
          });
        } catch (e) {
          console.error('로그아웃 중 오류 발생', e);
        } finally {
          set({ isLoggedIn: false, memberId: null, nickname: null });
          Cookies.remove('refreshToken'); // 쿠키 삭제 안됨... 왜 안될까
          apiClient.defaults.headers.common['Authorization'] = '';
        }
      },
    }),
    {
      name: 'userLoginStatus',
    }
  )
);

export default useAuthStore;
