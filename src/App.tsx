import styled from '@emotion/styled';
import icon from './assets/pic.svg';
import { Global } from '@emotion/react';
import { globalStyles } from './assets/styles/\bglobalStyles';
import Router from './routers';
function App() {
  return (
    <div>
      <Global styles={globalStyles} />
      <Router />
    </div>
  );
}

export default App;
