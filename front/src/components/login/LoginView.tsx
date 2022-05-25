import React from 'react';
import Link from 'next/link';
import { LoginProps } from './LoginContainer';
import * as S from './style';

const LoginView = ({ GoogleUrl, NaverUrl, KakaoUrl, me }: LoginProps) => {
  return (
    <S.LoginWrapper>
      <S.LoginContainer>
        <S.LoginHeader>
          <Link href="/">
            <S.TitleM>모두메타</S.TitleM>
          </Link>
          <S.TitleP>로그인</S.TitleP>
        </S.LoginHeader>
        {!me ? (
          <>
            <S.StyledA href={KakaoUrl}>
              <S.StyledButton>
                <S.Styledimg src="../../images/KakaoIcon.png" />
                <S.StyledP>카카오 로그인하기</S.StyledP>
              </S.StyledButton>
            </S.StyledA>
            <S.StyledA href={NaverUrl}>
              <S.StyledButton>
                <S.Styledimg src="../../images/NaverIcon.png" />
                <S.StyledP>네이버 로그인하기</S.StyledP>
              </S.StyledButton>
            </S.StyledA>

            <S.StyledA href={GoogleUrl}>
              <S.StyledButton>
                <S.Styledimg src="../../images/Googleicon.png" />
                <S.StyledP>구글로 로그인하기</S.StyledP>
              </S.StyledButton>
            </S.StyledA>
          </>
        ) : (
          <>이미로그인중</>
        )}
      </S.LoginContainer>
    </S.LoginWrapper>
  );
};

export default LoginView;
