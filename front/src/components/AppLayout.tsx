import React, { ReactChildren, ReactChild } from 'react';
import Link from 'next/link';
import { Layout, Menu } from 'antd';
import styled from 'styled-components';
interface AuxProps {
  children: ReactChild | ReactChildren;
}

const { Header, Content, Footer } = Layout;

const AppLayout = ({ children }: AuxProps) => {
  return (
    <>
      <LayoutWrapper>
        <Layout className="layout" style={{ width: '75vw', background: 'white', alignItems: 'center' }}>
          <Header
            style={{
              backgroundColor: 'white',
              display: 'flex',
              borderBottom: '1px solid #f0f0f0',
              width: '70vw',
              padding: '0 10px',
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
          </Header>
          <Content style={{ background: 'white', padding: '50px' }}>
            <div className="site-layout-content">{children}</div>
          </Content>
        </Layout>
      </LayoutWrapper>
      <Footer style={{ textAlign: 'center' }}>ⓒ KORGATHER All Rights Reserved.</Footer>
    </>
  );
};

export default AppLayout;

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
