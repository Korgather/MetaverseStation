import React, { useEffect } from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import wrapper, { store } from '@store/configureStore';
import 'antd/dist/antd.css';
import 'slick-carousel/slick/slick.css';
import 'react-quill/dist/quill.snow.css';
import 'slick-carousel/slick/slick-theme.css';
import AppInner from '@components/AppInner';
import { CookiesProvider } from 'react-cookie';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    async function loadCrate() {
      const result = await import('@widgetbot/crate');
      const Crate = await result.cdn();
      new Crate({
        server: '960814143588401152',
        channel: '960814144045613068',
      });
    }
    loadCrate();
  }, []);
  return (
    <CookiesProvider>
      <Provider store={store}>
        <AppInner pageProps={pageProps} Component={Component} />
      </Provider>
    </CookiesProvider>
  );
}

export default wrapper.withRedux(MyApp);
