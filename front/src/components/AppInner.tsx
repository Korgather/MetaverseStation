import React from 'react';
import { loadMyInfo } from '@actions/user';
import wrapper from '@store/configureStore';
import axios from 'axios';
import { NextComponentType, NextPageContext } from 'next';
import cookies from 'next-cookies';

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
  axios.interceptors.request.use(function (config) {
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
  });
  await store.dispatch(loadMyInfo());
  return { props: {} };
});
