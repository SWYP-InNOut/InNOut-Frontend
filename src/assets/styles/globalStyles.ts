import { colors } from '@styles/theme';
import { css } from '@emotion/react';

export const globalStyles = css`
  * {
    box-sizing: border-box;
  }

  html {
    box-sizing: border-box;
    font-family: 'LINE Seed Sans', 'Spoqa Han Sans Neo', sans-serif;
    font-size: 62.5%;
  }

  html,
  body,
  #root {
    width: 100vw;
    max-width: 512px;
    height: calc(var(--vh, 1vh) * 100);
    overflow-x: hidden;
    margin: 0 auto;
    background-color: ${colors.white};

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
