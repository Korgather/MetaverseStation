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
  const url = 'https://metaverse-station.vercel.app/';
  const [selectedKeys, setSelectedKeys] = useState(['']);
  useEffect(() => {
    if (router.pathname === '/') {
      setSelectedKeys(['nav_gathertown']);
    }
    if (router.pathname.indexOf('/community') > -1) {
      setSelectedKeys(['nav_community']);
    }
  }, []);
  return (
    <>
      <Head>
        <title>모두의 메타버스 - MoMe</title>
        <meta
          name="description"
          content="메타버스 공유 플랫폼 모두의 메타버스입니다. 여러분의 메타버스(게더타운, 젭)을 공유해보세요. "
        />
        <meta
          name="keyword"
          content="메타버스, 게더타운, 젭,zep,gathertown,개더타운, 매타버스, metaverse, 게더타운맵, 젭맵 , 코게더 "
        />
        <meta key={shortid.generate()} property="og:type" content="website" />
        <meta key={shortid.generate()} property="og:url" content={url} />
        <meta key={shortid.generate()} property="og:title" content="모두의 메타버스 - MoMe" />
        <meta key={shortid.generate()} property="og:image" content={'../../images/logo01.png'} />
        <meta
          key={shortid.generate()}
          property="og:description"
          content="메타버스 공유 플랫폼 모두의 메타버스입니다. 여러분의 메타버스(게더타운, 젭)을 공유해보세요. "
        />
        <meta key={shortid.generate()} property="og:site_name" content="모두의 메타버스 - MoMe" />
        <meta key={shortid.generate()} property="og:locale" content="ko_KR" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {updateModalState && <WriteModal />}
      {detailModalState && <DetailModal />}
      <LayoutWrapper className="layout">
        <StyledLayout>
          <StyledHeader>
            <div onClick={() => router.push('/')}>
              <img style={{ width: '35px', cursor: 'pointer' }} src="/images/Logo01.png" />
            </div>
            <MenuWrapper
              selectedKeys={selectedKeys}
              mode="horizontal"
              style={{ border: 'none', margin: '5px 0 0 30px' }}
            >
              <Menu.Item key="nav_gathertown">
                <Link href="/">Gallery</Link>
              </Menu.Item>
              <Menu.Item key="nav_community">
                <Link href="/community/free">Community</Link>
              </Menu.Item>
            </MenuWrapper>
            <BtnWrapper>
              {me ? (
                <>
                  <ProfileDropdown />
                  <Alram />
                  <Link href="/mypage">
                    <ProfileImg src={me.profileImageUrl} alt="" />
                  </Link>
                </>
              ) : (
                <Link href="/login">
                  <StyledBtn>로그인</StyledBtn>
                </Link>
              )}
            </BtnWrapper>
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

const ProfileImg = styled.img`
  border-radius: 1000px;
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;
`;

const MenuWrapper = styled(Menu)`
  width: 50%;
  font-size: 0.9rem;
`;

const LayoutWrapper = styled.div`
  word-break: break-all;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto', sans-serif;
`;

const StyledLayout = styled(Layout)`
  align-items: center;
  width: 1440px;
  background: white;
  height: 100% !important;
  @media screen and (max-width: 1650px) {
    width: 75vw;
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
`;

const BtnWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
`;
