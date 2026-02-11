const YANDEX_METRICA_ID = 106585621;
const YANDEX_METRICA_ID_2 = 106605914;

const hasConsent = (): boolean => {
  try {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) return false;
    const consentData = JSON.parse(consent);
    return consentData.accepted === true;
  } catch {
    return false;
  }
};

export const useYandexMetrica = () => {
  const trackGoal = (goalName: string, params?: Record<string, any>) => {
    if (!hasConsent()) {
      console.log('[Yandex Metrica] Tracking blocked - no consent');
      return;
    }

    if (typeof window !== 'undefined' && window.ym) {
      try {
        if (params) {
          window.ym(YANDEX_METRICA_ID, 'reachGoal', goalName, params);
          window.ym(YANDEX_METRICA_ID_2, 'reachGoal', goalName, params);
        } else {
          window.ym(YANDEX_METRICA_ID, 'reachGoal', goalName);
          window.ym(YANDEX_METRICA_ID_2, 'reachGoal', goalName);
        }
        console.log(`[Yandex Metrica] Goal tracked in both counters: ${goalName}`, params || '');
      } catch (error) {
        console.error('[Yandex Metrica] Error tracking goal:', error);
      }
    }
  };

  const trackPageView = (url: string) => {
    if (!hasConsent()) {
      console.log('[Yandex Metrica] Tracking blocked - no consent');
      return;
    }

    if (typeof window !== 'undefined' && window.ym) {
      try {
        window.ym(YANDEX_METRICA_ID, 'hit', url);
        window.ym(YANDEX_METRICA_ID_2, 'hit', url);
        console.log(`[Yandex Metrica] Page view tracked in both counters: ${url}`);
      } catch (error) {
        console.error('[Yandex Metrica] Error tracking page view:', error);
      }
    } else {
      console.warn('[Yandex Metrica] Script not loaded yet');
    }
  };

  const setUserParams = (params: Record<string, any>) => {
    if (!hasConsent()) {
      console.log('[Yandex Metrica] Tracking blocked - no consent');
      return;
    }

    if (typeof window !== 'undefined' && window.ym) {
      try {
        window.ym(YANDEX_METRICA_ID, 'userParams', params);
        window.ym(YANDEX_METRICA_ID_2, 'userParams', params);
        console.log('[Yandex Metrica] User params set in both counters:', params);
      } catch (error) {
        console.error('[Yandex Metrica] Error setting user params:', error);
      }
    }
  };

  const notBounce = () => {
    if (!hasConsent()) {
      console.log('[Yandex Metrica] Tracking blocked - no consent');
      return;
    }

    if (typeof window !== 'undefined' && window.ym) {
      try {
        window.ym(YANDEX_METRICA_ID, 'notBounce');
        window.ym(YANDEX_METRICA_ID_2, 'notBounce');
        console.log('[Yandex Metrica] Not bounce called in both counters');
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
