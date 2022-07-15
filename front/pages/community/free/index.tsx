import { loadComPosts } from '@actions/community';
import { loadMyInfo } from '@actions/user';
import AppLayout from '@components/AppLayout/AppLayout';
import Board from '@components/community/Board';
import Pagination from '@components/community/Pagination';
import CommunityWriteModal from '@components/community/writeModal/CommunityWriteModal';
import BannerView from '@components/common/Banner/BannerView';
import { clearComPostDetail } from '@slices/communitySlice';
import { logOut, saveAccessToken } from '@slices/userSlice';
import wrapper from '@store/configureStore';
import { useAppSelector } from '@store/hook';
import axios from 'axios';
import cookies from 'next-cookies';
import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';

const community = () => {
  const communityWriteModalState = useAppSelector(
    (state) => state.communitySlice.communityWriteModalState,
  );
  return (
    <>
      <Head>
        <title>자유주제 - 모두메타 | 커뮤니티</title>
      </Head>
      {communityWriteModalState && <CommunityWriteModal />}
      <AppLayout>
        <FlexWrapper>
          <BannerView />
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
  const token = cookies(ctx).Token;
  if (ctx.req && token) {
    store.dispatch(saveAccessToken(token));
    await store.dispatch(loadMyInfo());
  }

  await store.dispatch(
    loadComPosts({
      pageNum: ctx.query.page as string,
      category: 'COMMUNITY_GENERAL',
      keyword: ctx.query.search as string,
    }),
  );
  store.dispatch(clearComPostDetail());

  return { props: {} };
});
