/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react'; // React import for JSX
import { colors } from '@styles/theme';
import Txt from '../Text/Txt';

// Props 타입 정의
interface PrimaryButtonProps {
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
    <button onClick={onClick} disabled={disabled} css={buttonStyle(disabled)} {...rest}>
      <Txt variant="t16" color={colors.white}>
        {title}
      </Txt>
    </button>
  );
};

const buttonStyle = (disabled: boolean) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 48px;
  cursor: ${disabled ? 'default' : 'pointer'};
  background-color: ${disabled ? colors.gray300 : colors.black};
  border-radius: 999px;
`;

export default PrimaryButton;
