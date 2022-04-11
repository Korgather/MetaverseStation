import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styled, { css } from 'styled-components';

const Category = () => {
  const router = useRouter();

  return (
    <CategoryContainer>
      <Link href="/community/free">
        <Menu isactive={(router.pathname?.indexOf('free') > -1) as boolean}>자유주제</Menu>
      </Link>
      <Link href="/community/question">
        <Menu isactive={(router.pathname.indexOf('question') > -1) as boolean}>
          {`질문 & 답변`}
        </Menu>
      </Link>
      <Link href="/community/study">
        <Menu isactive={(router.pathname?.indexOf('study') > -1) as boolean}>스터디 모집</Menu>
      </Link>
    </CategoryContainer>
  );
};

export default Category;

interface isacitve {
  isactive: boolean;
}

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 50px;
  margin-top: 85px;
`;

const Menu = styled.div<isacitve>`
  font-weight: 600;
  font-size: 1.1rem;
  padding: 5px 15px;
  border-radius: 7px;
  width: 125px;
  cursor: pointer;
  transition: all 0.2s ease-in;
  @media screen and (max-width: 1080px) {
    font-size: 0.9rem;
  }
  + div {
    margin-top: 10px;
  }
  transition: all 0.1s ease-in;
  :hover {
    background-color: #c6daf7;
    color: white;
  }
  ${(props) =>
    props.isactive &&
    css`
      background-color: #448ef7;
      color: white;
      :hover {
        background-color: #448ef7;
      }
    `}
`;
