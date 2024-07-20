import { css } from '@emotion/react';
import Txt from '@components/common/Text/Txt';
import PrimaryButton from '@components/common/Button/PrimaryButton';
import TextInput from '@components/common/Input/TextInput';
import { CONFIG, INPUT_TYPE } from '@constants/form';
import { FormProvider, useForm } from 'react-hook-form';
import { Col } from '@components/common/Flex/Flex';
import { LogoIcon } from '@icons/index';
import Layout from '@components/common/Layout/Layout';

interface SignUpRequestDTO {
  email: string;
  password: string;
  confirmPassword: string;
  nickName: string;
}

const Signup = () => {
  const methods = useForm<SignUpRequestDTO>({ mode: 'onChange' });
  return (
    <Layout
      hasHeader={true}
      HeaderCenter={
        <div
          css={css`
            width: 104px;
            height: auto;
          `}
        >
          <LogoIcon />
        </div>
      }
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        `}
      >
        <Txt variant="h32" color="red" align="center">
          하이
        </Txt>
        <div
          css={css`
            width: 100px;
            height: 100px;
          `}
        >
          <LogoIcon />
        </div>

        <PrimaryButton title="버튼" onClick={() => console.log('버튼')} />
        <FormProvider {...methods}>
          <TextInput
            id={INPUT_TYPE.EMAIL}
            options={CONFIG.EMAIL.options}
            placeholder="example@gmail.com"
          />
        </FormProvider>
        <Col gap={10} justifyContent="center" alignItems="center">
          <Txt variant="h32" color="red" align="center">
            안녕하세요
          </Txt>
          <Txt variant="h32" color="red" align="center">
            안녕하세요
          </Txt>
        </Col>
      </div>
    </Layout>
  );
};

export default Signup;
