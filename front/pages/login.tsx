import { Button } from "antd";
import React, { useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@store/hook";
import Router from "next/router";

type Props = {};
const redirectUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://metaverse-station-hzetmxtep-eungwang1.vercel.app";
console.log(redirectUrl);

const GoogleUrl = `http://metastation-env.eba-jip4zmfh.ap-northeast-2.elasticbeanstalk.com/oauth2/authorization/google?redirect_uri=${redirectUrl}/oauth/redirect`;

const NaverUrl = `http://metastation-env.eba-jip4zmfh.ap-northeast-2.elasticbeanstalk.com/oauth2/authorization/naver?redirect_uri=${redirectUrl}/oauth/redirect`;

const KakaoUrl = `http://metastation-env.eba-jip4zmfh.ap-northeast-2.elasticbeanstalk.com/oauth2/authorization/kakao?redirect_uri=${redirectUrl}/oauth/redirect`;

const login = (props: Props) => {
  const dispatch = useAppDispatch();
  const me = useAppSelector((state) => state.userSlice.me);

  useEffect(() => {
    if (me) Router.push("/");
  }, [me]);

  const KakaoLoginRequest = async () => {};
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
        {!me ? (
          <>
            <StyledA href={KakaoUrl}>
              <StyledButton>
                <Styledimg src="/images/KakaoIcon.png" />
                <StyledP>카카오 로그인하기</StyledP>
              </StyledButton>
            </StyledA>
            <StyledA href={NaverUrl}>
              <StyledButton>
                <Styledimg src="/images/NaverIcon.png" />
                <StyledP>네이버 로그인하기</StyledP>
              </StyledButton>
            </StyledA>

            <StyledA href={GoogleUrl}>
              <StyledButton>
                <Styledimg src="/images/GoogleIcon.png" />
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
