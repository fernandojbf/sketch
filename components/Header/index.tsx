import Box from "../Box";
import { ReactNode, FunctionComponent } from "react";
import styled from "styled-components";

import { ThemeProps } from "../../styles/theme";

interface HeaderProps {
  content?: ReactNode;
  preContent?: ReactNode;
}

const PreContentWrapper = styled(Box)`
  position: relative;
  ::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 0;
    height: 50%;
    width: 0;
    border-radius: 50%;
    transform: translateY(-50%);
    box-shadow: ${({ theme }: ThemeProps) => theme.shadows.medium};
  }
`;

const Header: FunctionComponent<HeaderProps> = ({ content, preContent }) => (
  <Box
    display="flex"
    alignItems="center"
    boxShadow="hard"
    py="0"
    position="relative"
  >
    {preContent && (
      <PreContentWrapper padding="3">{preContent}</PreContentWrapper>
    )}
    <Box px="4">{content}</Box>
  </Box>
);

export default Header;
