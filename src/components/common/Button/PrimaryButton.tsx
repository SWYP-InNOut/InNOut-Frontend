/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react'; // React import for JSX
import { colors } from '@styles/theme';

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
      {title}
    </button>
  );
};

const buttonStyle = (disabled: boolean) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 52px;
  color: ${colors.white};
  cursor: ${disabled ? 'default' : 'pointer'};
  background-color: ${disabled ? colors.lightGray : colors.black};
  border-radius: 10px;
`;

export default PrimaryButton;
