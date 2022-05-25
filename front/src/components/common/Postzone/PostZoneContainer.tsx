import React from 'react';
import { IPost } from '@customTypes/post';
import { useAppDispatch } from '@store/hook';
import { loadPost, viewPost } from '@actions/post';
import { ToggleDetailState } from '@slices/postSlice';
import PostZoneView from './PostZoneView';

interface PostzoneProps {
  mainPosts: IPost[];
}

const Postzone: React.FunctionComponent<PostzoneProps> = ({ mainPosts }) => {
  const dispatch = useAppDispatch();
  const loadPostId = async (data: IPost) => {
    await Promise.all([dispatch(viewPost(data.id)), dispatch(loadPost(data.id))]);
  };
  const PostzoneProps = {
    mainPosts,
    onLoadPost: (post: IPost) => {
      post && loadPostId(post);
      dispatch(ToggleDetailState(true));
    },
  };
  return <PostZoneView {...PostzoneProps} />;
};

export default Postzone;
