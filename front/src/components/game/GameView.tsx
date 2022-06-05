import AppLayout from '@components/AppLayout/AppLayout';
import BannerView from '@components/common/Banner/BannerView';
import Postzone from '@components/common/Postzone/PostZoneContainer';
import { media } from '@styles/theme';
import Link from 'next/link';
import React from 'react';
import styled, { css } from 'styled-components';
import { IChannelImages } from './GameContainer';

interface GameView {
  bannerImage: string[];
  isMatch: {
    mapia: boolean;
    omok: boolean;
  };
  channelImages: IChannelImages;
}

const GameView = ({ bannerImage, channelImages, isMatch }: GameView) => {
  return (
    <>
      <AppLayout>
        <>
          <CategoryWrapper>
            <Link href="/game/zepmapia">
              <Category selected={isMatch.mapia}>마피아</Category>
            </Link>
            <Link href="/game/omok">
              <Category selected={isMatch.omok}>오목</Category>
            </Link>
          </CategoryWrapper>
          <BannerView replacements={bannerImage} />
          <PostZoneWrapper>
            <Postzone
              Images={isMatch.mapia ? channelImages.mapia : channelImages.omok}
              imageHeight="10rem"
            />
          </PostZoneWrapper>
          <BottomWrapper></BottomWrapper>
        </>
      </AppLayout>
    </>
  );
};

export default GameView;

const BottomWrapper = styled.div`
  position: relative;
  ${media.mobile} {
    display: flex;
    flex-direction: column;
  }
`;

const PostZoneWrapper = styled.div`
  margin-top: 50px;
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: auto;
  margin-bottom: 10px;
  /* margin-left: 30px; */
`;

interface ICategory {
  selected: boolean;
}
const Category = styled.div<ICategory>`
  + div {
    margin-left: 10px;
  }
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  padding: 10px;
  :hover {
    color: #6890ff;
  }
  ${(props) =>
    props.selected &&
    css`
      background-color: #e6f7ff;
      color: #6890ff;
    `}
`;
