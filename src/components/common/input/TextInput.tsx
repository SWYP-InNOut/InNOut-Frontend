import { colors } from '@styles/theme';
import { InputType } from '@constants/form';
import { RegisterOptions, set, useFormContext } from 'react-hook-form';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

// Props 타입 정의
interface TextInputProps {
  type?: string;
  id: InputType;
  options?: RegisterOptions;
  placeholder?: string;
  content?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const TextInput = (props: TextInputProps) => {
  const { id, placeholder, onKeyDown, content, options, type = 'text', ...rest } = props;
  const { register, watch, setValue } = useFormContext();
  const value = watch(id);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (value) {
      setIsFocused(true);
    } else {
      setIsFocused(false);
    }
    if (content != null && content !== '') {
      setValue(id, content);
      setIsFocused(true);
    }
  }, [content]);

  return (
    <InputContainer isFocused={isFocused}>
      <StyledInput
        type={type}
        autoComplete="off"
        placeholder={placeholder}
        {...register(id, options)}
        onKeyDown={onKeyDown}
      />
    </InputContainer>
  );
};

const StyledInput = styled.input`
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: ${colors.darkGray};
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 24px;
  font-family: 'LINE Seed Sans';
  appearance: none;
  background-color: transparent;
  border: none;

  &:focus {
    outline: none;
  }

  &::placeholder {
    font-family: 'LINE Seed Sans';
    font-size: 1.6rem;
    font-weight: 400;
    color: ${colors.lightGray};
  }
`;

const InputContainer = styled.div<{ isFocused: Boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 16px;
  border-radius: 4px;
  background-color: ${({ isFocused }) => (isFocused ? colors.yellow300 : colors.gray100)};
`;

export default TextInput;
