import { useAppSelector } from '@store/hook';
import { Button, Menu } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProfileDropdown from './ProfileDropdown';
import Alram from './Alram';
import { motion, useAnimation, useViewportScroll } from 'framer-motion';
const Nav = () => {
  const router = useRouter();
  const me = useAppSelector((state) => state.userSlice.me);
  const [selectedKeys, setSelectedKeys] = useState(['']);
  const [fixedpos, setFixedPos] = useState('false');
  const { scrollY } = useViewportScroll();
  const navAnimation = useAnimation();
  const navVariants = {
    top: {
      boxShadow: 'rgba(0, 0, 0, 0) 0px 5px 15px',
    },
    scroll: {
      boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
    },
  };
  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 90) {
        setFixedPos('true');
        navAnimation.start('scroll');
      } else {
        setFixedPos('false');
        navAnimation.start('top');
      }
    });
  }, [scrollY, navAnimation]);
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
    <NavLayout fixedpos={fixedpos}>
      <TopWrapper>
        <div
          onClick={() => router.push('/')}
          style={{ width: '100%', marginTop: '30px', marginBottom: '20px', marginLeft: '20px' }}
        >
          <LogoImg src="/images/BetaLogo.png" />
        </div>
      </TopWrapper>
      <StyledHeader
        fixedpos={fixedpos}
        variants={navVariants}
        animate={navAnimation}
        initial={'top'}
      >
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
      </StyledHeader>
    </NavLayout>
  );
};

export default Nav;

interface NavProps {
  fixedpos: string;
}

const NavLayout = styled.div<NavProps>`
  width: 100%;
`;

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
  display: flex;
  align-items: center;
  justify-content: end;
  width: 100%;
  @media screen and (max-width: 850px) {
    flex: 1;
  }
`;

const StyledHeader = styled(motion.div)<NavProps>`
  display: flex;
  background-color: white;
  opacity: 1;
  border-bottom: 1px solid #f0f0f0;
  width: 1440px;
  padding: 0 10px;
  position: ${(props) => (props.fixedpos === 'true' ? 'fixed' : 'relative')};
  top: 0;
  margin: 0 auto;
  z-index: 10;
  @media screen and (max-width: 1650px) {
    width: 75vw;
  }
  @media screen and (max-width: 850px) {
    width: 100vw;
  }
`;

const StyledBtn = styled(Button)`
  margin-left: auto;
  margin-right: 18px;
  margin-top: 15px;
`;
