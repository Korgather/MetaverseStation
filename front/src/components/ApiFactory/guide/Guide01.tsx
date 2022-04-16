import Script from 'next/script';
import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-scroll';
import Content from './Content';
import Category from './Category';
const Guide01 = () => {
  return (
    <GuideLayOut>
      <CategoryBox>
        <Category />
      </CategoryBox>
      <ContentBox>
        <Content />
      </ContentBox>
      <BlankBox />
    </GuideLayOut>
  );
};

export default Guide01;

const GuideLayOut = styled.div`
  width: 70vw;
  max-width: 900px;
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 850px) {
    width: 80vw;
  }
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  flex: 10;
  @media screen and (max-width: 850px) {
    flex: 10;
  }
`;
const CategoryBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 225px;
  flex: 2;
  margin-right: 50px;
  @media screen and (max-width: 850px) {
    display: none;
  }
`;

const BlankBox = styled.div`
  flex: 2;
  @media screen and (max-width: 850px) {
    display: none;
  }
`;
