import { changeNickName } from '@actions/user';
import { useAppDispatch, useAppSelector } from '@store/hook';
import { Button, Input } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { media } from '@styles/theme';
import styled from 'styled-components';

interface ISetNickname {
  token: string | string[] | undefined;
}

function SetNickname({ token }: ISetNickname) {
  const [secondStep, setSecondStep] = useState(false);
  const [nickname, setNickName] = useState('');
  const [inValid, setInValid] = useState(false);
  const changeNickNameLoading = useAppSelector((state) => state.userSlice.changeNickNameLoading);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const goback = () => setSecondStep(false);
  const goNext = async () => {
    const res = await dispatch(changeNickName(nickname));
    res.type === 'user/changeNickName/fulfilled' && setSecondStep(true);
  };
  const goMain = async () => {
    if (token && router.query.aspath?.includes('omok')) {
      const path = router.query.aspath;
      router.push(path as string);
      return;
    }
    router.push('/');
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
        <img src="../../images/ModuMetaLogo2.png" alt="" />
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
          <StyledButton
            type="primary"
            htmlType="button"
            onClick={goNext}
            loading={changeNickNameLoading}
          >
            다음
          </StyledButton>
        </Content>
      ) : (
        <Content>
          <Request>
            가입을 축하합니다 !
            <br />
            모두의 메타버스를 타고 출발할 준비가 되셨나요?
          </Request>
          <ButtonWrapper>
            <StyledButton type="default" htmlType="button" onClick={goback}>
              뒤로가기
            </StyledButton>
            <StyledButton type="primary" htmlType="button" onClick={goMain}>
              출발하기
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
  ${media.mobile} {
    min-width: 350px;
  }
`;

const Header = styled.div`
  background-color: #f3f3f3;
  width: 100%;
  flex: 1.2;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 5px 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 300px;
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
  ${media.mobile} {
    width: 50%;
  }
`;

const StyledButton = styled(Button)`
  margin-top: 30px;
  + button {
    margin-left: 20px;
  }
  ${media.mobile} {
    width: 30%;
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
