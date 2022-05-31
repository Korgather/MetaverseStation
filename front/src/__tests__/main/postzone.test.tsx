import React from 'react';
import { fireEvent, render, RenderResult, screen } from '@testing-library/react';
import { mockPosts } from '@mocks/posts';
import PostZoneView, { PostZoneViewProps } from '@components/common/Postzone/PostZoneView';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('mainPostzone', () => {
  const openDetailModal = jest.fn();
  const gotoDetail = jest.fn();
  const imageHeight = '15.625rem';
  const mainPosts = mockPosts;
  const Images = null;
  const PostzoneProps = {
    mainPosts,
    openDetailModal,
    imageHeight,
    gotoDetail,
    Images,
  };
  const renderPostZone = (props: PostZoneViewProps): RenderResult => {
    return render(<PostZoneView {...props} />);
  };

  it('render main Postzone', () => {
    renderPostZone({ ...PostzoneProps });
    const title = '외국맵 Diverse-City';
    expect(screen.getByText(title)).toBeInTheDocument();
  });
  it('open detail modal when clicking on imageblock ', () => {
    renderPostZone({ ...PostzoneProps });
    const openModal = screen.getByTestId('open-modal0');
    fireEvent.click(openModal);
    expect(openDetailModal).toHaveBeenCalledTimes(1);
  });
});
