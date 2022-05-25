import React from 'react';
import { IUser } from '@customTypes/user';
import { Menu } from 'antd';
import { AnimationControls } from 'framer-motion';
import Link from 'next/link';
import Alram from '../Alram';
import ProfileDropdown from '../ProfileDropdown';
import * as S from './style';

interface NavViewProps {
  fixedpos: string;
  navVariants: {
    top: {
      boxShadow: string;
    };
    scroll: {
      boxShadow: string;
    };
  };
  navAnimation: AnimationControls;
  selectedKeys: string[];
  me: IUser | null;
  goHome: () => Promise<boolean>;
}

const NavView = ({
  fixedpos,
  navVariants,
  navAnimation,
  selectedKeys,
  me,
  goHome,
}: NavViewProps) => {
  return (
    <S.NavLayout fixedpos={fixedpos}>
      <S.TopWrapper>
        <div
          onClick={goHome}
          style={{ width: '100%', marginTop: '30px', marginBottom: '20px', marginLeft: '20px' }}
        >
          <S.LogoImg src="/images/BetaLogo.png" />
        </div>
      </S.TopWrapper>
      <S.StyledHeader
        fixedpos={fixedpos}
        variants={navVariants}
        animate={navAnimation}
        initial={'top'}
      >
        <S.MenuWrapper selectedKeys={selectedKeys} mode="horizontal" style={{ border: 'none' }}>
          <Menu.Item key="nav_gathertown">
            <Link href="/">메타버스</Link>
          </Menu.Item>
          <Menu.Item key="nav_community">
            <Link href="/community/free">커뮤니티</Link>
          </Menu.Item>
          <Menu.Item key="nav_game">
            <Link href="/game">게임</Link>
          </Menu.Item>
          <Menu.Item key="nav_api">
            <Link href="/apifactory/gathertownAPI">ApiFactory</Link>
          </Menu.Item>
        </S.MenuWrapper>
        <S.BtnWrapper>
          {me ? (
            <S.AlramProfileWrapper>
              <Alram />
              <ProfileDropdown />
            </S.AlramProfileWrapper>
          ) : (
            <Link href="/login">
              <S.StyledBtn>로그인</S.StyledBtn>
            </Link>
          )}
        </S.BtnWrapper>
      </S.StyledHeader>
    </S.NavLayout>
  );
};

export default NavView;
