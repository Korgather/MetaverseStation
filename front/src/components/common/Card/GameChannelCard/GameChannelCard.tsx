import Image from 'next/image';
import React from 'react';
import styled, { css } from 'styled-components';
import CurrentUser from '../../Postzone/CurrentUser';
import { GameImages } from '../../Postzone/PostZoneContainer';
interface GameContentsProps {
  image: GameImages;
  imageHeight: string;
}
const GameChannelCard: React.FC<GameContentsProps> = ({ image, imageHeight }) => {
  return (
    <GameChannelCardContainer imageHeight={imageHeight}>
      <a href={image.url}>
        <div className="game-channel-card-img-wrapper">
          <StyledImage
            src={image.src}
            width="16px"
            height="9px"
            layout="responsive"
            objectFit="cover"
            alt="게임채널이미지"
            quality={10}
          />
        </div>
        <CurrentUser image={image} />
      </a>
    </GameChannelCardContainer>
  );
};

interface imageHeight {
  imageHeight?: string;
}

export default GameChannelCard;
const GameChannelCardContainer = styled.div<imageHeight>`
  .game-channel-card-img-wrapper {
    width: 340px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    margin: 0 auto;
    margin-bottom: 10px;
    @media screen and (max-width: 1700px) {
      width: 19vw;
    }
    @media screen and (max-width: 1200px) {
      width: 22vw;
    }
    @media screen and (max-width: 992px) {
      width: 32vw;
    }
    @media screen and (max-width: 768px) {
      width: 70vw;
    }
    ${(props) =>
      !props.imageHeight &&
      css`
        height: 15.625rem;
        @media screen and (max-width: 1700px) {
          height: calc(19vw * 0.8);
          max-height: 19vw;
          width: 19vw;
        }
        @media screen and (max-width: 1200px) {
          height: calc(22vw * 0.8);
          max-height: 22vw;
          width: 22vw;
        }
        @media screen and (max-width: 992px) {
          height: calc(32vw * 0.8);
          max-height: 32vw;
          width: 32vw;
        }
        @media screen and (max-width: 768px) {
          height: calc(70vw * 0.8);
          max-height: 70vw;
          width: 70vw;
        }
      `};
  }
`;

const StyledImage = styled(Image)`
  border-radius: 10px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  :hover {
    transform: scale(1.1);
  }
`;
