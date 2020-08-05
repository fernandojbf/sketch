import styled from 'styled-components';

import { FunctionComponent } from 'react';

import Box from '../Box';
import Button from '../Button';
import Text from '../Text';

interface PaginationProps {
  currentNumber: number;
  maxLength: number;
  role?: 'navigation';
  onNext?(): void;
  onPrevious?(): void;
}

const textProps = {
  padding: '0',
  color: 'secondary',
};

const Pagination: FunctionComponent<PaginationProps> = ({
  currentNumber,
  maxLength,
  role = ' navigation',
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
    <Text {...textProps}>{currentNumber}</Text>
    <Text {...textProps}>/</Text>
    <Text {...textProps}>{maxLength}</Text>
    <Button role={role} onClick={onNext} disabled={!onNext} aria-label="next">
      <img src="/arrow-right.svg" alt="left icon" />
    </Button>
  </Box>
);

export default Pagination;
