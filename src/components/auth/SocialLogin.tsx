import React, { useEffect } from 'react';
import { KakaoIcon, GoogleIcon } from '@icons/index';
import { Col, Row } from '@components/common/flex/Flex';
import SocialButton from '@components/common/button/SocialButton';
import { colors } from '@styles/theme';
import styled from '@emotion/styled';
import Txt from '@components/common/text/Txt';
import { useNavigate } from 'react-router-dom';

const KAKAO_REST_API_KEY = import.meta.env.VITE_REACT_APP_KAKAO_REST_API;
const KAKAO_REDIRECT_URI = import.meta.env.VITE_REACT_APP_KAKAO_REDIRECT_URI;
const link = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

const SocialLogin = () => {
  const navigate = useNavigate();

  const handleKakaoLogin = () => {
    window.location.href = link;
  };

  const handleGoogleLogin = () => {
    alert('Google 로그인 준비중');
  };
  return (
    <Col>
      <Row padding={'24px 0px 12px 0px'} gap={'12'} alignItems="center">
        <Line />
        <Txt variant="c14" color={colors.gray200} style={{ whiteSpace: 'nowrap' }}>
          또는 간편하게 SNS 계정으로
        </Txt>
        <Line />
      </Row>
      <Row gap={'8'}>
        <SocialButton
          title="Kakao로 함께하기"
          icon={<KakaoIcon />}
          color={colors.socialKakao}
          onClick={handleKakaoLogin}
        />
        <SocialButton
          title="Google로 함께하기"
          icon={<GoogleIcon />}
          color={colors.socialGoogle}
          onClick={handleGoogleLogin}
        />
      </Row>
    </Col>
  );
};

export default SocialLogin;

const Line = styled.div`
  background-color: ${colors.gray200};
  width: 100%;
  height: 1px;
`;
