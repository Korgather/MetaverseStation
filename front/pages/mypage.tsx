import AppLayout from '@components/AppLayout';
import MyPost from '@components/mypage/myPost';
import Profile from '@components/mypage/Profile';
import { useAppSelector } from '@store/hook';
import { Layout } from 'antd';
import React from 'react';
import styled from 'styled-components';

type Props = {};

const mypage = (props: Props) => {
  const myPosts = useAppSelector((state) => state.userSlice.me?.myPosts);
  return (
    <AppLayout>
      <StyledLayout>
        <Profile />
        <MyPost myPosts={myPosts} />
      </StyledLayout>
    </AppLayout>
  );
};

export default mypage;

const StyledLayout = styled(Layout)`
  align-items: center;
  width: 1440px;
  background: white;

  @media screen and (max-width: 1650px) {
    width: 75vw;
  }
`;
