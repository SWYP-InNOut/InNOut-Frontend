import { RefObject, Dispatch, SetStateAction } from 'react';
import { calculateHeight } from './calculateHeight';

export const handleResize = (
  textAreaRef: RefObject<HTMLTextAreaElement>,
  setInitialHeight: Dispatch<SetStateAction<string>>
) => {
  if (textAreaRef.current) {
    const height = calculateHeight(textAreaRef);
    setInitialHeight(height);
    textAreaRef.current.style.height = height;
  }
};
