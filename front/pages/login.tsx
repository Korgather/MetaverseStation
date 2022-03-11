import { Button } from 'antd';
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@store/hook';
import { logIn } from '@actions/user';
import Router from 'next/router';
import { generateDummyPost } from '@lib/generateDummyDate';

type Props = {};

const login = (props: Props) => {
  const dispatch = useAppDispatch();
  const logInLoading = useAppSelector((state) => state.userSlice.logInLoading);
  const KakaoLoginRequest = async () => {
    try {
      await dispatch(logIn());
      Router.push('/');
    } catch (e) {
      console.error(e);
      alert('로그인실패');
    }
  };
  const NaverLoginRequest = () => {};
  const GoogleLoginRequest = () => {};

  return (
    <LoginWrapper>
      <LoginContainer>
        <LoginHeader>
          <Link href="/">
            <TitleM>메버스</TitleM>
          </Link>
          <TitleP>로그인</TitleP>
        </LoginHeader>
        <StyledButton htmlType="button" onClick={KakaoLoginRequest} loading={logInLoading}>
          <Styledimg src="/images/KakaoIcon.png" />
          <StyledP>카카오 로그인하기</StyledP>
        </StyledButton>
        <StyledButton htmlType="button" onClick={NaverLoginRequest} loading={logInLoading}>
          <Styledimg src="/images/NaverIcon.png" />
          <StyledP>네이버 로그인하기</StyledP>
        </StyledButton>
        <StyledButton htmlType="button" onClick={GoogleLoginRequest} loading={logInLoading}>
          <Styledimg src="/images/GoogleIcon.png" />
          <StyledP>구글로 로그인하기</StyledP>
        </StyledButton>
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

const StyledButton = styled(Button)`
  height: 6.5vh;
  border-radius: 5px;
  + button {
    margin-top: 15px;
  }
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
