import React, { ReactChildren, ReactChild } from "react";
import Link from "next/link";
import { Layout, Menu, Button } from "antd";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { logOut } from "@actions/user";

interface AuxProps {
  children: ReactChild | ReactChildren;
}

const { Header, Content, Footer } = Layout;

const AppLayout = ({ children }: AuxProps) => {
  const dispatch = useAppDispatch();
  const me = useAppSelector((state) => state.userSlice.me);
  const logOutLoading = useAppSelector((state) => state.userSlice.logOutLoading);
  const logOutRequest = async () => {
    try {
      await dispatch(logOut());
    } catch (e) {
      console.error(e);
      alert("실패");
    }
  };

  return (
    <>
      <LayoutWrapper className="layout">
        <StyledLayout>
          <StyledHeader>
            <div>
              <img style={{ width: "35px" }} src="/images/Logo01.png" />
            </div>
            <MenuWrapper mode="horizontal" style={{ border: "none", margin: "5px 0 0 30px" }}>
              <Menu.Item>
                <Link href="/">
                  <a>GatherTown</a>
                </Link>
              </Menu.Item>
              {/* <Menu.Item>
                <Link href="/">
                  <a>Zep</a>
                </Link>
              </Menu.Item> */}
              {me && (
                <Menu.Item>
                  <Link href="/mypage">
                    <a>MyPage</a>
                  </Link>
                </Menu.Item>
              )}
            </MenuWrapper>
            <BtnWrapper>
              {me ? (
                <StyledBtn htmlType="button" onClick={logOutRequest} loading={logOutLoading}>
                  로그아웃
                </StyledBtn>
              ) : (
                <Link href="/login">
                  <StyledBtn>로그인</StyledBtn>
                </Link>
              )}
            </BtnWrapper>
          </StyledHeader>
          <Content style={{ background: "white", padding: "50px" }}>
            <div className="site-layout-content">{children}</div>
          </Content>
        </StyledLayout>
        <StyledFooter>ⓒ KORGATHER All Rights Reserved.</StyledFooter>
      </LayoutWrapper>
    </>
  );
};

export default AppLayout;

const MenuWrapper = styled(Menu)`
  width: 50%;
`;

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  padding: "24px 0";
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
