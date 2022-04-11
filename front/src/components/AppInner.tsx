import React from 'react';
import { loadMyInfo } from '@actions/user';
import wrapper from '@store/configureStore';
import axios from 'axios';
import { NextComponentType, NextPageContext } from 'next';
import cookies from 'next-cookies';
import { saveAccessToken } from '@slices/userSlice';

type Props = {
  pageProps: any;
  Component: NextComponentType<NextPageContext<any>>;
};

const AppInner = ({ pageProps, Component }: Props) => {
  return <Component {...pageProps} />;
};

export default AppInner;

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const token = cookies(ctx).Token;
  axios.defaults.headers.common['Authorization'] = '';
  if (token) {
    store.dispatch(saveAccessToken(token));
  }
  token
    ? (axios.defaults.headers.common['Authorization'] = `Bearer ${token}`)
    : (axios.defaults.headers.common['Authorization'] = '');
  await store.dispatch(loadMyInfo());
  return { props: {} };
});
