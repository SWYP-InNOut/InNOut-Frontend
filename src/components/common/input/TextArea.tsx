import { colors } from '@styles/theme';
import { InputType } from '@constants/form';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

interface TextAreaProps {
  type?: string;
  id: InputType;
  options?: RegisterOptions;
  placeholder?: string;
  content?: string;
  onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement>;
}

const TextArea = (props: TextAreaProps) => {
  const { id, placeholder, onKeyDown, content, options, type = 'text', ...rest } = props;
  const { register, watch, setValue } = useFormContext();
  const value = watch(id);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (content != null && content !== '') {
      setValue(id, content);
      setIsFocused(true);
    }
  }, [content, id, setValue]);

  return (
    <InputContainer isFocused={isFocused}>
      <StyledInput
        autoComplete="off"
        placeholder={placeholder}
        {...register(id, options)}
        onKeyDown={onKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(value && value.length > 0)}
      />
    </InputContainer>
  );
};

const StyledInput = styled.textarea`
  width: 100%;
  padding: 16px 16px;
  color: ${colors.darkGray};
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 24px;
  font-family: 'LINE Seed Sans', sans-serif;
  background-color: transparent;
  border: none;
  outline: none;

  &::placeholder {
    color: ${colors.lightGray};
  }
`;

const InputContainer = styled.div<{ isFocused: boolean }>`
  width: 100%;
  height: 224px;
  border-radius: 8px;
  background-color: ${({ isFocused }) => (isFocused ? colors.yellow300 : colors.gray100)};
  transition: background-color 0.2s ease;
`;

export default TextArea;
