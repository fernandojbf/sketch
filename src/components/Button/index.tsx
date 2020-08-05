import styled from 'styled-components';

import { ThemeProps } from '../../styles/theme';

// simple button
const Button = styled.button`
  background-color: ${({ theme }: ThemeProps) => theme.colors.white};
  border: none;

  &:disabled {
    opacity: 0.3;
  }
`;

export default Button;
