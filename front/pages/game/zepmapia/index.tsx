import React from 'react';
import GameContainer from '@components/game/GameContainer';
import Head from 'next/head';
import axios from 'axios';
import wrapper from '@store/configureStore';
import { logOut, saveAccessToken } from '@slices/userSlice';
import cookies from 'next-cookies';
import { loadMyInfo } from '@actions/user';

const Game = () => {
  return (
    <>
      <Head>
        <title>마피아게임 - 모두메타 | 게임</title>
      </Head>
      <GameContainer />
    </>
  );
};

export default Game;

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  store.dispatch(logOut());
  const token = cookies(ctx).Token;
  if (ctx.req && token) {
    store.dispatch(saveAccessToken(token));
    await store.dispatch(loadMyInfo());
  }

  return { props: {} };
});
