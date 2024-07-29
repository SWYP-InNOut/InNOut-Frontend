import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { css } from '@emotion/react';
import Layout from '@components/common/layout/Layout';
import Txt from '@components/common/text/Txt';
import { CloseIcon } from '@icons/index';
import ChangeProperty from '@components/ChangeProperty';
import ErrorMessage from '@components/auth/ErrorMessage';
import PrimaryButton from '@components/common/button/PrimaryButton';
import { Col } from '@components/common/flex/Flex';
import ToastBar from '@components/common/alert/ToastBar';
import { postNickName } from '@apis/user';
import { CONFIG, INPUT_TYPE } from '@constants/form';

const NickNameChange = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [isDuplicateNickname, setIsDuplicateNickname] = useState(false);
  const [isValidNickname, setIsValidNickname] = useState(false);

  const nicknameMutation = useMutation(postNickName, {
    onSuccess: (data) => {
      if (data.code === 1000) {
        setToastVisible(true);
        setTimeout(() => {
          navigate(-1);
        }, 2000);
      } else if (data.code === 5005) {
        // 중복된 닉넴 처리
        console.log('중복된 닉네임');
        setIsDuplicateNickname(true);
        console.log('isDuplicateNickname:', isDuplicateNickname);
      }
    },
    onError: (error) => {
      console.error('닉네임 변경 실패:', error);
    },
  });

  const handleNicknameChange = useCallback((value: string) => {
    setNickname(value);
    const isValid = CONFIG.NICKNAME.validation?.every((rule) => rule.pattern.test(value)) ?? false;
    setIsValidNickname(isValid);
  }, []);

  const handleSubmit = useCallback(() => {
    if (isValidNickname) {
      nicknameMutation.mutate(nickname);
    }
  }, [isValidNickname, nickname, nicknameMutation]);

  useEffect(() => {
    setIsDuplicateNickname(false);
  }, [nickname]);

  const isButtonDisabled =
    !isValidNickname || isDuplicateNickname || nicknameMutation.isLoading || !nickname.trim();

  return (
    <Layout
      hasHeader={true}
      HeaderCenter={<Txt variant="t20">닉네임 변경</Txt>}
      HeaderRight={
        <div
          css={css`
            cursor: pointer;
          `}
          onClick={() => navigate(-1)}
        >
          <CloseIcon />
        </div>
      }
    >
      <Col gap={'66'} padding={'0 16px'} margin={'185px 0 0 0 '}>
        <ChangeProperty
          title="닉네임"
          subtitle="톡톡 튀는 닉네임으로 내 모습을 보여줘요"
          content={nickname}
          id={'NICKNAME'}
          onChange={handleNicknameChange}
          isDuplicateNickname={isDuplicateNickname}
        />
        <Col gap={'12'}>
          <div
            css={css`
              visibility: ${isDuplicateNickname ? 'visible' : 'hidden'};
            `}
          >
            <ErrorMessage
              content={'이미 사용 중인 닉네임입니다'}
              isError={'error'}
              justifyContent="center"
            />
          </div>
          <PrimaryButton title="확인" onClick={handleSubmit} disabled={isButtonDisabled} />
        </Col>
      </Col>
      <ToastBar
        message="닉네임이 변경됐어요"
        isVisible={toastVisible}
        onHide={() => setToastVisible(false)}
      />
    </Layout>
  );
};

export default NickNameChange;
