import React from 'react';
import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import shortid from 'shortid';
import Script from 'next/script';

class MyDocument extends Document {
  static async getInitialProps(context: DocumentContext) {
    const sheet = new ServerStyleSheet();
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const originalRenderPage = context.renderPage;
    try {
      context.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(context);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  render() {
    const url = 'https://www.modumeta.com/';
    return (
      <Html lang="ko">
        <Head>
          <Script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id=%27+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','GTM-N4NRZP8');`,
            }}
            strategy="afterInteractive"
          />
          <script defer src="https://developers.kakao.com/sdk/js/kakao.min.js" />
          <Script
            strategy="afterInteractive"
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-JJJK75PQJP"
          />
          <Script
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-JJJK75PQJP', {
                  page_path: window.location.pathname,
              });
            `,
            }}
          />
          <Script
            strategy="afterInteractive"
            src="https://www.googleoptimize.com/optimize.js?id=OPT-TRTBJP3"
          />
          <meta name="naver-site-verification" content="29cc22706719a244d8ecb5f0236f31a87d58d9c1" />
          <meta
            name="description"
            content="메타버스 공유 플랫폼 모두메타입니다. 여러분의 메타버스(게더타운, 젭)을 공유해보세요. "
          />

          <meta
            name="keyword"
            content="메타버스, 게더타운, 젭,zep,gathertown,개더타운, 매타버스, metaverse, 게더타운맵, 젭맵 , 코게더, 모두의메타버스, 모두메타,메타버스체험 "
          />
          <meta key={shortid.generate()} property="og:type" content="website" />
          <meta key={shortid.generate()} property="og:url" content={url} />
          <meta key={shortid.generate()} property="og:title" content="모두메타 - 모두의 메타버스" />
          <meta
            key={shortid.generate()}
            property="og:image"
            content="../../images/ModuMetaIcon.png"
          />
          <meta
            key={shortid.generate()}
            property="og:description"
            content="메타버스 공유 플랫폼 모두메타입니다. 여러분의 메타버스(게더타운, 젭)을 공유해보세요. "
          />
          <meta
            key={shortid.generate()}
            property="og:site_name"
            content="모두메타 - 모두의 메타버스"
          />
          <meta key={shortid.generate()} property="og:locale" content="ko_KR" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="57x57"
            href="apple-touch-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="114x114"
            href="apple-touch-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="72x72"
            href="apple-touch-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="144x144"
            href="apple-touch-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="60x60"
            href="apple-touch-icon-60x60.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="120x120"
            href="apple-touch-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="76x76"
            href="apple-touch-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="152x152"
            href="apple-touch-icon-152x152.png"
          />
          <link rel="icon" type="image/png" href="favicon-196x196.png" sizes="196x196" />
          <link rel="icon" type="image/png" href="favicon-96x96.png" sizes="96x96" />
          <link rel="icon" type="image/png" href="favicon-32x32.png" sizes="32x32" />
          <link rel="icon" type="image/png" href="favicon-16x16.png" sizes="16x16" />
          <link rel="icon" type="image/png" href="favicon-128.png" sizes="128x128" />
          <meta name="application-name" content="&nbsp;" />
          <meta name="msapplication-TileColor" content="#FFFFFF" />
          <meta name="msapplication-TileImage" content="mstile-144x144.png" />
          <meta name="msapplication-square70x70logo" content="mstile-70x70.png" />
          <meta name="msapplication-square150x150logo" content="mstile-150x150.png" />
          <meta name="msapplication-wide310x150logo" content="mstile-310x150.png" />
          <meta name="msapplication-square310x310logo" content="mstile-310x310.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
