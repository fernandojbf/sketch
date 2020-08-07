import { FunctionComponent } from 'react';
import styled from 'styled-components';

import DeviceEmulation from '../../molecules/DeviceEmulation';

const Image = styled.img`
  object-fit: scale-down;
`;

const ArtBoardFileViewer: FunctionComponent<{
  url: string;
  name: string;
  width: number;
  height: number;
}> = ({ url, name, width, height }) => (
  <DeviceEmulation width={width} height={height}>
    <Image height="100%" width="100%" src={url} alt={name} />
  </DeviceEmulation>
);
export default ArtBoardFileViewer;
