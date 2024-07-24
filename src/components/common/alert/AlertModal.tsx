import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '../../../assets/styles/theme';
import { Col } from '../flex/Flex';

interface AlertModalProps {
  isOpen: boolean;
  content: React.ReactNode;
  button: React.ReactNode;
}
//  제일 상단에 올리면 됩니다용
const AlertModal: React.FC<AlertModalProps> = ({ isOpen, content, button }) => {
  if (!isOpen) return null;

  return (
    <Back>
      <Alert>
        <Col gap={'24'}>
          {content}
          {button}
        </Col>
      </Alert>
    </Back>
  );
};

const Back = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Alert = styled.div`
  display: flex;
  background-color: ${colors.white};
  padding: 40px 24px 20px;
  width: 100%;
  margin: auto 40px;
  border-radius: 32px;
  justify-content: center;
  align-items: center;
`;

export default AlertModal;
