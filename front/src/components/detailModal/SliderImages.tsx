import { useAppSelector } from '@store/hook';
import React from 'react';
import shortid from 'shortid';
import SliderFrame from './SliderFrame';
import * as S from './style';
import { Image } from 'antd';
import Link from 'next/link';

const SliderImages = () => {
  const postData = useAppSelector((state) => state.postSlice.postDetail);
  const me = useAppSelector((state) => state.userSlice.me);

  return (
    <>
      <SliderFrame>
        {postData?.imageList &&
          postData?.imageList.map((item) => (
            <S.StyledImages key={shortid.generate()}>
              <Image
                src={process.env.NEXT_PUBLIC_IMG_URL + item.imagePath}
                alt=""
                style={{ display: 'block' }}
              />
            </S.StyledImages>
          ))}
      </SliderFrame>
      <S.StyledA href={postData?.link} target="_blank">
        <S.EntnerButton type="primary" htmlType="button">
          <div>입장하기</div>
        </S.EntnerButton>
      </S.StyledA>
      {/* {me ? (
        <S.StyledA href={postData?.link} target="_blank">
          <S.EntnerButton type="primary" htmlType="button">
            <div>입장하기</div>
          </S.EntnerButton>
        </S.StyledA>
      ) : (
        <Link href={'/login'}>
          <S.EntnerButton type="primary" htmlType="button">
            <div>입장하기</div>
          </S.EntnerButton>
        </Link>
      )} */}
    </>
  );
};

export default SliderImages;
