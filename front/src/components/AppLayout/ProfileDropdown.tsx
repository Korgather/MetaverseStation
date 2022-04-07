import { logOut } from '@actions/user';
import { DownOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@store/hook';
import { Dropdown, Menu } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';

const ProfileDropdown = () => {
  const me = useAppSelector((state) => state.userSlice.me);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const onSelect = async ({ key }: { key: string }) => {
    if (key === 'pro_mypage') {
      router.push('/mypage');
    }
    if (key === 'pro_logout') {
      try {
        await dispatch(logOut());
        router.push('/login');
      } catch (e) {
        console.error(e);
      }
    }
  };
  const menu = (
    <Menu onClick={({ key }) => onSelect({ key })}>
      <Menu.Item key="pro_mypage">myPage</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="pro_logout">로그아웃</Menu.Item>
    </Menu>
  );
  return (
    <>
      <Dropdown overlay={menu}>
        <a
          className="ant-dropdown-link"
          onClick={(e) => e.preventDefault()}
          style={{
            color: 'rgba(0, 0, 0, 0.85)',
            fontWeight: '600',
            fontSize: '1rem',
          }}
        >
          {me?.userName}
          <DownOutlined />
        </a>
      </Dropdown>
    </>
  );
};

export default ProfileDropdown;
