import APIBoard from '@components/ApiFactory/APIBoard';
import AppLayout from '@components/AppLayout/AppLayout';
import BannerView from '@components/common/Banner/BannerView';
import Head from 'next/head';
import React from 'react';

const index = () => {
  return (
    <>
      <Head>
        <title>{`게더타운 API - 모두메타`}</title>
      </Head>
      <AppLayout>
        <>
          <BannerView />
          <APIBoard />
        </>
      </AppLayout>
    </>
  );
};

export default index;
