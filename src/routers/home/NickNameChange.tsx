import Layout from '@components/common/layout/Layout';
import Txt from '@components/common/text/Txt';
import React, { useEffect, useState } from 'react';
import { CloseIcon } from '@icons/index';
import ChangeProperty from '@components/ChangeProperty';
import ErrorMessage from '@components/auth/ErrorMessage';
import PrimaryButton from '@components/common/button/PrimaryButton';
import { Col } from '@components/common/flex/Flex';
import { css } from '@emotion/react';
import { generateNickname } from '@utils/generateNickname';
import { useNavigate } from 'react-router-dom';
import ToastBar from '@components/common/alert/ToastBar';

const NickNameChange = () => {
  const navigate = useNavigate();
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [nickname, setNickname] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  // 확인 클릭 후 성공하면 띄우기  -> api 연결 후 수정
  const handleToast = () => {
    setToastVisible(!toastVisible);
  };
  useEffect(() => {
    // setIsDuplicate()
    // 현재 자신의 닉네임 placeholder로 설정
  }, []);
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
        />
        <Col gap={'12'}>
          <div
            css={css`
              visibility: ${isDuplicate ? 'visible' : 'hidden'};
            `}
          >
            <ErrorMessage
              content={'이미 사용 중인 닉네임입니다'}
              isError={'error'}
              justifyContent={'center'}
            />
          </div>
          <PrimaryButton title="확인" onClick={handleToast} />
        </Col>
      </Col>
      <ToastBar message="닉네임이 변경됐어요" isVisible={toastVisible} onHide={handleToast} />
    </Layout>
  );
};

export default NickNameChange;
