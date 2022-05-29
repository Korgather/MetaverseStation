import React from 'react';
import { IPost } from '@customTypes/post';
import { useAppDispatch } from '@store/hook';
import { loadPost, viewPost } from '@actions/post';
import { ToggleDetailState } from '@slices/postSlice';
import PostZoneView from './PostZoneView';

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
  const dispatch = useAppDispatch();
  const loadPostId = async (data: IPost) => {
    await Promise.all([dispatch(viewPost(data.id)), dispatch(loadPost(data.id))]);
  };
  const onLoadPost = (post: IPost) => {
    post && loadPostId(post);
    dispatch(ToggleDetailState(true));
  };
  const PostzoneProps = {
    mainPosts,
    onLoadPost,
    Images,
    imageHeight,
  };
  return <PostZoneView {...PostzoneProps} />;
};

export default Postzone;
