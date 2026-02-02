import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useYandexMetrica } from '../hooks/useYandexMetrica';

export const RouteTracker = () => {
  const location = useLocation();
  const { trackPageView } = useYandexMetrica();

  useEffect(() => {
    trackPageView(window.location.href);
  }, [location, trackPageView]);

  return null;
};
