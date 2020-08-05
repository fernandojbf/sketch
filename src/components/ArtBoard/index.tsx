import { memo } from 'react';
import { useRecoilValueLoadable, waitForAll, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import {
  selectedArtBoard,
  selectedPrevArtBoard,
  selectedNextArtBoard,
} from '../../state/document';

import Header from '../Header';
import PageGrid from '../PageGrid';
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

  const data = useRecoilValueLoadable(
    waitForAll([selectedArtBoard, selectedPrevArtBoard, selectedNextArtBoard])
  );

  const isLoading = data.state === 'loading';

  // @ts-ignore
  const [artBoard, prev, next] = isLoading ? [] : data.getValue();

  // pagination need to me changed
  return (
    <PageGrid fixedHeight>
      <Header
        preContent={<img alt="Logo" src="/close.svg" />}
        content={
          !isLoading && (
            <>
              {!isLoading && (
                <button
                  onClick={() => {
                    // @ts-ignore
                    selectPrevValue();
                  }}
                  disabled={
                    // @ts-ignore
                    !prev
                  }
                >
                  back
                </button>
              )}
              {!isLoading && (
                <button
                  onClick={() => {
                    // @ts-ignore
                    selectNextValue();
                  }}
                  disabled={
                    // @ts-ignore
                    !next
                  }
                >
                  next
                </button>
              )}

              <Label as="h1">{artBoard.name}</Label>
            </>
          )
        }
      />
      {isLoading ? (
        <div>loading</div>
      ) : (
        <ArtBoardFileViewer {...artBoard.files[0]} />
      )}
    </PageGrid>
  );
});

export default ArtBoard;
