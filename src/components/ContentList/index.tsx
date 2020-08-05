import styled from 'styled-components';

// responsive work could be done here
const List = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(5, calc(20% - 25.6px));
  grid-auto-rows: 350px;
  grid-gap: 32px;
  justify-items: stretch;
  align-items: stretch;
  padding: 16px;
`;

const Item = styled.li`
  display: flex;
`;

const ContentList = ({ items }) => {
  return (
    <List>
      {items.map((item) => (
        <Item key={item.id}>{item.element}</Item>
      ))}
    </List>
  );
};

export default ContentList;
