import React from 'react';
import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import shortid from 'shortid';

class MyDocument extends Document {
  static async getInitialProps(context: DocumentContext) {
    const sheet = new ServerStyleSheet();
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
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id=%27+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','GTM-N4NRZP8');`,
            }}
          />
          <meta name="naver-site-verification" content="29cc22706719a244d8ecb5f0236f31a87d58d9c1" />
          <meta
            name="description"
            content="메타버스 공유 플랫폼 모두의 메타버스입니다. 여러분의 메타버스(게더타운, 젭)을 공유해보세요. "
          />
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-JJJK75PQJP"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
         window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-JJJK75PQJP');, {
          page_path: window.location.pathname,
        });
      `,
            }}
          />
          <meta
            name="keyword"
            content="메타버스, 게더타운, 젭,zep,gathertown,개더타운, 매타버스, metaverse, 게더타운맵, 젭맵 , 코게더 "
          />
          <meta key={shortid.generate()} property="og:type" content="website" />
          <meta key={shortid.generate()} property="og:url" content={url} />
          <meta key={shortid.generate()} property="og:title" content="모두의 메타버스 - MoMe" />
          <meta
            key={shortid.generate()}
            property="og:image"
            content="../../images/ModuMetaIcon.png"
          />
          <meta
            key={shortid.generate()}
            property="og:description"
            content="메타버스 공유 플랫폼 모두의 메타버스입니다. 여러분의 메타버스(게더타운, 젭)을 공유해보세요. "
          />
          <meta key={shortid.generate()} property="og:site_name" content="모두의 메타버스 - MoMe" />
          <meta key={shortid.generate()} property="og:locale" content="ko_KR" />
          <link rel="icon" href="/favicon.ico" />
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
