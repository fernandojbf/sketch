import React, { ComponentProps } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import theme from '../../../styles/theme';

import Pagination from './index';

/**
 * This project should have a test.util configured for these type of configurations.
 * since this will be the the unique react/markdown test due to lack of time,
 * I've added here a simple configuration
 */
const Wrapper = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

const componentRender = ({
  currentPage = 4,
  paginationLength = 12,
  onNext,
  onPrevious,
}: Partial<ComponentProps<typeof Pagination>>) =>
  render(
    <Wrapper>
      <Pagination
        currentPage={currentPage}
        paginationLength={paginationLength}
        onNext={onNext}
        onPrevious={onPrevious}
      />
    </Wrapper>
  );

describe('Pagination', () => {
  const onPrevious = jest.fn() as () => void | undefined;
  const onNext = jest.fn() as () => void | undefined;

  it('should render current page', () => {
    const screen = componentRender({ onNext, onPrevious, currentPage: 1 });
    expect(screen.getByTestId('pagination-current-page')).toHaveTextContent(
      '1'
    );
  });

  it('should render max number of pages', () => {
    const screen = componentRender({
      onNext,
      onPrevious,
      paginationLength: 12,
    });
    expect(screen.getByTestId('pagination-length')).toHaveTextContent('12');
  });

  it('should call onPrevious on button previous', () => {
    const screen = componentRender({ onNext, onPrevious });
    expect(onPrevious).not.toHaveBeenCalled();
    fireEvent.click(screen.getAllByRole('navigation')[0]);
    expect(onPrevious).toHaveBeenCalled();
  });

  it('should call onNext on button next', () => {
    const screen = componentRender({ onNext, onPrevious });
    expect(onNext).not.toHaveBeenCalled();
    fireEvent.click(screen.getAllByRole('navigation')[1]);
    expect(onNext).toHaveBeenCalled();
  });
  it('should disable previous button', () => {
    const screen = componentRender({ onNext });

    expect(screen.getAllByRole('navigation')[0]).toBeDisabled();
    expect(screen.getAllByRole('navigation')[1]).toBeEnabled();
  });
  it('should disable next button', () => {
    const screen = componentRender({ onPrevious });
    expect(screen.getAllByRole('navigation')[0]).toBeEnabled();
    expect(screen.getAllByRole('navigation')[1]).toBeDisabled();
  });
});
