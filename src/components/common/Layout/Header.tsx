import React from 'react';

import { colors } from '@styles/theme';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface HeaderProps {
  hasHeader?: boolean;
  HeaderLeft?: React.ReactNode;
  HeaderCenter?: React.ReactNode;
  HeaderRight?: React.ReactNode;
  children: React.ReactNode;
}

const Layout = (props: HeaderProps) => {
  const { hasHeader = true, HeaderLeft, HeaderCenter, HeaderRight, children } = props;

  return (
    <Main>
      {hasHeader && (
        <HeaderContainer>
          <div
            css={css`
              justify-self: start;
            `}
          >
            {HeaderLeft}
          </div>
          <div
            css={css`
              justify-self: center;
            `}
          >
            {HeaderCenter}
          </div>
          <div
            css={css`
              justify-self: end;
            `}
          >
            {HeaderRight}
          </div>
        </HeaderContainer>
      )}
      <div
        css={css`
          height: 100%;
        `}
      >
        {children}
      </div>
    </Main>
  );
};

export const Main = styled.main`
  position: relative;
  max-width: 512px;
  height: calc(var(--vh, 1vh) * 100);
  margin: 0 auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const HeaderContainer = styled.header`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 0 16px;
`;

export default Layout;
