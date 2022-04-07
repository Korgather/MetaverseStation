import { loadComPosts } from '@actions/community';
import { loadMyInfo } from '@actions/user';
import AppLayout from '@components/AppLayout/AppLayout';
import Board from '@components/community/Board';
import Pagination from '@components/community/Pagination';
import CommunityWriteModal from '@components/community/writeModal/CommunityWriteModal';
import BannerItem from '@components/main/BannerItem';
import { saveAccessToken } from '@slices/userSlice';
import wrapper from '@store/configureStore';
import { useAppSelector } from '@store/hook';
import axios from 'axios';
import cookies from 'next-cookies';
import { useRouter } from 'next/router';
import React from 'react';

const community = () => {
  const communityWriteModalState = useAppSelector(
    (state) => state.communitySlice.communityWriteModalState,
  );
  return (
    <>
      {communityWriteModalState && <CommunityWriteModal />}
      <AppLayout>
        <>
          <BannerItem />
          <Board />
          <Pagination />
        </>
      </AppLayout>
    </>
  );
};

export default community;

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const token = cookies(ctx).Token;
  token
    ? (axios.defaults.headers.common['Authorization'] = `Bearer ${token}`)
    : (axios.defaults.headers.common['Authorization'] = '');
  if (token) {
    store.dispatch(saveAccessToken(token));
  }
  await store.dispatch(loadMyInfo());
  await store.dispatch(
    loadComPosts({ pageNum: ctx.query.id as string, category: 'COMMUNITY_QUESTION' }),
  );

  return { props: {} };
});
