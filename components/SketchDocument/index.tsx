import { useRecoilValueLoadable, useRecoilState } from "recoil";
import styled from "styled-components";

import Header from "../Header";
import ArtBoardPreview from "../ArtBoardPreview";
import Text from "../Text";
import ContentList from "../ContentList";

import { documentDataSelector, selectionsSelector } from "../../state/document";

import { ThemeProps } from "../../styles/theme";

const Link = styled.a`
  display: flex;
  flex: 1;
  text-decoration: none;

  &:focus {
    outline: 1px solid ${({ theme }: ThemeProps) => theme.colors.gray};
  }

  &:hover {
    outline: 1px solid ${({ theme }: ThemeProps) => theme.colors.black};
  }
`;

const SketchDocument = () => {
  const [{ documentId }, setSelection] = useRecoilState(selectionsSelector);

  // since next use ssr and suspense does not work with ssr, i will use useRecoilValueLoadable in this project
  const documentData = useRecoilValueLoadable(documentDataSelector);

  if (documentData.state === "loading") {
    return <div>loading</div>;
  }

  if (documentData.state === "hasError") {
    return <div>error</div>;
  }

  const {
    version: {
      document: {
        name,
        artboards: { entries },
      },
    },
    // @ts-ignore
  } = documentData.getValue();

  return (
    <>
      <Header
        preContent={<img alt="Sketch Logo" src="/sketch-logo.svg" />}
        content={<Text as="h1">{name}</Text>}
      />

      <ContentList
        items={entries.map((entry) => ({
          id: entry.name,
          element: (
            <Link
              href={`/document/${documentId}/${entry.id}`}
              onClick={(e) => {
                e.preventDefault();
                setSelection({ documentId: documentId, artBoxId: entry.id });
              }}
            >
              <ArtBoardPreview artboard={entry} />
            </Link>
          ),
        }))}
      />
    </>
  );
};

export default SketchDocument;
