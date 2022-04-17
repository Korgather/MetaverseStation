import { loadMyInfo } from '@actions/user';
import Guide01 from '@components/ApiFactory/guide/Guide01';
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
        <title>{`게더타운 API사용가이드 - 모두메타`}</title>
      </Head>
      <AppLayout>
        <>
          <BannerItem />
          <Guide01 />
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
