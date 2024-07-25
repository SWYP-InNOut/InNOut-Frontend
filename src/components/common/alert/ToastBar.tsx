import React from 'react';
import Txt from '../text/Txt';
import { colors } from '@styles/theme';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';

interface ToastBarProps {
  message: string;
  isVisible: boolean;
  onHide: () => void;
  duration?: number;
}

const ToastBar: React.FC<ToastBarProps> = ({ message, isVisible, onHide, duration = 1000 }) => {
  React.useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onHide();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onHide]);

  if (!isVisible) return null;

  return (
    <ToastOverlay>
      <Container
        css={css`
          animation: ${fadeInOut} ${duration}ms ease-in-out;
        `}
      >
        <Txt variant="t16" color={colors.white}>
          {message}
        </Txt>
      </Container>
    </ToastOverlay>
  );
};

const ToastOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 40px 16px;
  pointer-events: none;
  z-index: 9999;
`;

const Container = styled.div`
  border-radius: 99px;
  background: rgba(0, 0, 0, 0.6);
  text-align: center;
  padding: 10px 24px;
  width: 100%;
  max-width: 480px;
`;

const fadeInOut = keyframes`
  0%, 100% { opacity: 0; transform: translateY(20px); }
  10%, 90% { opacity: 1; transform: translateY(0); }
`;

export default ToastBar;
