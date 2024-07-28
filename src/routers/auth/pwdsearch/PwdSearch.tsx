import { Col } from '@components/common/flex/Flex';
import Layout from '@components/common/layout/Layout';
import Txt from '@components/common/text/Txt';
import React, { useState } from 'react';
import { colors } from '@styles/theme';
import TextInput from '@components/common/input/TextInput';
import { FormProvider, useForm } from 'react-hook-form';
import PrimaryButton from '@components/common/button/PrimaryButton';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '@components/auth/ErrorMessage';
import { css } from '@emotion/react';
import SendEmail from '@components/common/sendEmail/SendEmail';
import { useMutation } from 'react-query';
import { postSearchPassword } from '@apis/user';

const PwdSearch = () => {
  const navigate = useNavigate();
  const methods = useForm<PwdSearchRequestDTO>({ mode: 'onChange' });
  const [showError, setShowError] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const {
    watch,
    getValues,
    formState: { isValid },
  } = methods;

  const pwdSearchMutation = useMutation(postSearchPassword, {
    onSuccess: (data) => {
      console.log('비밀번호 찾기 성공:', data);
      if (data.code === 1000) {
        setIsComplete(true);
      } else {
        setShowError(true);
      }
    },
    onError: (error) => {
      console.error('비밀번호 찾기 실패:', error);
      setShowError(true);
    },
  });

  const handlePwdSend = () => {
    const email = getValues('email');
    console.log('임시 비밀번호 전송');
    if (email) {
      pwdSearchMutation.mutate(email);
    } else {
      setShowError(true);
    }
  };

  const handleGoToLogin = () => {
    console.log('로그인 화면으로 이동');
    navigate('/login');
  };

  return (
    <Layout hasHeader={false}>
      <Col padding={'0 16px'} margin={'64px 0 0 0'}>
        {isComplete ? (
          <SendEmail type="pwd" />
        ) : (
          <>
            <Col gap={'4'}>
              <Txt variant="h32">
                가입정보를 잊으셨나요? <br />
                in&out이 도와드릴게요
              </Txt>
              <Txt variant="b16" color={colors.lightGray}>
                가입한 이메일을 입력해주세요
                <br />
                메일로 임시 비밀번호를 전송해드릴게요
              </Txt>
            </Col>
            <Col gap={'8'} margin={'66px 0 53px 0'}>
              <Txt variant="t20">이메일</Txt>
              <FormProvider {...methods}>
                <TextInput id="email" placeholder="example@gmail.com" />
              </FormProvider>
            </Col>
            <Col gap={'12'}>
              <div
                css={css`
                  visibility: ${showError ? 'visible' : 'hidden'};
                `}
              >
                <ErrorMessage
                  content={'가입되지 않은 회원 정보입니다'}
                  isError={'error'}
                  justifyContent={'center'}
                />
              </div>
              <Col gap={'16'}>
                <PrimaryButton title={'임시 비밀번호 전송'} onClick={handlePwdSend} />
                <PrimaryButton
                  title={'로그인 화면으로'}
                  onClick={handleGoToLogin}
                  color={colors.lightGray}
                />
              </Col>
            </Col>
          </>
        )}
      </Col>
    </Layout>
  );
};

export default PwdSearch;
