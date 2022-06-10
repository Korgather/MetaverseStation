import React from 'react';
import { IUser } from '@customTypes/user';
import { Dropdown, Menu } from 'antd';
import { AnimationControls } from 'framer-motion';
import Link from 'next/link';
import Alram from '../Alram';
import ProfileDropdown from '../ProfileDropdown';
import * as S from './style';
import { useMedia } from '@lib/useMedia';
import Drawer from './Drawer';

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
  onSelect: ({ key }: { key: string }) => void;
  navAnimation: AnimationControls;
  selectedKeys: string[];
  selectedGameKeys: string[];
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
  onSelect,
  selectedGameKeys,
}: NavViewProps) => {
  const { isPc } = useMedia();
  const menu = (
    <Menu onClick={onSelect} selectedKeys={selectedGameKeys}>
      <S.StyledMenuItem key="mapia">마피아</S.StyledMenuItem>
      <Menu.Divider />
      <S.StyledMenuItem key="omok">오목</S.StyledMenuItem>
    </Menu>
  );
  return (
    <S.NavLayout fixedpos={fixedpos}>
      <S.TopWrapper>
        <S.LogoContainer onClick={goHome}>
          <S.LogoWrapper>
            <S.LogoImg src="/images/BetaLogo.png" layout="responsive" width={400} height={40} />
          </S.LogoWrapper>
        </S.LogoContainer>
      </S.TopWrapper>

      <S.StyledHeader
        fixedpos={fixedpos}
        variants={navVariants}
        animate={navAnimation}
        initial={'top'}
      >
        <S.MenuContainer>
          {isPc ? (
            <S.MenuWrapper selectedKeys={selectedKeys} mode="horizontal" style={{ border: 'none' }}>
              <Menu.Item key="nav_gathertown">
                <Link href="/">메타버스</Link>
              </Menu.Item>
              <Menu.Item key="nav_community">
                <Link href="/community/free">커뮤니티</Link>
              </Menu.Item>

              <Menu.Item key="nav_game">
                <Dropdown overlay={menu} arrow={false} placement="bottomRight">
                  <a>게임</a>
                </Dropdown>
              </Menu.Item>

              <Menu.Item key="nav_api">
                <Link href="/apifactory/gathertownAPI">ApiFactory</Link>
              </Menu.Item>
            </S.MenuWrapper>
          ) : (
            <Drawer />
          )}
          <S.MobileLogoWrapper>
            <S.LogoContainer onClick={goHome}>
              <S.LogoWrapper>
                <S.LogoImg src="/images/BetaLogo.png" layout="responsive" width={400} height={40} />
              </S.LogoWrapper>
            </S.LogoContainer>
          </S.MobileLogoWrapper>
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
        </S.MenuContainer>
      </S.StyledHeader>
    </S.NavLayout>
  );
};

export default NavView;
