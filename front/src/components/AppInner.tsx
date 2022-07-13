import React from 'react';
import { NextComponentType, NextPageContext } from 'next';
type Props = {
  pageProps: any;
  Component: NextComponentType<NextPageContext<any>>;
};

const AppInner = ({ pageProps, Component }: Props) => {
  return <Component {...pageProps} />;
};

export default AppInner;
