import React from 'react';
import type { NextPage } from 'next';
import styled, { css } from 'styled-components';
import AppLayout from '@components/AppLayout/AppLayout';
import Postzone from '@components/main/Postzone';
import Category from '@components/main/Category';
import BannerItem from '@components/main/BannerItem';
import Pagination from '@components/main/Pagination';
import { Button, Tooltip } from 'antd';
import { useAppDispatch, useAppSelector } from '@store/hook';
import { useRouter } from 'next/router';
import { loadPosts } from '@actions/post';
import wrapper from '@store/configureStore';
import axios from 'axios';
import { loadMyInfo } from '@actions/user';
import cookies from 'next-cookies';
import { logOut, saveAccessToken } from '@slices/userSlice';
import { ToggleWriteModalState } from '@slices/postSlice';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { pageVariants } from '@assets/motionVarints';
import shortid from 'shortid';
const Home: NextPage = () => {
  const me = useAppSelector((state) => state.userSlice.me);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const mainPosts = useAppSelector((state) => state.postSlice.mainPosts);
  const openModal = () => {
    me ? dispatch(ToggleWriteModalState(true)) : router.push('/login');
  };
  console.log(shortid);

  return (
    <>
      <Head>
        <title>모두메타 - 모두의 메타버스</title>
      </Head>
      <AppLayout>
        <>
          <BannerItem />
          <Category />
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={shortid.generate()}
              variants={pageVariants}
              initial="initial"
              animate="visible"
              exit="leaving"
            >
              <Postzone mainPosts={mainPosts} />
            </motion.div>
          </AnimatePresence>
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
  @media screen and (max-width: 850px) {
    display: flex;
    flex-direction: column;
  }
`;

const StyledButton = styled(Button)`
  position: absolute;
  right: 10px;
  top: 45px;
  @media screen and (max-width: 850px) {
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
  store.dispatch(logOut());
  axios.defaults.headers.common['Authorization'] = '';
  const token = cookies(ctx).Token;
  if (ctx.req && token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    store.dispatch(saveAccessToken(token));
    await store.dispatch(loadMyInfo());
  }

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
