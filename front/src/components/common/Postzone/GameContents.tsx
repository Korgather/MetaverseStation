import React from 'react';
import CurrentUser from './CurrentUser';
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
          <a href={image.url}>
            <S.ImgWrapper imageHeight={imageHeight}>
              <S.PostImg
                src={image.src}
                width="100%"
                height="50px"
                layout="responsive"
                objectFit="cover"
                alt="게임채널이미지"
                quality={10}
              />
            </S.ImgWrapper>
            <CurrentUser image={image} />
          </a>
        </S.StyledCol>
      ))}
    </>
  );
};

export default GameContents;
