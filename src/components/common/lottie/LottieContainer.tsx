import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import Lottie, { AnimationItem } from 'lottie-web';

export type LottieContainerProps = {
  path: string;
  isPlay: boolean;
};

export const LottieContainer: React.FC<LottieContainerProps> = ({ path, isPlay }) => {
  const lottieContainer = useRef<HTMLDivElement>(null);
  const animRef = useRef<AnimationItem | null>(null);

  useEffect(() => {
    if (lottieContainer.current) {
      animRef.current = Lottie.loadAnimation({
        container: lottieContainer.current,
        renderer: 'svg',
        loop: true,
        autoplay: isPlay,
        path: path,
      });

      return () => {
        if (animRef.current) {
          animRef.current.destroy();
        }
      };
    }
  }, [path]);

  useEffect(() => {
    if (animRef.current) {
      if (isPlay) {
        animRef.current.play();
      } else {
        animRef.current.stop();
      }
    }
  }, [isPlay]);

  return <Root ref={lottieContainer} />;
};

export default LottieContainer;

const Root = styled.div`
  width: 100%;
  height: 100%;
`;
