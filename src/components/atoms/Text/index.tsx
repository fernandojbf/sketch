import styled from 'styled-components';
import { typography, TypographyProps, space, SpaceProps } from 'styled-system';

import { ThemeProps } from '../../../styles/theme';

type TextProps = SpaceProps &
  TypographyProps & {
    variant?: 'body' | 'small';
    color?: 'primary' | 'secondary';
  };

const Text = styled.span<TextProps>`
  color: ${({ color, theme }: TextProps & ThemeProps) =>
    color === 'primary' ? theme.colors.black : theme.colors.gray};
  font-size: ${({ variant, theme }: TextProps & ThemeProps) =>
    variant === 'body' ? `${theme.fontSizes[2]}` : `${theme.fontSizes[1]}`};
  margin: 0;
  ${space}
  ${typography}
`;

Text.defaultProps = {
  variant: 'body',
  color: 'primary',
};

export default Text;
