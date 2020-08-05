import styled from 'styled-components';
import { typography, TypographyProps } from 'styled-system';

import { ThemeProps } from '../../styles/theme';

interface TextProps {
  variant?: 'body' | 'small';
  color?: 'primary' | 'secondary';
}

const Text = styled.span<TextProps & TypographyProps>`
  ${typography}
  color: ${({ variant, theme }: TextProps & ThemeProps) =>
    variant === 'body' ? theme.colors.black : theme.colors.gray};
  font-size: ${({ variant, theme }: TextProps & ThemeProps) =>
    variant === 'body' ? `${theme.fontSizes[2]}` : `${theme.fontSizes[1]}`};
  margin: 0;
`;

Text.defaultProps = {
  variant: 'body',
  color: 'primary',
};

export default Text;
