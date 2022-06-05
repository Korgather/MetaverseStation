import { useAppSelector } from '@store/hook';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { useAnimation } from 'framer-motion';
import NavView from './NavView';
import { useRouteMatch } from '@lib/useRouteMatch';
import { throttle } from 'lodash';
const Nav = () => {
  const router = useRouter();
  const me = useAppSelector((state) => state.userSlice.me);
  const [selectedKeys, setSelectedKeys] = useState(['']);
  const [fixedpos, setFixedPos] = useState('false');
  const [isTabnavOn, setIsTabnavOn] = useState(false);
  const navAnimation = useAnimation();
  const { homeMatch, communityMatch, apifactoryMatch, gameMatch } = useRouteMatch();
  const navVariants = {
    top: {
      boxShadow: 'rgba(0, 0, 0, 0) 0px 5px 15px',
    },
    scroll: {
      boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
    },
  };
  const throttledScroll = useMemo(
    () =>
      throttle(() => {
        if (window.scrollY > 50 && !isTabnavOn) {
          setFixedPos('true');
          navAnimation.start('scroll');
          setIsTabnavOn(() => true);
          return;
        } else if (window.scrollY <= 50 && isTabnavOn) {
          setFixedPos('false');
          navAnimation.start('top');
          setIsTabnavOn(() => false);
          return;
        }
      }, 100),
    [isTabnavOn],
  );
  const onSelect = ({ key }: { key: string }) => {
    if (key === 'mapia') {
      router.push('/game/zepmapia');
    }
    if (key === 'omok') {
      router.push('/game/omok');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', throttledScroll);
    window.addEventListener('touchmove', throttledScroll);
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('touchmove', throttledScroll);
    };
  }, [throttledScroll]);

  useEffect(() => {
    if (homeMatch) {
      setSelectedKeys(['nav_gathertown']);
    }
    if (communityMatch) {
      setSelectedKeys(['nav_community']);
    }
    if (apifactoryMatch) {
      setSelectedKeys(['nav_api']);
    }
    if (gameMatch) {
      setSelectedKeys(['nav_game']);
    }
  }, []);

  const NavContainerProps = {
    fixedpos,
    navVariants,
    navAnimation,
    selectedKeys,
    me,
    onSelect,
    goHome: () => router.push('/'),
  };

  return <NavView {...NavContainerProps} />;
};

export default Nav;
