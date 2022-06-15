import React, { useMemo } from 'react';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import { media } from '@styles/theme';
import { useMedia } from '@lib/useMedia';

interface sliderProps {
  /** 슬라이더 아이템 요소 */
  children?: React.ReactNode;
  /** 커스텀 클래스 */
  className?: string;
  /** 자동재생 (속도 설정시 number 타입으로) */
  autoplay?: boolean | number;
  /** 슬라이더 속도 */
  speed?: number;
  /** 반복 여부 */
  loop?: boolean;
  arrows?: boolean;
}
const BannerFrame = ({
  children,
  autoplay = true,
  speed = 1000,
  loop = true,
  arrows = true,
}: sliderProps) => {
  const { isMobile } = useMedia();
  const settings = useMemo<Settings>(
    () => ({
      // dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      autoplay: true,
      autoplaySpeed: typeof autoplay === 'boolean' ? 5000 : autoplay,
      loop: true,
      arrows: isMobile ? false : true,
    }),
    [autoplay, loop, speed, arrows, isMobile],
  );

  return (
    <SlideWrapper>
      <Slider {...settings}>{children}</Slider>
    </SlideWrapper>
  );
};

export default BannerFrame;

const SlideWrapper = styled.section`
  position: relative;
  width: 1440px;
  .slick-list {
    border-radius: 13px;
  }
  .slick-prev:before,
  .slick-next:before {
    color: black !important;
  }
  @media screen and (max-width: 1650px) {
    width: 80vw;
  }
  ${media.mobile} {
    width: 100vw;
    .slick-list {
      border-radius: 0px;
    }
  }
`;
