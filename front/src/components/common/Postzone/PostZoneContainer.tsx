import React from 'react';
import { IPost } from '@customTypes/post';
import { useAppDispatch } from '@store/hook';
import { loadPost, viewPost } from '@actions/post';
import { ToggleDetailState } from '@slices/postSlice';
import PostZoneView from './PostZoneView';
import { useRouter } from 'next/router';
import { useMedia } from '@lib/useMedia';

export interface GameImages {
  src: string;
  url: string;
  count: undefined | number;
}
interface PostzoneProps {
  mainPosts?: IPost[];
  Images?: GameImages[];
  imageHeight?: string;
}

const Postzone: React.FunctionComponent<PostzoneProps> = ({
  mainPosts = null,
  Images = null,
  imageHeight = '15.625rem',
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const loadPostId = async (data: IPost) => {
    await Promise.all([dispatch(viewPost(data.id)), dispatch(loadPost(data.id))]);
  };
  const { isMobile } = useMedia();
  const openDetailModal = (post: IPost) => {
    if (!isMobile) {
      post && loadPostId(post);
      dispatch(ToggleDetailState(true));
    }
  };
  const gotoDetail = (post: IPost) => {
    router.push(`/community/post/${post.id}`);
  };
  const PostzoneProps = {
    mainPosts,
    openDetailModal,
    Images,
    imageHeight,
    gotoDetail,
  };
  return <PostZoneView {...PostzoneProps} />;
};

export default Postzone;
