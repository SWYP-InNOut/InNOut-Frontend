import React from 'react'; // React import for JSX
import { colors } from '@styles/theme';
import { Row } from '@components/common/flex/Flex';
import { css } from '@emotion/react';
import Txt from '@components/common/text/Txt';
import { CheckIcon, ErrorIcon } from '@icons/index';

// Props 타입 정의
interface ErrorMessageProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  padding?: string;
  content: string;
  isError: boolean;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  content,
  isError,
  padding = '0',
  ...rest
}) => {
  return (
    <Row
      gap={6}
      alignItems="center"
      padding={padding}
      css={css`
        height: 16px;
      `}
    >
      {isError ? <ErrorIcon /> : <CheckIcon />}
      <Txt lineHeight={16} variant="c14" color={isError ? colors.errRed : colors.gray300}>
        {content}
      </Txt>
    </Row>
  );
};

export default ErrorMessage;
