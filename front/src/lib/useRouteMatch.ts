import { useRouter } from 'next/router';

export const useRouteMatch = () => {
  const router = useRouter();
  const homeMatch = router.pathname === '/';
  const communityMatch = router.pathname.indexOf('/community') > -1;
  const apifactoryMatch = router.pathname.indexOf('/apifactory') > -1;
  const gameMatch = router.pathname.indexOf('/game') > -1;
  return { homeMatch, communityMatch, apifactoryMatch, gameMatch };
};
