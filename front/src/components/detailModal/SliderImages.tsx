import { useAppSelector } from '@store/hook';
import React from 'react';
import shortid from 'shortid';
import SliderFrame from './SliderFrame';
import * as S from './style';

const SliderImages = () => {
  const postData = useAppSelector((state) => state.postSlice.postDetail);

  return (
    <SliderFrame>
      {postData?.imageList &&
        postData?.imageList.map((item) => (
          <S.StyledImages key={shortid.generate()}>
            <img src={process.env.NEXT_PUBLIC_IMG_URL + item.imagePath} alt="" />

            <S.StyledA href={postData?.link} target="_blank">
              <S.EntnerButton type="primary" htmlType="button">
                <div>입장하기</div>
              </S.EntnerButton>
            </S.StyledA>
          </S.StyledImages>
        ))}
    </SliderFrame>
  );
};

export default SliderImages;
