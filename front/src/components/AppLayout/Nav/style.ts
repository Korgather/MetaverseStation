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
  width: 100%;
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
  width: 1440px;
  padding: 0 10px;
  position: ${(props) => (props.fixedpos === 'true' ? 'fixed' : 'relative')};
  top: 0;
  margin: 0 auto;
  z-index: 10;
  @media screen and (max-width: 1650px) {
    width: 75vw;
  }
  ${media.mobile} {
    width: 100vw;
  }
`;

export const StyledBtn = styled(Button)`
  margin-left: auto;
  margin-right: 18px;
`;
