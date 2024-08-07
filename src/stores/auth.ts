import { create } from 'zustand';
import axios, { AxiosError, AxiosHeaders, AxiosResponse } from 'axios';
import { HTTP_URL } from '@apis/auth';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '@apis/axios';

interface AuthState {
  isLoggedIn: boolean;
  memberId: number | null;
  nickname: string | null;
  memberImageId: number | null;
  isPublic: boolean | null;
}

interface AuthAction {
  login: (response: AxiosResponse) => Promise<void>;
  reLogin: () => Promise<boolean>;
  logout: () => Promise<void>;
  settingIsPublic: (isPublic: boolean) => void;
  updateProfile: (nickname: string, memberImageId: number) => void;
  storeProfile: (memberId: number, memberImageId: number, accessToken: string) => void;
  settingIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const useAuthStore = create(
  persist<AuthState & AuthAction>(
    (set, get) => ({
      isLoggedIn: false,
      memberId: null,
      nickname: null,
      memberImageId: null,
      isPublic: null,
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
              memberImageId: data.memberImageId,
              isPublic: null,
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
          set({
            isLoggedIn: false,
            memberId: null,
            nickname: null,
            memberImageId: null,
            isPublic: null,
          });
          console.error('토큰 갱신 중 오류 발생', e);
          return false;
        }
      },
      logout: async () => {
        try {
          const response: AxiosResponse = await apiClient.post('/logout');
          apiClient.defaults.withCredentials = true;
          console.log('로그아웃 성공', response.data);
          set({
            isLoggedIn: false,
            memberId: null,
            nickname: null,
            isPublic: null,
            memberImageId: null,
          });
          apiClient.defaults.headers.common['Authorization'] = '';
        } catch (e) {
          console.error('로그아웃 중 오류 발생', e);
        }
      },
      settingIsPublic: (isPublic: boolean) => {
        set({ isPublic });
      },
      settingIsLoggedIn: (isLoggedIn: boolean) => {
        set({ isLoggedIn });
      },
      updateProfile: (nickname: string, memberImageId: number) => {
        set((state) => ({
          ...state,
          nickname,
          memberImageId,
        }));
      },
      storeProfile: (memberId: number, memberImageId: number, accessToken: string) => {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        set((state) => ({
          ...state,
          memberId,
          memberImageId,
        }));
      },
    }),
    {
      name: 'userLoginStatus',
    }
  )
);

export default useAuthStore;
