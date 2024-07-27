import { colors, fontStyles } from '@styles/theme';
import { PostInputType } from '@constants/postFormConfig';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import styled from '@emotion/styled';
import { ChangeEventHandler, useEffect, useRef, useState } from 'react';
import { handleResize } from '@utils/handleResize';

interface TextAreaProps {
  type?: string;
  id: PostInputType;
  options?: RegisterOptions;
  placeholder?: string;
  onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement>;
}

const TextArea = (props: TextAreaProps) => {
  const { id, placeholder, onKeyDown, options, type = 'text', ...rest } = props;
  const { register, setValue, getValues } = useFormContext();
  const [isFocused, setIsFocused] = useState(false);
  const value = getValues(id);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [content, setContent] = useState<string>('');
  const [initialHeight, setInitialHeight] = useState<string>('auto');

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.target.value.length <= 200) {
      setContent(e.target.value);
      if (textAreaRef.current) {
        textAreaRef.current.style.height = initialHeight;
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
      }
    }
  };

  useEffect(() => {
    if (content != null && content !== '') {
      setValue(id, content);
      setIsFocused(true);
    }
  }, [content, id, setValue]);

  useEffect(() => {
    const resizeHandler = () => handleResize(textAreaRef, setInitialHeight);

    resizeHandler();
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [textAreaRef]);

  return (
    <InputContainer isFocused={isFocused}>
      <StyledInput
        value={content}
        autoComplete="off"
        placeholder={placeholder}
        {...register(id, options)}
        onKeyDown={onKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(value && value.length > 0)}
        onChange={onChange}
        ref={textAreaRef}
        style={{ height: initialHeight }}
      />
    </InputContainer>
  );
};

const StyledInput = styled.textarea`
  width: 100%;
  padding: 16px 16px;
  color: ${colors.darkGray};
  background-color: transparent;
  border: none;
  outline: none;
  font-size: ${fontStyles.b16.fontSize};
  font-weight: ${fontStyles.b16.fontWeight};
  line-height: ${fontStyles.b16.lineHeight};
  font-family: ${fontStyles.b16.fontFamily};
  resize: none;
  overflow: hidden;

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
