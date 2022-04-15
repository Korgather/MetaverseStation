import APIBoard from '@components/ApiFactory/APIBoard';
import AppLayout from '@components/AppLayout/AppLayout';
import BannerItem from '@components/main/BannerItem';
import Head from 'next/head';
import React from 'react';

const index = () => {
  return (
    <>
      <Head>
        <title>{`게더타운 API - 모두의 메타버스`}</title>
      </Head>
      <AppLayout>
        <>
          <BannerItem />
          <APIBoard />
        </>
      </AppLayout>
    </>
  );
};

export default index;
