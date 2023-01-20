import AppLayout from '@components/AppLayout/AppLayout';
import BannerView from '@components/common/Banner/BannerView';
import GameCard from '@components/game/GameCard';
import { media } from '@styles/theme';
import React from 'react';
import styled from 'styled-components';
import palette from 'styles/palette';

export interface GameCardOption {
  url: string;
  title: string;
  author: string;
  img: string;
}

const GamePage: React.FC = () => {
  const gameCardOptions: GameCardOption[] = [
    {
      url: 'https://zep.us/play/yBZAkk',
      title: '오목 게임',
      author: 'modumeta',
      img: '/images/omokgame_thumnail.png',
    },
    {
      url: 'https://zep.us/play/yaPodR',
      title: '마피아 게임',
      author: 'modumeta',
      img: '/images/mapiagame_thumnail.png',
    },
  ];
  return (
    <AppLayout>
      <BannerView />
      <GamePageContainer>
        <h2>ZEP</h2>
        <div className="game-page-contents">
          <ul className="game-page-contents-wrapper">
            {gameCardOptions.map((option, index) => (
              <GameCard key={option.url} option={option} />
            ))}
          </ul>
          <div className="blur" />
        </div>
      </GamePageContainer>
    </AppLayout>
  );
};

export default GamePage;

const GamePageContainer = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;

  width: 100%;
  .game-page-contents {
    position: relative;
  }
  .game-page-contents-wrapper {
    width: 1440px;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    ::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera*/
    }
    @media screen and (max-width: 1650px) {
      width: 75vw;
    }
    ${media.mobile} {
      width: 100vw;
    }
    padding: 0;
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    gap: 15px;
  }
  h2 {
    font-family: Menlo, Monaco;
    font-weight: 800;
  }
  .game-page-contents-wrapper {
    display: flex;
  }
  .game-page-card-wrapper {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    width: 245px;
    border-radius: 10px;
    border: 1px solid ${palette.gray_200};
  }
  .game-page-card-image-wrapper {
    height: 130px;
    img {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
  }
  .game-page-card-info-wrapper {
    width: 100%;
    padding: 10px 10px;
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
  .game-page-card-profile-image-wrapper {
    width: 25px;
    height: 25px;
  }
  .game-page-card-info {
    display: flex;
    flex-direction: column;
  }
  .game-page-card-info-title {
    font-size: 1rem;
    font-weight: bold;
  }
  .game-page-card-info-author {
    color: ${palette.gray_500};
  }
  .game-page-card-play-button-wrapper {
    transition: all 0.2s ease-out;
    height: 0;
    text-align: center;
    button {
      margin: 10px 0;
      width: 90% !important;
      border-radius: 10px;
      transition: all 0.1s ease-out !important;
      height: 0;
      opacity: 0;
      border-width: 0;
      padding: 0;
      width: 100%;
    }
  }
  .game-page-card-wrapper:hover {
    .game-page-card-play-button-wrapper {
      display: block;
      height: 50px;
      /* padding: 15px; */
      button {
        height: 30px;
        border-width: 1px;
        opacity: 1;
      }
    }
  }
  .blur {
    background-color: white;
    position: absolute;
    width: 30px;
    right: -10px;
    top: 0;
    bottom: 0;
    filter: blur(18px);
  }
`;
