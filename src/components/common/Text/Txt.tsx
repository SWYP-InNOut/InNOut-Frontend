import styled from '@emotion/styled';
import { fontStyles } from '@styles/theme.ts';

interface TextProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof fontStyles;
  color?: string;
  align?: string;
  styles?: any;
}

const Txt = styled.span<TextProps>`
  font-size: ${({ variant }) => (variant ? fontStyles[variant].fontSize : 'inherit')};
  font-weight: ${({ variant }) => (variant ? fontStyles[variant].fontWeight : 'inherit')};
  line-height: ${({ variant }) => (variant ? fontStyles[variant].lineHeight : 'inherit')};
  color: ${({ color }) => color || 'black'};
  text-align: ${({ align }) => align || 'inherit'};
  ${({ styles }) => styles}
`;

export default Txt;
