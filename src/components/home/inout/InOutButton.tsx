import LottieContainer from '@components/common/lottie/LottieContainer';
import Txt from '@components/common/text/Txt';
import { VoteType } from '@constants/voteConstants';
import styled from '@emotion/styled';
import { colors } from '@styles/theme';
import React from 'react';
import { useState } from 'react';

export interface InOutButtonProps {
  type: VoteType;
  count: number;
  onVote: () => void;
  isSelected: boolean;
  isLoading: boolean;
}

const InOutButton: React.FC<InOutButtonProps> = ({
  type,
  count,
  onVote,
  isSelected,
  isLoading,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Container>
      <ButtonContainer
        onClick={onVote}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        isSelected={isSelected}
        type={type}
        disabled={isLoading}
      >
        <LottieContainer path={type === 'In' ? '/In.json' : '/Out.json'} isPlay={isSelected} />
        {isSelected ? (
          <Txt
            variant="h24"
            color={type === 'Out' ? colors.yellow800 : colors.red800}
            lineHeight={42}
          >
            {isLoading ? '...' : `${count} 명!`}
          </Txt>
        ) : (
          <Logo32>{type}</Logo32>
        )}
      </ButtonContainer>
    </Container>
  );
};

export default React.memo(InOutButton);
const Container = styled.div`
  &:active {
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 8px;
  }
`;
const ButtonContainer = styled.div<{ isSelected: boolean; type: VoteType; disabled: boolean }>`
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  padding: 16px 8px;
  gap: 6px;
  background-color: ${(props) => {
    if (props.isSelected) {
      return props.type === 'In' ? colors.red400 : colors.yellow600;
    } else {
      return colors.yellow200;
    }
  }};
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: background-color 0.3s ease;
`;

const Logo32 = styled.span`
  color: #000;
  text-align: center;
  font-family: 'Hancom Sans';
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: 42px;
`;
