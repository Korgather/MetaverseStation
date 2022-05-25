import AppLayout from '@components/AppLayout/AppLayout';
import BannerView from '@components/common/Banner/BannerView';
import Postzone from '@components/common/Postzone/PostZoneContainer';
import { media } from '@styles/theme';
import React from 'react';
import styled from 'styled-components';

interface GameView {
  replacements: string[];
  mapiaChannelImages: {
    src: string;
    url: string;
    count: number;
  }[];
}

const GameView = ({ replacements, mapiaChannelImages }: GameView) => {
  return (
    <>
      <AppLayout>
        <>
          <BannerView replacements={replacements} />
          <PostZoneWrapper>
            <Postzone Images={mapiaChannelImages} imageHeight="10rem" />
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
