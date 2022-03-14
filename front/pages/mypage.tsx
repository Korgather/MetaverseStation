import AppLayout from '@components/AppLayout';
import MyPost from '@components/mypage/MyPost';
import Profile from '@components/mypage/Profile';
import ProfileEditModal from '@components/profileEditModal/ProfileEditModal';
import { useAppSelector } from '@store/hook';
import { Layout } from 'antd';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

type Props = {};

const mypage = (props: Props) => {
  const myPosts = useAppSelector((state) => state.userSlice.me?.myPosts);
  const me = useAppSelector((state) => state.userSlice.me);
  const [editModalState, setEditModalState] = useState(false);
  useEffect(() => {
    if (!me) Router.push('/');
  }, []);

  return (
    <>
      {editModalState && <ProfileEditModal me={me} setEditModalState={setEditModalState} />}
      <AppLayout>
        <>
          {me && (
            <StyledLayout>
              <Profile me={me} setEditModalState={setEditModalState} />
              <MyPost myPosts={myPosts} />
            </StyledLayout>
          )}
        </>
      </AppLayout>
    </>
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
