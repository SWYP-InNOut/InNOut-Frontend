import React, { useState } from 'react';
import Layout from '@components/common/layout/Layout';
import Txt from '@components/common/text/Txt';
import { Logo, RightArrowIcon } from '@icons/index';
import TextInput from '@components/common/input/TextInput';
import { CONFIG, INPUT_TYPE } from '@constants/form';
import PrimaryButton from '@components/common/button/PrimaryButton';
import { Col, Row } from '@components/common/flex/Flex';
import { FormProvider, useForm } from 'react-hook-form';
import { css } from '@emotion/react';
import SocialLogin from '@components/auth/SocialLogin';
import { colors } from '@styles/theme';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { login } from '@apis/auth/auth';
import ErrorMessage from '@components/auth/ErrorMessage';

const Login = () => {
  const navigate = useNavigate();
  const methods = useForm<LoginRequestDTO>({ mode: 'onChange' });
  const [showError, setShowError] = useState(false);
  const {
    watch,
    formState: { isValid },
  } = methods;
  const loginMutation = useMutation(login, {
    onSuccess: (data) => {
      console.log('로그인 성공:', data);

      // 로그인 성공 후 리다이렉트 어디로
      navigate('/home');
    },
    onError: (error) => {
      console.error('로그인 실패:', error);
    },
  });

  const handleLogin = () => {
    const loginRequest: LoginRequestDTO = {
      email: watch(INPUT_TYPE.EMAIL),
      password: watch(INPUT_TYPE.PASSWORD),
    };

    loginMutation.mutate(loginRequest);
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleFindPassword = () => {
    navigate('/pwdsearch');
  };

  return (
    <Layout hasHeader={false}>
      <Col padding={'0 16px'} margin={'64px 0 0 0'}>
        <div
          css={css`
            width: 328px;
            height: auto;
            align-items: flex-end;
            margin-bottom: 32px;
          `}
        >
          <Txt variant="h32">
            만나서 반가워요 <Logo />
            <br />
            즐거운 작별을 시작해요!
          </Txt>
        </div>
        <FormProvider {...methods}>
          <Col gap={'24'}>
            <Col gap={'16'}>
              <TextInput id="email" placeholder="아이디(이메일)" />
              <TextInput id="password" placeholder="비밀번호(숫자, 영문, 특수문자 8~20자리)" />
            </Col>
            <Col gap={'12'} alignItems="center">
              <div
                css={css`
                  visibility: ${showError ? 'visible' : 'hidden'};
                `}
              >
                <ErrorMessage
                  content={'가입되지 않은 이메일이거나 잘못된 비밀번호입니다'}
                  isError={true}
                  justifyContent={'center'}
                />
              </div>

              <PrimaryButton title="로그인" onClick={handleLogin} />
              <Txt
                variant="t16"
                align="center"
                onClick={handleFindPassword}
                style={{ cursor: 'pointer' }}
              >
                아이디(이메일)·비밀번호 찾기
              </Txt>
            </Col>
          </Col>
        </FormProvider>
        <SocialLogin />
        <Row
          gap={'12'}
          alignItems={'flex-end'}
          margin={'48px 0 0 0'}
          justifyContent={'space-between'}
        >
          <Txt variant="t20">
            아직,
            <br /> in&out 친구가 아니라면
          </Txt>
          <SignUpButton onClick={handleSignup}>
            <Txt variant="t16" color={colors.white}>
              회원가입
            </Txt>
            <RightArrowIcon />
          </SignUpButton>
        </Row>
      </Col>
    </Layout>
  );
};

export default Login;

const SignUpButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 16px;
  height: 32px;
  background-color: ${colors.black};
  border-radius: 999px;
  cursor: pointer;
`;
