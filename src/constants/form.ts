import { RegisterOptions } from 'react-hook-form';

interface ValidationRule {
  pattern: RegExp;
  errorMessages: string;
}

interface ConfigField {
  validation: ValidationRule[];
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
    validation: [
      {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        errorMessages: '잘못된 이메일 형식입니다',
      },
    ],
    option: {
      required: true,
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: '',
      },
    },
  },
  PASSWORD: {
    validation: [
      {
        pattern:
          /^(?=(?:.*[A-Za-z]){1,})(?=(?:.*\d){1,}|(?=.*[!@#$%^&*]){1,})(?=(?:.*[!@#$%^&*]){1,}|(?=.*\d){1,})[A-Za-z\d!@#$%^&*]+$/,
        errorMessages: '영문/숫자/특수문자 중 2가지 이상 포함',
      },
      {
        pattern: /^.{8,20}$/,
        errorMessages: '8자 이상 20자 이하',
      },
    ],
    option: {
      required: true,
      pattern: {
        value:
          /^(?=(?:.*[A-Za-z]){1,})(?=(?:.*\d){1,}|(?=.*[!@#$%^&*]){1,})(?=(?:.*[!@#$%^&*]){1,}|(?=.*\d){1,})[A-Za-z\d!@#$%^&*]{8,20}$/,
        message: '하이',
      },
    },
  },
  CONFIRMPASSWORD: {
    validation: [],
    option: {
      required: false,
    },
  },
  NICKNAME: {
    validation: [
      {
        pattern: /^[가-힣a-zA-Z0-9\s]+$/,
        errorMessages: '한글(모음,자음 단독 사용불가)/영어/숫자',
      },
      {
        pattern: /^.{2,10}$/,
        errorMessages: '공백 포함 2자 이상 10자 이하',
      },
    ],
    option: {
      required: true,
      pattern: {
        value: /^[가-힣a-zA-Z0-9\s]{2,10}$/,
        message: '',
      },
    },
  },
} as const;
