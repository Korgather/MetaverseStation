import Modal from '@components/common/Modal';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import React, { SetStateAction } from 'react';
import styled, { css } from 'styled-components';
interface ILoginModalViewProps {
  setStartCondition: React.Dispatch<SetStateAction<boolean>>;
  startCondition: boolean;
}
const LoginModalView = ({ setStartCondition, startCondition }: ILoginModalViewProps) => {
  const router = useRouter();
  const redirectUrl =
    process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://www.modumeta.com';
  const GoogleUrl = `${process.env.NEXT_PUBLIC_LOGIN_URL}/oauth2/authorization/google?redirect_uri=${redirectUrl}/oauth/redirect?aspath=${router.asPath}`;
  const NaverUrl = `${process.env.NEXT_PUBLIC_LOGIN_URL}/oauth2/authorization/naver?redirect_uri=${redirectUrl}/oauth/redirect?aspath=${router.asPath}`;
  const KakaoUrl = `${process.env.NEXT_PUBLIC_LOGIN_URL}/oauth2/authorization/kakao?redirect_uri=${redirectUrl}/oauth/redirect?aspath=${router.asPath}`;
  const onGuestLogin = () => {
    const iframe = document.querySelector('iframe');
    (iframe as HTMLIFrameElement).contentWindow?.postMessage(
      {
        type: 'guest',
        zepMessage: true,
      },
      '*',
    );
    setStartCondition(() => true);
  };
  return (
    <>
      <Modal modalState={!startCondition}>
        <StyledA href={KakaoUrl}>
          <StyledButton>
            <Styledimg src="../../images/KakaoIcon.png" />
            <StyledP>카카오 로그인하기</StyledP>
          </StyledButton>
        </StyledA>
        <StyledA href={NaverUrl}>
          <StyledButton>
            <Styledimg src="../../images/NaverIcon.png" />
            <StyledP>네이버 로그인하기</StyledP>
          </StyledButton>
        </StyledA>

        <StyledA href={GoogleUrl}>
          <StyledButton>
            <Styledimg src="../../images/Googleicon.png" />
            <StyledP>구글로 로그인하기</StyledP>
          </StyledButton>
        </StyledA>
        <StyledButton type="primary" onClick={onGuestLogin}>
          비회원으로 시작하기
        </StyledButton>
      </Modal>
    </>
  );
};

export default LoginModalView;

export const StyledA = styled.a`
  width: 100%;
  text-align: center;
  + a {
    margin-top: 15px;
  }
`;

export const StyledButton = styled(Button)`
  height: 55px;
  border-radius: 5px;
  width: 100%;
  ${(props) =>
    props.type === 'primary' &&
    css`
      margin-top: 20px;
      height: 55px;
      font-size: 0.93rem;
    `}
`;

export const Styledimg = styled.img`
  margin-right: 20px;
  margin-top: 2px;
`;

export const StyledP = styled.p`
  display: inline-block;
  font-size: 0.93rem;
  font-weight: 600;
`;
