import React, { useEffect, useState } from 'react';
import ChangeProperty from '@components/ChangeProperty';
import Layout from '@components/common/layout/Layout';
import { Col } from '@components/common/flex/Flex';
import Txt from '@components/common/text/Txt';
import { colors } from '@styles/theme';
import PrimaryButton from '@components/common/button/PrimaryButton';
import { css } from '@emotion/react';
import ErrorMessage from '@components/auth/ErrorMessage';
import { generateNickname } from '@utils/generateNickname';
import { INPUT_TYPE } from '@constants/form';

const NickNameSetting = () => {
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [nickname, setNickname] = useState('');
  const handleOk = () => {
    console.log('확인');
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
          />
          <Col gap={'12'}>
            <div
              css={css`
                visibility: ${isDuplicate ? 'visible' : 'hidden'};
              `}
            >
              <ErrorMessage
                content={'이미 사용 중인 닉네임입니다'}
                isError={true}
                justifyContent={'center'}
              />
            </div>
            <PrimaryButton title="확인" onClick={handleOk} />
          </Col>
        </Col>
      </Col>
    </Layout>
  );
};

export default NickNameSetting;
