import Txt from '@components/common/text/Txt';
import styled from '@emotion/styled';
import { colors } from '@styles/theme';
import React from 'react';
interface ContentContainerProps {
  content: string;
  height: number;
}

const ContentContainer: React.FC<ContentContainerProps> = ({ content, height }) => {
  return (
    <Container>
      <Txt variant="b16">{content}</Txt>
    </Container>
  );
};

export default ContentContainer;

const Container = styled.div`
  padding: 16px;
  background-color: ${colors.yellow300};
  border-radius: 8px;
  width: 100%;
`;
