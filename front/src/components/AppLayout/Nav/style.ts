import { media } from '@styles/theme';
import { Button, Menu } from 'antd';
import { motion } from 'framer-motion';
import styled from 'styled-components';

interface NavProps {
  fixedpos: string;
}

export const NavLayout = styled.div<NavProps>`
  width: 100%;
  .ant-space-align-center {
    width: 100%;
  }
`;

export const AlramProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${media.mobile} {
    margin-right: 20px;
    margin-top: 10px;
  }
`;
export const TopWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const Logo = styled.div`
  margin: 30px 0 20px 20px;
  width: 1440px;
  @media screen and (max-width: 1650px) {
    width: 75vw;
  }
  ${media.mobile} {
    width: 100vw;
  }
`;

export const LogoImg = styled.img`
  width: 26rem;
  cursor: pointer;
  margin-right: auto;
  ${media.mobile} {
    width: 240px;
  }
`;

export const MenuWrapper = styled(Menu)`
  width: 70%;
  font-size: 1rem;
  font-weight: 700;
  ${media.mobile} {
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
export const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  width: 30%;
  ${media.mobile} {
    flex: 1;
  }
`;

export const StyledHeader = styled(motion.div)<NavProps>`
  display: flex;
  background-color: white;
  opacity: 1;
  border-bottom: 1px solid #f0f0f0;
  left: 0;
  right: 0;
  top: 0;
  padding: 0 10px;
  position: ${(props) => (props.fixedpos === 'true' ? 'fixed' : 'relative')};
  z-index: 10;
  justify-content: center;
  ${media.mobile} {
    width: 100vw;
  }
`;

export const StyledBtn = styled(Button)`
  margin-left: auto;
  margin-right: 18px;
`;

export const MenuContainer = styled.div`
  width: 1440px;
  @media screen and (max-width: 1650px) {
    width: 75vw;
  }
  ${media.mobile} {
    width: 100vw;
  }
  display: flex;
`;

export const StyledMenuItem = styled(Menu.Item)`
  font-size: 0.9rem;
  font-weight: 600;
  padding: 10px 20px;
`;
