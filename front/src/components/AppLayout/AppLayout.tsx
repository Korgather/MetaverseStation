import React, { ReactChildren, ReactChild, useEffect } from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
import { useAppSelector } from '@store/hook';
import WriteModal from '@components/writeModal/WriteModalContainer';
import DetailModalContainer from '@components/detailModal/DetailModalContainer';
import FeedBack from './FeedBack';
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
  ${media.mobile} {
    margin-top: 70px;
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
