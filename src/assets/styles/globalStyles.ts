import { colors } from '@styles/theme';
import { css } from '@emotion/react';

export const globalStyles = css`
  * {
    box-sizing: border-box;
  }

  html {
    box-sizing: border-box;
    font-family: 'LINE Seed Sans', 'SpoqaHanSansNeo-Bold', sans-serif;
    font-size: 62.5%;
  }

  html,
  body,
  #root {
    width: 100vw;
    max-width: 512px;
    height: auto;
    min-height: 100vh;
    margin: 0 auto;
    background-color: ${colors.yellow300};

    -webkit-overflow-scrolling: touch !important;
    -ms-overflow-style: none;
    scrollbar-width: none;

    ::-webkit-scrollbar {
      display: none;
    }
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
