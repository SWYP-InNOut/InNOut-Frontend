import React from 'react'; // React import for JSX
import { colors } from '@styles/theme';
import { Row } from '@components/common/flex/Flex';
import { css } from '@emotion/react';
import Txt from '@components/common/text/Txt';
import { CheckIcon, CorrectCheckIcon, ErrorIcon } from '@icons/index';

// Props 타입 정의
interface ErrorMessageProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  padding?: string;
  content: string;
  isError: 'default' | 'error' | 'success';
  justifyContent?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  content,
  isError,
  padding = '0',
  justifyContent = 'flex-start',
  ...rest
}) => {
  return (
    <Row
      gap={6}
      alignItems="center"
      justifyContent={justifyContent}
      padding={padding}
      css={css`
        height: 16px;
      `}
    >
      {isError === 'default' ? (
        <CheckIcon />
      ) : isError === 'error' ? (
        <ErrorIcon />
      ) : (
        <CorrectCheckIcon />
      )}
      <Txt
        lineHeight={21}
        variant="c14"
        color={
          isError === 'default'
            ? colors.gray300
            : isError === 'error'
            ? colors.errRed
            : colors.correctGreen
        }
      >
        {content}
      </Txt>
    </Row>
  );
};

export default ErrorMessage;
