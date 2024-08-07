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
import { IsPublicResponseDTO } from '@interfaces/api/room';
import { ButtonContainer } from '../MyHome';

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
  const nickName = useAuthStore((store) => store.nickname);

  const currentPath = window.location.pathname;
  const pathSegments = currentPath.split('/');
  const lastSegment = pathSegments[pathSegments.length - 1];

  const getIsPublicMutation = useMutation(getIsPublic, {
    onSuccess: (data) => {
      console.log('공개 성공:', data.result);
      if (data.result as IsPublicResponseDTO) {
        setIsOn(data.result.public);
        useAuthStore.setState({ isPublic: isOn });
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
  };

  const handleIntroduce = () => {
    navigate('/introduce');
  };

  const handlePopularFeedOnClick = () => {
    if (isLogin) {
      if (lastSegment === 'others-home') {
        handleMenu();
      } else {
        navigate('/others-home');
      }
    } else {
      console.log('first');
      setIsLogoutAlert(true);
    }
  };

  useEffect(() => {
    setIsOn(isPublic);
  }, [isPublic]);

  const renderAlert = () => {
    return isLogin ? (
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
                try {
                  await logout();
                  setIsLogoutAlert(false);
                  navigate('/login');
                } catch (e) {
                  console.log('로그아웃 실패:', e);
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
    ) : (
      <AlertModal
        isOpen={isLogoutAlert}
        content={
          <Col gap={'12'} alignItems="center">
            <Txt variant="t20">로그인이 필요해요</Txt>
            <Txt variant="b16">인기피드는 로그인 후 보실 수 있어요</Txt>
          </Col>
        }
        button={
          <PrimaryButton
            title="확인"
            onClick={() => setIsLogoutAlert(false)}
            color={colors.red600}
            fontColor={colors.white}
          />
        }
      />
    );
  };

  const logout = useAuthStore((state) => state.logout);
  const renderTitle = () => {
    return isLogin ? (
      <Row padding={'0 28px 64px'} gap={'4'} justifyContent="center" alignItems="end">
        <Txt variant="h28" lineHeight={36}>
          {nickName}
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
      {renderAlert()}
      <HomeMenuSliderContainer right={isOpen ? '0%' : '100%'}>
        <Col
          padding={'28px 0 0'}
          gap={'24'}
          css={css`
            height: inherit;
          `}
        >
          <Row padding={'0 16px'} gap={'4'} justifyContent="flex-end" alignItems="center">
            <ButtonContainer
              onClick={handleMenu}
              css={css`
                cursor: pointer;
              `}
            >
              <CloseIcon />
            </ButtonContainer>
          </Row>
          {renderTitle()}
          <Row
            padding={'0 16px'}
            gap={'8'}
            alignItems="center"
            onClick={handlePopularFeedOnClick}
            css={css`
              cursor: pointer;
            `}
          >
            <SearchIcon />
            <Txt variant="t18" lineHeight={32}>
              인기 피드
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
                      프로필 변경
                    </Txt>
                  </Row>
                  <ButtonContainer onClick={handleNickNameChange}>
                    <NextIcon />
                  </ButtonContainer>
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
                  <ButtonContainer onClick={handlePwdChange}>
                    <NextIcon />
                  </ButtonContainer>
                </Row>
                <Row alignItems="center" justifyContent="space-between">
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
                  <ButtonContainer
                    onClick={() => {
                      setIsLogoutAlert(true);
                    }}
                  >
                    <NextIcon />
                  </ButtonContainer>
                </Row>
              </Col>
            </>
          )}
          <Devider />
          <Row
            gap={8}
            padding={'0 16px'}
            alignItems="center"
            css={css`
              cursor: pointer;
            `}
            onClick={handleIntroduce}
          >
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
                Copyright ©maximalist. All rights reserved.
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
