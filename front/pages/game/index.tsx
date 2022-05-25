import React from 'react';

import GameContainer from '@components/game/GameContainer';
import Head from 'next/head';

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
