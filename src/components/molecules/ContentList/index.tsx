import { ReactElement, FunctionComponent } from 'react';
import styled from 'styled-components';

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

const Item = styled.li`
  display: flex;
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
        <Item key={item.id}>{item.element}</Item>
      ))}
    </List>
  );
};

export default ContentList;
