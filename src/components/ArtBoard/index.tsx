import { memo } from 'react';
import { useRecoilValueLoadable, waitForAll, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import {
  selectedArtBoard,
  selectedPrevArtBoard,
  selectedNextArtBoard,
  selectArtBoardLength,
  selectedArtBoardIndex,
  unselectArtBoard,
} from '../../state/document';

import PageGrid from '../PageGrid';
import Header from '../Header';
import Pagination from '../Pagination';
import Button from '../Button';
import Text from '../Text';

import ArtBoardFileViewer from './ArtBoardFileViewer';

const Label = styled(Text)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ArtBoard = memo(() => {
  const selectPrevValue = useSetRecoilState(selectedPrevArtBoard);
  const selectNextValue = useSetRecoilState(selectedNextArtBoard);
  const onClose = useSetRecoilState(unselectArtBoard);

  const data = useRecoilValueLoadable(
    waitForAll([
      selectedArtBoard,
      selectedPrevArtBoard,
      selectedNextArtBoard,
      selectedArtBoardIndex,
      selectArtBoardLength,
    ])
  );

  const isLoading = data.state === 'loading';
  const hasError = data.state === 'hasError';

  const [artBoard, prev, next, currentPage, maxLength] =
    isLoading || hasError
      ? []
      : // @ts-ignore
        data.getValue();

  const shouldShowBlank = isLoading || hasError || !artBoard;

  // pagination need to me changed
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
                onPrevious={prev && (selectPrevValue as () => void)}
                onNext={next && (selectNextValue as () => void)}
                currentNumber={currentPage}
                maxLength={maxLength}
              />

              <Label as="h1">{artBoard.name}</Label>
            </>
          )
        }
      />
      {shouldShowBlank ? (
        <div>loading</div>
      ) : (
        <ArtBoardFileViewer {...artBoard.files[0]} />
      )}
    </PageGrid>
  );
});

export default ArtBoard;
