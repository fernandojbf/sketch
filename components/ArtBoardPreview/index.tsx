import styled from "styled-components";

import Text from "../../components/Text";

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

const ImageWrapper = styled.div`
  display: flex;
  flex: 1;
  max-width: 100%;
  max-height: 90%;
  margin-bottom: 16px;
`;

const Image = styled.img`
  object-fit: scale-down;
`;

const ArtBoardPreview = ({ artboard }) => {
  return (
    <Wrapper>
      <ImageWrapper>
        <Image
          alt={`entry.name thumbnail`}
          src={artboard.files[0].thumbnails[0].url}
        />
      </ImageWrapper>

      <Text>{artboard.name}</Text>
    </Wrapper>
  );
};

export default ArtBoardPreview;
