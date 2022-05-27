import { useAppSelector } from '@store/hook';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAnimation, useViewportScroll } from 'framer-motion';
import NavView from './NavView';
import { useRouteMatch } from '@lib/useRouteMatch';
const Nav = () => {
  const router = useRouter();
  const me = useAppSelector((state) => state.userSlice.me);
  const [selectedKeys, setSelectedKeys] = useState(['']);
  const [fixedpos, setFixedPos] = useState('false');
  const { scrollY } = useViewportScroll();
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
  useEffect(() => {
    const bodyHeight = document.body.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollHeight = bodyHeight * 1 - windowHeight * 1;
    if (scrollHeight > 120) {
      scrollY.onChange(() => {
        if (scrollY.get() > 70) {
          setFixedPos('true');
          navAnimation.start('scroll');
        } else {
          setFixedPos('false');
          navAnimation.start('top');
        }
      });
    }
  }, [scrollY, navAnimation]);
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
    goHome: () => router.push('/'),
  };

  return <NavView {...NavContainerProps} />;
};

export default Nav;
