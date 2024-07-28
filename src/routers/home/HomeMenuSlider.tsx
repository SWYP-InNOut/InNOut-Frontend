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
  TeamLogo,
} from '@icons/index';
import { css } from '@emotion/react';
import Toggle from '@components/home/toggle/Toggle';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertModal from '@components/common/alert/AlertModal';
import PrimaryButton from '@components/common/button/PrimaryButton';

import useAuthStore from '@stores/auth';
import { getIsPublic } from '@apis/myroom';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { set } from 'react-hook-form';
import { IsPublicResponseDTO } from '@interfaces/api/room';

const HomeMenuSlider = ({
  isOpen,
  handleMenu,
  isPublic,
}: {
  isOpen: boolean;
  isPublic: boolean;
  handleMenu: () => void;
}) => {
  const [isOn, setIsOn] = useState(false);
  const [isLogoutAlert, setIsLogoutAlert] = useState(false);
  const isLogin = useAuthStore((store) => store.isLoggedIn);
  const memberName = useAuthStore((store) => store.nickname);

  const getIsPublicMutation = useMutation(getIsPublic, {
    onSuccess: (data) => {
      console.log('공개 성공:', data.result);
      if (data.result as IsPublicResponseDTO) {
        setIsOn(data.result.public);
      }
    },
    onError: (error: AxiosError) => {
      console.error('공개 실패:', error);
    },
  });

  const navigate = useNavigate();
  const handleNickNameChange = () => {
    navigate('/nickname');
  };
  const handlePwdChange = () => {
    navigate('/pwd');
  };

  const handlePublic = () => {
    getIsPublicMutation.mutate();
    console.log();
    console.log('나의 홈 공개');
  };

  useEffect(() => {
    setIsOn(isPublic);
  }, []);

  const logout = useAuthStore((state) => state.logout);
  const renderTitle = () => {
    return isLogin ? (
      <Row padding={'0 28px 64px'} gap={'4'} justifyContent="start" alignItems="end">
        <Txt variant="h28" lineHeight={36}>
          {memberName}
        </Txt>
        <Txt variant="t18" color={colors.lightGray}>
          님의 홈
        </Txt>
      </Row>
    ) : (
      <Col padding={'0 0 64px'} justifyContent={'center'} alignItems={'center'}>
        <Txt variant="h28" lineHeight={42}>
          회원가입/로그인 하고
        </Txt>
        <Row justifyContent={'center'} alignItems={'center'} gap={4}>
          <span
            css={css`
              color: ${colors.black};
              font-size: 32px;
              font-weight: 600;
              font-family: 'Hancom Sans';
            `}
          >
            in&out
          </span>
          <Txt variant="h28" lineHeight={42}>
            에 함께해요
          </Txt>
        </Row>
      </Col>
    );
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
              onClick={async () => {
                console.log('로그아웃');
                try {
                  await logout();
                  console.log('로그아웃 성공');
                  setIsLogoutAlert(false);
                  navigate('/login');
                } catch (error) {
                  console.error('로그아웃 실패', error);
                }
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
          {renderTitle()}
          <Row
            padding={'0 16px'}
            gap={'8'}
            alignItems="center"
            onClick={() => alert('다른 홈 구경 기능은 준비중입니다.')}
            css={css`
              cursor: pointer;
            `}
          >
            <SearchIcon />
            <Txt variant="t18" lineHeight={32}>
              다른 홈 구경
            </Txt>
          </Row>
          {isLogin && (
            <>
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
                  <Row
                    gap={8}
                    alignItems="flex-end"
                    css={css`
                      width: auto;
                    `}
                  >
                    <PrivateIcon />
                    <Col
                      css={css`
                        width: auto;
                      `}
                    >
                      <Txt variant="b16" lineHeight={24}>
                        나의 홈 공개
                      </Txt>
                      <Txt variant="c11" lineHeight={11} color={colors.lightGray}>
                        다른 홈 구경에서 나의 홈을 공개할 수 있어요
                      </Txt>
                    </Col>
                  </Row>
                  <Toggle on={isOn} handleToggle={handlePublic} />
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
            </>
          )}
          <Devider />
          <Row gap={8} padding={'0 16px'} alignItems="center">
            <TeamLogo />
            <Txt variant="t18" lineHeight={32}>
              팀 maximalist 소개
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
  min-height: 8px;
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
