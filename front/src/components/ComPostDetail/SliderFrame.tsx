import { useAppSelector } from '@store/hook';
import React, { useMemo } from 'react';
import Slider, { Settings } from 'react-slick';
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

  customPaging?: (index: number) => JSX.Element;
}

const SliderFrame = ({ loop = true, speed = 400, children, customPaging }: sliderProps) => {
  const imageList = useAppSelector((state) => state.communitySlice.comPostDetail)?.imageList;

  const settings = useMemo<Settings>(
    () => ({
      infinite: loop,
      speed: speed,
      slidesToShow: 1,
      slidesToScroll: 1,
      // customPaging: (i) => {
      //   return (
      //     <StyledA>
      //       <StyledImg
      //         // src={'../../images/Logo01.png'}

      //         src={imageList && process.env.NEXT_PUBLIC_IMG_URL + imageList[i].imagePath}
      //         alt=""
      //       />
      //     </StyledA>
      //   );
      // },
      // fade: true,
      // dots: true,
    }),
    [loop, speed],
  );

  return (
    <SlideWrapper>
      <Slider {...settings}>{children}</Slider>
    </SlideWrapper>
  );
};

export default SliderFrame;

const StyledA = styled.a`
  display: block;
  width: 80px;
  height: 80px;
  img {
    width: 100%;
    height: 100%;
    display: inline-block;
  }
`;
const StyledImg = styled.img``;

const SlideWrapper = styled.section`
  margin-top: 10px;
  padding: 0;
  position: relative;
  width: 100%;
  .slick-dots li {
    width: 80px;
  }
  .slick-dots {
    bottom: -70px;
  }
  .slick-prev:before,
  .slick-next:before {
    color: black;
  }
  /* .slick-next {
    z-index: 900;
  }
  .slick-prev {
    z-index: 900;
  } */
`;
