import React from 'react';
import shortid from 'shortid';
import styled from 'styled-components';
import BannerFrame from './BannerFrame';

interface itemsProps {
  item: string;
  name: string;
  link?: string;
}

const items: itemsProps[] = [
  {
    item: '/images/bannerTest.gif',
    name: '이미지01',
    link: 'https://cafe.naver.com/gathertown',
  },
  {
    item: '/images/bannerTest.gif',
    name: '이미지02',
    link: 'https://cafe.naver.com/gathertown',
  },
  {
    item: '/images/bannerTest.gif',
    name: '이미지03',
    link: 'https://cafe.naver.com/gathertown',
  },
];

function BannerItem() {
  return (
    <BannerFrame>
      {items.map((item) => (
        <SliderItem key={shortid.generate()}>
          <a href={item.link} target="_blank" rel="noreferrer">
            <img src={item.item} alt={item.name} />
          </a>
        </SliderItem>
      ))}
    </BannerFrame>
  );
}

export default BannerItem;
const SliderItem = styled.div`
  img {
    width: 1440px;
    @media screen and (max-width: 1650px) {
      width: 75vw;
    }
    @media screen and (max-width: 850px) {
      width: 100vw;
      height: 130px;
    }
  }
`;
