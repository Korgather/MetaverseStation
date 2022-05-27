import React, { useState } from 'react';
import { Drawer, Space } from 'antd';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouteMatch } from '@lib/useRouteMatch';

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
      <Space>
        <ImgWrapper>
          <img
            src="../../images/burger.png"
            alt="menubutton"
            onClick={showDrawer}
            style={{ cursor: 'pointer' }}
          />
        </ImgWrapper>
      </Space>
      <StyledDrawer
        title="메뉴"
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
        key={'left'}
      >
        <Menu onClick={onClose} useRouteMatch={homeMatch}>
          <Link href="/">메타버스</Link>
        </Menu>
        <Menu onClick={onClose} useRouteMatch={communityMatch}>
          <Link href="/community/free">커뮤니티</Link>
        </Menu>
        <Menu onClick={onClose} useRouteMatch={gameMatch}>
          <Link href="/game">게임</Link>
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

const ImgWrapper = styled.div`
  margin-left: 20px;
  margin-top: 10px;
  img {
    width: 30px;
    height: 30px;
  }
`;

const StyledDrawer = styled(Drawer)`
  font-size: 1rem;
  font-weight: 700;
`;

const Menu = styled.div<{ useRouteMatch: boolean }>`
  :hover {
    background-color: #f0f0f0;
  }
  transition: all 0.2s ease-out;
  padding: 10px 5px;
  cursor: pointer;
  a {
    color: ${(props) => (props.useRouteMatch ? '#4490f8' : 'black')};
  }
`;

const CloseBtn = styled.div`
  position: absolute;
  right: 30px;
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
