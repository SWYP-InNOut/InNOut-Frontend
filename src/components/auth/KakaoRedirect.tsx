import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import axios from 'axios';

const KakaoRedirect = () => {
  const [code, setCode] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const urlCode = new URL(window.location.href).searchParams.get('code');
    console.log('urlCode:', urlCode);
    setCode(urlCode);
  }, []);

  const kakaoLogin = async (code: string) => {
    try {
      console.log('try:', code);
      const response = await axios.get(`https://api.stuffinout.site/kakaologin?code=${code}`, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
      });
      console.log('Response received:', response.data);
      return response;
    } catch (error) {
      console.error('카카오 로그인 실패:', error);
      throw error;
    }
  };

  const {
    mutate: loginMutate,
    isLoading,
    isError,
    data,
  } = useMutation(kakaoLogin, {
    onSuccess: (data) => {
      console.log('Login successful:', data);
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
