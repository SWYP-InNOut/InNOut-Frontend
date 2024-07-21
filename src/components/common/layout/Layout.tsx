import React from 'react';

import { colors } from '@styles/theme';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface LayoutProps {
  hasHeader?: boolean;
  HeaderLeft?: React.ReactNode;
  HeaderCenter?: React.ReactNode;
  HeaderRight?: React.ReactNode;
  children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
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
      <div>{children}</div>
    </Main>
  );
};

export const Main = styled.main`
  position: relative;
  max-width: 512px;
  margin: 0 auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const HeaderContainer = styled.header`
  background-color: ${colors.white};
  position: sticky;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 64px;
  padding: 28px 16px 4px;
`;

export default Layout;
