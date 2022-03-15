import { IPost } from '@customTypes/post';
import React from 'react';
import styled from 'styled-components';
import SliderFrame from './SliderFrame';
import * as S from './style';
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
interface SliderImagesProps {
  postData: IPost;
}

const SliderImages: React.FunctionComponent<SliderImagesProps> = ({ postData }) => {
  console.log(postData);
  return (
    <SliderFrame>
      {postData.Images &&
        postData.Images.map((item, index) => (
          <S.StyledImages key={index}>
            <img src={item.src} alt="" />
          </S.StyledImages>
        ))}
    </SliderFrame>
  );
};

export default SliderImages;
