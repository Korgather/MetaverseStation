import { useAppSelector } from '@store/hook';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import NavView from './NavView';
import { useRouteMatch } from '@lib/useRouteMatch';
const Nav = () => {
  const router = useRouter();
  const me = useAppSelector((state) => state.userSlice.me);
  const [selectedKeys, setSelectedKeys] = useState(['']);
  const [selectedGameKeys, setSelectedGameKeys] = useState(['']);
  const { homeMatch, communityMatch, apifactoryMatch, gameMatch, omokMatch, zepMatch } =
    useRouteMatch();
  const onSelect = ({ key }: { key: string }) => {
    if (key === 'mapia') {
      router.push('/game/zepmapia');
    }
    if (key === 'omok') {
      router.push('/game/omok');
    }
  };

  useEffect(() => {
    if (homeMatch) {
      setSelectedKeys(['nav_gathertown']);
    }
    if (communityMatch) {
      setSelectedKeys(() => ['nav_community']);
    }
    if (apifactoryMatch) {
      setSelectedKeys(() => ['nav_api']);
    }
    if (gameMatch) {
      setSelectedKeys(() => ['nav_game']);
    }
    if (omokMatch) {
      setSelectedGameKeys(() => ['omok']);
    }
    if (zepMatch) {
      setSelectedGameKeys(() => ['mapia']);
    }
  }, []);

  const NavContainerProps = {
    selectedKeys,
    selectedGameKeys,
    me,
    onSelect,
    goHome: () => router.push('/'),
  };

  return <NavView {...NavContainerProps} />;
};

export default Nav;
