import styled from '@emotion/styled';
import React from 'react';
const Loading = () => {
  return (
    <Div>
      <img src="/Loading.gif" alt="loading"></img>
    </Div>
  );
};

export default Loading;

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
