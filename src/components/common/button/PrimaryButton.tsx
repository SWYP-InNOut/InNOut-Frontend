import React from 'react'; // React import for JSX
import { colors } from '@styles/theme';
import Txt from '@components/common/text/Txt';
import styled from '@emotion/styled';

// Props 타입 정의
interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  onClick: () => void;
  disabled?: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onClick,
  disabled = false,
  ...rest
}) => {
  return (
    <Button onClick={onClick} disabled={disabled} {...rest}>
      <Txt variant="t16" color={colors.white}>
        {title}
      </Txt>
    </Button>
  );
};

const Button = styled.button<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 48px;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  background-color: ${({ disabled }) => (disabled ? colors.gray300 : colors.black)};
  border-radius: 999px;
`;

export default PrimaryButton;
