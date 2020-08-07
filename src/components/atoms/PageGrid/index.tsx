import styled from 'styled-components';
import { ThemeProps } from '../../../styles/theme';

const PageGrid = styled.div<{ fixedHeight?: boolean }>`
  display: grid;
  height: ${({ fixedHeight = false }) => (fixedHeight ? '100vh' : 'inherit')};
  grid-auto-columns: 100%;
  grid-template-rows: max-content minmax(0, 1fr);
  row-gap: ${({ theme }: ThemeProps) => theme.sizes[3]};
  padding-bottom: ${({ theme }: ThemeProps) => theme.sizes[3]};
  flex: 1;
`;

export default PageGrid;
