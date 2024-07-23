import { colors, fontStyles } from '@styles/theme';
import { PostInputType } from '@constants/postFormConfig';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

interface TextAreaProps {
  type?: string;
  id: PostInputType;
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
  max-height: 224px;
  color: ${colors.darkGray};
  background-color: transparent;
  border: none;
  outline: none;
  font-size: ${fontStyles.b16.fontSize};
  font-weight: ${fontStyles.b16.fontWeight};
  line-height: ${fontStyles.b16.lineHeight};
  font-family: ${fontStyles.b16.fontFamily};
  &::placeholder {
    color: ${colors.lightGray};
  }
`;

const InputContainer = styled.div<{ isFocused: boolean }>`
  width: 100%;
  border-radius: 8px;
  background-color: ${({ isFocused }) => (isFocused ? colors.yellow300 : colors.gray100)};
  transition: background-color 0.2s ease;
`;

export default TextArea;
