import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import GameView from './GameView';
import CurrentUser from '@components/common/Postzone/CurrentUser';
import Link from 'next/link';

interface GameChannel {
  replacements: string[];
  mapiaChannelImages: {
    src: string;
    url: string;
    count: number;
  }[];
}

const GameChannel = ({ mapiaChannelImages }: GameView) => {
  return (
    <Wrapper>
      {mapiaChannelImages.map((image) => (
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
