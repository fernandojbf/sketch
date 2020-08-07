import { ReactNode, FunctionComponent } from 'react';

import Box from '../../atoms/Box';

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
    minHeight={5}
    as="header"
  >
    <Box px="3" py="2">
      {preContent || <img alt="Sketch Logo" src="/sketch-logo.svg" />}
    </Box>
    <Box as="img" height="40px" src={'/separator.svg'} />
    <Box px="4">{content}</Box>
  </Box>
);

export default Header;
