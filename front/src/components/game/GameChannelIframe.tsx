import AppLayout from '@components/AppLayout/AppLayout';
import BannerView from '@components/common/Banner/BannerView';
import Postzone from '@components/common/Postzone/PostZoneContainer';
import { media } from '@styles/theme';
import { Layout } from 'antd';

import React from 'react';
import styled from 'styled-components';
import GameView from './GameView';

interface GameChannelIframe {
  replacements: string[];
  mapiaChannelImages: {
    src: string;
    url: string;
    count: number;
  }[];
}

const GameChannelIframe = ({ replacements, mapiaChannelImages }: GameView) => {
  return (
    <LayoutWrapper>
      <StyledLayout>
        <BannerView replacements={replacements} />
        <PostZoneWrapper>
          <Postzone Images={mapiaChannelImages} imageHeight="10rem" />
        </PostZoneWrapper>
        <BottomWrapper></BottomWrapper>
      </StyledLayout>
    </LayoutWrapper>
  );
};

export default GameChannelIframe;

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

const LayoutWrapper = styled.div`
  word-break: break-all;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto', sans-serif;
  .ant-layout-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .site-layout-content {
    display: flex;
    flex-direction: column;

    align-items: center;
  }
`;

const StyledLayout = styled(Layout)`
  align-items: center;
  width: 1440px;
  background: white;
  height: 100% !important;
  @media screen and (max-width: 1650px) {
    width: 75vw;
  }
  ${media.mobile} {
    width: 100vw;
  }
`;
