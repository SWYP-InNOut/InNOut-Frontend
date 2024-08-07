import Layout from '@components/common/layout/Layout';
import Txt from '@components/common/text/Txt';
import { LeftArrowIcon } from '@icons/index';
import InOutTeam from '../../../assets/icons/InOutTeam.png';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const Introduce = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <Layout
      HeaderLeft={
        <LeftArrowIcon
          onClick={handleBack}
          css={css`
            cursor: pointer;
          `}
        />
      }
      HeaderCenter={<Txt variant="t20">팀 maximalist 소개</Txt>}
      Footer
    >
      <img
        src={InOutTeam}
        alt="introduce"
        css={css`
          margin-top: 12px;
        `}
      />
    </Layout>
  );
};

export default Introduce;
