import { RefObject } from 'react';
import { fontStyles } from '@styles/theme';
// textarea의 높이를 계산하는 함수

export const calculateHeight = (textAreaRef: RefObject<HTMLTextAreaElement>): string => {
  if (textAreaRef.current) {
    const width = textAreaRef.current.offsetWidth;
    const lineHeight = parseInt(fontStyles.b16.lineHeight);
    const charsPerLine = Math.floor(width / 16);
    const lines = Math.ceil(200 / charsPerLine);
    return `${lineHeight * lines}px`;
  }
  return 'auto';
};
