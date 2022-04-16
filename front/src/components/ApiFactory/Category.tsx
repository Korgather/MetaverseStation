import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styled, { css } from 'styled-components';

const Category = () => {
  const router = useRouter();

  return (
    <CategoryContainer>
      <Link href="/apifactory/gathertownAPI">
        <Menu isactive={(router.pathname?.indexOf('gathertownAPI') > -1) as boolean}>게더타운</Menu>
      </Link>
      <Link href="/apifactory/zepAPI">
        <Menu isactive={(router.pathname.indexOf('zepAPI') > -1) as boolean}>젭</Menu>
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
  margin: 0 auto;
  width: 100%;
  margin-top: 95px;
  @media screen and (max-width: 850px) {
    flex-direction: column;
  }
`;

const Menu = styled.div<isacitve>`
  font-weight: 600;
  font-size: 1.1rem;
  padding: 5px 15px;
  border-radius: 7px;
  width: 100%;
  cursor: pointer;
  transition: all 0.2s ease-in;
  @media screen and (max-width: 1080px) {
    font-size: 0.9rem;
  }
  @media screen and (max-width: 850px) {
    width: 100px;
  }
  + div {
    margin-top: 10px;
  }
  transition: all 0.1s ease-in;
  :hover {
    color: #c6daf7;
  }
  ${(props) =>
    props.isactive &&
    css`
      /* background-color: #448ef7; */
      color: #448ef7;
      :hover {
        color: #448ef7;
      }
    `}
`;
