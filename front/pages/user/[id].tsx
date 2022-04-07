import { loadAuthorLikedPosts, loadAuthorPosts, loadMyInfo } from '@actions/user';
import AppLayout from '@components/AppLayout/AppLayout';
import DetailModal from '@components/detailModal/DetailModal';
import MyPost from '@components/user/MyPost';
import Profile from '@components/user/Profile';
import { IAuthorInfo } from '@customTypes/user';
import { getAuthorInfo, saveAccessToken } from '@slices/userSlice';
import wrapper from '@store/configureStore';
import { useAppSelector } from '@store/hook';
import { Layout } from 'antd';
import axios from 'axios';
import cookies from 'next-cookies';
import { useRouter } from 'next/router';

import React, { useState } from 'react';
import styled from 'styled-components';

const mypage = () => {
  const [detailModalState, setDetailModalState] = useState(false);
  const authorInfo = useAppSelector((state) => state.userSlice.authorInfo);
  const [editModalState, setEditModalState] = useState(false);
  const router = useRouter();
  console.log(router);
  return (
    <>
      {detailModalState && <DetailModal setDetailModalState={setDetailModalState} />}
      <AppLayout>
        <>
          {authorInfo && (
            <StyledLayout>
              <Profile authorInfo={authorInfo} setEditModalState={setEditModalState} />
              <MyPost setDetailModalState={setDetailModalState} />
            </StyledLayout>
          )}
        </>
      </AppLayout>
    </>
  );
};

export default mypage;

const StyledLayout = styled(Layout)`
  align-items: center;
  width: 1440px;
  background: white;

  @media screen and (max-width: 1650px) {
    width: 75vw;
  }
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
  await store.dispatch(getAuthorInfo(ctx.query as unknown as IAuthorInfo));
  await store.dispatch(
    loadAuthorLikedPosts(store.getState().userSlice.authorInfo?.userId as number),
  );
  await store.dispatch(loadAuthorPosts(store.getState().userSlice.authorInfo?.userId as number));
  return { props: {} };
});
