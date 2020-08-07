import styled from 'styled-components';

import Text from '../../atoms/Text';

import { ThemeProps } from '../../../styles/theme';

const Wrapper = styled.div`
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

const ArtBoardPreview = ({ artboard }) => {
  return (
    <Wrapper>
      <Image
        alt={`entry.name thumbnail`}
        src={artboard.files[0].thumbnails[0].url}
        loading="lazy"
      />

      <Text textAlign="center">{artboard.name}</Text>
    </Wrapper>
  );
};

export default ArtBoardPreview;
