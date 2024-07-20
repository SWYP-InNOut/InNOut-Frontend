import { RegisterOptions } from 'react-hook-form';

interface ConfigField {
  pattern: RegExp[];
  errorMessages: string[];
  option: RegisterOptions;
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
    pattern: [/^[^s@]+@[^s@]+.[^s@]+$/],
    errorMessages: ['잘못된 이메일 형식입니다'],
    option: {
      required: true,
      pattern: {
        value: /^[^s@]+@[^s@]+.[^s@]+$/,
        message: '',
      },
    },
  },
  PASSWORD: {
    pattern: [
      /^(?:(?=.*[A-Za-z])(?=.*\d)|(?=.*[A-Za-z])(?=.*[!@#$%^&*])|(?=.*\d)(?=.*[!@#$%^&*]))[A-Za-z\d!@#$%^&*]+$/,
      /^.{8,20}$/,
    ],
    errorMessages: ['영문/숫자/특수문자 중 2가지 이상 포함', '8자 이상 20자 이하'],
    option: {
      required: true,
      pattern: {
        value:
          /^(?=(?:.*[A-Za-z]){1,})(?=(?:.*\d){1,}|(?=.*[!@#$%^&*]){1,})(?=(?:.*[!@#$%^&*]){1,}|(?=.*\d){1,})[A-Za-z\d!@#$%^&*]{8,20}$/,
        message: '',
      },
    },
  },
  CONFIRMPASSWORD: {
    pattern: [],
    errorMessages: [],
    option: {
      required: true,
    },
  },
  NICKNAME: {
    pattern: [/^[가-힣a-zA-Z0-9\s]+$/, /^.{2,10}$/],
    errorMessages: ['한글(모음,자음 단독 사용불가)/영어/숫자', '공백 포함 2자 이상 10자 이하'],
    option: {
      required: true,
      pattern: {
        value: /^[가-힣a-zA-Z0-9\s]{2,10}$/,
        message: '',
      },
    },
  },
} as const;
