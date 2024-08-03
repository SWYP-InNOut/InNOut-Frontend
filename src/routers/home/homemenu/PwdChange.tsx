import React, { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getPassword, postPassword } from '@apis/user';
import ErrorMessage from '@components/auth/ErrorMessage';
import ChangeProperty from '@components/ChangeProperty';
import ToastBar from '@components/common/alert/ToastBar';
import PrimaryButton from '@components/common/button/PrimaryButton';
import { Col } from '@components/common/flex/Flex';
import Layout from '@components/common/layout/Layout';
import Txt from '@components/common/text/Txt';
import { css } from '@emotion/react';
import { CloseIcon } from '@icons/index';

const PwdChange = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('check');
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmNewPwd, setConfirmNewPwd] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [isNowPwdError, setIsNowPwdError] = useState(false);
  const [isNewPwdError, setIsNewPwdError] = useState(false);

  useEffect(() => {
    if (newPwd !== confirmNewPwd) {
      setIsNewPwdError(true);
    } else {
      setIsNewPwdError(false);
    }
  }, [newPwd, confirmNewPwd]);

  const checkPasswordMutation = useMutation(getPassword, {
    onSuccess: (data) => {
      if (data.code === 1000) {
        setStep('change');
        setCurrentPwd('');
        setIsNowPwdError(false);
      } else if (data.code === 5007) {
        console.error('비밀번호 확인 실패:', data);
        setIsNowPwdError(true);
      }
    },
    onError: (error) => {
      console.error('비밀번호 확인 실패:', error);
      setIsNowPwdError(true);
    },
  });

  const changePasswordMutation = useMutation(postPassword, {
    onSuccess: (data) => {
      if (data.code === 1000) {
        console.log('비밀번호 변경 성공:', data);
        setToastVisible(true);
        setTimeout(() => navigate(-1), 1000);
      } else {
        console.error('비밀번호 변경 실패:', data);
      }
    },
    onError: (error) => {
      console.error('비밀번호 변경 실패:', error);
    },
  });

  const handleSubmit = () => {
    if (step === 'check') {
      console.log('currentPwd:', currentPwd);
      checkPasswordMutation.mutate(currentPwd);
    } else {
      if (newPwd === confirmNewPwd) {
        changePasswordMutation.mutate(newPwd);
      }
    }
  };

  return (
    <Layout
      hasHeader={true}
      HeaderCenter={<Txt variant="t20">비밀번호 변경</Txt>}
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
      {step === 'check' ? (
        <>
          <Col gap={'215'} padding={'0 16px'} margin={'179px 0 0 0 '}>
            <ChangeProperty
              title="현재 비밀번호"
              id={'PASSWORD'}
              placeholder="비밀번호(숫자, 영문, 특수문자 8~20자리)"
              onChange={(value) => setCurrentPwd(value)}
              content={currentPwd}
              newPassword={false}
              isPassword={true}
            />
            <Col gap={'12'}>
              {isNowPwdError && (
                <ErrorMessage
                  content={'비밀번호가 일치하지 않습니다'}
                  isError={'error'}
                  justifyContent={'center'}
                />
              )}
              <PrimaryButton title="확인" onClick={handleSubmit} disabled={!currentPwd} />
            </Col>
          </Col>
        </>
      ) : (
        <>
          <Col gap={'66'} padding={'0 16px'}>
            <Col gap={'40'} margin={'96px 0 0 0'}>
              <ChangeProperty
                title="새 비밀번호"
                id={'PASSWORD'}
                placeholder="비밀번호 입력"
                onChange={(value) => setNewPwd(value)}
                newPassword={true}
                content={newPwd}
                isPassword={true}
              />
              <ChangeProperty
                title="새 비밀번호 확인"
                id={'PASSWORD'}
                placeholder="비밀번호 재입력"
                onChange={(value) => setConfirmNewPwd(value)}
                newPassword={false}
                content={confirmNewPwd}
                isPassword={true}
              />
            </Col>

            <Col gap={'12'}>
              {isNewPwdError && (
                <ErrorMessage
                  content={'비밀번호가 일치하지 않습니다'}
                  isError={'error'}
                  justifyContent={'center'}
                />
              )}
              <PrimaryButton
                title="확인"
                onClick={handleSubmit}
                disabled={!newPwd || !confirmNewPwd || isNewPwdError}
              />
            </Col>
          </Col>
        </>
      )}
      <ToastBar
        message="비밀번호가 변경됐어요"
        isVisible={toastVisible}
        onHide={() => setToastVisible(false)}
      />
    </Layout>
  );
};

export default PwdChange;
