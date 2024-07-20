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
import { generateNickname } from '@utils/generateNickname';
import { useEffect, useState } from 'react';

interface SignUpRequestDTO {
  email: string;
  password: string;
  confirmPassword: string;
  nickName: string;
}

const Signup = () => {
  const methods = useForm<SignUpRequestDTO>({ mode: 'onChange' });
  const [nickname, setNickname] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;

  const isConfirmPasswordError =
    !watch(INPUT_TYPE.CONFIRMPASSWORD) ||
    watch(INPUT_TYPE.PASSWORD) !== watch(INPUT_TYPE.CONFIRMPASSWORD);

  const handleCheckError = (id: InputType, regex: RegExp) => {
    const value = watch(id);
    return !regex.test(value);
  };

  const renderError = (id: keyof typeof INPUT_TYPE): React.ReactNode => {
    const errorComponents = CONFIG[id].pattern?.map((regex, index) => {
      const message = CONFIG[id].errorMessages[index] || '유효하지 않은 입력입니다.';
      return INPUT_TYPE[id] === 'email' ? (
        handleCheckError(INPUT_TYPE[id], regex) && (
          <ErrorMessage
            key={index}
            content={message}
            isError={handleCheckError(INPUT_TYPE[id], regex)}
          />
        )
      ) : (
        <ErrorMessage
          key={index}
          content={message}
          isError={handleCheckError(INPUT_TYPE[id], regex)}
        />
      );
    });

    // null 값을 제거하고, 에러 메시지 컴포넌트 배열을 반환합니다.
    return errorComponents?.filter(Boolean) || null;
  };

  useEffect(() => {
    const generatedNickname = generateNickname();
    setNickname(generatedNickname);
  }, []);

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
                options={CONFIG.EMAIL.option}
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
                options={CONFIG.PASSWORD.option}
                type="password"
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
                type="password"
                placeholder="비밀번호 재입력"
              />

              {isConfirmPasswordError && (
                <ErrorMessage
                  content="비밀번호가 일치하지 않습니다"
                  isError={isConfirmPasswordError}
                />
              )}
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
                options={CONFIG.NICKNAME.option}
                content={nickname}
              />
              {renderError('NICKNAME')}
            </Col>
          </Col>
          <Col padding={'0 16px'}>
            <PrimaryButton
              title="가입"
              disabled={!methods.formState.isValid || isConfirmPasswordError}
              onClick={() => console.log(methods.formState)}
            />
          </Col>
        </Col>
      </FormProvider>
    </Layout>
  );
};

export default Signup;
