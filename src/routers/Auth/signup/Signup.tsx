import { css } from '@emotion/react';
import Txt from '@components/common/text/Txt';
import PrimaryButton from '@components/common/button/PrimaryButton';
import TextInput from '@components/common/input/TextInput';
import { CONFIG, INPUT_TYPE, InputType } from '@constants/form';
import { FieldErrors, FormProvider, useForm, useFormContext } from 'react-hook-form';
import { Col } from '@components/common/flex/Flex';
import { LogoIcon } from '@icons/index';
import Layout from '@components/common/layout/Layout';
import { colors } from '@styles/theme';
import ErrorMessage from '@components/auth/ErrorMessage';

interface SignUpRequestDTO {
  email: string;
  password: string;
  confirmPassword: string;
  nickName: string;
}

const Signup = () => {
  const methods = useForm<SignUpRequestDTO>({ mode: 'onChange' });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const renderError = (id: keyof typeof INPUT_TYPE): React.ReactNode => {
    console.log(errors[INPUT_TYPE[id]]?.types?.pattern?.toString);
    const errorMessages = CONFIG[id].errorMessages?.map((message) => (
      <ErrorMessage
        content={message}
        isError={errors[INPUT_TYPE[id]]?.types?.pattern === message}
      />
    ));

    return errorMessages || null;
  };

  return (
    <Layout hasHeader={false}>
      <FormProvider {...methods}>
        <Col padding={'54px 0 100px'}>
          <div
            css={css`
              width: 211px;
            `}
          >
            <LogoIcon />
          </div>
          <Txt
            variant="b16"
            color={colors.lightGray}
            align="start"
            css={css`
              margin-left: 16px;
            `}
          >
            가입하고 친구들과 함께 즐거운 작별을 경험해요.
          </Txt>
          <Col gap={8} padding={'0 16px 24px'}>
            <Col padding={'32px 0 0'} gap={8}>
              <Txt variant="t20" color={colors.darkGray}>
                이메일
              </Txt>
              <TextInput
                id={INPUT_TYPE.EMAIL}
                options={CONFIG.EMAIL.options}
                placeholder="example@gmail.com"
              />
              {renderError('EMAIL')}
            </Col>
            <Col padding={'32px 0 0'} gap={8}>
              <Txt variant="t20" color={colors.darkGray}>
                비밀번호
              </Txt>
              <TextInput
                id={INPUT_TYPE.PASSWORD}
                options={CONFIG.PASSWORD.options}
                placeholder="비밀번호 입력"
              />
              {renderError('PASSWORD')}
            </Col>
            <Col padding={'32px 0 0'} gap={8}>
              <Txt variant="t20" color={colors.darkGray}>
                비밀번호 확인
              </Txt>
              <TextInput
                id={INPUT_TYPE.CONFIRMPASSWORD}
                options={CONFIG.CONFIRMPASSWORD.options}
                placeholder="비밀번호 재입력"
              />
              {renderError('CONFIRMPASSWORD')}
            </Col>
            <Col padding={'32px 0 0'} gap={8}>
              <Col>
                <Txt variant="t20" color={colors.darkGray}>
                  닉네임
                </Txt>
                <Txt variant="c14" color={colors.lightGray}>
                  닉네임은 나중에도 변경할 수 있어요!
                </Txt>
              </Col>
              <TextInput
                id={INPUT_TYPE.NICKNAME}
                options={CONFIG.EMAIL.options}
                content="산책하는 미미"
              />
              {renderError('NICKNAME')}
            </Col>
          </Col>
          <Col padding={'0 16px'}>
            <PrimaryButton title="가입" onClick={() => console.log(errors[INPUT_TYPE.EMAIL])} />
          </Col>
        </Col>
      </FormProvider>
    </Layout>
  );
};

export default Signup;
