import { atom, selector } from 'recoil';
import { gql } from '@apollo/client';
import { NextRouter } from 'next/router';
import { client } from '../../pages/_app';

type RouterActionType = NextRouter['push'] | NextRouter['replace'];

const QUERY_DOCUMENT = 'document-id';
const QUERY_ARTBOARD = 'artboard-id';

const GET_DOCUMENT = gql`
  query GetDocument($shortId: String!) {
    share(shortId: $shortId) {
      version {
        document {
          name
          artboards {
            entries {
              id
              name
              isArtboard
              files {
                url
                height
                width
                scale
                thumbnails {
                  url
                  height
                  width
                }
              }
            }
          }
        }
      }
    }
  }
`;

const getRoute = (
  documentId?: string,
  artBoardId?: string
): [string, string] => {
  let as = `/document/${documentId}`;
  let url = `/document/[${QUERY_DOCUMENT}]`;

  if (!!artBoardId) {
    as += `/${artBoardId}`;
    url += `/[${QUERY_ARTBOARD}]`;
  }
  return [url, as];
};

const getEntriesFromDocument = (documentData) => {
  const {
    version: { document },
  } = documentData;

  const {
    name,
    artboards: { entries },
  } = document;

  return entries;
};

export const selectedDocumentAtom = atom({
  key: 'atom-document-id',
  default: undefined,
});

const selectedArtBoardAtom = atom({
  key: 'atom-artboard-id',
  default: undefined,
});

export const documentDataSelector = selector({
  key: 'selector-document-data',
  get: async ({ get }) => {
    const documentId = get(selectedDocumentAtom);

    if (!documentId) return undefined;

    try {
      const { data } = await client.query({
        query: GET_DOCUMENT,
        variables: {
          shortId: documentId,
        },
      });

      return data.share;
    } catch (e) {
      throw e;
    }
  },
});

export const selectedArtBoard = selector({
  key: 'selector-artboard-item',
  get: ({ get }) => {
    const selectedArtBoardId = get(selectedArtBoardAtom);

    if (!selectedArtBoardId) {
      return undefined;
    }

    const documentData = get(documentDataSelector);
    const entries = getEntriesFromDocument(documentData);

    const entry = entries.find((entry) => entry.id === selectedArtBoardId);

    if (!entry) {
      throw new Error('Artboard not found in document');
    }

    return entry;
  },
});

export const selectArtBoardPagination = selector({
  key: 'selector-artboard-pagination',
  get: ({ get }) => {
    const selectedArtBoardId = get(selectedArtBoardAtom);

    if (!selectedArtBoardId) {
      return {};
    }

    const documentData = get(documentDataSelector);
    const entries = getEntriesFromDocument(documentData);

    const index = entries.findIndex((entry) => entry.id === selectedArtBoardId);

    const prev = index <= 0 ? undefined : entries[index - 1];
    const next = index >= entries.length ? undefined : entries[index + 1];

    return {
      next,
      prev,
      currentPage: index + 1,
      paginationLength: entries.length,
    };
  },
  set: ({ get, set }, { type, routerAction }) => {
    // @ts-ignore
    const { prev, next } = get(selectArtBoardPagination);

    switch (type) {
      case 'prev':
        if (prev) {
          if (routerAction) {
            const documentId = get(selectedDocumentAtom);
            routerAction(...getRoute(documentId, prev.id));
          }
          set(selectedArtBoardAtom, prev.id);
        }
        break;
      case 'next':
        if (next) {
          if (routerAction) {
            const documentId = get(selectedDocumentAtom);
            routerAction(...getRoute(documentId, next.id));
          }
          set(selectedArtBoardAtom, next.id);
        }
        break;
      default:
        return;
    }
  },
});

export const unselectArtBoard = selector({
  key: 'selector-unselect-artboard',
  get: () => {},
  set: (
    { get, reset },
    { routerAction }: { routerAction: RouterActionType }
  ) => {
    if (routerAction) {
      const documentId = get(selectedDocumentAtom);
      routerAction(...getRoute(documentId));
    }
    reset(selectedArtBoardAtom);
  },
});

export const selectionsSelector = selector<{
  documentId?: string;
  artBoardId?: string;
}>({
  key: 'selector-selected-ids',
  get: ({ get }) => ({
    documentId: get(selectedDocumentAtom),
    artBoardId: get(selectedArtBoardAtom),
  }),
  set: (
    { set },
    {
      documentId,
      artBoardId,
      routerAction,
    }: {
      documentId?: string;
      artBoardId?: string;
      routerAction: RouterActionType;
    }
  ) => {
    if (routerAction) {
      routerAction(...getRoute(documentId, artBoardId));
    }
    set(selectedDocumentAtom, documentId);
    set(selectedArtBoardAtom, artBoardId);
  },
});
