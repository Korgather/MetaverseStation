import { ToggleCommunityWriteModalState } from '@slices/communitySlice';
import { useAppDispatch, useAppSelector } from '@store/hook';
import { Button, Tooltip } from 'antd';
import React from 'react';
import styled from 'styled-components';
import BoardList from './BoardList';
import Category from './Category';
import CommunitySearch from './CommunitySearch';

const Board = () => {
  const dispatch = useAppDispatch();
  const openModal = () => dispatch(ToggleCommunityWriteModalState(true));
  const me = useAppSelector((state) => state.userSlice.me);

  return (
    <Layout>
      <CategoryWrapper>
        <Category />
      </CategoryWrapper>
      <BoardWrapper>
        <TopWrapper>
          <CommunitySearch />
          {me ? (
            <StyledButton type="primary" htmlType="button" onClick={openModal}>
              글쓰기
            </StyledButton>
          ) : (
            <Tooltip placement="topLeft" title="로그인이 필요합니다">
              <StyledButton type="primary">글쓰기</StyledButton>
            </Tooltip>
          )}
        </TopWrapper>
        <BoardList />
      </BoardWrapper>
      <BlankBox />
    </Layout>
  );
};

export default Board;

const StyledButton = styled(Button)`
  margin-top: auto;
  margin-left: 30px;
  @media screen and (max-width: 850px) {
    margin: 15px 0 0 auto;
    width: 100px;
  }
`;
const TopWrapper = styled.div`
  display: flex;
  @media screen and (max-width: 850px) {
    flex-direction: column;
  }
`;
const BoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
`;
const CategoryWrapper = styled.div`
  width: 15%;
  display: flex;
  @media screen and (max-width: 850px) {
    width: 80%;

    margin-bottom: auto;
    margin-top: -70px;
    margin-bottom: 30px;
  }
`;

const BlankBox = styled.div`
  width: 10%;
  @media screen and (max-width: 850px) {
    display: none;
  }
`;

const Layout = styled.div`
  color: #575757;
  max-width: 1200px;
  width: 80vw;
  height: 100%;
  margin: 50px auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  @media screen and (max-width: 850px) {
    width: 100vw;
    flex-direction: column;
    align-items: center;
    margin: 0;
  }
`;
