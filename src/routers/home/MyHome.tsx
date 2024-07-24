import { Col, Row } from '@components/common/flex/Flex';
import Layout from '@components/common/layout/Layout';
import Txt from '@components/common/text/Txt';
import { css } from '@emotion/react';
import { LogoIcon, MenuIcon } from '@icons/index';
import { colors } from '@styles/theme';
import { ChattingBox } from './MyHome.styles';
import HomeMenuSlider from './HomeMenuSlider';
import { useState } from 'react';
import CardList from '@components/home/post/CardList';

const MyHome = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Layout
      hasHeader={true}
      HeaderLeft={
        <button
          css={css`
            background-color: transparent;
            border: none;
            cursor: pointer;
          `}
          onClick={toggleMenu}
        >
          <MenuIcon />
        </button>
      }
      HeaderCenter={
        <div
          css={css`
            width: 104px;
          `}
        >
          <LogoIcon />
        </div>
      }
      HeaderRight={
        <button
          css={css`
            width: 29px;
            cursor: pointer;
          `}
        >
          <Txt variant="b16" color={colors.yellow700}>
            공유
          </Txt>
        </button>
      }
    >
      <Col padding={'24px 28px'}>
        <Row gap={'4'} justifyContent="start" alignItems="end">
          <Txt variant="h28" lineHeight={42}>
            사용자닉네임최대길이
          </Txt>
          <Txt variant="t18" color={colors.lightGray}>
            님의 홈
          </Txt>
        </Row>
      </Col>
      <Col padding={'0 16px'} gap={24}>
        <ChattingBox></ChattingBox>
        <CardList imgList={[]} />
      </Col>
      <HomeMenuSlider isOpen={isOpen} handleMenu={toggleMenu} />
    </Layout>
  );
};

export default MyHome;
