import React from 'react';
import { KakaoIcon, GoogleIcon } from '@icons/index';
import { Col, Row } from '@components/common/flex/Flex';
import SocialButton from '@components/common/button/SocialButton';
import { colors } from '@styles/theme';
import styled from '@emotion/styled';
import Txt from '@components/common/text/Txt';

const handleKakaoLogin = () => {
  console.log('Kakao 로그인');
};
const handleGoogleLogin = () => {
  console.log('Google 로그인');
};

const SocialLogin = () => {
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
          onClick={handleKakaoLogin}
        />
      </Row>
    </Col>
  );
};

// width: 71px;
// height: 1px;

export default SocialLogin;

const Line = styled.div`
  background-color: ${colors.gray200};
  width: 100%;
  height: 1px;
`;
