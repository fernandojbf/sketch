import { FunctionComponent, ComponentPropsWithRef } from "react";
import styled from "styled-components";
import { ThemeProps } from "../../styles/theme";

interface TextProps {
  variant?: "body" | "small";
  color?: "primary" | "secondary";
}

// Since the app almost does not contain texts, i've made a simple component with only color and 2 sizes variations.
const StyledText = styled("span")`
  color: ${({ variant, theme }: TextProps & ThemeProps) =>
    variant === "body" ? theme.colors.black : theme.colors.gray};
  font-size: ${({ variant, theme }: TextProps & ThemeProps) =>
    variant === "body" ? `${theme.fontSizes[2]}` : `${theme.fontSizes[1]}`};
`;

const Text: FunctionComponent<
  ComponentPropsWithRef<typeof StyledText> & TextProps
> = ({ color = "primary", variant = "body", ...rest }) => (
  <StyledText color={color} variant={variant} {...rest} />
);

export default Text;
