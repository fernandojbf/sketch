import { useRecoilTransactionObserver_UNSTABLE, useRecoilState } from 'recoil';
import { useEffect, memo } from 'react';
import { useRouter } from 'next/router';
import { selectionsSelector } from '.';

const QUERY_DOCUMENT = 'document-id';
const QUERY_ARTBOARD = 'artboard-id';

export const DocumentInspector = memo(() => {
  const { query } = useRouter();
  const [selections, setSelection] = useRecoilState(selectionsSelector);

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
