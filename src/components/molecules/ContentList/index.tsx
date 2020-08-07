import { ReactElement, FunctionComponent } from 'react';
import styled from 'styled-components';

import Box from '../../atoms/Box';

import { ThemeProps } from '../../../styles/theme';

// responsive work could be done here
const List = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: 350px;
  grid-gap: ${({ theme }: ThemeProps) => theme.sizes[4]};
  justify-items: stretch;
  align-items: stretch;
  padding: ${({ theme }: ThemeProps) => theme.sizes[3]};
`;

const ContentList: FunctionComponent<{
  items: Array<{
    element: ReactElement;
    id: string;
  }>;
}> = ({ items }) => {
  return (
    <List>
      {items.map((item) => (
        <Box as="li" display="flex" key={item.id}>
          {item.element}
        </Box>
      ))}
    </List>
  );
};

export default ContentList;
