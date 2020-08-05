import { ReactNode, FunctionComponent } from 'react';

import Box from '../Box';

interface HeaderProps {
  content?: ReactNode;
  preContent?: ReactNode;
}

const Header: FunctionComponent<HeaderProps> = ({ content, preContent }) => (
  <Box
    display="flex"
    alignItems="center"
    boxShadow="hard"
    py="0"
    position="relative"
  >
    {preContent && <Box padding="3">{preContent}</Box>}
    <Box as="img" height="40px" src={'/separator.svg'} />
    <Box px="4">{content}</Box>
  </Box>
);

export default Header;
