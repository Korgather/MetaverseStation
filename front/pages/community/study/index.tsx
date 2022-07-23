import React from 'react';
import { loadComPosts } from '@actions/community';
import AppLayout from '@components/AppLayout/AppLayout';
import Board from '@components/community/Board';
import Pagination from '@components/community/Pagination';
import CommunityWriteModal from '@components/community/writeModal/CommunityWriteModal';
import BannerView from '@components/common/Banner/BannerView';
import { clearComPostDetail } from '@slices/communitySlice';
import wrapper from '@store/configureStore';
import { useAppSelector } from '@store/hook';
import Head from 'next/head';
import styled from 'styled-components';

const community = () => {
  const communityWriteModalState = useAppSelector(
    (state) => state.communitySlice.communityWriteModalState,
  );
  return (
    <>
      <Head>
        <title>스터디 - 모두메타 | 커뮤니티</title>
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
  await store.dispatch(
    loadComPosts({
      pageNum: ctx.query.page as string,
      category: 'COMMUNITY_STUDY',
      keyword: ctx.query.search as string,
    }),
  );
  store.dispatch(clearComPostDetail());

  return { props: {} };
});
