import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import axios from 'axios';

const KakaoRedirect = () => {
  const navigate = useNavigate();
  console.log('카카오 로그인 처리 중...');
  const kakaoLogin = async (code: string) => {
    console.log('카카오 로그인 요청:', code);
    try {
      const response = await axios.get(`https://api.stuffinout.site/kakaologin?code=${code}`, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
      });
      return response.data;
    } catch (error) {
      console.error('카카오 로그인 실패:', error);
      throw error;
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
    console.log('카카오 로그인 처리 중...');
    const code = new URL(window.location.href).searchParams.get('code');
    console.log('code', code);
    if (code) {
      mutation.mutate(code);
    }
  }, [mutation]);

  return <div>카카오 로그인 처리 중...</div>;
};

export default KakaoRedirect;
