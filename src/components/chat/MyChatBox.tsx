import { Col, Row } from '@components/common/flex/Flex';
import Txt from '@components/common/text/Txt';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useWindowWidth } from '@hooks/useWindowWidth';
import { ReplyIcon } from '@icons/index';
import { colors } from '@styles/theme';

interface MyChatBoxProps {
  message: string;
  time: string;
  onClick?: () => void;
}

const MyChatBox = ({ message, time, onClick }: MyChatBoxProps) => {
  const maxWidth = useWindowWidth() * 0.61;
  return (
    <Col padding={'0 16px'} gap={8} alignItems={'flex-end'}>
      <Txt
        variant="c12"
        color={colors.darkGray}
        css={css`
          padding: 0 12px;
        `}
      >
        나
      </Txt>
      <Row gap={4} alignItems={'flex-end'} justifyContent={'flex-end'}>
        <Txt variant="c12" color={colors.gray300}>
          {time}
        </Txt>
        <ChatBox maxWidth={maxWidth}>
          <Txt variant="c14">{message}</Txt>
        </ChatBox>
      </Row>
    </Col>
  );
};

export default MyChatBox;

const ChatBox = styled.div<{ maxWidth: number }>`
  padding: 8px 12px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: fit-content;
  border-radius: 24px;
  max-width: ${({ maxWidth }) => maxWidth}px;
  background-color: #ffede4;
`;
