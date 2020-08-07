import { useRecoilValueLoadable, waitForAll, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import Header from '../../molecules/Header';
import ArtBoardPreview from '../../molecules/ArtBoardPreview';
import ContentList from '../../molecules/ContentList';
import PageGrid from '../../atoms/PageGrid';
import Text from '../../atoms/Text';

import {
  documentDataSelector,
  selectionsSelector,
  selectedDocumentAtom,
} from '../../../state/document';

import { ThemeProps } from '../../../styles/theme';

const getDocumentInfo = (documentData) => {
  if (!documentData) {
    return [];
  }

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
  const { push } = useRouter();
  const setSelection = useSetRecoilState(selectionsSelector);

  // since next use ssr and suspense does not work with ssr, i will use useRecoilValueLoadable in this project
  const data = useRecoilValueLoadable(
    waitForAll([selectedDocumentAtom, documentDataSelector])
  );

  const isLoading = data.state === 'loading';
  const hasError = data.state === 'hasError';

  const [documentId, documentData] =
    // @ts-ignore
    isLoading || hasError ? [] : data.getValue();

  const [name, entries] = getDocumentInfo(documentData);

  // this will prevent the error with the race condition between router and recoil
  // history using recoil would be good solution for this.
  const shouldShowBlank = isLoading || hasError || !entries;

  return (
    <PageGrid>
      <Header content={!shouldShowBlank && <Text as="h1">{name}</Text>} />

      {shouldShowBlank ? (
        <Text as="p" textAlign="center">
          {hasError ||
          // @ts-ignore
          data.errorMaybe()
            ? // @ts-ignore
              data.errorMaybe().message
            : 'Loading'}
        </Text>
      ) : (
        <ContentList
          items={entries.map((entry) => ({
            id: entry.name,
            element: (
              <Link
                href={`/document/${documentId}/${entry.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setSelection({
                    documentId: documentId,
                    artBoardId: entry.id,
                    // @ts-ignore
                    routerAction: push,
                  });
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
