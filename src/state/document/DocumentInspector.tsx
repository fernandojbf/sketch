import { useRecoilTransactionObserver_UNSTABLE, useRecoilState } from 'recoil';
import { useEffect, memo } from 'react';
import { useRouter } from 'next/router';
import { selectionsSelector } from '.';

const QUERY_DOCUMENT = 'document-id';
const QUERY_ARTBOARD = 'artboard-id';

const getRoute = (documentId, artBoxId) => {
  let as = `/document/${documentId}`;
  let url = `/document/[${QUERY_DOCUMENT}]`;

  if (!!artBoxId) {
    as += `/${artBoxId}`;
    url += `/[${QUERY_ARTBOARD}]`;
  }
  return { as, url };
};

export const DocumentInspector = memo(() => {
  const { query, push } = useRouter();
  const [selections, setSelection] = useRecoilState(selectionsSelector);

  useRecoilTransactionObserver_UNSTABLE(({ snapshot, previousSnapshot }) => {
    // @ts-ignore
    const newSelection = snapshot.getLoadable(selectionsSelector).getValue();
    const previewsSelection = previousSnapshot
      .getLoadable(selectionsSelector)
      // @ts-ignore
      .getValue();

    // this can be moved to a function for better reading
    if (
      (query[QUERY_DOCUMENT] !== newSelection.documentId ||
        query[QUERY_ARTBOARD] !== newSelection.artBoxId) &&
      (newSelection.documentId !== previewsSelection.documentId ||
        newSelection.artBoxId !== previewsSelection.artBoxId)
    ) {
      const { url, as } = getRoute(
        newSelection.documentId,
        newSelection.artBoxId
      );

      // always push is really restrictive. for sure in a real application we will want to replace some routes.
      // to simplify, i've used always plush only for the purpose of this challenge.
      push(url, as);
    }
  });

  useEffect(() => {
    // routing state sync
    if (
      selections.documentId !== query[QUERY_DOCUMENT] ||
      selections.artBoxId !== query[QUERY_ARTBOARD]
    ) {
      setSelection({
        documentId: query[QUERY_DOCUMENT] as string,
        artBoxId: query[QUERY_ARTBOARD] as string,
      });
    }
  }, [query[QUERY_DOCUMENT], query[QUERY_ARTBOARD]]);

  return null;
});

export default DocumentInspector;
