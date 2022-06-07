import React from 'react';
import LoginContainer from '@components/login/LoginContainer';
import wrapper from '@store/configureStore';
import { logOut, saveAccessToken } from '@slices/userSlice';
import axios from 'axios';
import cookies from 'next-cookies';
import { loadMyInfo } from '@actions/user';
const Login = () => {
  return <LoginContainer />;
};

export default Login;

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
