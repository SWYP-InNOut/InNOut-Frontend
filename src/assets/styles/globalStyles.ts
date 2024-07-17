import { css } from '@emotion/react';

export const globalStyles = css`
  * {
    box-sizing: border-box;
  }

  html {
    box-sizing: border-box;
    font-family: 'SpoqaHanSansNeo-Regular', 'LINE Seed Sans KR', sans-serif;
    font-size: 62.5%;
  }

  #root {
    width: 100vw;
    max-width: 512px;
    height: calc(var(--vh, 1vh) * 100);
    margin: 0 auto;

    /* height: 100% !important; */

    /* overflow: auto !important; */
    -webkit-overflow-scrolling: touch !important;
  }

  button {
    padding: 0;
    overflow: visible;
    cursor: pointer;
    background: inherit;
    border: none;
    border-radius: 0;
    box-shadow: none;
  }
`;
