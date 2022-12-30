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
import { useRouter } from 'next/router';
import Script from 'next/script';
declare global {
  interface Window {
    Kakao: any;
  }
}
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const gamePathArr = ['/game/zepmapia/[id]', '/game/omok/[id]'];
  const isGame = gamePathArr.includes(router.pathname);
  useEffect(() => {
    async function loadCrate() {
      const result = await import('@widgetbot/crate');
      const Crate = await result.cdn();
      const crate = new Crate({
        server: '960814143588401152',
        channel: '960814144045613068',
      });
      crate.notify('모두메타 채팅방');
    }
    !isGame && loadCrate();
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
  }, []);
  return (
    <CookiesProvider>
      <Script
        strategy="afterInteractive"
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}', {
            page_path: window.location.pathname,
        });
      `,
        }}
      />
      <AppInner pageProps={pageProps} Component={Component} />
    </CookiesProvider>
  );
}

export default wrapper.withRedux(MyApp);
