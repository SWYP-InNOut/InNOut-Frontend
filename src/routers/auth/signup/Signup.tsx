import { css } from '@emotion/react';
import Txt from '@components/common/text/Txt';
import PrimaryButton from '@components/common/button/PrimaryButton';
import TextInput from '@components/common/input/TextInput';
import { CONFIG, INPUT_TYPE, InputType } from '@constants/form';
import { FormProvider, useForm } from 'react-hook-form';
import { Col } from '@components/common/flex/Flex';
import { LogoIcon } from '@icons/index';
import Layout from '@components/common/layout/Layout';
import { colors } from '@styles/theme';
import ErrorMessage from '@components/auth/ErrorMessage';
import { generateNickname } from '@utils/generateNickname';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { signup } from '@apis/auth/auth';
import SocialLogin from '@components/auth/SocialLogin';
import SendEmail from '@components/common/sendEmail/SendEmail';

const Signup = () => {
  const methods = useForm<SignUpRequestDTO>({ mode: 'onChange' });
  const [nickname, setNickname] = useState('');
  const [isEmailError, setIsEmailError] = useState(false);
  const [isDuplicateNickname, setIsDuplicateNickname] = useState(false);
  const [emailErrorMassage, setEmailErrorMassage] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const {
    getValues,
    setFocus,
    formState: { errors },
  } = methods;
  const { mutate, isLoading, isError, data, error } = useMutation(
    (signUpRequest: Omit<SignUpRequestDTO, 'confirmPassword'>) => signup(signUpRequest),
    {
      onSuccess: (data) => {
        console.log('회원가입 성공:', data);
        if (data.code === 1000) {
          setIsComplete(true);
        } else if (data.code === 5004) {
          setIsEmailError(true);
          setIsDuplicateNickname(false);
          setEmailErrorMassage('중복된 이메일입니다');
          setFocus(INPUT_TYPE.EMAIL);
        } else if (data.code === 5005) {
          setIsEmailError(false);
          setIsDuplicateNickname(true);
          setFocus(INPUT_TYPE.NICKNAME);
        } else if (data.code === 5006) {
          setIsEmailError(true);
          setIsDuplicateNickname(false);
          setEmailErrorMassage('이미 가입된 이메일입니다');
          setFocus(INPUT_TYPE.EMAIL);
        }
      },
      onError: (error) => {
        console.error('회원가입 실패:', error);
      },
    }
  );

  const username = getValues(INPUT_TYPE.NICKNAME);
  const email = getValues(INPUT_TYPE.EMAIL);
  const password = getValues(INPUT_TYPE.PASSWORD);
  const confirmPassword = getValues(INPUT_TYPE.CONFIRMPASSWORD);

  const isConfirmPasswordError = password !== confirmPassword;

  const handleCheckError = (id: InputType, regex: RegExp) => {
    const value = getValues(id);
    if (!value) return 'default';
    else if (regex.test(value)) return 'success';
    else return 'error';
  };

  const handleSignup = () => {
    if (
      methods.getFieldState('email').invalid ||
      methods.getFieldState('password').invalid ||
      methods.getFieldState('username').invalid ||
      !confirmPassword ||
      isConfirmPasswordError
    )
      return;

    const signUpRequest: Omit<SignUpRequestDTO, 'confirmPassword'> = {
      username,
      email,
      password,
    };
    mutate(signUpRequest);
  };
  const renderError = (id: keyof typeof INPUT_TYPE): React.ReactNode => {
    const errorComponents = CONFIG[id].validation?.map((validationRule, index) => {
      const message = validationRule.errorMessages || '유효하지 않은 입력입니다.';
      return INPUT_TYPE[id] === 'email' ? (
        getValues(INPUT_TYPE[id]) &&
          handleCheckError(INPUT_TYPE[id], validationRule.pattern) === 'error' && (
            <ErrorMessage
              key={index}
              content={message}
              isError={handleCheckError(INPUT_TYPE[id], validationRule.pattern)}
            />
          )
      ) : (
        <ErrorMessage
          key={index}
          content={message}
          isError={handleCheckError(INPUT_TYPE[id], validationRule.pattern)}
        />
      );
    });
    return errorComponents?.filter(Boolean) || null;
  };

  useEffect(() => {
    setNickname(generateNickname());
  }, []);
  return (
    <>
      {isComplete ? (
        <Layout hasHeader={false}>
          <Col padding={'64px 16px 0'}>
            <SendEmail type="email" />
          </Col>
        </Layout>
      ) : (
        <Layout hasHeader={false}>
          <FormProvider {...methods}>
            <Col padding={'54px 0 52px'}>
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
                  {isEmailError && <ErrorMessage content={emailErrorMassage} isError={'error'} />}
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
                    options={CONFIG.CONFIRMPASSWORD.option}
                  />

                  {confirmPassword && isConfirmPasswordError && (
                    <ErrorMessage content="비밀번호가 일치하지 않습니다" isError={'error'} />
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
                  {isDuplicateNickname && (
                    <ErrorMessage content={'이미 사용 중인 닉네임입니다'} isError={'error'} />
                  )}
                </Col>
              </Col>
              <Col padding={'0 16px'}>
                <PrimaryButton title="가입" disabled={false} onClick={handleSignup} />
                <SocialLogin />
              </Col>
            </Col>
          </FormProvider>
        </Layout>
      )}
    </>
  );
};

export default Signup;
