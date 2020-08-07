import { FunctionComponent } from 'react';
import styled from 'styled-components';

import Text from '../../atoms/Text';

import { ThemeProps } from '../../../styles/theme';

const Wrapper = styled.figure`
  display: grid;
  grid-auto-columns: 100%;
  grid-template-rows: minmax(0, 1fr) max-content;
  align-items: center;
  row-gap: ${({ theme }: ThemeProps) => theme.sizes[1]};
  flex: 1;
`;

const Image = styled.img`
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
  height: 100%;
  width: 100%;
`;

const ArtBoardPreview: FunctionComponent<{ url: string; name: string }> = ({
  url,
  name,
}) => {
  return (
    <Wrapper>
      <Image alt={`${name} thumbnail`} src={url} loading="lazy" />

      <Text as="figcaption" textAlign="center">
        {name}
      </Text>
    </Wrapper>
  );
};

export default ArtBoardPreview;
