import { GameCardOption } from '@pages/game';
import { Button } from 'antd';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

const GameCardBlock = styled.div``;

type GameCardProps = {
  option: GameCardOption;
};

const GameCard: React.FC<GameCardProps> = ({ option }) => {
  return (
    <GameCardBlock>
      <li className="game-page-card-wrapper">
        <div className="game-page-card-image-wrapper">
          <Image src={option.img} width={245} height={130} layout="responsive" alt="zepLogo" />
        </div>
        <div className="game-page-card-info-wrapper">
          <div className="game-page-card-profile-image-wrapper">
            <Image
              src="/images/zepLogo.png"
              width={25}
              height={25}
              layout="responsive"
              alt="zepLogo"
            />
          </div>
          <div className="game-page-card-info">
            <span className="game-page-card-info-title">{option.title}</span>
            <span className="game-page-card-info-author">{option.author}</span>
          </div>
        </div>
        <div className="game-page-card-play-button-wrapper">
          <a href={option.url} target="_blank" rel="noreferrer">
            <Button type="primary">게임 플레이</Button>
          </a>
        </div>
      </li>
    </GameCardBlock>
  );
};

export default GameCard;
