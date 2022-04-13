import { loadComPosts } from '@actions/community';
import { loadMyInfo } from '@actions/user';
import AppLayout from '@components/AppLayout/AppLayout';
import Board from '@components/community/Board';
import Pagination from '@components/community/Pagination';
import CommunityWriteModal from '@components/community/writeModal/CommunityWriteModal';
import BannerItem from '@components/main/BannerItem';
import { logOut, saveAccessToken } from '@slices/userSlice';
import wrapper from '@store/configureStore';
import { useAppSelector } from '@store/hook';
import axios from 'axios';
import cookies from 'next-cookies';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

const community = () => {
  const communityWriteModalState = useAppSelector(
    (state) => state.communitySlice.communityWriteModalState,
  );
  return (
    <>
      <Head>
        <title>스터디 - 모두의메타버스 | 커뮤니티</title>
      </Head>
      {communityWriteModalState && <CommunityWriteModal />}
      <AppLayout>
        <FlexWrapper>
          <BannerItem />
          <Board />
          <Pagination />
        </FlexWrapper>
      </AppLayout>
    </>
  );
};

export default community;

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  store.dispatch(logOut());
  axios.defaults.headers.common['Authorization'] = '';
  const token = cookies(ctx).Token;
  if (ctx.req && token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    store.dispatch(saveAccessToken(token));
    await store.dispatch(loadMyInfo());
  }

  await store.dispatch(
    loadComPosts({
      pageNum: ctx.query.page as string,
      category: 'COMMUNITY_STUDY',
      keyword: ctx.query.search as string,
    }),
  );

  return { props: {} };
});
