import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { NextRouter } from 'next/router';
import React from 'react';
import PostForm from '.';
import { posts } from '../../../mocks';

expect.extend(toHaveNoViolations);

describe('PostForm', () => {
  const mockRouter = {
    back: jest.fn(),
  } as unknown as NextRouter;
  const mockUpdatePaginationSettings = jest.fn();
  const mockUpdatePostsResponse = jest.fn();
  const defaultProps = {
    currentPost: posts[0],
    postsResponse: {
      totalDocuments: 10,
      pageSize: 5,
      data: posts,
    },
    paginationSettings: {
      page: 1,
      pageSize: 5,
    },
    isNewPost: false,
    router: mockRouter,
    updatePaginationSettings: mockUpdatePaginationSettings,
    updatePostsResponse: mockUpdatePostsResponse,
  };

  it('has no axe violations', async () => {
    await act(async () => {
      const { container } = render(<PostForm {...defaultProps} />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  it('should render a form with a submit button', () => {
    render(<PostForm {...defaultProps} />);
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('should go back to the list when clicking on the back button', () => {
    render(<PostForm {...defaultProps} />);
    fireEvent.click(screen.getByTitle('Back to list'));
    expect(mockRouter.back).toHaveBeenCalledTimes(1);
  });

  it('should change post published state when checkbox is checked', () => {
    render(<PostForm {...defaultProps} />);
    fireEvent.click(screen.getByLabelText('Publish'));
    expect(defaultProps.currentPost.isPublished).toEqual(true);
  });

  it('should render a form when the currentPost is null', () => {
    const currentPost = (defaultProps.currentPost = null);
    render(<PostForm {...{ ...defaultProps, currentPost }} />);
    expect(screen.getByRole('heading').innerHTML).toEqual(
      'The post you have requested does not exist',
    );
  });
});
