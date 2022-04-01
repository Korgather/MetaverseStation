import React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import wrapper, { store } from '@store/configureStore';
import 'antd/dist/antd.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AppInner from '@components/AppInner';
import { CookiesProvider } from 'react-cookie';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <Provider store={store}>
        <AppInner pageProps={pageProps} Component={Component} />
      </Provider>
    </CookiesProvider>
  );
}

export default wrapper.withRedux(MyApp);
