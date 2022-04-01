import React from 'react';
import { Menu, Dropdown, Input } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styled, { css } from 'styled-components';
import shortid from 'shortid';
const { Search } = Input;
function Category() {
  const menu = (
    <Menu>
      <Menu.Item key={shortid.generate()}>
        <a>최신순</a>
      </Menu.Item>
      <Menu.Item key={shortid.generate()}>
        <a>인기순</a>
      </Menu.Item>
    </Menu>
  );
  return (
    <MenuWrapper>
      <StyledSearch />
      {/* <Menu mode="horizontal" style={{ border: 'none', margin: '20px 0' }}>
        <Menu.Item key={shortid.generate()}>
          <a>행사</a>
        </Menu.Item>
        <Menu.Item key={shortid.generate()}>
          <a>스터디</a>
        </Menu.Item>
        <Menu.Item key={shortid.generate()}>
          <a>소모임</a>
        </Menu.Item>
        <Menu.Item key={shortid.generate()}>
          <a>기타</a>
        </Menu.Item>
      </Menu> */}
      <DropdownWrapper overlay={menu} trigger={['click']}>
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          최신순 <DownOutlined />
        </a>
      </DropdownWrapper>
    </MenuWrapper>
  );
}

export default Category;

const MenuWrapper = styled.div`
  margin: 50px 0 30px 0;
  display: flex;
  flex-direction: row;
  position: relative;
  a {
    font-size: 0.8rem;
  }
`;

const DropdownWrapper = styled(Dropdown)``;

const StyledSearch = styled(Search)`
  margin: 0 auto;
  width: 30%;
  min-width: 250px;
`;
