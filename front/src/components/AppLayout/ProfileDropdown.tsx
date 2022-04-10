import { DownOutlined } from '@ant-design/icons';
import { logOut } from '@slices/userSlice';
import { useAppDispatch, useAppSelector } from '@store/hook';
import { Dropdown, Menu } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { useCookies } from 'react-cookie';

const ProfileDropdown = () => {
  const me = useAppSelector((state) => state.userSlice.me);
  const router = useRouter();
  const removeCookie = useCookies(['Token'])[2];
  const dispatch = useAppDispatch();

  const onSelect = async ({ key }: { key: string }) => {
    if (key === 'pro_mypage') {
      router.push('/mypage');
    }
    if (key === 'pro_logout') {
      try {
        await removeCookie('Token', { path: '/' });
        await dispatch(logOut());
        router.push('/login');
      } catch (e) {
        console.log(e);
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
