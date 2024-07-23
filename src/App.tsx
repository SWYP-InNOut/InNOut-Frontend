import { Global } from '@emotion/react';
import Router from '@routers/index';
import { globalStyles } from '@styles/globalStyles';
import { useEffect } from 'react';
export const App = () => {
  const setScreenHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  useEffect(() => {
    setScreenHeight();

    // resize 이벤트가 발생하면 다시 계산하도록 아래 코드 추가
    window.addEventListener('resize', setScreenHeight);
    return () => window.removeEventListener('resize', setScreenHeight);
  }, []);

  return (
    <div>
      <Global styles={globalStyles} />
      <Router />
    </div>
  );
};

export default App;
