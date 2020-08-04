import styled from "styled-components";
import {
  color,
  ColorProps,
  space,
  SpaceProps,
  layout,
  LayoutProps,
  background,
  BackgroundProps,
  shadow,
  ShadowProps,
  display,
  DisplayProps,
  flexbox,
  FlexboxProps,
} from "styled-system";

interface BoxProps
  extends ColorProps,
    SpaceProps,
    LayoutProps,
    BackgroundProps,
    ShadowProps,
    DisplayProps,
    FlexboxProps {}

const Box = styled.div<BoxProps>`
  ${color}
  ${space}
  ${layout}
  ${background}
  ${shadow}
  ${display}
  ${flexbox}
`;

export default Box;
