import { useMedia } from '@lib/useMedia';
import React from 'react';
import shortid from 'shortid';
import { media } from '@styles/theme';
import styled from 'styled-components';
import BannerFrame from './BannerFrame';

interface itemsProps {
  mobile: string;
  desktop: string;
  name: string;
  link?: string;
}

const items: itemsProps[] = [
  {
    mobile: '../../images/MobileBanner01.gif',
    desktop: '../../images/Banner01.gif',
    name: '이미지01',
    link: 'https://cafe.naver.com/gathertown',
  },
  {
    mobile: '../../images/MobileBanner02.png',
    desktop: '../../images/Banner02.png',
    name: '이미지02',
  },
  {
    mobile: '../../images/MobileBanner03.png',
    desktop: '../../images/Banner03.png',
    name: '이미지03',
  },
];

function BannerItem() {
  const { isMobile } = useMedia();
  return (
    <BannerFrame>
      {items.map((item) => (
        <SliderItem key={shortid.generate()}>
          {item.link ? (
            <a href={item.link} target="_blank" rel="noreferrer">
              <img src={isMobile ? item.mobile : item.desktop} alt={item.name} />
            </a>
          ) : (
            <img src={isMobile ? item.mobile : item.desktop} alt={item.name} />
          )}
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
    ${media.mobile} {
      width: 100vw;
    }
  }
`;
