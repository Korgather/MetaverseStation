import { DownOutlined } from '@ant-design/icons';
import { logOut } from '@slices/userSlice';
import { useAppDispatch, useAppSelector } from '@store/hook';
import { Dropdown, Menu } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';

const ProfileDropdown = () => {
  const me = useAppSelector((state) => state.userSlice.me);
  const router = useRouter();
  const removeCookie = useCookies(['Token'])[2];
  const dispatch = useAppDispatch();

  const onSelect = async ({ key }: { key: string }) => {
    if (key === 'pro_mypage' || key === 'pro_profile') {
      router.push('/mypage');
    }
    if (key === 'pro_logout') {
      await removeCookie('Token', { path: '/' });
      await dispatch(logOut());
    }
  };
  const menu = (
    <Menu onClick={({ key }) => onSelect({ key })}>
      <StyledMenuItem key="pro_profile">
        <ProfileWrapper>
          <img src={me?.profileImageUrl} alt="" />
          <div>{me?.userName}</div>
        </ProfileWrapper>
      </StyledMenuItem>
      <Menu.Divider />
      <StyledMenuItem key="pro_mypage">마이페이지</StyledMenuItem>
      <Menu.Divider />
      <StyledMenuItem key="pro_logout">로그아웃</StyledMenuItem>
    </Menu>
  );
  return (
    <>
      <DropdownWrapper overlay={menu} placement="bottomRight" arrow={false}>
        <a
          className="ant-dropdown-link"
          onClick={(e) => e.preventDefault()}
          style={{
            color: 'rgba(0, 0, 0, 0.85)',
            fontWeight: '600',
            fontSize: '1rem',
          }}
        >
          <img
            src={me?.profileImageUrl}
            style={{ width: '2.5rem', borderRadius: '100%', height: '2.5rem' }}
          />
          <DownOutlined />
        </a>
      </DropdownWrapper>
    </>
  );
};

export default ProfileDropdown;

const StyledMenuItem = styled(Menu.Item)`
  padding: 10px 20px;
  font-weight: 600;
  font-size: 0.9rem;
`;

const DropdownWrapper = styled(Dropdown)`
  margin-bottom: 5px;
  .anticon-down {
    display: none;
  }
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  div {
    margin-left: 10px;
    font-weight: 600;
    font-size: 1rem;
  }
  img {
    width: 3rem;
    height: 3rem;
    border-radius: 100%;
  }
`;
