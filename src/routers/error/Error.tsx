import PrimaryButton from '@components/common/button/PrimaryButton';
import { Col } from '@components/common/flex/Flex';
import Layout from '@components/common/layout/Layout';
import Txt from '@components/common/text/Txt';
import { css } from '@emotion/react';
import { ErrorImg } from '@icons/index';
import { colors } from '@styles/theme';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error = () => {
  const navigate = useNavigate();

  const handleBtn = () => {
    navigate('/login');
  };
  return (
    <Col gap={'78'} margin={'64px 0 0 0'} padding={'0 16px'}>
      <Col gap={'4'}>
        <Txt variant="h32">
          이메일 인증
          <br /> 유효기간이 만료됐어요
        </Txt>
        <Txt variant="b16" color={colors.lightGray}>
          이전에 보내드린 이메일로는 완료할 수 없어요
        </Txt>
      </Col>
      <ErrorImg
        css={css`
          width: 100%;
          height: auto;
        `}
      />
      <PrimaryButton title="처음으로" onClick={handleBtn} />
    </Col>
  );
};

export default Error;
