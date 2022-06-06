import { IUser } from '@customTypes/user';
import { useAppSelector } from '@store/hook';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import LoginView from './LoginView';

export interface LoginProps {
  GoogleUrl: string;
  NaverUrl: string;
  KakaoUrl: string;
  me: IUser | null;
}

const LoginContainer = () => {
  const router = useRouter();
  const redirectUrl =
    process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://www.modumeta.com';
  const GoogleUrl = `${process.env.NEXT_PUBLIC_LOGIN_URL}/oauth2/authorization/google?redirect_uri=${redirectUrl}/oauth/redirect`;
  const NaverUrl = `${process.env.NEXT_PUBLIC_LOGIN_URL}/oauth2/authorization/naver?redirect_uri=${redirectUrl}/oauth/redirect`;
  const KakaoUrl = `${process.env.NEXT_PUBLIC_LOGIN_URL}/oauth2/authorization/kakao?redirect_uri=${redirectUrl}/oauth/redirect`;
  const me = useAppSelector((state) => state.userSlice.me);
  const LoginContainerProps: LoginProps = {
    GoogleUrl,
    NaverUrl,
    KakaoUrl,
    me,
  };
  useEffect(() => {
    if (me) router.push('/');
  }, [me]);

  return (
    <>
      <LoginView {...LoginContainerProps} />
    </>
  );
};

export default LoginContainer;
