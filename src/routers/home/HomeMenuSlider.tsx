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
import { useNavigate } from 'react-router-dom';
import AlertModal from '@components/common/alert/AlertModal';
import PrimaryButton from '@components/common/button/PrimaryButton';

const HomeMenuSlider = ({ isOpen, handleMenu }: { isOpen: boolean; handleMenu: () => void }) => {
  const [isOn, setIsOn] = useState(false);
  const [isLogoutAlert, setIsLogoutAlert] = useState(false);
  const navigate = useNavigate();
  const handleNickNameChange = () => {
    navigate('/nickname');
  };
  const handlePwdChange = () => {
    navigate('/pwd');
  };

  return (
    <>
      <AlertModal
        isOpen={isLogoutAlert}
        content={
          <Col gap={'12'} alignItems="center">
            <Txt variant="t20">로그아웃 하시겠어요?</Txt>
            <Txt variant="b16">다음에 또 만나요!</Txt>
          </Col>
        }
        button={
          <Col gap={'8'}>
            <PrimaryButton
              title="로그아웃"
              onClick={() => {
                console.log('로그아웃');
                // TODO: 로그아웃 로직 추가
                setIsLogoutAlert(false);
              }}
              color={colors.red600}
              fontColor={colors.white}
            />
            <PrimaryButton
              title="취소"
              onClick={() => {
                console.log('취소');
                setIsLogoutAlert(false);
              }}
              color={colors.lightGray}
              fontColor={colors.gray100}
            />
          </Col>
        }
      />
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
              <Row
                gap={8}
                onClick={handleNickNameChange}
                css={css`
                  cursor: pointer;
                `}
              >
                <IdCardIcon />
                <Txt variant="b16" lineHeight={32}>
                  닉네임 변경
                </Txt>
              </Row>
              <NextIcon />
            </Row>
            <Row alignItems="center" justifyContent="space-between">
              <Row
                gap={8}
                onClick={handlePwdChange}
                css={css`
                  cursor: pointer;
                `}
              >
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
              <Row gap={8} alignItems="end">
                <PrivateIcon />
                <Col>
                  <Txt variant="b16" lineHeight={24}>
                    나의 홈 공개
                  </Txt>
                  <Txt variant="c11" lineHeight={11} color={colors.lightGray}>
                    다른 홈 구경에서 나의 홈을 공개할 수 있어요
                  </Txt>
                </Col>
              </Row>
              <Toggle on={isOn} handleToggle={() => setIsOn(!isOn)} />
            </Row>
            <Row
              alignItems="center"
              justifyContent="space-between"
              css={css`
                cursor: pointer;
              `}
              onClick={() => {
                setIsLogoutAlert(true);
              }}
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
    </>
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
  height: calc(var(--vh, 1vh) * 100);
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
