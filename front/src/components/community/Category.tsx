import React from 'react';
import styled from 'styled-components';

const Category = () => {
  return (
    <CategoryContainer>
      <Menu>{`질문 & 답변`}</Menu>
      <Menu>자유주제</Menu>
      <Menu>스터디 모집</Menu>
    </CategoryContainer>
  );
};

export default Category;

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 50px;
  margin-top: 95px;
`;

const Menu = styled.div`
  font-weight: 600;
  font-size: 1.1rem;
  + div {
    margin-top: 20px;
  }
`;
