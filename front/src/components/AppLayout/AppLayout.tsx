import React, { ReactChildren, ReactChild, useState, useEffect } from 'react';
import Link from 'next/link';
import { Layout, Menu, Button } from 'antd';
import styled from 'styled-components';
import { useAppSelector } from '@store/hook';
import { useRouter } from 'next/router';
import ProfileDropdown from './ProfileDropdown';
import { BellOutlined } from '@ant-design/icons';
import Alram from './Alram';

interface AuxProps {
  children: ReactChild | ReactChildren;
}

const { Header, Content, Footer } = Layout;

const AppLayout = ({ children }: AuxProps) => {
  const router = useRouter();
  const me = useAppSelector((state) => state.userSlice.me);
  const [selectedKeys, setSelectedKeys] = useState(['']);
  const onSelect = ({ key }: { key: string }) => {
    if (key === 'nav_gathertown') {
      router.push('/');
    }
    if (key === 'nav_community') {
      router.push('/community/question');
    }
  };
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
      <LayoutWrapper className="layout">
        <StyledLayout>
          <StyledHeader>
            <div onClick={() => router.push('/')}>
              <img style={{ width: '35px', cursor: 'pointer' }} src="/images/Logo01.png" />
            </div>
            <MenuWrapper
              selectedKeys={selectedKeys}
              onSelect={({ key }) => onSelect({ key })}
              mode="horizontal"
              style={{ border: 'none', margin: '5px 0 0 30px' }}
            >
              <Menu.Item key="nav_gathertown">Gallery</Menu.Item>
              <Menu.Item key="nav_community">Community</Menu.Item>
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
  padding: '24px 0';
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
