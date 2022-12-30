import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '@store/hook';
import { getMapiaUserCount } from '@actions/game';
import GameView from './GameView';
import { useMedia } from '@lib/useMedia';
import { useRouter } from 'next/router';
import GameChannel from './GameChannelView';
interface IChannelOptions {
  src: string;
  url: string;
  count: number;
}

export interface IChannelImages {
  omok: IChannelOptions[];
  mapia: IChannelOptions[];
}
const GameContainer = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isChannel =
    router.pathname === '/game/zepmapia/[id]' || router.pathname === '/game/omok/[id]';
  const [isMatch, setIsMatch] = useState({
    mapia: false,
    omok: false,
  });
  const [channelImages, setChannelImages] = useState<IChannelImages>({
    mapia: [],
    omok: [],
  });
  const [urlHashId, setUrlHashId] = useState<string[]>([]);
  const mapiaHashId = [
    'yV9AA9',
    'y1nXbO',
    'y1nXbO',
    '24P3dM',
    'y03pLk',
    '25gN3Q',
    '25gN3Q',
    '25gN3Q',
  ];
  const omokHashId = [
    '2RdjJG',
    'yW90xn',
    'DwPrge',
    '2Xwk0J',
    'yPJzYV',
    '8M1l47',
    '2exEWL',
    '87nvLb',
  ];

  const [userCount, setUserCount] = useState<number[]>([]);
  const { isPc, isMobile, isTablet } = useMedia();
  const [bannerImage, setBannerImage] = useState<string[]>([]);

  useEffect(() => {
    if (router.pathname.includes('mapia')) {
      setIsMatch((prev) => ({ ...prev, mapia: true }));
      setUrlHashId(() => mapiaHashId);
      setBannerImage(() => [
        (isPc || isMobile || isTablet) && isPc
          ? '/images/mapiachannel/pcBanner.png'
          : '/images/mapiachannel/mobileBanner.png',
      ]);
    }

    if (router.pathname.includes('omok')) {
      setIsMatch((prev) => ({ ...prev, omok: true }));
      setUrlHashId(() => omokHashId);
      setBannerImage(() => [
        (isPc || isMobile || isTablet) && isPc
          ? '/images/omokchannel/pcBanner.png'
          : '/images/omokchannel/mobileBanner.png',
      ]);
    }
  }, []);

  useEffect(() => {
    if (isMatch.mapia) {
      setBannerImage(() => [
        (isPc || isMobile || isTablet) && isPc
          ? '/images/mapiachannel/pcBanner.png'
          : '/images/mapiachannel/mobileBanner.png',
      ]);
    }

    if (isMatch.omok) {
      setBannerImage(() => [
        (isPc || isMobile || isTablet) && isPc
          ? '/images/omokchannel/pcBanner.png'
          : '/images/omokchannel/mobileBanner.png',
      ]);
    }
  }, [isPc, isMobile]);

  useEffect(() => {
    if (urlHashId.length === 8) {
      (async () => {
        // const result = await Promise.all([
        //   await dispatch(getMapiaUserCount(urlHashId[0])),
        //   await dispatch(getMapiaUserCount(urlHashId[1])),
        //   await dispatch(getMapiaUserCount(urlHashId[2])),
        //   await dispatch(getMapiaUserCount(urlHashId[3])),
        //   await dispatch(getMapiaUserCount(urlHashId[4])),
        //   await dispatch(getMapiaUserCount(urlHashId[5])),
        //   await dispatch(getMapiaUserCount(urlHashId[6])),
        //   await dispatch(getMapiaUserCount(urlHashId[7])),
        // ]);
        // setUserCount((el) => {
        //   const data = result.map((el) => el.payload);
        //   return data;
        // });
      })();
    }
  }, [urlHashId]);

  useEffect(() => {
    if (router.pathname.includes('mapia')) {
      setIsMatch((prev) => ({ ...prev, mapia: true }));
      // setChannelImages((prev) => {
      //   const ImagesArray = Array.from({ length: 8 }, (v, k) => ({
      //     src: `/images/mapiachannel/00${k + 1}.png`,
      //     url: `/game/zepmapia/${urlHashId[k]}`,
      //     count: userCount[k],
      //   }));
      //   return { ...prev, mapia: ImagesArray };
      // });
    }

    if (router.pathname.includes('omok')) {
      setIsMatch((prev) => ({ ...prev, omok: true }));
      setChannelImages((prev) => {
        const ImagesArray = Array.from({ length: 8 }, (v, k) => ({
          src: `/images/omokchannel/00${k + 1}.png`,
          url: `/game/omok/${urlHashId[k]}`,
          count: userCount[k],
        }));
        return { ...prev, omok: ImagesArray };
      });
    }
  }, [userCount]);

  const GameContainerProps = {
    bannerImage,
    channelImages,
    isMatch,
  };

  return (
    <>
      {isChannel ? <GameChannel {...GameContainerProps} /> : <GameView {...GameContainerProps} />}
    </>
  );
};

export default GameContainer;
