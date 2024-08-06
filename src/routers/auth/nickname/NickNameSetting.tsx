import React, { useCallback, useEffect, useState } from 'react';
import ChangeProperty from '@components/ChangeProperty';
import Layout from '@components/common/layout/Layout';
import { Col } from '@components/common/flex/Flex';
import Txt from '@components/common/text/Txt';
import { colors } from '@styles/theme';
import PrimaryButton from '@components/common/button/PrimaryButton';
import { css } from '@emotion/react';
import ErrorMessage from '@components/auth/ErrorMessage';
import { generateNickname } from '@utils/generateNickname';
import { CONFIG, INPUT_TYPE } from '@constants/form';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { postNickName } from '@apis/user';

const NickNameSetting = () => {
  const navigate = useNavigate();
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [nickname, setNickname] = useState('');
  const [isValidNickname, setIsValidNickname] = useState(false);

  const isButtonDisabled = !isValidNickname || isDuplicate || !nickname.trim();

  const nicknameMutation = useMutation(postNickName, {
    onSuccess: (data) => {
      if (data.code === 1000) {
        navigate('/');
      } else if (data.code === 5005) {
        console.log('중복된 닉네임');
        setIsDuplicate(true);
      }
    },
    onError: (error) => {
      console.error('닉네임 변경 실패:', error);
    },
  });
  const handleNicknameChange = useCallback((value: string) => {
    setNickname(value);
    const isValid = CONFIG.NICKNAME.validation?.every((rule) => rule.pattern.test(value)) ?? false;
    setIsValidNickname(isValid);
  }, []);

  const handleOk = () => {
    if (!nickname) {
      return;
    }
    nicknameMutation.mutate({ nickname });
  };

  useEffect(() => {
    setNickname(generateNickname());
  }, []);

  return (
    <Layout hasHeader={false}>
      <Col padding={'0 16px'} margin={'64px 0 0 0'}>
        <Col gap={'4'} margin={'0 0 61px 0'}>
          <Txt variant="h32">
            함께하기 위한
            <br />
            가장 마지막 절차예요!
          </Txt>
          <Txt variant="b16" color={colors.lightGray}>
            닉네임은 홈에 표시되며, 언제든 바꿀 수 있어요
          </Txt>
        </Col>
        <Col gap={'66'}>
          <ChangeProperty
            title="닉네임"
            subtitle="톡톡 튀는 닉네임으로 내 모습을 보여줘요"
            content={nickname}
            id={'NICKNAME'}
            onChange={handleNicknameChange}
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
            <PrimaryButton title="확인" onClick={handleOk} disabled={isButtonDisabled} />
          </Col>
        </Col>
      </Col>
    </Layout>
  );
};

export default NickNameSetting;
