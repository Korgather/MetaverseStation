import React, { ReactChildren, ReactChild, useState, useEffect } from 'react';
import Link from 'next/link';
import { Layout, Menu, Button } from 'antd';
import styled from 'styled-components';
import { useAppSelector } from '@store/hook';
import { useRouter } from 'next/router';
import ProfileDropdown from './ProfileDropdown';
import { BellOutlined } from '@ant-design/icons';
import Alram from './Alram';
import WriteModal from '@components/writeModal/WriteModal';
import DetailModal from '@components/detailModal/DetailModal';
import FeedBack from './FeedBack';
import Head from 'next/head';
import Script from 'next/script';
import shortid from 'shortid';

interface AuxProps {
  children: ReactChild | ReactChildren;
}

const { Header, Content, Footer } = Layout;

const AppLayout = ({ children }: AuxProps) => {
  const router = useRouter();
  const updateModalState = useAppSelector((state) => state.postSlice.updateModalState);
  const detailModalState = useAppSelector((state) => state.postSlice.detailModalState);
  const me = useAppSelector((state) => state.userSlice.me);
  const url = 'https://www.modumeta.com/';
  const [selectedKeys, setSelectedKeys] = useState(['']);
  useEffect(() => {
    if (router.pathname === '/') {
      setSelectedKeys(['nav_gathertown']);
    }
    if (router.pathname.indexOf('/community') > -1) {
      setSelectedKeys(['nav_community']);
    }
    if (router.pathname.indexOf('/apifactory') > -1) {
      setSelectedKeys(['nav_api']);
    }
  }, []);
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
      {detailModalState && <DetailModal />}
      <LayoutWrapper className="layout">
        <StyledLayout>
          <TopWrapper>
            <div
              onClick={() => router.push('/')}
              style={{ width: '100%', marginTop: '30px', marginBottom: '20px', marginLeft: '20px' }}
            >
              <LogoImg src="/images/BetaLogo.png" />
            </div>
            <BtnWrapper>
              {me ? (
                <AlramProfileWrapper>
                  <Alram />
                  <ProfileDropdown />
                </AlramProfileWrapper>
              ) : (
                <Link href="/login">
                  <StyledBtn>로그인</StyledBtn>
                </Link>
              )}
            </BtnWrapper>
          </TopWrapper>
          <StyledHeader>
            <MenuWrapper selectedKeys={selectedKeys} mode="horizontal" style={{ border: 'none' }}>
              <Menu.Item key="nav_gathertown">
                <Link href="/">메타버스 게시판</Link>
              </Menu.Item>
              <Menu.Item key="nav_community">
                <Link href="/community/free">커뮤니티 게시판</Link>
              </Menu.Item>
              <Menu.Item key="nav_api">
                <Link href="/apifactory/gathertownAPI">ApiFactory</Link>
              </Menu.Item>
            </MenuWrapper>
          </StyledHeader>
          <Content style={{ background: 'white', padding: '50px' }}>
            <div className="site-layout-content">{children}</div>
          </Content>
        </StyledLayout>
        <StyledFooter>ⓒ KORGATHER All Rights Reserved.</StyledFooter>
      </LayoutWrapper>
      <FeedBack />
    </>
  );
};

export default AppLayout;

const AlramProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  @media screen and (max-width: 850px) {
    margin-right: 20px;
    margin-top: 10px;
  }
`;
const TopWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
const LogoImg = styled.img`
  width: 26rem;
  cursor: pointer;
  margin-right: auto;
  @media screen and (max-width: 850px) {
    width: 240px;
  }
`;

const MenuWrapper = styled(Menu)`
  width: 70%;
  font-size: 1rem;
  font-weight: 700;
  @media screen and (max-width: 850px) {
    width: 100%;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    li {
      flex: 1;
      opacity: 1 !important;
    }
    .ant-menu-submenu-horizontal {
      display: none;
    }
  }
`;
const BtnWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
  @media screen and (max-width: 850px) {
    flex: 1;
  }
`;

const StyledHeader = styled(Header)`
  background-color: white;
  display: flex;
  border-bottom: 1px solid #f0f0f0;
  width: 1440px;
  padding: 0 10px;
  position: relative;
  @media screen and (max-width: 1650px) {
    width: 75vw;
  }
  @media screen and (max-width: 850px) {
    width: 100vw;
  }
`;

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
  height: 100% !important;
  @media screen and (max-width: 1650px) {
    width: 75vw;
  }
  @media screen and (max-width: 850px) {
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
const StyledBtn = styled(Button)`
  margin-left: auto;
  margin-right: 18px;
  margin-top: 15px;
`;
