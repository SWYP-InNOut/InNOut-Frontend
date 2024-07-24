import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import Lottie from 'lottie-web';

export type LottieContainerProps = {
  path: string;
};

const Root = styled.div`
  width: 100%;
  height: 100%;
`;

export const LottieContainer: React.FC<LottieContainerProps> = ({ path }) => {
  const lottieContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lottieContainer.current) {
      const anim = Lottie.loadAnimation({
        container: lottieContainer.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: path,
      });

      return () => anim.destroy();
    }
  }, [path]);

  return <Root ref={lottieContainer} />;
};

export default LottieContainer;
