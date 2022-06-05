import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import GameView from './GameView';
import CurrentUser from '@components/common/Postzone/CurrentUser';
import Link from 'next/link';
import { IChannelImages } from './GameContainer';

interface GameChannel {
  bannerImage: string[];
  channelImages: IChannelImages;
  isMatch: {
    mapia: boolean;
    omok: boolean;
  };
}

const GameChannel = ({ channelImages, isMatch }: GameView) => {
  return (
    <Wrapper>
      {(isMatch.mapia ? channelImages.mapia : channelImages.omok).map((image) => (
        <Link href={image.url} key={image.src}>
          <div style={{ position: 'relative', cursor: 'pointer' }}>
            <Image
              src={image.src}
              width="100%"
              height="50px"
              layout="responsive"
              objectFit="cover"
              alt="게임채널이미지"
              quality={10}
            />
            <CurrentUser image={image} />
          </div>
        </Link>
      ))}
    </Wrapper>
  );
};

export default GameChannel;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;
