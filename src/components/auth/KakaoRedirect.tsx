import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import axios from 'axios';
import useAuthStore from '@stores/auth';

interface KakaoLoginResponse {
  accessToken: string;
  memberId: number;
  memberImageId: number;
  member: boolean;
}

const KakaoRedirect = () => {
  const [code, setCode] = useState<string | null>(null);
  const navigate = useNavigate();
  const { storeProfile } = useAuthStore();

  useEffect(() => {
    const urlCode = new URL(window.location.href).searchParams.get('code');
    setCode(urlCode);
  }, []);

  const kakaoLogin = async (code: string) => {
    try {
      const response = await axios.get(`https://api.stuffinout.site/kakaologin?code=${code}`, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
      });
      console.log('Response received:', response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const {
    mutate: loginMutate,
    isLoading,
    isError,
    data,
  } = useMutation(kakaoLogin, {
    onSuccess: (data: KakaoLoginResponse) => {
      console.log('Login successful:', data);
      if (data.member) {
        storeProfile(data.memberId, data.memberImageId, data.accessToken);
        navigate('/');
      } else {
        storeProfile(data.memberId, data.memberImageId, data.accessToken);
        navigate('/setting');
      }
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });

  useEffect(() => {
    if (code) {
      loginMutate(code);
    }
  }, [code, loginMutate]);

  return <div>{isLoading ? '로그인 중...' : isError ? '로그인 실패' : '로그인 완료'}</div>;
};

export default KakaoRedirect;
