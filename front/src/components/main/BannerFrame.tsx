import React, { useMemo } from 'react';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';

interface sliderProps {
  /** 슬라이더 아이템 요소 */
  children: React.ReactNode;
  /** 커스텀 클래스 */
  className?: string;
  /** 자동재생 (속도 설정시 number 타입으로) */
  autoplay?: boolean | number;
  /** 슬라이더 속도 */
  speed?: number;
  /** 반복 여부 */
  loop?: boolean;
}

const BannerFrame = ({ children, autoplay = true, speed = 1000, loop = true }: sliderProps) => {
  const settings = useMemo<Settings>(
    () => ({
      dots: true,
      infinite: loop,
      speed: speed,
      slidesToShow: 1,
      autoplay: Boolean(autoplay),
      autoplaySpeed: typeof autoplay === 'boolean' ? 5000 : autoplay,
    }),
    [autoplay, loop, speed],
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
    width: 75vw;
  }
  @media screen and (max-width: 850px) {
    width: 100vw;
    .slick-prev:before,
    .slick-next:before {
      display: none;
    }
    .slick-dots {
      display: none !important;
    }
    .slick-list {
      border-radius: 0px;
    }
  }
`;
