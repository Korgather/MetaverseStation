import { loadComPost } from '@actions/community';
import { loadPost, viewPost } from '@actions/post';
import { loadMyInfo } from '@actions/user';
import AppLayout from '@components/AppLayout/AppLayout';
import CommunityWriteModal from '@components/community/writeModal/CommunityWriteModal';
import CommentInput from '@components/ComPostDetail/CommentInput';
import CommentList from '@components/ComPostDetail/CommentList';
import ContentBox from '@components/ComPostDetail/ContentBox';
import { clearComPostDetail } from '@slices/communitySlice';
import { saveAccessToken } from '@slices/userSlice';
import wrapper from '@store/configureStore';
import { useAppDispatch, useAppSelector } from '@store/hook';
import axios from 'axios';
import cookies from 'next-cookies';
import React, { useEffect } from 'react';
import styled from 'styled-components';

const ComDetailPost = () => {
  const communityWriteModalState = useAppSelector(
    (state) => state.communitySlice.communityWriteModalState,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearComPostDetail());
    };
  }, []);

  return (
    <>
      {communityWriteModalState && <CommunityWriteModal />}
      <AppLayout>
        <>
          <ComDetailPostLayout>
            <ContentBox />
          </ComDetailPostLayout>
          <CommentInput />
          <CommentList />
        </>
      </AppLayout>
    </>
  );
};

export default ComDetailPost;

const ComDetailPostLayout = styled.div`
  width: 70vw;
  max-width: 900px;
`;

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  axios.defaults.headers.common['Authorization'] = '';
  const token = cookies(ctx).Token;
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    store.dispatch(saveAccessToken(token));
  }
  await store.dispatch(loadMyInfo());

  await store.dispatch(loadComPost(Number(ctx.query.id as string)));
  await store.dispatch(viewPost(Number(ctx.query.id as string)));

  return { props: {} };
});
