/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Txt from '@components/common/Text/Txt';
import PrimaryButton from '@components/common/Button/PrimaryButton';
import TextInput from '@components/common/\bInput/TextInput';
import { CONFIG, INPUT_TYPE } from '@constants/form';
import { FormProvider, useForm } from 'react-hook-form';

interface SignUpRequestDTO {
  email: string;
  password: string;
  confirmPassword: string;
  nickName: string;
}

const index = () => {
  const methods = useForm<SignUpRequestDTO>({ mode: 'onChange' });
  return (
    <div
      css={css`
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      `}
    >
      <Txt variant="h32" color="red" align="center">
        하이
      </Txt>
      <PrimaryButton title="버튼" onClick={() => console.log('버튼')} />
      <FormProvider {...methods}>
        <TextInput
          id={INPUT_TYPE.EMAIL}
          options={CONFIG.EMAIL.options}
          placeholder="example@gmail.com"
        />
      </FormProvider>
    </div>
  );
};

export default index;
