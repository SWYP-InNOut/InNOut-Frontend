import { colors } from '@styles/theme';
import { InputType } from '@constants/form';
import { RegisterOptions, set, useFormContext } from 'react-hook-form';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { PostInputType } from '@constants/postFormConfig';

// Props 타입 정의
interface TextInputProps {
  type?: string;
  id: InputType | PostInputType;
  options?: RegisterOptions;
  placeholder?: string;
  content?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  maxLength?: number;
}

const TextInput = (props: TextInputProps) => {
  const { id, placeholder, onKeyDown, content, options, type = 'text', maxLength, ...rest } = props;
  const { register, watch, setValue } = useFormContext();
  const value = watch(id);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (maxLength && newValue.length <= maxLength) {
      setValue(id, newValue);
    } else if (!maxLength) {
      setValue(id, newValue);
    }
  };

  useEffect(() => {
    if (value) {
      setIsFocused(true);
    } else {
      setIsFocused(false);
    }
    if (id === 'username') {
      setValue(id, content, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
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
        onChange={handleChange}
        value={value || ''}
        maxLength={maxLength}
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
