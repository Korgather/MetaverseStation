import { loadMyInfo } from '@actions/user';
import APIBoard from '@components/ApiFactory/APIBoard';
import AppLayout from '@components/AppLayout/AppLayout';
import BannerView from '@components/common/Banner/BannerView';
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
        <title>{`젭 API - 모두메타`}</title>
      </Head>
      <AppLayout>
        <>
          <BannerView />
          <APIBoard />
        </>
      </AppLayout>
    </>
  );
};

export default index;

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  store.dispatch(logOut());
  const token = cookies(ctx).Token;
  if (ctx.req && token) {
    store.dispatch(saveAccessToken(token));
    await store.dispatch(loadMyInfo());
  }
  return { props: {} };
});
