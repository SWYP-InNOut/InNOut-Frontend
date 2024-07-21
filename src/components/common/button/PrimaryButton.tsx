import React from 'react'; // React import for JSX
import { colors } from '@styles/theme';
import styled from '@emotion/styled';
import Txt from '@components/common/text/Txt';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  onClick: () => void;
  disabled?: boolean;
  color?: string;
}

const PrimaryButton = (props: PrimaryButtonProps) => {
  const { title, onClick, disabled = false, color = colors.black, ...rest } = props;
  return (
    <Button onClick={onClick} disabled={disabled} color={color} {...rest}>
      <Txt variant="t16" color={colors.white}>
        {title}
      </Txt>
    </Button>
  );
};

const Button = styled.button<{ disabled: boolean; color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 48px;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  background-color: ${({ disabled, color }) => (disabled ? colors.gray300 : color)};
  border-radius: 999px;
`;

export default PrimaryButton;
