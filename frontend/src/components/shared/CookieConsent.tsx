import React, { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';
import {
  getCookieConsent,
  setCookieConsent,
  blockNonEssentialCookies,
  allowAllCookies,
} from '../../utils/cookieManager';

interface CookieConsentProps {
  theme?: 'avangard' | 'ceiling';
}

const CookieConsent: React.FC<CookieConsentProps> = ({ theme = 'avangard' }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = getCookieConsent();
    if (!consent.status) {
      setTimeout(() => setIsVisible(true), 500);
    }
  }, []);

  const handleAcceptAll = () => {
    setCookieConsent('accepted');
    allowAllCookies();
    setIsVisible(false);
  };

  const handleDeclineNonEssential = () => {
    setCookieConsent('declined');
    blockNonEssentialCookies();
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const themeStyles = {
    avangard: {
      bg: 'from-gray-800/95 to-gray-900/95',
      border: 'border-gray-700/50',
      primaryBtn: 'from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600',
      secondaryBtn: 'border-gray-600 hover:border-sky-500 hover:bg-sky-500/10',
      link: 'text-sky-400 hover:text-sky-300',
    },
    ceiling: {
      bg: 'from-gray-900/95 to-black/95',
      border: 'border-yellow-400/30',
      primaryBtn: 'from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-black',
      secondaryBtn: 'border-gray-600 hover:border-yellow-400 hover:bg-yellow-400/10',
      link: 'text-yellow-400 hover:text-yellow-300',
    },
  };

  const styles = themeStyles[theme];

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[9999] transition-transform duration-500 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className={`bg-gradient-to-r ${styles.bg} backdrop-blur-xl border-t ${styles.border} shadow-2xl`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            <div className="flex items-start space-x-4 flex-1">
              <div className="flex-shrink-0 mt-1">
                <Cookie className="h-6 w-6 text-gray-300" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2">
                  Мы используем cookies
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed mb-3">
                  Этот сайт использует cookies для улучшения работы сайта, анализа посещаемости и
                  персонализации контента. Необходимые cookies всегда активны. Продолжая использование
                  сайта, вы соглашаетесь с нашей политикой cookies.
                </p>
                <div className="flex flex-wrap gap-4 text-xs">
                  <a
                    href="/politika.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.link} underline transition-colors duration-300`}
                  >
                    Политика конфиденциальности
                  </a>
                  <a
                    href="/cookie.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.link} underline transition-colors duration-300`}
                  >
                    Политика cookies
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              <button
                onClick={handleAcceptAll}
                className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300
                transform hover:scale-105 shadow-lg bg-gradient-to-r ${styles.primaryBtn}`}
              >
                Принять все
              </button>
              <button
                onClick={handleDeclineNonEssential}
                className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300
                text-white border-2 ${styles.secondaryBtn}`}
              >
                Отклонить необязательные
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
