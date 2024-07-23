import React from 'react'; // React import for JSX
import { colors } from '@styles/theme';
import styled from '@emotion/styled';
import Txt from '@components/common/text/Txt';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  onClick: () => void;
  disabled?: boolean;
  color?: string;
  height?: string;
  fontColor?: string;
}

const PrimaryButton = (props: PrimaryButtonProps) => {
  const {
    title,
    onClick,
    disabled = false,
    color = colors.black,
    height = '48px',
    fontColor = colors.white,
    ...rest
  } = props;
  return (
    <Button onClick={onClick} disabled={disabled} color={color} height={height} {...rest}>
      <Txt variant="t16" color={fontColor}>
        {title}
      </Txt>
    </Button>
  );
};

const Button = styled.button<{ disabled: boolean; color: string; height: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${({ height }) => height};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  background-color: ${({ disabled, color }) => (disabled ? colors.gray300 : color)};
  border-radius: 999px;
`;

export default PrimaryButton;
