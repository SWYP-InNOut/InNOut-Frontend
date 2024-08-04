import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { css } from '@emotion/react';
import Layout from '@components/common/layout/Layout';
import Txt from '@components/common/text/Txt';
import { CloseIcon, PlusIcon, RedCheckIcon } from '@icons/index';
import ChangeProperty from '@components/ChangeProperty';
import ErrorMessage from '@components/auth/ErrorMessage';
import PrimaryButton from '@components/common/button/PrimaryButton';
import { Col } from '@components/common/flex/Flex';
import ToastBar from '@components/common/alert/ToastBar';
import { postModifyUser } from '@apis/user';
import { CONFIG, INPUT_TYPE } from '@constants/form';
import AlertModal from '@components/common/alert/AlertModal';
import { colors } from '@styles/theme';
import styled from '@emotion/styled';
import { iconSVGs } from '@constants/icons';
import useAuthStore from '@stores/auth';

const NickNameChange = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState(useAuthStore((store) => store.nickname) || '');
  const memberId = useAuthStore((store) => store.memberId);
  const [toastVisible, setToastVisible] = useState(false);
  const [isDuplicateNickname, setIsDuplicateNickname] = useState(false);
  const [isValidNickname, setIsValidNickname] = useState(false);
  const [isProfileSelect, setIsProfileSelect] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(
    useAuthStore((store) => store.memberImageId)
  );
  const { updateProfile } = useAuthStore();

  const profileMutation = useMutation(postModifyUser, {
    onSuccess: (data) => {
      if (data.code === 1000) {
        setToastVisible(true);
        updateProfile(nickname, selectedProfile as number);
        setTimeout(() => {
          navigate(-1);
        }, 2000);
        console.log(data.result);
      } else if (data.code === 5005) {
        // 중복된 닉넴 처리
        console.log('중복된 닉네임');
        setIsDuplicateNickname(true);
        console.log('isDuplicateNickname:', isDuplicateNickname);
      }
    },
    onError: (error) => {
      console.error('프로필 변경 실패:', error);
    },
  });

  const handleNicknameChange = useCallback((value: string) => {
    setNickname(value);
    const isValid = CONFIG.NICKNAME.validation?.every((rule) => rule.pattern.test(value)) ?? false;
    setIsValidNickname(isValid);
  }, []);

  const handleSubmit = useCallback(() => {
    if (isValidNickname) {
      const requestData = {
        memberId: memberId!,
        nickname: nickname!,
        memberImageId: selectedProfile as number,
      };
      profileMutation.mutate(requestData);
      console.log('requestData:', requestData);
    }
  }, [isValidNickname, nickname, selectedProfile, memberId, profileMutation]);

  useEffect(() => {
    setIsDuplicateNickname(false);
  }, [nickname]);

  useEffect(() => {
    const { nickname: storedNickname, memberImageId } = useAuthStore.getState();
    setNickname(storedNickname || '');
    setSelectedProfile(memberImageId);
  }, []);

  const isButtonDisabled =
    !isValidNickname || isDuplicateNickname || profileMutation.isLoading || !nickname!.trim();

  return (
    <>
      <AlertModal
        isProfile={true}
        isOpen={isProfileSelect}
        content={
          <Col>
            <Txt variant="t20" align="center">
              프로필 사진 선택
            </Txt>
            <ProfileGrid>
              {Object.entries(iconSVGs).map(([id, Icon]) => (
                <ProfileItem
                  key={id}
                  isSelected={selectedProfile === Number(id)}
                  onClick={() => setSelectedProfile(Number(id))}
                >
                  <Icon
                    css={css`
                      width: 92px;
                      height: 92px;
                      border-radius: 50%;
                      border: 2.5px solid
                        ${selectedProfile === Number(id) ? colors.red600 : 'transparent'};
                    `}
                  />
                  {selectedProfile === Number(id) && (
                    <CheckMarkWrapper>
                      <RedCheckIcon />
                    </CheckMarkWrapper>
                  )}
                </ProfileItem>
              ))}
            </ProfileGrid>
          </Col>
        }
        button={
          <PrimaryButton
            title="완료"
            color={colors.red600}
            onClick={() => setIsProfileSelect(false)}
            css={css`
              margin-top: 8px;
            `}
          />
        }
      />

      <Layout
        hasHeader={true}
        HeaderCenter={<Txt variant="t20">프로필 변경</Txt>}
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
        <Col margin={'52px 0 0 0'} alignItems="center">
          <ProfileContainer>
            <ProfileImage>
              {iconSVGs[selectedProfile as keyof typeof iconSVGs]({
                width: 120,
                height: 120,
              })}
            </ProfileImage>
            <PlusWrapper onClick={() => setIsProfileSelect(true)}>
              <PlusIcon />
            </PlusWrapper>
          </ProfileContainer>
        </Col>
        <Col gap={'66'} padding={'0 16px'} margin={'35px 0 0 0 '}>
          <ChangeProperty
            title="닉네임"
            subtitle="톡톡 튀는 닉네임으로 내 모습을 보여줘요"
            content={nickname}
            id={'NICKNAME'}
            onChange={handleNicknameChange}
            isDuplicateNickname={isDuplicateNickname}
          />
          <Col gap={'12'}>
            <div
              css={css`
                visibility: ${isDuplicateNickname ? 'visible' : 'hidden'};
              `}
            >
              <ErrorMessage
                content={'이미 사용 중인 닉네임입니다'}
                isError={'error'}
                justifyContent="center"
              />
            </div>
            <PrimaryButton title="확인" onClick={handleSubmit} disabled={isButtonDisabled} />
          </Col>
        </Col>
        <ToastBar
          message="닉네임이 변경됐어요"
          isVisible={toastVisible}
          onHide={() => setToastVisible(false)}
        />
      </Layout>
    </>
  );
};

export default NickNameChange;

const IconGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 16px;
`;

const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 32px;
  gap: 2px;
`;

const ProfileItem = styled.div<{ isSelected: boolean }>`
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
`;

const CheckMarkWrapper = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
`;

const ProfileContainer = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
`;

const ProfileImage = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid ${colors.gray100};
`;

const PlusWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 32px;
  height: 32px;
  background-color: ${colors.white};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
