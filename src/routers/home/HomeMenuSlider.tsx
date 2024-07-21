import { Col, Row } from '@components/common/flex/Flex';
import Txt from '@components/common/text/Txt';
import { colors } from '@styles/theme';
import styled from '@emotion/styled';
import {
  CloseIcon,
  IdCardIcon,
  LockIcon,
  LogoIcon,
  LogoutIcon,
  NextIcon,
  PrivateIcon,
  SearchIcon,
} from '@icons/index';
import { css } from '@emotion/react';
import Toggle from '@components/home/toggle/Toggle';
import { useState } from 'react';

const HomeMenuSlider = ({ isOpen, handleMenu }: { isOpen: boolean; handleMenu: () => void }) => {
  const [isOn, setIsOn] = useState(false);

  return (
    <HomeMenuSliderContainer right={isOpen ? '0%' : '100%'}>
      <Col
        padding={'28px 0 0'}
        gap={'24'}
        css={css`
          height: inherit;
        `}
      >
        <Row padding={'0 16px'} gap={'4'} justifyContent="flex-end" alignItems="center">
          <button
            onClick={handleMenu}
            css={css`
              cursor: pointer;
            `}
          >
            <CloseIcon />
          </button>
        </Row>
        <Row padding={'0 28px 64px'} gap={'4'} justifyContent="start" alignItems="end">
          <Txt variant="h28" lineHeight={42}>
            사용자닉네임최대길이
          </Txt>
          <Txt variant="t18" color={colors.lightGray}>
            님의 홈
          </Txt>
        </Row>
        <Row
          padding={'0 16px'}
          gap={'8'}
          alignItems="center"
          onClick={() => console.log('다른홈가기')}
          css={css`
            cursor: pointer;
          `}
        >
          <SearchIcon />
          <Txt variant="t18" lineHeight={32}>
            다른 홈 구경
          </Txt>
        </Row>
        <Devider />
        <Col padding={'0 16px'} gap={'16'}>
          <Txt variant="t20">설정</Txt>
          <Row alignItems="center" justifyContent="space-between">
            <Row gap={8}>
              <IdCardIcon />
              <Txt variant="b16" lineHeight={32}>
                닉네임 변경
              </Txt>
            </Row>
            <NextIcon />
          </Row>
          <Row alignItems="center" justifyContent="space-between">
            <Row gap={8}>
              <LockIcon />
              <Txt variant="b16" lineHeight={32}>
                비밀번호 변경
              </Txt>
            </Row>
            <NextIcon />
          </Row>
          <Row
            alignItems="center"
            justifyContent="space-between"
            onClick={() => console.log('나의 홈 대문')}
          >
            <Row gap={8}>
              <PrivateIcon />
              <Txt variant="b16" lineHeight={32}>
                나의 홈 대문
              </Txt>
            </Row>
            <Toggle on={isOn} handleToggle={() => setIsOn(!isOn)} />
          </Row>
          <Row
            alignItems="center"
            justifyContent="space-between"
            onClick={() => console.log('로그아웃')}
          >
            <Row gap={8}>
              <LogoutIcon />
              <Txt variant="b16" lineHeight={32}>
                로그아웃
              </Txt>
            </Row>
            <NextIcon />
          </Row>
        </Col>
        <Devider />
        <Row gap={8} padding={'0 16px'} alignItems="center">
          <div
            css={css`
              width: 32px;
              height: 32px;
              background-color: #848484;
            `}
          />
          <Txt variant="t18" lineHeight={32}>
            팀 소개
          </Txt>
        </Row>
        <Col
          padding={'30px 7px 32px'}
          justifyContent="flex-end"
          css={css`
            flex-grow: 1;
          `}
        >
          <div
            css={css`
              width: 211px;
            `}
          >
            <LogoIcon />
          </div>
          <Col padding={'0 17px'} gap={8}>
            <Txt variant="b16" color={colors.lightGray}>
              stuffinout@gmail.com
            </Txt>
            <Txt variant="c11" color={colors.lightGray}>
              Copyright ©Teamname. All rights reserved.
            </Txt>
          </Col>
        </Col>
      </Col>
    </HomeMenuSliderContainer>
  );
};

const Devider = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${colors.gray100};
`;

const HomeMenuSliderContainer = styled.div<{ right: string }>`
  position: absolute;
  top: 0;
  right: ${(props) => props.right};
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  overflow-x: hidden;
  transition: 0.5s;
  background-color: ${colors.white};
  z-index: 100;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default HomeMenuSlider;
