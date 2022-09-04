import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import styled from 'styled-components';
import Head from 'next/head';
import AppLayout from '@components/AppLayout/AppLayout';
import Postzone from '@components/common/Postzone/PostZoneContainer';
import Category from '@components/main/CategoryCotainer';
import BannerView from '@components/common/Banner/BannerView';
import Pagination from '@components/common/Pagination/PaginationContainer';
import { Button, Tooltip } from 'antd';
import { useAppDispatch, useAppSelector } from '@store/hook';
import { useRouter } from 'next/router';
import { loadPosts } from '@actions/post';
import { ToggleWriteModalState } from '@slices/postSlice';
import { media } from '@styles/theme';
import wrapper from '@store/configureStore';

const Home: NextPage = () => {
  const me = useAppSelector((state) => state.userSlice.me);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const mainPosts = useAppSelector((state) => state.postSlice.mainPosts);
  const openModal = () => {
    me ? dispatch(ToggleWriteModalState(true)) : router.push('/login');
  };
  useEffect(() => {
    dispatch(
      loadPosts({
        pageNum: router.query.page as string,
        category: router.query.category ? (router.query.category as string) : 'METAVERSE',
        keyword: router.query.search as string,
        sort: router.query.sort as string,
      }),
    );
  }, [router.query.page, router.query.category, router.query.search, router.query.sort]);
  return (
    <>
      <Head>
        <title>모두메타 - 모두의 메타버스</title>
      </Head>
      <AppLayout>
        <>
          <BannerView />
          <Category />
          <Postzone mainPosts={mainPosts} />
          <BottomWrapper>
            <Pagination />
            {me ? (
              <StyledButton onClick={openModal}>글쓰기</StyledButton>
            ) : (
              <Tooltip placement="topLeft" title="로그인이 필요합니다">
                <StyledButton>글쓰기</StyledButton>
              </Tooltip>
            )}
          </BottomWrapper>
        </>
      </AppLayout>
    </>
  );
};

export default Home;

const BottomWrapper = styled.div`
  position: relative;
  ${media.mobile} {
    display: flex;
    flex-direction: column;
  }
`;

const StyledButton = styled(Button)`
  position: absolute;
  right: 10px;
  top: 45px;
  ${media.mobile} {
    display: flex;
    flex-direction: column;
    position: unset;
    width: 30%;
    margin: 30px 0 0px auto;
    right: 0;
    top: 0;
  }
`;

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  await store.dispatch(
    loadPosts({
      pageNum: ctx.query.page as string,
      category: ctx.query.category ? (ctx.query.category as string) : 'METAVERSE',
      keyword: ctx.query.search as string,
      sort: ctx.query.sort as string,
    }),
  );
  return { props: {} };
});
