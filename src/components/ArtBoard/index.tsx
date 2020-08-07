import { memo, useCallback, Suspense } from 'react';
import { useRecoilValueLoadable, waitForAll, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import {
  selectedArtBoard,
  unselectArtBoard,
  selectArtBoardPagination,
} from '../../state/document';

import PageGrid from '../PageGrid';
import Header from '../Header';
import Pagination from '../Pagination';
import Button from '../Button';
import Text from '../Text';

import ArtBoardFileViewer from './ArtBoardFileViewer';
import { useRouter } from 'next/router';

const Label = styled(Text)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ArtBoard = memo(() => {
  const { replace, push } = useRouter();
  const setPagination = useSetRecoilState(selectArtBoardPagination);
  const unselectArtBoardFunction = useSetRecoilState(unselectArtBoard);

  const data = useRecoilValueLoadable(
    waitForAll([selectedArtBoard, selectArtBoardPagination])
  );

  const onPrev = useCallback(() => {
    setPagination({ type: 'prev', routerAction: replace });
  }, []);

  const onNext = useCallback(() => {
    setPagination({ type: 'next', routerAction: replace });
  }, []);

  const onClose = useCallback(() => {
    // @ts-ignore
    unselectArtBoardFunction({ routerAction: push });
  }, []);

  const isLoading = data.state === 'loading';
  const hasError = data.state === 'hasError';

  const [artBoard, pagination] =
    isLoading || hasError
      ? [undefined, {}]
      : // @ts-ignore
        data.getValue();

  const { prev, next, currentPage, paginationLength } = pagination;

  // this will prevent the error with the race condition between router and recoil
  // history using recoil would be good solution for this.
  const shouldShowBlank = isLoading || hasError || !artBoard;

  return (
    <PageGrid fixedHeight>
      <Header
        preContent={
          <Button
            onClick={onClose as () => void}
            role="navigation"
            aria-label="close"
          >
            <img alt="Logo" src="/close.svg" />
          </Button>
        }
        content={
          !shouldShowBlank && (
            <>
              <Pagination
                onPrevious={prev && onPrev}
                onNext={next && onNext}
                currentPage={currentPage}
                paginationLength={paginationLength}
              />

              <Label as="h1">{artBoard.name}</Label>
            </>
          )
        }
      />

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
        <ArtBoardFileViewer {...artBoard.files[0]} />
      )}
    </PageGrid>
  );
});

export default ArtBoard;
