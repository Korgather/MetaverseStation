import Guide01 from '@components/ApiFactory/guide/Guide01';
import AppLayout from '@components/AppLayout/AppLayout';
import BannerView from '@components/common/Banner/BannerView';
import Head from 'next/head';
import React from 'react';

const index = () => {
  return (
    <>
      <Head>
        <title>{`게더타운 API사용가이드 - 모두메타`}</title>
      </Head>
      <AppLayout>
        <>
          <BannerView />
          <Guide01 />
        </>
      </AppLayout>
    </>
  );
};

export default index;
