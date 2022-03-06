import React from 'react';
import { Menu } from 'antd';

function Category() {
  return (
    <div>
      <Menu mode="horizontal" style={{ border: 'none', margin: '20px 0' }}>
        <Menu.Item>
          <a>행사</a>
        </Menu.Item>
        <Menu.Item>
          <a>스터디</a>
        </Menu.Item>
        <Menu.Item>
          <a>소모임</a>
        </Menu.Item>
        <Menu.Item>
          <a>기타</a>
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default Category;
