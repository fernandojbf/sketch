import { FunctionComponent } from 'react';

import Box from '../../atoms/Box';
import Button from '../../atoms/Button';
import Text from '../../atoms/Text';

interface PaginationProps {
  currentPage: number;
  paginationLength: number;
  role?: 'navigation';
  onNext?(): void;
  onPrevious?(): void;
}

const textProps = {
  padding: '0',
  color: 'secondary',
};

const Pagination: FunctionComponent<PaginationProps> = ({
  currentPage,
  paginationLength,
  role = 'navigation',
  onNext,
  onPrevious,
}) => (
  <Box display="flex">
    <Button
      role={role}
      onClick={onPrevious}
      disabled={!onPrevious}
      aria-label="previous"
    >
      <img src="/arrow-left.svg" alt="left icon" />
    </Button>
    <Text
      {...textProps}
      data-testid="pagination-current-page"
      aria-label="current page number"
    >
      {currentPage}
    </Text>
    <Text {...textProps}>/</Text>
    <Text
      {...textProps}
      data-testid="pagination-length"
      aria-label="number of total pages"
    >
      {paginationLength}
    </Text>
    <Button role={role} onClick={onNext} disabled={!onNext} aria-label="next">
      <img src="/arrow-right.svg" alt="left icon" />
    </Button>
  </Box>
);

export default Pagination;
