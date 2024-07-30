import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import axios from 'axios';

const KakaoRedirect = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState<string | null>(null);
  const navigate = useNavigate();

  const kakaoLogin = async (code: string) => {
    try {
      const response = await axios.get(`https://stuffinout.site/kakaologin?code=${code}`, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
      });
      return response.data;
    } catch (error) {
      console.error('카카오 로그인 실패:', error);
      throw error; // 에러를 throw하여 mutation의 onError가 호출되도록 함
    }
  };

  const mutation = useMutation(kakaoLogin, {
    onSuccess: (data) => {
      console.log('로그인 성공', data);
      localStorage.setItem('accessToken', data.result.accessToken);
      localStorage.setItem('memberId', data.result.memberId);
      // navigate('/');
    },
    onError: (error) => {
      console.error('로그인 실패', error);
      // navigate('/login');
    },
  });

  useEffect(() => {
    const urlCode = new URL(window.location.href).searchParams.get('code');
    setCode(urlCode);
  }, []);

  useEffect(() => {
    if (isLoading || !code) return;

    setIsLoading(true);
    mutation.mutate(code);
  }, [code]);

  if (isLoading) {
    return <div>카카오 로그인 처리 중...</div>;
  }

  return null;
};

export default KakaoRedirect;
