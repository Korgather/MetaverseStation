import { useMediaQuery } from 'react-responsive';

export function useMedia() {
  const isMobile = useMediaQuery({ query: '(max-width: 850px)' });
  const isPc = useMediaQuery({ query: '(min-width:1024px)' });
  const isTablet = useMediaQuery({ query: '(min-width:768px) and (max-width:1023px)' });
  return { isMobile, isPc, isTablet };
}
