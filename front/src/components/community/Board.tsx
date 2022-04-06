import React from 'react';
import styled from 'styled-components';
import BoardList from './BoardList';
import Category from './Category';
import CommunitySearch from './CommunitySearch';

const Board = () => {
  return (
    <Layout>
      <CategoryWrapper>
        <Category />
      </CategoryWrapper>
      <BoardWrapper>
        <CommunitySearch />
        <BoardList />
      </BoardWrapper>
      <BlankBox />
    </Layout>
  );
};

export default Board;
const BoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 8;
`;
const CategoryWrapper = styled.div`
  flex: 2;
`;

const BlankBox = styled.div`
  flex: 2;
`;

const Layout = styled.div`
  color: #575757;
  max-width: 1200px;
  width: 80vw;
  height: 100vh;
  margin: 50px auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
