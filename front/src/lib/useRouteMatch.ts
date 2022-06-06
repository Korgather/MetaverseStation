import { useRouter } from 'next/router';

export const useRouteMatch = () => {
  const router = useRouter();
  const homeMatch = router.pathname === '/';
  const communityMatch = router.pathname.includes('community');
  const apifactoryMatch = router.pathname.includes('apifactory');
  const gameMatch = router.pathname.includes('game');
  const omokMatch = router.pathname.includes('omok');
  const zepMatch = router.pathname.includes('zepmapia');
  return { homeMatch, communityMatch, apifactoryMatch, gameMatch, omokMatch, zepMatch };
};
