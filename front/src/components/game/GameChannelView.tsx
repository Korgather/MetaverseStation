import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import GameView from './GameView';
import CurrentUser from '@components/common/Postzone/CurrentUser';
import { IChannelImages } from './GameContainer';
import { useRouter } from 'next/router';

interface GameChannel {
  bannerImage: string[];
  channelImages: IChannelImages;
  isMatch: {
    mapia: boolean;
    omok: boolean;
  };
}

const GameChannel = ({ channelImages, isMatch }: GameView) => {
  const router = useRouter();
  const onChangeChannel = (url: string) => {
    router.push(url);
  };
  return (
    <Wrapper>
      {(isMatch.mapia ? channelImages.mapia : channelImages.omok).map((image) => (
        <div
          style={{ position: 'relative', cursor: 'pointer' }}
          key={image.src}
          onClick={() => onChangeChannel(image.url)}
        >
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
