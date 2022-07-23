import React from 'react';
import { IPost } from '@customTypes/post';
import MetaCard from '../Card/MetaCard';
import MetaCardSkeleton from '../Card/MetaCardSkeleton';
import { useAppSelector } from '@store/hook';

interface MainContentsProps {
  mainPosts: IPost[];
  openDetailModal: (post: IPost) => void;
  handleImgError: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}
const MainContents = ({ mainPosts, openDetailModal, handleImgError }: MainContentsProps) => {
  const loading = useAppSelector((state) => state.postSlice.loadPostsLoading);
  if (loading) {
    return (
      <>
        {Array.from({ length: 8 }, (v, i) => i).map((v, i) => (
          <MetaCardSkeleton key={i} />
        ))}
      </>
    );
  }
  return (
    <>
      {mainPosts.map((post, idx) => {
        return (
          <MetaCard
            key={post.id}
            post={post}
            openDetailModal={openDetailModal}
            handleImgError={handleImgError}
            idx={idx}
          />
        );
      })}
    </>
  );
};
export default MainContents;
