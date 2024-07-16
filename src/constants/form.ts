import { RegisterOptions } from 'react-hook-form';

interface ConfigField {
  options: RegisterOptions;
}

export const INPUT_TYPE = {
  EMAIL: 'email',
  PASSWORD: 'password',
  CONFIRMPASSWORD: 'confirmPassword',
  NICKNAME: 'nickName',
} as const;

export type ConfigKeys = keyof typeof INPUT_TYPE;
export type InputType = (typeof INPUT_TYPE)[keyof typeof INPUT_TYPE];

export const CONFIG: Record<ConfigKeys, ConfigField> = {
  EMAIL: {
    options: {
      required: {
        value: true,
        message: '이메일을 입력해주세요.',
      },
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: '이메일 형식이 아닙니다',
      },
    },
  },
  PASSWORD: {
    options: {
      required: {
        value: true,
        message: '비밀번호를 입력해주세요.',
      },
      pattern: {
        value:
          /^(?:(?=.*[A-Za-z])(?=.*\d)|(?=.*[A-Za-z])(?=.*[!@#$%^&*])|(?=.*\d)(?=.*[!@#$%^&*]))[A-Za-z\d!@#$%^&*]{8,}$/,
        message: '영문/숫자/특수문자 중 2가지 이상 포함',
      },
      minLength: {
        value: 8,
        message: '8자 이상 20자 이하',
      },
      maxLength: {
        value: 20,
        message: '8자 이상 20자 이하',
      },
    },
  },
  CONFIRMPASSWORD: {
    options: {
      required: {
        value: true,
        message: '비밀번호를 입력해주세요.',
      },
    },
  },
  NICKNAME: {
    options: {
      required: {
        value: true,
        message: '닉네임을 입력해주세요.',
      },
      pattern: {
        value: /^[가-힣a-zA-Z0-9]+$/,
        message: '한글(모음,자음 단독 사용불가)/영어/숫자',
      },
      minLength: {
        value: 2,
        message: '공백 포함 2자이상 10자이하',
      },
      maxLength: {
        value: 10,
        message: '공백 포함 2자이상 10자이하',
      },
    },
  },
} as const;
