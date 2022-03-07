import React from 'react';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styled, { css } from 'styled-components';

function Category() {
  const menu = (
    <Menu>
      <Menu.Item key={'dropdownItem1'}>
        <a>최신순</a>
      </Menu.Item>
      <Menu.Item key={'dropdownItem2'}>
        <a>인기순</a>
      </Menu.Item>
    </Menu>
  );
  return (
    <MenuWrapper>
      <Menu mode="horizontal" style={{ border: 'none', margin: '20px 0' }}>
        <Menu.Item key={'menuItem1'}>
          <a>행사</a>
        </Menu.Item>
        <Menu.Item key={'menuItem2'}>
          <a>스터디</a>
        </Menu.Item>
        <Menu.Item key={'menuItem3'}>
          <a>소모임</a>
        </Menu.Item>
        <Menu.Item key={'menuItem4'}>
          <a>기타</a>
        </Menu.Item>
      </Menu>
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
  position: relative;
`;

const DropdownWrapper = styled(Dropdown)`
  position: absolute;
  right: 15px;
  top: 12px;
`;
