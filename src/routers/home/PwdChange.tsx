import ErrorMessage from '@components/auth/ErrorMessage';
import ChangeProperty from '@components/ChangeProperty';
import ToastBar from '@components/common/alert/ToastBar';
import PrimaryButton from '@components/common/button/PrimaryButton';
import { Col } from '@components/common/flex/Flex';
import Layout from '@components/common/layout/Layout';
import Txt from '@components/common/text/Txt';
import { css } from '@emotion/react';
import { CloseIcon } from '@icons/index';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PwdChange = () => {
  const navigate = useNavigate();
  const [isCorrect, setIsCorrect] = useState(true);
  const [pwd, setPwd] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const handleOk = () => {
    console.log('확인');
  };

  // 확인 클릭 후 성공하면 띄우기  -> api 연결 후 수정
  const handleToast = () => {
    setToastVisible(!toastVisible);
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
      <Col gap={'66'} padding={'0 16px'} margin={'185px 0 0 0 '}>
        <ChangeProperty title="비밀번호" id={'PASSWORD'} placeholder="비밀번호 입력" />
        <Col gap={'12'}>
          <div
            css={css`
              visibility: ${isCorrect ? 'visible' : 'hidden'};
            `}
          >
            <ErrorMessage
              content={'비밀번호가 일치하지 않습니다'}
              isError={'error'}
              justifyContent={'center'}
            />
          </div>
          <PrimaryButton title="확인" onClick={handleToast} />
        </Col>
      </Col>
      <ToastBar message="비밀번호가 변경됐어요" isVisible={toastVisible} onHide={handleToast} />
    </Layout>
  );
};

export default PwdChange;
