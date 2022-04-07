import AppLayout from '@components/AppLayout/AppLayout';
import Board from '@components/community/Board';
import BannerItem from '@components/main/BannerItem';
import React from 'react';

const community = () => {
  return (
    <AppLayout>
      <>
        <BannerItem />
        <Board />
      </>
    </AppLayout>
  );
};

export default community;
