import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useYandexMetrica } from '../hooks/useYandexMetrica';

export const RouteTracker = () => {
  const location = useLocation();
  const { trackPageView } = useYandexMetrica();
  const isFirstLoad = useRef(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      trackPageView(window.location.href);
    }, isFirstLoad.current ? 100 : 0);

    isFirstLoad.current = false;

    return () => clearTimeout(timeout);
  }, [location, trackPageView]);

  return null;
};
