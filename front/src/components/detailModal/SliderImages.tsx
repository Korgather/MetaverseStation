import { IPost } from '@customTypes/post';
import React from 'react';
import shortid from 'shortid';
import SliderFrame from './SliderFrame';
import * as S from './style';

interface SliderImagesProps {
  postData: IPost;
}

const SliderImages: React.FunctionComponent<SliderImagesProps> = ({ postData }) => {
  console.log(postData);
  return (
    <SliderFrame>
      {postData.Images &&
        postData.Images.map((item) => (
          <S.StyledImages key={shortid.generate()}>
            <img src={item.src} alt="" />
          </S.StyledImages>
        ))}
    </SliderFrame>
  );
};

export default SliderImages;
