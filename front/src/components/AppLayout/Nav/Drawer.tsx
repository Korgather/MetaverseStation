import React, { useState } from 'react';
import { Button, Drawer, Space } from 'antd';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouteMatch } from '@lib/useRouteMatch';
import { media } from '@styles/theme';
import Image from 'next/image';

const App: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const { homeMatch, communityMatch, apifactoryMatch, gameMatch } = useRouteMatch();
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <SpaceWrapper>
        <ImgWrapper>
          <img
            src="../../images/burger.png"
            alt="menubutton"
            onClick={showDrawer}
            style={{ cursor: 'pointer' }}
          />
        </ImgWrapper>
      </SpaceWrapper>
      <StyledDrawer
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
        key={'left'}
      >
        <div onClick={onClose} className="login">
          <LogoWrapper>
            <LogoImg src="/images/BetaLogo.png" layout="responsive" width={400} height={40} />
          </LogoWrapper>
          <Link href="/login">
            <Button>로그인</Button>
          </Link>
        </div>
        <Menu onClick={onClose} useRouteMatch={homeMatch}>
          <Link href="/">메타버스</Link>
        </Menu>
        <Menu onClick={onClose} useRouteMatch={communityMatch}>
          <Link href="/community/free">커뮤니티</Link>
        </Menu>
        <Menu onClick={onClose} useRouteMatch={gameMatch}>
          <Link href="/game/zepmapia">게임</Link>
        </Menu>
        <Menu onClick={onClose} useRouteMatch={apifactoryMatch}>
          <Link href="/apifactory/gathertownAPI">ApiFactory</Link>
        </Menu>
        <CloseBtn onClick={onClose}>
          <span>x</span>
        </CloseBtn>
      </StyledDrawer>
    </>
  );
};

export default App;

const SpaceWrapper = styled(Space)`
  flex: 0.5;
  margin-right: auto;
`;

const ImgWrapper = styled.div`
  margin-top: 10px;
  img {
    width: 30px;
    height: 30px;
    margin-right: auto;
  }
`;

const StyledDrawer = styled(Drawer)`
  font-size: 1rem;
  font-weight: 700;
  .ant-drawer-content-wrapper {
    width: 80% !important;
  }
  .login {
    :hover {
      background-color: none !important;
    }
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 25px;
    padding-bottom: 30px;
    margin-bottom: 20px;
    border-bottom: 1px solid #c4c4c4;
    Button {
      width: 100%;
      height: 50px;
      font-size: 1.3rem;
      font-weight: 600;
    }
  }
`;

const Menu = styled.div<{ useRouteMatch?: boolean }>`
  :hover {
    background-color: #f0f0f0;
  }
  transition: all 0.2s ease-out;
  padding: 10px 5px;
  cursor: pointer;
  font-size: 1.2rem;
  a {
    color: ${(props) => (props.useRouteMatch ? '#4490f8' : 'black')};
  }
`;

const CloseBtn = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 1.4rem;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 100px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  span {
    margin-bottom: 3px;
  }
`;

const LogoWrapper = styled.div`
  max-width: 450px;
  ${media.mobile} {
    max-width: 300px;
  }
`;

const LogoImg = styled(Image)`
  max-width: 26rem;
  cursor: pointer;
  margin-right: auto;
  /* ${media.mobile} {
    width: 240px;
  } */
`;
