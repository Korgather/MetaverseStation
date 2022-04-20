import { useAppSelector } from '@store/hook';
import React from 'react';
import shortid from 'shortid';
import SliderFrame from './SliderFrame';
import { Button, Image } from 'antd';
import styled from 'styled-components';
import Link from 'next/link';

const SliderImages = () => {
  const postDetail = useAppSelector((state) => state.communitySlice.comPostDetail);
  const me = useAppSelector((state) => state.userSlice.me);
  return (
    <SliderFrame>
      {postDetail?.imageList &&
        postDetail?.imageList.map((item) => (
          <StyledImages key={shortid.generate()}>
            <Image
              key={item.imagePath}
              src={process.env.NEXT_PUBLIC_IMG_URL + item.imagePath}
              alt=""
              style={{ display: 'block' }}
            />
            {me ? (
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
            )}
          </StyledImages>
        ))}
    </SliderFrame>
  );
};

export default SliderImages;

export const StyledA = styled.a`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 900;
`;

export const EntnerButton = styled(Button)`
  border-radius: 5px;
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
