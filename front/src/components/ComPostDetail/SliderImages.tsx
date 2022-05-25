import { useAppSelector } from '@store/hook';
import React from 'react';
import shortid from 'shortid';
import SliderFrame from './SliderFrame';
import { Button, Image } from 'antd';
import styled from 'styled-components';
import Link from 'next/link';
import { media } from '@styles/theme';

const SliderImages = () => {
  const postDetail = useAppSelector((state) => state.communitySlice.comPostDetail);
  const me = useAppSelector((state) => state.userSlice.me);
  return (
    <>
      <SliderFrame>
        {postDetail?.imageList &&
          postDetail?.imageList.map((item) => (
            <StyledImages key={shortid.generate()}>
              <StyledImage
                key={item.imagePath}
                src={process.env.NEXT_PUBLIC_IMG_URL + item.imagePath}
              />
            </StyledImages>
          ))}
      </SliderFrame>
      <StyledA href={postDetail?.link} target="_blank">
        <EntnerButton type="primary" htmlType="button">
          <div>입장하기</div>
        </EntnerButton>
      </StyledA>
      {/* {me ? (
        <StyledA href={postDetail?.link} target="_blank">
          <EntnerButton type="primary" htmlType="button">
            <div>입장하기</div>
          </EntnerButton>
        </StyledA>
      ) : (
        <Link href={'/login'}>
          <EntnerButton type="primary" htmlType="button">
            <div>입장하기</div>
          </EntnerButton>
        </Link>
      )} */}
    </>
  );
};

export default SliderImages;

const StyledImage = styled(Image)`
  display: block;
  height: 650px;
  object-fit: contain;
  ${media.mobile} {
    height: 300px;
  }
`;

export const StyledA = styled.a`
  display: flex;
  width: 100%;
`;

export const EntnerButton = styled(Button)`
  width: 100%;
  height: 40px;
  font-size: 1rem;
  font-weight: 600;
`;

export const StyledImages = styled.div`
  position: relative;
  img {
    width: 100%;
    object-fit: cover;
  }
  .ant-image {
    display: block !important;
  }
`;
