interface CookieConsent {
  status: 'accepted' | 'declined' | null;
  expiryDate: string | null;
}

const CONSENT_KEY = 'cookie_consent';
const CONSENT_DURATION_MONTHS = 12;

export const getCookieConsent = (): CookieConsent => {
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      return { status: null, expiryDate: null };
    }

    const consent: CookieConsent = JSON.parse(stored);

    if (consent.expiryDate && new Date(consent.expiryDate) < new Date()) {
      localStorage.removeItem(CONSENT_KEY);
      return { status: null, expiryDate: null };
    }

    return consent;
  } catch (error) {
    console.error('Error reading cookie consent:', error);
    return { status: null, expiryDate: null };
  }
};

export const setCookieConsent = (status: 'accepted' | 'declined'): void => {
  const expiryDate = new Date();
  expiryDate.setMonth(expiryDate.getMonth() + CONSENT_DURATION_MONTHS);

  const consent: CookieConsent = {
    status,
    expiryDate: expiryDate.toISOString(),
  };

  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  } catch (error) {
    console.error('Error saving cookie consent:', error);
  }
};

export const checkConsentExpiry = (): boolean => {
  const consent = getCookieConsent();
  return consent.status !== null;
};

export const blockNonEssentialCookies = (): void => {
  try {
    if (typeof window !== 'undefined') {
      if ((window as any).ym) {
        (window as any)['yaCounter' + 'Disabled'] = true;
      }

      localStorage.setItem('analytics_disabled', 'true');

      const cookiesToBlock = ['_ym_', '_ga', '_gid', '_fbp'];
      cookiesToBlock.forEach(cookieName => {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      });
    }
  } catch (error) {
    console.error('Error blocking non-essential cookies:', error);
  }
};

export const allowAllCookies = (): void => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('analytics_disabled');

      if ((window as any).ym) {
        (window as any)['yaCounter' + 'Disabled'] = false;
      }
    }
  } catch (error) {
    console.error('Error allowing cookies:', error);
  }
};
