import { loadMyInfo, loadMyPosts } from '@actions/user';
import AppLayout from '@components/AppLayout/AppLayout';
import DetailModalContainer from '@components/detailModal/DetailModalContainer';
import Profile from '@components/mypage/Profile';
import MyPagePostsComponent from '@components/mypage/MyPagePostsComponent';
import ProfileEditModal from '@components/profileEditModal/ProfileEditModal';
import wrapper from '@store/configureStore';
import { useAppSelector } from '@store/hook';
import { Layout } from 'antd';
import axios from 'axios';
import Head from 'next/head';
import React, { useState } from 'react';
import styled from 'styled-components';

const mypage = () => {
  const [detailModalState, setDetailModalState] = useState(false);
  const me = useAppSelector((state) => state.userSlice.me);
  const [editModalState, setEditModalState] = useState(false);
  return (
    <>
      <Head>
        <title>{`${me?.userName}님의 소개 - 모두의메타버스 | 메타버스 공유 플랫폼`}</title>
      </Head>
      {detailModalState && <DetailModalContainer />}
      {editModalState && <ProfileEditModal setEditModalState={setEditModalState} />}
      <AppLayout>
        <>
          {me && (
            <StyledLayout>
              <Profile setEditModalState={setEditModalState} />
              <MyPagePostsComponent setDetailModalState={setDetailModalState} pathname="mypage" />
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
  const AccessToken = ctx.req.cookies.Token;
  axios.defaults.headers.common['Authorization'] = `Bearer ${AccessToken}` || '';
  await store.dispatch(loadMyInfo());
  await store.dispatch(
    loadMyPosts({
      userId: Number(store.getState().userSlice.me?.userId),
      pageNum: ctx.query.page as string,
      category: ctx.query.category as string,
      keyword: ctx.query.search as string,
      filter: ctx.query.filter as string,
    }),
  );
  return { props: {} };
});
