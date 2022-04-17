import { Button } from 'antd';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useAppSelector } from '@store/hook';
import Router from 'next/router';
import wrapper from '@store/configureStore';
import axios from 'axios';
import cookies from 'next-cookies';
import { logOut, saveAccessToken } from '@slices/userSlice';
import { loadMyInfo } from '@actions/user';

const redirectUrl =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://www.modumeta.com';

const GoogleUrl = `${process.env.NEXT_PUBLIC_LOGIN_URL}/oauth2/authorization/google?redirect_uri=${redirectUrl}/oauth/redirect`;

const NaverUrl = `${process.env.NEXT_PUBLIC_LOGIN_URL}/oauth2/authorization/naver?redirect_uri=${redirectUrl}/oauth/redirect`;

const KakaoUrl = `${process.env.NEXT_PUBLIC_LOGIN_URL}/oauth2/authorization/kakao?redirect_uri=${redirectUrl}/oauth/redirect`;

const login = () => {
  const me = useAppSelector((state) => state.userSlice.me);

  useEffect(() => {
    if (me) Router.push('/');
  }, [me]);

  return (
    <LoginWrapper>
      <LoginContainer>
        <LoginHeader>
          <Link href="/">
            <TitleM>모두메타 - 모두의 메타버스</TitleM>
          </Link>
          <TitleP>로그인</TitleP>
        </LoginHeader>
        {!me ? (
          <>
            <StyledA href={KakaoUrl}>
              <StyledButton>
                <Styledimg src="../../images/KakaoIcon.png" />
                <StyledP>카카오 로그인하기</StyledP>
              </StyledButton>
            </StyledA>
            {/* <StyledA href={NaverUrl}>
              <StyledButton>
                <Styledimg src="../../images/NaverIcon.png" />
                <StyledP>네이버 로그인하기</StyledP>
              </StyledButton>
            </StyledA> */}

            <StyledA href={GoogleUrl}>
              <StyledButton>
                <Styledimg src="../../images/Googleicon.png" />
                <StyledP>구글로 로그인하기</StyledP>
              </StyledButton>
            </StyledA>
          </>
        ) : (
          <>이미로그인중</>
        )}
      </LoginContainer>
    </LoginWrapper>
  );
};

export default login;

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 3px solid #f2f2f2;
  width: 30vw;
  height: 50vh;
  min-width: 380px;
  min-height: 395px;
`;
const StyledA = styled.a`
  width: 100%;
  text-align: center;
  + a {
    margin-top: 15px;
  }
`;

const StyledButton = styled(Button)`
  height: 6.5vh;
  border-radius: 5px;
  width: 60%;
  min-height: 55px;
`;

const Styledimg = styled.img`
  margin-right: 20px;
  margin-top: 2px;
`;

const LoginHeader = styled.div`
  cursor: pointer;
`;

const StyledP = styled.p`
  display: inline-block;
  font-size: 0.93rem;
  font-weight: 600;
`;

const TitleM = styled.p`
  font-size: 2rem;
  font-weight: 800;
  color: #428bca;
  display: inline-block;
`;

const TitleP = styled.p`
  font-size: 1.3rem;
  font-weight: 600;
  display: inline-block;
`;

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  store.dispatch(logOut());
  axios.defaults.headers.common['Authorization'] = '';
  const token = cookies(ctx).Token;
  if (ctx.req && token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    store.dispatch(saveAccessToken(token));
    await store.dispatch(loadMyInfo());
  }
  return { props: {} };
});
