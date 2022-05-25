import React, { useState } from 'react';
import { Drawer, Space } from 'antd';
import styled from 'styled-components';
import Link from 'next/link';

const App: React.FC = () => {
  const [visible, setVisible] = useState(false);

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
            src="../images/burger.png"
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
        <Menu onClick={onClose}>
          <Link href="/">메타버스</Link>
        </Menu>
        <Menu onClick={onClose}>
          <Link href="/community/free">커뮤니티</Link>
        </Menu>
        <Menu onClick={onClose}>
          <Link href="/game">게임</Link>
        </Menu>
        <Menu onClick={onClose}>
          <Link href="/apifactory/gathertownAPI">ApiFactory</Link>
        </Menu>
        <CloseBtn onClick={onClose}>x</CloseBtn>
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

const Menu = styled.div`
  :hover {
    background-color: #f0f0f0;
  }
  transition: all 0.2s ease-out;
  padding: 10px 5px;
  cursor: pointer;
  a {
    color: black;
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
`;
