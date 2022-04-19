import { useAppSelector } from '@store/hook';
import React, { useMemo } from 'react';
import Slider, { Settings } from 'react-slick';
import styled from 'styled-components';
import * as S from './style';

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
const NextArrow = styled.div`
  position: absolute;
  right: 0;
  top: 0px;
  z-index: 200;
  cursor: pointer;
`;
const PrevArrow = styled.div`
  position: sticky;
  left: 0;
  top: 0px;
  z-index: 200;
  cursor: pointer;
`;

const ArrowImg = styled.img``;

function Arrow(props: any) {
  const { type, onClick } = props;
  const char = '★';
  if (type === 'next') {
    return (
      <NextArrow onClick={onClick} style={{ position: 'absolute' }}>
        <ArrowImg src="../../images/nextarrow.png" />
      </NextArrow>
    );
  }
  if (type === 'prev') {
    return (
      <PrevArrow onClick={onClick} style={{ position: 'absolute' }}>
        <ArrowImg src="../../images/prevarrow.png" />
      </PrevArrow>
    );
  }
  return <div></div>;
}

const SliderFrame = ({ loop = true, speed = 400, children }: sliderProps) => {
  const settings = useMemo<Settings>(
    () => ({
      infinite: loop,
      speed: speed,
      slidesToShow: 1,
      slidesToScroll: 1,
      // nextArrow: <Arrow type="next" />,
      // prevArrow: <Arrow type="prev" />,
      // customPaging: (i) => {
      //   return (
      //     <div>
      //       {i} / {imageList?.length}
      //     </div>
      //   );
      // },
      // fade: true,
      // dots: true,
    }),
    [loop, speed],
  );

  return (
    <S.SlideWrapper>
      <Slider {...settings}>{children}</Slider>
    </S.SlideWrapper>
  );
};

export default SliderFrame;
