import {
  useRecoilTransactionObserver_UNSTABLE,
  useSetRecoilState,
} from 'recoil';
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

// TODO: MISSING BACK ROUTING STATE
export const DocumentInspector = memo(() => {
  const { query, push } = useRouter();
  const setSelection = useSetRecoilState(selectionsSelector);

  useRecoilTransactionObserver_UNSTABLE(({ snapshot, previousSnapshot }) => {
    // @ts-ignore
    const newSelection = snapshot.getLoadable(selectionsSelector).getValue();
    const previewsSelection = previousSnapshot
      .getLoadable(selectionsSelector)
      // @ts-ignore
      .getValue();

    // this should be moved to a function
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

      push(url, as);
    }
  });

  useEffect(() => {
    setSelection({
      documentId: query[QUERY_DOCUMENT] as string,
      artBoxId: query[QUERY_ARTBOARD] as string,
    });
  }, []);

  return null;
});

export default DocumentInspector;
