import { Col, Row } from '@components/common/flex/Flex';
import Layout from '@components/common/layout/Layout';
import Txt from '@components/common/text/Txt';
import { css } from '@emotion/react';
import { LogoIcon, MenuIcon, PencilIcon } from '@icons/index';
import { colors } from '@styles/theme';
import { ChattingBox } from './MyHome.styles';
import HomeMenuSlider from './HomeMenuSlider';
import { useState } from 'react';
import CardList from '@components/home/post/CardList';
import Filter from '@components/common/filter/Filter';
import styled from '@emotion/styled';
import PreviewChat from '@components/chat/PreviewChat';

const MyHome = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectList, setSelectList] = useState(['최신순', 'In 많은순', 'Out 많은순', '오래된순']);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('최신순');

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Layout
      overflow={isOpen ? 'hidden' : 'auto'}
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
      <Col padding={'0 16px'}>
        <PreviewChat />
      </Col>

      <Row
        padding={'0 16px'}
        justifyContent={'flex-end'}
        css={css`
          width: 100%;
        `}
      >
        <Filter
          selectList={selectList}
          isOpen={isFilterOpen}
          handleIsOpen={toggleFilter}
          selected={selectedFilter}
          handleSelect={setSelectedFilter}
          onClick={toggleFilter}
        />
      </Row>

      <div
        css={css`
          padding: 0 16px 20px;
        `}
      >
        <CardList
          imgList={['https://via.placeholder.com/150', 'https://via.placeholder.com/150']}
        />
      </div>
      <Col
        padding={'29.5px 0'}
        css={css`
          background-color: ${colors.yellow300};
          text-align: center;
        `}
      >
        <Txt variant="b16" color={colors.lightGray}>
          stuffinout@gmail.com
        </Txt>
        <Txt variant="c11" color={colors.lightGray}>
          Copyright ©Teamname. All rights reserved.
        </Txt>
      </Col>
      <HomeMenuSlider isOpen={isOpen} handleMenu={toggleMenu} />
      <StyledPencilIcon />
      <AddButton />
    </Layout>
  );
};

export default MyHome;

const StyledPencilIcon = styled(PencilIcon)`
  width: 56px; /* 기본 너비 */
  height: 56px;
  position: fixed;
  bottom: 40px;
  right: 16px; /* 기본 위치 */
  filter: drop-shadow(0px 1px 8px rgba(165, 60, 14, 0.3))
    drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.3));
  @media (min-width: 513px) {
    right: calc((100vw - 512px) / 2 + 16px); /* 화면 너비가 512px을 초과할 때 조정 */
  }
`;

const AddButton = styled.button`
  width: 56px;
  height: 56px;
  position: fixed;
  bottom: 40px;
  right: 16px;
  z-index: 2;
  border-radius: 18px;
  &:active {
    background: rgba(97, 59, 42, 0.3);
  }
  @media (min-width: 513px) {
    right: calc((100vw - 512px) / 2 + 16px); /* 화면 너비가 512px을 초과할 때 조정 */
  }
`;
