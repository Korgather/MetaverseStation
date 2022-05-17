import { RefObject } from 'react';

export const handleResizeHeight = (textRef?: RefObject<HTMLElement> | null) => {
  if (textRef && textRef.current !== null) {
    textRef.current.style.height = textRef.current.scrollHeight + 'px';
  }
};
