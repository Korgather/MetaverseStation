import { Button } from 'antd';
import React from 'react';
import styled from 'styled-components';
import GatherAPI from './GatherAPI';
import Category from './Category';
import { useRouter } from 'next/router';
import ZepAPI from './ZepAPI';

const APIBoard = () => {
  const router = useRouter();
  const category =
    router.pathname.indexOf('gathertownAPI') > -1
      ? 'gather'
      : router.pathname.indexOf('zepAPI') > -1 && 'zep';
  return (
    <Layout>
      <CategoryWrapper>
        <Category />
      </CategoryWrapper>
      <BoardWrapper>
        {category === 'gather' && <GatherAPI />}
        {category === 'zep' && <ZepAPI />}
      </BoardWrapper>
    </Layout>
  );
};

export default APIBoard;

const BoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;
const CategoryWrapper = styled.div`
  width: 20%;
  display: flex;
  @media screen and (max-width: 850px) {
    flex-direction: row;
    height: 100%;
    margin-bottom: auto;
    margin-top: -70px;
  }
`;

const Layout = styled.div`
  color: #575757;
  max-width: 700px;
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
