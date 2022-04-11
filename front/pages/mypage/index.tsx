import { loadLikedPosts, loadMyInfo, loadMyPosts } from '@actions/user';
import AppLayout from '@components/AppLayout/AppLayout';
import DetailModal from '@components/detailModal/DetailModal';
import MyPost from '@components/mypage/MyPost';
import Profile from '@components/mypage/Profile';
import ProfileEditModal from '@components/profileEditModal/ProfileEditModal';
import { saveAccessToken } from '@slices/userSlice';
import wrapper from '@store/configureStore';
import { useAppSelector } from '@store/hook';
import { Layout } from 'antd';
import axios from 'axios';
import cookies from 'next-cookies';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const mypage = () => {
  const [detailModalState, setDetailModalState] = useState(false);
  const me = useAppSelector((state) => state.userSlice.me);
  const [editModalState, setEditModalState] = useState(false);
  useEffect(() => {
    if (!me) Router.push('/');
  }, []);

  return (
    <>
      {detailModalState && <DetailModal />}
      {editModalState && <ProfileEditModal setEditModalState={setEditModalState} />}
      <AppLayout>
        <>
          {me && (
            <StyledLayout>
              <Profile me={me} setEditModalState={setEditModalState} />
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
  axios.defaults.headers.Cookie = '';
  axios.defaults.headers.common['Authorization'] = '';

  if (token) {
    store.dispatch(saveAccessToken(token));
  }
  await store.dispatch(loadMyInfo());
  await store.dispatch(
    loadMyPosts({
      userId: store.getState().userSlice.me?.userId as number,
      pageNum: ctx.query.page as string,
      category: ctx.query.category as string,
      keyword: ctx.query.search as string,
      filter: ctx.query.filter as string,
    }),
  );
  return { props: {} };
});
