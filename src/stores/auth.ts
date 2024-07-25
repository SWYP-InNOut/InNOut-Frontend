import { create } from 'zustand';
import axios from 'axios';
import { HTTP_URL } from '@apis/auth';

const apiClient = axios.create({
  baseURL: HTTP_URL, // API의 기본 URL
  withCredentials: true, // 쿠키를 포함한 요청을 보낼 때 필요
});

interface AuthState {
  isLoggedIn: boolean;
  memberId: number | null;
}

interface AuthAction {
  login: (email: string, password: string) => Promise<void>;
  reLogin: () => Promise<boolean>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState & AuthAction>((set, get) => ({
  isLoggedIn: false,
  memberId: null,
  login: async (accessToken, userId) => {
    try {
      if (accessToken) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        set({ isLoggedIn: true, memberId: 10 });
      }
    } catch (e) {
      console.error('로그인 중 오류 발생', e);
    }
  },
  reLogin: async () => {
    try {
      const response = await apiClient.post(
        '/auth/tokens',
        {},
        {
          withCredentials: true,
        }
      );

      const accessToken = response.headers['authorization']?.split(' ')[1];
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
}));

export default useAuthStore;
