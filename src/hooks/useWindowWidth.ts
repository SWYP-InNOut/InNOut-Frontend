import { useEffect, useState } from 'react';

export const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 512) {
        setWidth(512);
        return;
      }
      setWidth(window.innerWidth);
    };

    // 컴포넌트가 마운트될 때 handleResize를 명시적으로 호출하여 초기 너비를 설정
    handleResize();

    window.addEventListener('resize', handleResize);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return width;
};
