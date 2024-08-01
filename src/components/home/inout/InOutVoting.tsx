import { Row } from '@components/common/flex/Flex';
import styled from '@emotion/styled';
import { colors } from '@styles/theme';
import { useEffect, useState } from 'react';
import InOutButton from './InOutButton';
import { VoteType } from '@constants/voteConstants';
import { useMutation } from 'react-query';
import { postInOut } from '@apis/stuff';
import useAuthStore from '@stores/auth';
import React from 'react';

export interface InOutVoting {
  initialInCount?: number; //in 개수
  initialOutCount?: number; //out 개수
  inOrOut?: VoteType; //어떻게 투표했는지 넘겨주는 애
  postId: number; //게시글 id
  onVote?: () => void; //투표했을 때 실행되는 함수
}

const InOutVoting: React.FC<InOutVoting> = ({
  initialInCount = 0,
  initialOutCount = 0,
  inOrOut,
  postId,
  onVote,
}) => {
  const [inCount, setInCount] = useState<number>(initialInCount);
  const [outCount, setOutCount] = useState<number>(initialOutCount);
  const [selectedVote, setSelectedVote] = useState<VoteType>(inOrOut || 'None'!);
  const isLogin = useAuthStore((store) => store.isLoggedIn);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setInCount(initialInCount);
    setOutCount(initialOutCount);
  }, [initialInCount, initialOutCount]);

  useEffect(() => {
    if (inOrOut) {
      setSelectedVote(inOrOut);
    }
  }, [inOrOut, inCount, outCount]);

  useEffect(() => {
    // console.log('selectedVote:', selectedVote);
  }, [selectedVote]);

  const inOutMutation = useMutation(postInOut, {
    onSuccess: (data) => {
      if (data.code === 1000) {
        setInCount(data.result.inCount);
        setOutCount(data.result.outCount);
        setSelectedVote(data.result.in ? 'In' : data.result.out ? 'Out' : 'None');
        if (onVote) onVote();
      }
    },
    onError: (error) => {
      console.error('InOut 실패:', error);
    },
  });
  const handleVote = (type: VoteType) => {
    if (!isLogin) {
      console.log('로그인이 필요합니다.');
      return;
    }

    setIsLoading(true);

    let newVote: VoteType;
    let newIn: boolean;
    let newOut: boolean;

    if (selectedVote === 'None') {
      newVote = type;
    } else if (type === selectedVote) {
      newVote = 'None';
    } else {
      newVote = type;
    }

    // 즉시
    setSelectedVote(newVote);
    newIn = newVote === 'In';
    newOut = newVote === 'Out';

    // 이건 다시 확인해보기
    if (newIn) setInCount((prev) => prev + 1);
    if (newOut) setOutCount((prev) => prev + 1);
    if (selectedVote === 'In' && newVote !== 'In') setInCount((prev) => prev - 1);
    if (selectedVote === 'Out' && newVote !== 'Out') setOutCount((prev) => prev - 1);

    const requestBody = {
      postId: postId,
      isMember: true,
      in: newIn,
      out: newOut,
    };

    inOutMutation.mutate(requestBody, {
      onSuccess: (data) => {
        if (data.code === 1000) {
          setInCount(data.result.inCount);
          setOutCount(data.result.outCount);
          setSelectedVote(data.result.in ? 'In' : data.result.out ? 'Out' : 'None');
          if (onVote) onVote();
        }
        setIsLoading(false);
      },
      onError: (error) => {
        console.error('InOut 실패:', error);
        // 에러 발생 시 원래 상태로 복구 로직
        setSelectedVote(selectedVote);
        setInCount(inCount);
        setOutCount(outCount);
        setIsLoading(false);
      },
    });
  };

  return (
    <Row gap={'8'}>
      <InOutButton
        type="In"
        count={inCount}
        onVote={() => handleVote('In')} // In투표 했어요.
        isSelected={selectedVote === 'In'}
        isLoading={isLoading}
      />
      <InOutButton
        type="Out"
        count={outCount}
        onVote={() => handleVote('Out')} // Out투표 했어요.
        isSelected={selectedVote === 'Out'}
        isLoading={isLoading}
      />
    </Row>
  );
};

export default React.memo(InOutVoting);
