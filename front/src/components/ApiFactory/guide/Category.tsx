import React from 'react';
import { Link } from 'react-scroll';
import styled from 'styled-components';
const Category = () => {
  return (
    <CategoryLayout>
      <p>{`<목차>`}</p>
      <p>
        <Link to="config" spy={true} smooth={true}>
          1. Config값(API키, 맵ID, 룸ID) 얻는 방법
        </Link>
      </p>
      <p>
        <Link to="exportmap" spy={true} smooth={true}>
          2. 맵파일 추출하기
        </Link>
      </p>
      <p>
        <Link to="importmap" spy={true} smooth={true}>
          3. 맵파일 적용하기
        </Link>
      </p>
      <p>
        <Link to="importbgm" spy={true} smooth={true}>
          4. 배경음악 넣기
        </Link>
      </p>
      <p>
        <Link to="loadbgm" spy={true} smooth={true}>
          5. 배경음악 정보 로드한 후, 정보 바꾸기
        </Link>
      </p>
      <p>
        <Link to="ref" spy={true} smooth={true}>
          ※ 참조 : 게더타운에서 유효한 배경음악 Url만드는 방법
        </Link>
      </p>
    </CategoryLayout>
  );
};

export default Category;

const CategoryLayout = styled.div`
  font-size: 0.8rem;
`;
