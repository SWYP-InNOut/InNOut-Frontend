import React from 'react';
import { CheckIcon } from '@icons/index';
import { ErrorIcon } from '@icons/index';
import styled from '@emotion/styled';
import Txt from '../Text/Txt';
import { colors } from '@styles/theme';

interface AlertMessage extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  isError?: boolean;
}

const AlertMessage = (props: AlertMessage) => {
  return (
    <Alert>
      {props.isError ? <ErrorIcon /> : <CheckIcon />}
      <Txt variant="c14" color={props.isError ? colors.errRed : colors.gray300}>
        {props.title}
      </Txt>
    </Alert>
  );
};

export default AlertMessage;

const Alert = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 21px;
`;
