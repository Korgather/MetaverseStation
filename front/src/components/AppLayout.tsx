import React, { ReactChildren, ReactChild } from 'react';
import Link from 'next/link';
import { Layout, Menu, Button } from 'antd';
import styled from 'styled-components';
interface AuxProps {
  children: ReactChild | ReactChildren;
}

const { Header, Content, Footer } = Layout;

const AppLayout = ({ children }: AuxProps) => {
  return (
    <>
      <LayoutWrapper className="layout">
        <StyledLayout>
          <Header
            style={{
              backgroundColor: 'white',
              display: 'flex',
              borderBottom: '1px solid #f0f0f0',
              width: '75vw',
              padding: '0 10px',
              position: 'relative',
            }}
          >
            <div>
              <img style={{ width: '35px' }} src="/images/Logo01.png" />
            </div>
            <Menu mode="horizontal" style={{ border: 'none', margin: '5px 0 0 30px' }}>
              <Menu.Item>
                <Link href="/">
                  <a>GatherTown</a>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link href="/">
                  <a>Zep</a>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link href="/">
                  <a>자유게시판</a>
                </Link>
              </Menu.Item>
            </Menu>
            <div>
              <ButtonWrapper>로그인</ButtonWrapper>
            </div>
          </Header>
          <Content style={{ background: 'white', padding: '50px' }}>
            <div className="site-layout-content">{children}</div>
          </Content>
        </StyledLayout>
      </LayoutWrapper>
      <Footer style={{ textAlign: 'center', width: '100vw', padding: '24px 0' }}>
        ⓒ KORGATHER All Rights Reserved.
      </Footer>
    </>
  );
};

export default AppLayout;

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledLayout = styled(Layout)`
  align-items: center;
  width: 1440px;
  background: 'white';

  @media screen and (max-width: 1650px) {
    width: 75vw;
  }
`;
const ButtonWrapper = styled(Button)`
  position: absolute;
  right: 10px;
  top: 19px;
`;
