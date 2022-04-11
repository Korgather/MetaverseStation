import { ToggleCommunityWriteModalState } from '@slices/communitySlice';
import { useAppDispatch, useAppSelector } from '@store/hook';
import { Button } from 'antd';
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
          <StyledButton type="primary" htmlType="button" onClick={openModal} disabled={!me}>
            글쓰기
          </StyledButton>
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
`;
const TopWrapper = styled.div`
  display: flex;
`;
const BoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
`;
const CategoryWrapper = styled.div`
  width: 20%;
  display: flex;
`;

const BlankBox = styled.div`
  width: 10%;
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
`;
