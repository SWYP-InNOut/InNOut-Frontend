import styled from '@emotion/styled';
import React from 'react';
import Txt from '../text/Txt';

interface SocialButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  icon: React.ReactNode;
  color?: string;
  onClick: () => void;
}

const SocialButton = (props: SocialButton) => {
  const { title, icon, color, onClick } = props;
  return (
    <Button onClick={onClick} color={color}>
      {icon}
      <Txt variant="social">{title}</Txt>
    </Button>
  );
};

export default SocialButton;

const Button = styled.button<{ color?: string }>`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  cursor: pointer;
  background-color: ${({ color }) => color || 'transparent'};
  border-radius: 6px;
  padding: 0 8px;
`;
