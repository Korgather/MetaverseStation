import { changeNickName } from '@actions/user';
import { useAppDispatch } from '@store/hook';
import { Button, Input } from 'antd';
import Router from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';

interface ISetNickname {
  token: string | string[] | undefined;
}

function SetNickname({ token }: ISetNickname) {
  const [secondStep, setSecondStep] = useState(false);
  const [nickname, setNickName] = useState('');
  const [inValid, setInValid] = useState(false);
  const dispatch = useAppDispatch();
  const goback = () => setSecondStep(false);
  const goNext = () => setSecondStep(true);
  const goMain = () => {
    dispatch(changeNickName(nickname));
    token && Router.push('/');
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setNickName(value);
    value.length <= 2 ? setInValid(true) : setInValid(false);
  };

  return (
    <Container>
      <Header>
        <h2>로고</h2>
      </Header>
      {!secondStep ? (
        <Content>
          <Request>
            모두의 메타버스에 오신것을 환영합니다.
            <br />
            닉네임을 설정해주세요 !
          </Request>
          <StyledInput onChange={onChange} value={nickname} />
          {inValid && <Error>닉네임은 두글자 이상 적어주세요 !</Error>}
          <StyledButton type="primary" htmlType="button" onClick={goNext}>
            다음
          </StyledButton>
        </Content>
      ) : (
        <Content>
          <Request>
            가입을 축하합니다 !
            <br />
            모두의 메타버스에서 메타버스를 탐험해보세요 !
          </Request>
          <Logo>로고</Logo>
          <ButtonWrapper>
            <StyledButton type="default" htmlType="button" onClick={goback}>
              뒤로가기
            </StyledButton>
            <StyledButton type="primary" htmlType="button" onClick={goMain}>
              시작하기
            </StyledButton>
          </ButtonWrapper>
        </Content>
      )}
    </Container>
  );
}

export default SetNickname;

const Container = styled.div`
  width: 35vw;
  height: 20vw;
  min-width: 550px;
  min-height: 350px;
  border-radius: 10px;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  background-color: #f3f3f3;
  width: 100%;
  flex: 1.2;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 5px 15px;
  h2 {
    font-weight: 600;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 8.8;
`;

const Request = styled.div`
  text-align: center;
  font-weight: 700;
  font-size: 1.3rem;
`;

const StyledInput = styled(Input)`
  width: 40%;
  margin-top: 30px;
`;

const StyledButton = styled(Button)`
  margin-top: 30px;
  width: 13%;
  + button {
    margin-left: 20px;
  }
`;

const Logo = styled.div`
  margin: 30px 0;
  font-size: 1.2rem;
  font-weight: 600;
`;

const Error = styled.div`
  color: red;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
`;
