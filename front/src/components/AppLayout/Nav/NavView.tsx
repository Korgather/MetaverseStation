import React from 'react';
import { IUser } from '@customTypes/user';
import { Dropdown, Menu } from 'antd';
import Link from 'next/link';
import Alram from '../Alram';
import ProfileDropdown from '../ProfileDropdown';
import * as S from './style';
import { useMedia } from '@lib/useMedia';
import Drawer from './Drawer';
import { useAppSelector } from '@store/hook';

interface NavViewProps {
  onSelect: ({ key }: { key: string }) => void;
  selectedKeys: string[];
  selectedGameKeys: string[];
  goHome: () => Promise<boolean>;
}

const NavView = ({ selectedKeys, goHome, onSelect, selectedGameKeys }: NavViewProps) => {
  const me = useAppSelector((state) => state.userSlice.me);
  const { isPc } = useMedia();
  const menu = (
    <Menu onClick={onSelect} selectedKeys={selectedGameKeys}>
      <S.StyledMenuItem key="mapia">마피아</S.StyledMenuItem>
      <Menu.Divider />
      <S.StyledMenuItem key="omok">오목</S.StyledMenuItem>
    </Menu>
  );
  return (
    <>
      <S.NavLayout>
        <S.TopWrapper>
          <S.LogoContainer onClick={goHome}>
            <S.LogoWrapper>
              <S.LogoImg
                src="/images/BetaLogo.png"
                layout="responsive"
                width={400}
                height={40}
                alt="mainLogoImage"
              />
            </S.LogoWrapper>
          </S.LogoContainer>
        </S.TopWrapper>
      </S.NavLayout>
      <S.StyledHeader>
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
                  <span>게임</span>
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
    </>
  );
};

export default NavView;
