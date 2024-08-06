import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '../../../assets/styles/theme';
import { Col } from '../flex/Flex';
import { CloseIcon } from '@icons/index';
import { ButtonContainer } from '@routers/home/MyHome';

interface AlertModalProps {
  isOpen: boolean;
  content: React.ReactNode;
  button: React.ReactNode;
  isShare?: boolean;
  isProfile?: boolean;
  close?: () => void;
}
const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  content,
  button,
  isShare,
  close,
  isProfile,
}) => {
  if (!isOpen) return null;

  return (
    <Back>
      <Alert isShare={isShare} isProfile={isProfile}>
        <Col gap={'24'}>
          {isShare ? (
            <Close>
              <ButtonContainer onClick={close}>
                <CloseIcon />
              </ButtonContainer>
            </Close>
          ) : null}
          {content}
          {button}
        </Col>
      </Alert>
    </Back>
  );
};

export default AlertModal;

const Back = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  max-width: 512px;
  margin: 0 auto;
`;

const Alert = styled.div<{ isShare?: boolean; isProfile?: boolean }>`
  display: flex;
  background-color: ${colors.white};
  padding: ${(props) =>
    props.isShare
      ? '20px 24px 24px 24px'
      : props.isProfile
      ? '32px 16px 20px 16px'
      : '40px 24px 20px'};
  width: 100%;
  max-width: 328px;
  margin: ${(props) => (props.isShare || props.isProfile ? 'auto 16px' : 'auto 40px')};
  border-radius: 32px;
  justify-content: center;
  align-items: center;
`;

const Close = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  cursor: pointer;
`;
