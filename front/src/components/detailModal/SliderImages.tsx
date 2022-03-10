import React from 'react';
import styled from 'styled-components';
import SliderFrame from './SliderFrame';

interface itemsProps {
  image: string;
  name: string;
}

const images: itemsProps[] = [
  {
    image: '/images/thumbnail01.png',
    name: '이미지01',
  },
  {
    image: '/images/thumbnail02.png',
    name: '이미지02',
  },
  {
    image: '/images/thumbnail03.png',
    name: '이미지03',
  },
];

const SliderImages = () => {
  return (
    <SliderFrame>
      {images.map((item, index) => (
        <StyledImages key={index}>
          <img src={item.image} alt={item.name} />
        </StyledImages>
      ))}
    </SliderFrame>
  );
};

export default SliderImages;

const StyledImages = styled.div`
  img {
    width: 100%;
    height: 256px;
    object-fit: cover;
  }
`;
