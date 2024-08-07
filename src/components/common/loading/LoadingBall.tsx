import styled from '@emotion/styled';
import React from 'react';
import LottieContainer from '../lottie/LottieContainer';

const LoadingBall = () => {
  return (
    <Overlay>
      <Wrapper>
        <LottieContainer path="/Ball_Fast.json" isPlay={true} />
      </Wrapper>
    </Overlay>
  );
};

export default LoadingBall;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100000;
`;

const Wrapper = styled.div`
  width: 160px;
  height: 160px;
`;
