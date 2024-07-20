import { Global } from '@emotion/react';
import { globalStyles } from '@styles/globalStyles';
import Router from '@routers/index';
function App() {
  return (
    <div>
      <Global styles={globalStyles} />
      <Router />
    </div>
  );
}

export default App;
