import { useMedia } from '@lib/useMedia';
import React from 'react';
import shortid from 'shortid';
import { media } from '@styles/theme';
import styled, { css } from 'styled-components';
import BannerFrame from './BannerFrame';
import Image from 'next/image';

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
    mobile: '/images/MobileBanner01.png',
    desktop: '/images/Banner01.png',
    name: '이미지01',
    link: 'https://cafe.naver.com/gathertown',
  },
  {
    mobile: '/images/MobileBanner02.png',
    desktop: '/images/Banner02.png',
    name: '이미지02',
  },
  {
    mobile: '/images/MobileBanner03.png',
    desktop: '/images/Banner03.png',
    name: '이미지03',
  },
];

function BannerView({ replacements }: BannerViewProps) {
  const { isMobile, isPc, isTablet } = useMedia();

  const replacementsContainer = (replacements: string[]) => (
    <Wrapper>
      {replacements.map((replacement) => (
        <SliderItem key={shortid.generate()}>
          <Image
            src={replacement}
            alt="마피아게임이미지"
            layout="responsive"
            width={1440}
            height={isPc ? 1440 / 4.91 : 1440 / 2.7}
            quality={20}
          />
        </SliderItem>
      ))}
      <ImageWrapper>
        <a href="https://open.kakao.com/o/gQ9wNOhe" target="_blank" rel="noreferrer">
          <StlyedImage src="/images/KakaoIcon2.png" alt="카카오톡아이콘" type="kakao" />
        </a>
        <a
          href="https://discord.com/channels/960814143588401152/978267159446831164"
          target="_blank"
          rel="noreferrer"
        >
          <StlyedImage src="/images/DiscordIcon.png" alt="디스코드아이콘" type="discord" />
        </a>
      </ImageWrapper>
    </Wrapper>
  );

  const generalContainer = (items: itemsProps[]) =>
    (isPc || isMobile || isTablet) &&
    items.map((item) => (
      <SliderItem key={shortid.generate()}>
        {item.link ? (
          <a href={item.link} target="_blank" rel="noreferrer" style={{ display: 'block' }}>
            <Image
              src={isPc ? item.desktop : item.mobile}
              alt={item.name}
              layout="responsive"
              width={1440}
              height={isPc ? 1440 / 4.91 : 1440 / 2.7}
              quality={20}
            />
          </a>
        ) : (
          <Image
            src={isPc ? item.desktop : item.mobile}
            alt={item.name}
            layout="responsive"
            width={1440}
            height={isPc ? 1440 / 4.91 : 1440 / 2.7}
            quality={20}
          />
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
      width: 80vw;
    }
    ${media.mobile} {
      width: 100vw;
    }
  }
`;

const ImageWrapper = styled.div`
  position: absolute;
  z-index: 999;
  bottom: 10px;
  right: 20px;
  display: flex;
  align-items: center;
  flex-direction: row;
  a {
    + a {
      margin-left: 15px;
    }
  }
`;

const StlyedImage = styled.img<{ type: string }>`
  ${(props) =>
    props.type === 'kakao' &&
    css`
      width: 40px;
      height: 40px;
    `}
  ${(props) =>
    props.type === 'discord' &&
    css`
      width: 46px;
      height: 46px;
    `}
  
  cursor: pointer;
`;

const Wrapper = styled.div`
  position: relative;
`;
