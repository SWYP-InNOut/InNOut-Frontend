import { Row } from '@components/common/flex/Flex';
import styled from '@emotion/styled';
import { colors } from '@styles/theme';
import { useEffect, useState } from 'react';
import InOutButton from './InOutButton';
import { VoteType } from '@constants/voteConstants';

export interface InOutVoting {
  initialInCount?: number;
  initialOutCount?: number;
  onVote?: () => void;
}

const InOutVoting: React.FC<InOutVoting> = ({ initialInCount = 0, initialOutCount = 0 }) => {
  const [inCount, setInCount] = useState<number>(initialInCount);
  const [outCount, setOutCount] = useState<number>(initialOutCount);
  const [selectedVote, setSelectedVote] = useState<VoteType | null>(null);

  const handleVote = (type: VoteType) => {
    console.log('handleVote');
    if (selectedVote === type) {
      // 같은 버튼을 다시 클릭하면 선택 취소
      setSelectedVote(null);
      if (type === 'In') {
        setInCount((prev) => prev - 1);
      } else {
        setOutCount((prev) => prev - 1);
      }
    } else {
      // 다른 버튼을 클릭하거나 처음 클릭할 때
      if (selectedVote) {
        // 이전에 선택한 버튼이 있으면 그 카운트를 감소
        if (selectedVote === 'In') {
          setInCount((prev) => prev - 1);
        } else {
          setOutCount((prev) => prev - 1);
        }
      }
      // 새로 선택한 버튼의 카운트를 증가
      if (type === 'In') {
        setInCount((prev) => prev + 1);
      } else {
        setOutCount((prev) => prev + 1);
      }
      setSelectedVote(type);
    }
  };

  useEffect(() => {
    // 투표 로직 넣으면 됨
    console.log('In:', inCount, 'Out:', outCount);
  }, [inCount, outCount]);

  return (
    <Row gap={'8'}>
      <InOutButton
        type="In"
        count={inCount}
        onVote={() => handleVote('In')} // In투표 했어요.
        isSelected={selectedVote === 'In'}
      />
      <InOutButton
        type="Out"
        count={outCount}
        onVote={() => handleVote('Out')} // Out투표 했어요.
        isSelected={selectedVote === 'Out'}
      />
    </Row>
  );
};

export default InOutVoting;
