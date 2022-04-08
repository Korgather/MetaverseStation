import { loadPost, viewPost } from '@actions/post';
import { loadMyInfo } from '@actions/user';
import AppLayout from '@components/AppLayout/AppLayout';
import CommentInput from '@components/ComPostDetail/CommentInput';
import CommentList from '@components/ComPostDetail/CommentList';
import ContentBox from '@components/ComPostDetail/ContentBox';
import { saveAccessToken } from '@slices/userSlice';
import wrapper from '@store/configureStore';
import axios from 'axios';
import cookies from 'next-cookies';
import React from 'react';
import styled from 'styled-components';

const ComDetailPost = () => {
  return (
    <AppLayout>
      <>
        <ComDetailPostLayout>
          <ContentBox />
        </ComDetailPostLayout>
        <CommentInput />
        <CommentList />
      </>
    </AppLayout>
  );
};

export default ComDetailPost;

const ComDetailPostLayout = styled.div`
  width: 70vw;
  max-width: 900px;
`;

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const token = cookies(ctx).Token;
  token
    ? (axios.defaults.headers.common['Authorization'] = `Bearer ${token}`)
    : (axios.defaults.headers.common['Authorization'] = '');
  if (token) {
    store.dispatch(saveAccessToken(token));
  }
  await store.dispatch(loadMyInfo());

  await store.dispatch(loadPost(Number(ctx.query.id as string)));
  await store.dispatch(viewPost(Number(ctx.query.id as string)));

  return { props: {} };
});
