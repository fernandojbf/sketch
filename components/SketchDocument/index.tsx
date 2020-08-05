import {
  useRecoilValueLoadable,
  useRecoilState,
  waitForAll,
  useSetRecoilState,
} from 'recoil';
import styled from 'styled-components';

import Header from '../Header';
import ArtBoardPreview from '../ArtBoardPreview';
import Text from '../Text';
import ContentList from '../ContentList';

import {
  documentDataSelector,
  selectionsSelector,
  selectedDocumentAtom,
} from '../../state/document';

import { ThemeProps } from '../../styles/theme';
import PageGrid from '../PageGrid';

const getDocumentInfo = (documentData) => {
  const {
    version: {
      document: {
        name,
        artboards: { entries },
      },
    },
  } = documentData;

  return [name, entries];
};

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
  const setSelection = useSetRecoilState(selectionsSelector);

  // since next use ssr and suspense does not work with ssr, i will use useRecoilValueLoadable in this project
  const data = useRecoilValueLoadable(
    waitForAll([selectedDocumentAtom, documentDataSelector])
  );

  const isLoading = data.state === 'loading';
  const hasError = data.state === 'hasError';

  if (isLoading) {
    return <div>loading</div>;
  }

  if (hasError) {
    return <div>error</div>;
  }
  const [documentId, documentData] =
    // @ts-ignore
    isLoading || hasError ? [] : data.getValue();

  const [name, entries] = getDocumentInfo(documentData);

  return (
    <PageGrid>
      <Header
        preContent={<img alt="Sketch Logo" src="/sketch-logo.svg" />}
        content={<Text as="h1">{name}</Text>}
      />

      {isLoading ? null : (
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
      )}
    </PageGrid>
  );
};

export default SketchDocument;
