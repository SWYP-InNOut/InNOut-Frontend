import { create } from 'zustand';
import axios, { AxiosHeaders } from 'axios';
import { HTTP_URL } from '@apis/auth';
import { persist } from 'zustand/middleware';

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
}

interface AuthAction {
  login: (email: string, password: string) => Promise<void>;
  reLogin: () => Promise<boolean>;
  logout: () => Promise<void>;
}

export const useAuthStore = create(
  persist<AuthState & AuthAction>(
    (set, get) => ({
      isLoggedIn: false,
      memberId: null,
      login: async (accessToken, userId) => {
        try {
          if (accessToken) {
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            set({ isLoggedIn: true, memberId: 1 });
          }
        } catch (e) {
          console.error('로그인 중 오류 발생', e);
        }
      },
      reLogin: async () => {
        try {
          const response = await apiClient.post(
            `${HTTP_URL}/regenerate-token`,
            {},
            {
              withCredentials: true,
            }
          );
          const headers = response.headers as AxiosHeaders;
          const accessToken = String(headers.getAuthorization()).split(' ')[1];
          const { userId } = response.data;

          if (accessToken) {
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            set({ isLoggedIn: true, memberId: userId });
            return true;
          } else {
            return false;
          }
        } catch (e) {
          set({ isLoggedIn: false });
          console.error('토큰 갱신 중 오류 발생', e);
          return false;
        }
      },
      logout: async () => {
        try {
          await apiClient.post(
            '/auth/logout',
            {},
            {
              withCredentials: true,
            }
          );
        } catch (e) {
          console.error('로그아웃 중 오류 발생', e);
        } finally {
          set({ isLoggedIn: false, memberId: null });
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
