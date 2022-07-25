import React from 'react';
import GameChannelCard from '../Card/GameChannelCard/GameChannelCard';
import GameChannelCardSkeleton from '../Card/GameChannelCard/GameChannelCardSkeleton';
import { GameImages } from './PostZoneContainer';
import * as S from './style';

interface GameContentsProps {
  Images: GameImages[];
  imageHeight: string;
}
const GameContents = ({ Images, imageHeight }: GameContentsProps) => {
  return (
    <>
      {Images.map((image) => (
        <S.StyledCol key={image.src} xs={24} md={12} lg={8} xl={6} style={{}}>
          {typeof image.count !== 'undefined' ? (
            <GameChannelCard image={image} imageHeight={imageHeight} />
          ) : (
            <GameChannelCardSkeleton image={image} imageHeight={imageHeight} />
          )}
        </S.StyledCol>
      ))}
    </>
  );
};

export default GameContents;
