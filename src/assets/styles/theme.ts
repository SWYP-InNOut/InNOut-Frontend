export const colors = {
  black: '#000000',
  white: '#FFFFFF',
  darkGray: '#303030',
  lightGray: '#B4B4B4',
  errRed: '#F38142',
  socialKakao: '#FEE500',
  socialGoogle: '#F2F2F2',

  gray100: '#F2F2F1',
  gray200: '#DFDFDF',
  gray300: '#B4B4B4',
  gray400: '#848484',
  gray500: '#595959',
  gray600: '#303030',
  gray700: '#262626',
  gray800: '#1D1D1D',
  gray900: '#171717',

  yellow100: '#FDFDFA',
  yellow200: '#FAFAF4',
  yellow300: '#F6F6EE',
  yellow400: '#F3F3E8',
  yellow500: '#F0F0E2',
  yellow600: '#C0C0B5',
  yellow700: '#919188',
  yellow800: '#73736C',
  yellow900: '#575751',

  red100: '#FEF4F0',
  red200: '#FCE9E0',
  red300: '#F8CCB9',
  red400: '#F4AB8B',
  red500: '#F18E64',
  re600: '#ED723D',
  red700: '#BE5B31',
  red800: '#8F4525',
  red900: '#71371D',
  red1000: '#552916',
} as const;

export type Colors = typeof colors;

interface FontStyle {
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
  fontFamily: string;
  letterSpacing?: string;
}

export const fontStyles: Record<string, FontStyle> = {
  h32: {
    fontSize: '3.2rem',
    fontWeight: '700',
    lineHeight: '48px',
    fontFamily: 'Spoqa Han Sans Neo',
  },

  h28: {
    fontSize: '2.8rem',
    fontWeight: '700',
    lineHeight: '47px',
    fontFamily: 'LINE Seed Sans KR',
  },

  h24: {
    fontSize: '2.4rem',
    fontWeight: '700',
    lineHeight: '36px',
    fontFamily: 'LINE Seed Sans KR',
  },

  t20: {
    fontSize: '2rem',
    fontWeight: '700',
    lineHeight: '30px',
    fontFamily: 'Spoqa Han Sans Neo',
    letterSpacing: '-0.4px',
  },
  t18: {
    fontSize: '1.8rem',
    fontWeight: '400',
    lineHeight: '27px',
    fontFamily: 'LINE Seed Sans',
  },
  t16: {
    fontSize: '1.6rem',
    fontWeight: '700',
    lineHeight: '24px',
    fontFamily: 'LINE Seed Sans',
  },
  b16: {
    fontSize: '1.6rem',
    fontWeight: '400',
    lineHeight: '24px',
    fontFamily: 'Spoqa Han Sans Neo',
  },
  b13: {
    fontSize: '1.3rem',
    fontWeight: '400',
    lineHeight: '19.5px',
    fontFamily: 'LINE Seed Sans',
  },
  c14: {
    fontSize: '1.4rem',
    fontWeight: '400',
    lineHeight: '21px',
    fontFamily: 'LINE Seed Sans',
  },
  c12: {
    fontSize: '1.2rem',
    fontWeight: '400',
    lineHeight: '18px',
    fontFamily: 'LINE Seed Sans',
  },
  c11: {
    fontSize: '1.1rem',
    fontWeight: '400',
    lineHeight: '16.5px',
    fontFamily: 'LINE Seed Sans',
  },
  //소셜 글꼴 추가
  social: {
    fontSize: '1.4rem',
    fontWeight: '500',
    lineHeight: '14px',
    fontFamily: 'Spoqa Han Sans Neo',
  },
};

export type FontStylesTypes = typeof fontStyles;
