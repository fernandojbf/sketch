import { atom, selector } from "recoil";
import { gql } from "@apollo/client";

import { client } from "../../pages/_app";

const GET_DOCUMENT = gql`
  query GetDocument($shortId: String!) {
    share(shortId: $shortId) {
      shortId
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
  key: "atom-document-id",
  default: undefined,
});

const selectedArtBoardAtom = atom({
  key: "atom-artboard-id",
  default: undefined,
});

export const documentDataSelector = selector({
  key: "selector-document-data",
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
  key: "selector-artboard-item",
  get: ({ get }) => {
    const entries = getEntriesFromDocument(get(documentDataSelector));
    const selectedArtBoardId = get(selectedArtBoardAtom);

    return entries.find((entry) => entry.id === selectedArtBoardId);
  },
});

export const selectedPrevArtBoard = selector({
  key: "selector-prev-artboard",
  get: ({ get }) => {
    const documentData = get(documentDataSelector);
    const entries = getEntriesFromDocument(documentData);
    const selectedArtBoardId = get(selectedArtBoardAtom);

    const index = entries.findIndex((entry) => entry.id === selectedArtBoardId);

    if (index <= 0) {
      return undefined;
    }

    return entries[index - 1];
  },
  set: ({ get, set }) => {
    const value = get(selectedPrevArtBoard);
    if (value) {
      set(selectedArtBoardAtom, value.id);
    }
  },
});

export const selectedNextArtBoard = selector({
  key: "selector-next-artboard",
  get: ({ get }) => {
    const documentData = get(documentDataSelector);
    const entries = getEntriesFromDocument(documentData);
    const selectedArtBoardId = get(selectedArtBoardAtom);

    const index = entries.findIndex((entry) => entry.id === selectedArtBoardId);

    if (index >= entries.length) {
      return undefined;
    }

    return entries[index + 1];
  },
  set: ({ get, set }) => {
    const value = get(selectedNextArtBoard);
    if (value) {
      set(selectedArtBoardAtom, value.id);
    }
  },
});

export const selectionsSelector = selector<{
  documentId?: string;
  artBoxId?: string;
}>({
  key: "selector-selected-ids",
  get: ({ get }) => ({
    documentId: get(selectedDocumentAtom),
    artBoxId: get(selectedArtBoardAtom),
  }),
  set: (
    { set },
    {
      documentId,
      artBoxId,
    }: {
      documentId?: string;
      artBoxId?: string;
    }
  ) => {
    set(selectedDocumentAtom, documentId);
    set(selectedArtBoardAtom, artBoxId);
  },
});
