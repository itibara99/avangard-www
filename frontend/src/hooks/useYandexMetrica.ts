const YANDEX_METRICA_ID = 106585621;

export const useYandexMetrica = () => {
  const trackGoal = (goalName: string, params?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.ym) {
      try {
        if (params) {
          window.ym(YANDEX_METRICA_ID, 'reachGoal', goalName, params);
        } else {
          window.ym(YANDEX_METRICA_ID, 'reachGoal', goalName);
        }
        console.log(`[Yandex Metrica] Goal tracked: ${goalName}`, params || '');
      } catch (error) {
        console.error('[Yandex Metrica] Error tracking goal:', error);
      }
    }
  };

  const trackPageView = (url: string) => {
    if (typeof window !== 'undefined' && window.ym) {
      try {
        window.ym(YANDEX_METRICA_ID, 'hit', url);
        console.log(`[Yandex Metrica] Page view tracked: ${url}`);
      } catch (error) {
        console.error('[Yandex Metrica] Error tracking page view:', error);
      }
    } else {
      console.warn('[Yandex Metrica] Script not loaded yet');
    }
  };

  const setUserParams = (params: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.ym) {
      try {
        window.ym(YANDEX_METRICA_ID, 'userParams', params);
        console.log('[Yandex Metrica] User params set:', params);
      } catch (error) {
        console.error('[Yandex Metrica] Error setting user params:', error);
      }
    }
  };

  const notBounce = () => {
    if (typeof window !== 'undefined' && window.ym) {
      try {
        window.ym(YANDEX_METRICA_ID, 'notBounce');
        console.log('[Yandex Metrica] Not bounce called');
      } catch (error) {
        console.error('[Yandex Metrica] Error calling notBounce:', error);
      }
    }
  };

  return {
    trackGoal,
    trackPageView,
    setUserParams,
    notBounce,
  };
};
