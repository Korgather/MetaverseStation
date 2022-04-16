import { loadMyInfo } from '@actions/user';
import APIBoard from '@components/ApiFactory/APIBoard';
import AppLayout from '@components/AppLayout/AppLayout';
import BannerItem from '@components/main/BannerItem';
import { logOut, saveAccessToken } from '@slices/userSlice';
import wrapper from '@store/configureStore';
import axios from 'axios';
import cookies from 'next-cookies';
import Head from 'next/head';
import React from 'react';

const index = () => {
  return (
    <>
      <Head>
        <title>{`게더타운 API - 모두의 메타버스`}</title>
      </Head>
      <AppLayout>
        <>
          <BannerItem />
          <APIBoard />
        </>
      </AppLayout>
    </>
  );
};

export default index;

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  store.dispatch(logOut());
  axios.defaults.headers.common['Authorization'] = '';
  const token = cookies(ctx).Token;
  if (ctx.req && token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    store.dispatch(saveAccessToken(token));
    await store.dispatch(loadMyInfo());
  }

  return { props: {} };
});
