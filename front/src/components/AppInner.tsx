import React, { useEffect } from 'react';
import { NextComponentType, NextPageContext } from 'next';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useAppDispatch } from '@store/hook';
import { loadMyInfo } from '@actions/user';
import { useRouter } from 'next/router';
type Props = {
  pageProps: any;
  Component: NextComponentType<NextPageContext<any>>;
};

const AppInner = ({ pageProps, Component }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const AccessToken = useCookies(['Token'])[0].Token;
  useEffect(() => {
    dispatch(loadMyInfo());
  }, [router.pathname, router.query]);
  axios.defaults.headers.common['Authorization'] = `Bearer ${AccessToken}` || '';
  return <Component {...pageProps} />;
};

export default AppInner;
