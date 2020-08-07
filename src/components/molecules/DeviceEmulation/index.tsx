import { ReactNode, FunctionComponent, memo } from 'react';
import styled from 'styled-components';

type DeviceEmulationDeviceProps = {
  width: number;
  height: number;
  children: ReactNode;
};

const DeviceEmulationWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const DeviceEmulationDevice = styled.div<DeviceEmulationDeviceProps>`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  max-height: 100%;
  max-width: 100%;
  margin: auto;
`;

const DeviceEmulation: FunctionComponent<DeviceEmulationDeviceProps> = memo(
  ({ children, width, height }) => (
    <DeviceEmulationWrapper>
      <DeviceEmulationDevice width={width} height={height}>
        {children}
      </DeviceEmulationDevice>
    </DeviceEmulationWrapper>
  )
);

export default DeviceEmulation;
