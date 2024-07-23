import { RegisterOptions } from 'react-hook-form';

interface ValidationRule {
  pattern: RegExp;
  errorMessages: string;
}

interface ConfigField {
  validation: ValidationRule[];
  option: RegisterOptions;
}

export const POST_INPUT_TYPE = {
  TITLE: 'title',
  IN_CONTENT: 'inContent',
  OUT_CONTENT: 'outContent',
  PICTURES: 'pictures',
  MAIN_PICTURE: 'mainPicture',
} as const;

export type PostConfigKeys = keyof typeof POST_INPUT_TYPE;
export type PostInputType = (typeof POST_INPUT_TYPE)[keyof typeof POST_INPUT_TYPE];

export const POST_CONFIG: Record<PostConfigKeys, ConfigField> = {
  TITLE: {
    validation: [],
    option: {
      required: true,
      minLength: { value: 1, message: '제목을 입력해주세요' },
      maxLength: { value: 20, message: '공백 포함 20자 이하 가능' },
    },
  },
  IN_CONTENT: {
    validation: [],
    option: {
      required: '내용은 필수입니다.',
      minLength: { value: 1, message: '버릴 수 없는 이유를 입력해주세요' },
      maxLength: { value: 200, message: '내용은 200 초과할 수 없습니다' },
    },
  },
  OUT_CONTENT: {
    validation: [],
    option: {
      required: '내용은 필수입니다.',
      minLength: { value: 1, message: '버리고 싶은 이유를 입력해주세요' },
      maxLength: { value: 200, message: '내용은 200 초과할 수 없습니다' },
    },
  },
  PICTURES: {
    validation: [],
    option: {
      validate: (value) => (value.length > 0 && value.length <= 2) || '사진은 1-2장 필수입니다.',
    },
  },
  MAIN_PICTURE: {
    validation: [],
    option: {
      required: '대표 사진을 선택해주세요.',
    },
  },
} as const;
