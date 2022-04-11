import React, { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import AppLayout from '@components/AppLayout/AppLayout';
import Postzone from '@components/main/Postzone';
import Category from '@components/main/Category';
import BannerItem from '@components/main/BannerItem';
import Pagination from '@components/main/Pagination';
import WriteModal from '@components/writeModal/WriteModal';
import DetailModal from '@components/detailModal/DetailModal';
import { Button } from 'antd';
import { useAppDispatch, useAppSelector } from '@store/hook';
import Router from 'next/router';
import { loadPosts } from '@actions/post';
import wrapper from '@store/configureStore';
import axios from 'axios';
import { loadMyInfo } from '@actions/user';
import cookies from 'next-cookies';
import { saveAccessToken } from '@slices/userSlice';
import { ToggleWriteModalState } from '@slices/postSlice';
const Home: NextPage = () => {
  const me = useAppSelector((state) => state.userSlice.me);
  const dispatch = useAppDispatch();
  const mainPosts = useAppSelector((state) => state.postSlice.mainPosts);
  const openModal = () => {
    me ? dispatch(ToggleWriteModalState(true)) : Router.push('/login');
  };
  return (
    <>
      <AppLayout>
        <>
          <BannerItem />
          <Category />
          <Postzone mainPosts={mainPosts} />
          <BottomWrapper>
            <Pagination />
            <StyledButton onClick={openModal} disabled={!me}>
              글쓰기
            </StyledButton>
          </BottomWrapper>
        </>
      </AppLayout>
    </>
  );
};

export default Home;

const BottomWrapper = styled.div`
  position: relative;
`;

const StyledButton = styled(Button)`
  position: absolute;
  right: 10px;
  top: 45px;
`;

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const token = cookies(ctx).Token;
  axios.defaults.headers.common['Authorization'] = '';
  token
    ? (axios.defaults.headers.common['Authorization'] = `Bearer ${token}`)
    : (axios.defaults.headers.common['Authorization'] = '');
  if (token) {
    store.dispatch(saveAccessToken(token));
  }
  await store.dispatch(loadMyInfo());

  await store.dispatch(
    loadPosts({
      pageNum: ctx.query.page as string,
      category: ctx.query.category ? (ctx.query.category as string) : 'METAVERSE',
      keyword: ctx.query.search as string,
    }),
  );

  return { props: {} };
});
