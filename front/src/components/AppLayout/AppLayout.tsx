import React, { ReactChildren, ReactChild } from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
import { useAppSelector } from '@store/hook';
import WriteModal from '@components/writeModal/WriteModal';
import DetailModalContainer from '@components/detailModal/DetailModalContainer';
import FeedBack from './FeedBack';
import Script from 'next/script';
import Nav from './Nav/NavContainer';
import { media } from '@styles/theme';
import { useRouter } from 'next/router';

interface AuxProps {
  children: ReactChild | ReactChildren;
}

const { Content, Footer } = Layout;

const AppLayout = ({ children }: AuxProps) => {
  const router = useRouter();
  const updateModalState = useAppSelector((state) => state.postSlice.updateModalState);
  const detailModalState = useAppSelector((state) => state.postSlice.detailModalState);
  const isChannelIframe = router.pathname === '/game/channelIframe';
  return (
    <>
      <Script>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id=%27+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','GTM-N4NRZP8');`,
          }}
        />
      </Script>
      {updateModalState && <WriteModal />}
      {detailModalState && <DetailModalContainer />}
      {<DetailModalContainer />}
      <LayoutWrapper className="layout">
        <Nav />
        <StyledLayout>
          <Content style={{ background: 'white', padding: '50px' }}>
            <div className="site-layout-content">{children}</div>
          </Content>
        </StyledLayout>
        <StyledFooter>ⓒ KORGATHER All Rights Reserved.</StyledFooter>
      </LayoutWrapper>
      {!isChannelIframe && <FeedBack />}
    </>
  );
};

export default AppLayout;

const LayoutWrapper = styled.div`
  word-break: break-all;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto', sans-serif;
  .ant-layout-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .site-layout-content {
    display: flex;
    flex-direction: column;

    align-items: center;
  }
`;

const StyledLayout = styled(Layout)`
  align-items: center;
  width: 1440px;
  background: white;
  @media screen and (max-width: 1650px) {
    width: 75vw;
  }
  ${media.mobile} {
    width: 100vw;
  }
`;

const StyledFooter = styled(Footer)`
  text-align: center;
  width: 1440px;
  padding: 24px 0;
  @media screen and (max-width: 1650px) {
    width: 75vw;
  }
`;
