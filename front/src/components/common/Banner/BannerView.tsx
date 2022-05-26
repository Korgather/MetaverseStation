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

interface BannerViewProps {
  replacements?: string[];
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

function BannerView({ replacements }: BannerViewProps) {
  const { isMobile } = useMedia();

  const replacementsContainer = (replacements: string[]) =>
    replacements.map((replacement) => (
      <SliderItem key={shortid.generate()}>
        {!isMobile ? (
          <img src={replacement} alt="마피아게임이미지" />
        ) : (
          <img src={replacement} alt="마피아게임이미지" height={200} />
        )}
      </SliderItem>
    ));

  const generalContainer = (items: itemsProps[]) =>
    items.map((item) => (
      <SliderItem key={shortid.generate()}>
        {item.link ? (
          <a href={item.link} target="_blank" rel="noreferrer">
            <img src={!isMobile ? item.desktop : item.mobile} alt={item.name} />
          </a>
        ) : (
          <img src={!isMobile ? item.desktop : item.mobile} alt={item.name} />
        )}
      </SliderItem>
    ));

  return (
    <BannerFrame>
      {replacements ? replacementsContainer(replacements) : items && generalContainer(items)}
    </BannerFrame>
  );
}

export default BannerView;
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
