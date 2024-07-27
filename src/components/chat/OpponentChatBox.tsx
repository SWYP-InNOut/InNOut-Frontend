import { Col, Row } from '@components/common/flex/Flex';
import Txt from '@components/common/text/Txt';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useWindowWidth } from '@hooks/useWindowWidth';
import { ReplyIcon } from '@icons/index';
import { colors } from '@styles/theme';
import { useEffect, useState } from 'react';

interface OpponentChatBoxProps {
  name: string;
  message: string;
  time: string;
  onClick?: () => void;
}

const OpponentChatBox = ({ name, message, time, onClick }: OpponentChatBoxProps) => {
  const maxWidth = useWindowWidth() * 0.6;

  return (
    <Col padding={'0 16px'} gap={8}>
      <Txt
        variant="c12"
        color={colors.darkGray}
        css={css`
          padding: 0 12px;
        `}
      >
        {name}
      </Txt>
      <Row gap={2}>
        <ChatBox maxWidth={maxWidth}>
          <Txt variant="c14">{message}</Txt>
        </ChatBox>
        <Col
          gap={2}
          justifyContent="flex-end"
          css={css`
            width: fit-content;
          `}
        >
          <ReplyIcon />
          <Txt variant="c11" color={colors.gray300}>
            {time}
          </Txt>
        </Col>
      </Row>
    </Col>
  );
};

export default OpponentChatBox;

const ChatBox = styled.div<{ maxWidth: number }>`
  padding: 8px 12px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: fit-content;
  border-radius: 24px;
  max-width: ${({ maxWidth }) => maxWidth}px;
  background-color: ${colors.gray100};
`;
