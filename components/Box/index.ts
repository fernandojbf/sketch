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
  position,
  PositionProps,
} from "styled-system";

type BoxProps = ColorProps &
  SpaceProps &
  LayoutProps &
  BackgroundProps &
  ShadowProps &
  DisplayProps &
  FlexboxProps &
  PositionProps;

const Box = styled.div<BoxProps>`
  ${color}
  ${space}
  ${layout}
  ${background}
  ${shadow}
  ${display}
  ${flexbox}
  ${position}
`;

export default Box;
