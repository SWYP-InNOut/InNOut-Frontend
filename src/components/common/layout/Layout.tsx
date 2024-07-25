import React from 'react';

import { colors } from '@styles/theme';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Col } from '../flex/Flex';
import Txt from '../text/Txt';

interface LayoutProps {
  hasHeader?: boolean;
  HeaderLeft?: React.ReactNode;
  HeaderCenter?: React.ReactNode;
  HeaderRight?: React.ReactNode;
  children: React.ReactNode;
  overflow?: string;
  Footer?: boolean;
}

const Layout = (props: LayoutProps) => {
  const {
    hasHeader = true,
    HeaderLeft,
    HeaderCenter,
    HeaderRight,
    children,
    overflow,
    Footer = false,
  } = props;

  return (
    <Main overflow={overflow ? overflow : 'auto'}>
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
      {Footer && (
        <Col
          padding={'29.5px 0'}
          css={css`
            background-color: ${colors.yellow300};
            text-align: center;
          `}
        >
          <Txt variant="b16" color={colors.lightGray}>
            stuffinout@gmail.com
          </Txt>
          <Txt variant="c11" color={colors.lightGray}>
            Copyright ©Teamname. All rights reserved.
          </Txt>
        </Col>
      )}
    </Main>
  );
};

export const Main = styled.main<{ overflow: string }>`
  position: relative;
  max-width: 512px;
  margin: 0 auto;
  height: calc(var(--vh, 1vh) * 100);
  background-color: ${colors.white};
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch !important;
  scrollbar-width: none;
  overflow: ${({ overflow }) => overflow};

  ::-webkit-scrollbar {
    display: none;
    width: 0; /* Remove scrollbar space */
    height: 0;
    background: transparent; /* Optional: just make scrollbar invisible */
    -webkit-appearance: none;
  }
`;

export const HeaderContainer = styled.header`
  z-index: 100;
  position: sticky;
  background-color: ${colors.white};
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
