import React from 'react';
import { NextComponentType, NextPageContext } from 'next';
import wrapper from '@store/configureStore';
import axios from 'axios';
import cookies from 'next-cookies';
import { saveAccessToken } from '@slices/userSlice';
import { loadMyInfo } from '@actions/user';

type Props = {
  pageProps: any;
  Component: NextComponentType<NextPageContext<any>>;
};

const AppInner = ({ pageProps, Component }: Props) => {
  return <Component {...pageProps} />;
};

export default AppInner;
export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  axios.defaults.headers.common['Authorization'] = '';
  const token = cookies(ctx).Token;
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    store.dispatch(saveAccessToken(token));
  }
  await store.dispatch(loadMyInfo());
  return { props: {} };
});
