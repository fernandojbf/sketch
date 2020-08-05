import styled from 'styled-components';

const PageGrid = styled.div<{ fixedHeight?: boolean }>`
  display: grid;
  height: ${({ fixedHeight = false }) => (fixedHeight ? '100vh' : 'auto')};
  grid-auto-columns: 100%;
  grid-template-rows: max-content minmax(0, 1fr);
  align-items: center;
  row-gap: 16px;
  padding-bottom: 16px;
`;

export default PageGrid;
