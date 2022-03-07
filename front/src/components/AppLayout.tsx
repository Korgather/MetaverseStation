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
          <StyledHeader>
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

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledLayout = styled(Layout)`
  align-items: center;
  width: 1440px;
  background: white;

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
const ButtonWrapper = styled(Button)`
  position: absolute;
  right: 10px;
  top: 19px;
`;
