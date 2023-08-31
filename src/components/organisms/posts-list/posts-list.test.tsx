import '@testing-library/jest-dom';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import React from 'react';
import PostsList from '.';
import { posts } from '../../../mocks';
import { IPostsListProps } from '../../../interfaces/components-props';
// eslint-disable-next-line @typescript-eslint/no-unused-vars

expect.extend(toHaveNoViolations);

const mockPostsResponse: IPostsListProps['postsResponse'] = {
  data: posts,
  page: 1,
  pageSize: 10,
  totalDocuments: 12,
  totalPages: 2,
  hasPagination: true,
};

const mockPaginationSettings: IPostsListProps['paginationSettings'] = {
  page: 0,
  pageSize: 10,
};

const mockUpdatePaginationSettings = jest.fn();
const mockUpdatePostsResponse = jest.fn();

const props = {
  postsResponse: mockPostsResponse,
  paginationSettings: mockPaginationSettings,
  updatePaginationSettings: mockUpdatePaginationSettings,
  updatePostsResponse: mockUpdatePostsResponse,
  pageSize: 10,
};

const mockedFetch = jest.fn();
global.fetch = mockedFetch;

describe('PostsList', () => {
  beforeEach(() => {
    jest.spyOn(window, 'fetch');
  });

  it('has no axe violations', async () => {
    await act(async () => {
      const { container } = render(<PostsList {...props} />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  it('updates pagination settings when page button is clicked', async () => {
    const { rerender } = render(<PostsList {...props} />);
    const nextButton = screen.getByTitle('Go to next page');
    const prevButton = screen.getByTitle('Go to previous page');

    fireEvent.click(nextButton);

    const updatedPagination = { page: 1, pageSize: 10 };

    expect(props.updatePaginationSettings).toHaveBeenCalledWith(
      updatedPagination,
    );

    rerender(
      <PostsList {...{ ...props, paginationSettings: updatedPagination }} />,
    );

    fireEvent.click(prevButton);

    rerender(<PostsList {...props} />);
    expect(props.updatePaginationSettings).toHaveBeenCalledWith({
      page: 0,
      pageSize: 10,
    });
  });

  it('opens a dialog when a post is marked for deletion', () => {
    render(<PostsList {...props} />);
    const postItems = screen.getAllByTestId('post-item');
    const firstPostDeleteButton = within(postItems[0]).getByTestId(
      'delete-button',
    );
    fireEvent.click(firstPostDeleteButton);
    const dialogTitle = screen.getByText('Delete');
    expect(dialogTitle).toBeInTheDocument();
  });
});
