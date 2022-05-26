import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '@store/hook';
import { getMapiaUserCount } from '@actions/game';
import GameView from './GameView';
import { useMedia } from '@lib/useMedia';

const GameContainer = () => {
  const dispatch = useAppDispatch();
  const urlHashId = [
    'yV9AA9',
    'y1nXbO',
    'y1nXbO',
    '24P3dM',
    'y03pLk',
    '25gN3Q',
    '25gN3Q',
    '25gN3Q',
  ];
  const [userCount, setUserCount] = useState<number[]>([]);
  const { isPc } = useMedia();
  const imageSrc = isPc
    ? 'https://cdn.metabusstation.shop/static/mafiaGameBanner.png'
    : '../../images/mapiachannel/mobileBanner.png';
  const replacements = [imageSrc];
  useEffect(() => {
    (async () => {
      const result = await Promise.all([
        dispatch(getMapiaUserCount(urlHashId[0])),
        dispatch(getMapiaUserCount(urlHashId[1])),
        dispatch(getMapiaUserCount(urlHashId[2])),
        dispatch(getMapiaUserCount(urlHashId[3])),
        dispatch(getMapiaUserCount(urlHashId[4])),
        dispatch(getMapiaUserCount(urlHashId[5])),
        dispatch(getMapiaUserCount(urlHashId[6])),
        dispatch(getMapiaUserCount(urlHashId[7])),
      ]);
      setUserCount((el) => {
        const data = result.map((el) => el.payload);
        return data;
      });
    })();
  }, []);
  const mapiaChannelImages = Array.from({ length: 8 }, (v, k) => ({
    src: `../../images/mapiachannel/00${k + 1}.png`,
    url: `https://zep.us/play/${urlHashId[k]}`,
    count: userCount[k],
  }));

  const GameContainerProps = {
    replacements,
    mapiaChannelImages,
  };

  return <GameView {...GameContainerProps} />;
};

export default GameContainer;
