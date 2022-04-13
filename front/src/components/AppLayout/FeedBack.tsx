import { addFeedBack } from '@actions/post';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@store/hook';
import { Button, Tooltip } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const FeedBack = () => {
  const [modalState, setModalState] = useState(false);
  const [feedBack, setFeedBack] = useState('');
  const addFeedBackLoading = useAppSelector((state) => state.postSlice.addFeedBackLoading);
  const me = useAppSelector((state) => state.userSlice.me);
  const dispatch = useAppDispatch();
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedBack(e.target.value);
  };
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const submitdata = { content: feedBack };
    await dispatch(addFeedBack(submitdata));
    setModalState(false);
  };

  return (
    <>
      {!modalState ? (
        <ImgWrapper onClick={() => setModalState(true)}>
          {/* <FeedBackIcon src="../../images/Logo01.png" alt="" /> */}
          <QuestionCircleOutlined />
          <StyledP>피드백</StyledP>
        </ImgWrapper>
      ) : (
        <ContentWrapper>
          <RelativeWrapper onSubmit={onSubmit}>
            <CloseBtn onClick={() => setModalState(false)}>x</CloseBtn>
            <Title>모두의 메타버스에 만족하셨나요?</Title>
            <Content>더 좋은 서비스를 위해, 평가를 남겨주세요!</Content>
            <LogoImg src="../../images/ModuMetaLogo3.png" alt="" />
            <SubmitInput placeholder="피드백을 남겨주세요:D" value={feedBack} onChange={onChange} />
            {me ? (
              <StyledButton type="primary" htmlType="submit" loading={addFeedBackLoading}>
                제출하기
              </StyledButton>
            ) : (
              <Tooltip placement="topLeft" title="로그인이 필요합니다">
                <StyledButton type="primary">제출하기</StyledButton>
              </Tooltip>
            )}
          </RelativeWrapper>
        </ContentWrapper>
      )}
    </>
  );
};

export default FeedBack;

const CloseBtn = styled.div`
  position: absolute;
  right: 15px;
  top: 0;
  font-size: 1.5rem;
  cursor: pointer;
`;

const RelativeWrapper = styled.form`
  position: relative;
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.h2`
  font-weight: 700;
`;
const Content = styled.p`
  font-weight: 600;
  font-size: 1rem;
`;
const LogoImg = styled.img`
  width: 300px;
  margin: 20px 0;
  @media screen and (max-width: 850px) {
    width: 250px;
  }
`;
const SubmitInput = styled(TextArea)`
  min-height: 80px !important;
  max-width: 350px !important;
  border-radius: 15px;
  resize: none;
`;

const StyledButton = styled(Button)`
  margin-top: 20px;
`;

const ContentWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  width: 500px;
  height: 350px;

  background-color: white;
  border: 2px solid #4490f8;
  border-radius: 10px;
  @media screen and (max-width: 850px) {
    width: 320px;
    text-align: center;
    font-size: 0.8rem;
  }
`;

const ImgWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #e9f6fe;
  border-radius: 30px;
  text-align: center;
  vertical-align: middle;
  position: fixed;
  width: 150px;
  height: 50px;
  bottom: 20px;
  left: 20px;
  padding: 10px;
  border: 1px solid #4490f8;
  cursor: pointer;
  svg {
    color: #4490f8;
    width: 1.2rem;
    height: 1.2rem;
  }
`;

const StyledP = styled.p`
  margin-left: 10px;
  font-weight: 700;
  font-size: 1.1rem;
  margin-top: auto;
  color: #4490f8;
`;
