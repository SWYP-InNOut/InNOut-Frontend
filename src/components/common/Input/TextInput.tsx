/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { colors } from '@styles/theme';
import { InputType } from '@constants/form';
import { RegisterOptions, useFormContext } from 'react-hook-form';

// Props 타입 정의
interface TextInputProps {
  id?: InputType;
  options?: RegisterOptions;
  placeholder?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const TextInput = (props: TextInputProps) => {
  const { id, options, placeholder, onKeyDown, ...rest } = props;
  const { register, watch } = useFormContext();
  const value = watch(id);

  return (
    <div css={inputContainerStyle}>
      <input
        css={inputStyle}
        type="text"
        autoComplete="off"
        placeholder={placeholder}
        {...register(id, options)}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

const inputStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: ${colors.black};
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 24px;
  font-family: 'LINE Seed Sans KR';
  appearance: none;
  background-color: transparent;
  border: none;

  &:focus {
    outline: none;
  }

  &::placeholder {
    font-family: 'LINE Seed Sans KR';
    font-size: 1.6rem;
    font-weight: 400;
    color: ${colors.lightGray};
  }
`;

const inputContainerStyle = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 16px;
  border-radius: 4px;
  background-color: ${colors.gray100};
`;

export default TextInput;
