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
import { useAppDispatch, useAppSelector } from '@store/hook';
import axios from 'axios';
import cookies from 'next-cookies';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const community = () => {
  const communityWriteModalState = useAppSelector(
    (state) => state.communitySlice.communityWriteModalState,
  );
  return (
    <>
      <Head>
        <title>질문 & 답변 - 모두메타 | 커뮤니티</title>
      </Head>
      {communityWriteModalState && <CommunityWriteModal />}
      <AppLayout>
        <>
          <BannerView />
          <Board />
          <Pagination />
        </>
      </AppLayout>
    </>
  );
};

export default community;

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
      category: 'COMMUNITY_QUESTION',
      keyword: ctx.query.search as string,
    }),
  );
  store.dispatch(clearComPostDetail());

  return { props: {} };
});
