import { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';

const COOKIE_CONSENT_KEY = 'cookie_consent';
const COOKIE_CONSENT_EXPIRY = 12 * 30 * 24 * 60 * 60 * 1000;

interface CookieConsentData {
  accepted: boolean;
  timestamp: number;
}

interface CookieConsentProps {
  onConsentChange?: (accepted: boolean) => void;
}

function CookieConsent({ onConsentChange }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);

    if (consent) {
      try {
        const consentData: CookieConsentData = JSON.parse(consent);
        const isExpired = Date.now() - consentData.timestamp > COOKIE_CONSENT_EXPIRY;

        if (isExpired) {
          localStorage.removeItem(COOKIE_CONSENT_KEY);
          setIsVisible(true);
        } else {
          onConsentChange?.(consentData.accepted);
        }
      } catch {
        setIsVisible(true);
      }
    } else {
      setIsVisible(true);
    }
  }, [onConsentChange]);

  const handleConsent = (accepted: boolean) => {
    const consentData: CookieConsentData = {
      accepted,
      timestamp: Date.now()
    };

    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentData));
    setIsVisible(false);
    onConsentChange?.(accepted);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-slide-up">
      <div className="max-w-6xl mx-auto bg-gradient-to-br from-gray-900/98 to-gray-800/98 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl">
        <div className="p-6 md:p-8">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 p-3 bg-gradient-to-br from-sky-600/20 to-blue-700/20 rounded-xl">
              <Cookie className="h-6 w-6 text-sky-400" />
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Этот сайт использует файлы cookie
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Мы используем файлы cookie для улучшения работы сайта, анализа посещаемости и предоставления персонализированного контента.
                  Основные cookie необходимы для работы сайта, а аналитические помогают нам понять, как вы используете наш сайт,
                  чтобы улучшить его функциональность.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 text-sm">
                <a
                  href="/politika.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 hover:text-sky-300 underline transition-colors duration-300"
                >
                  Политика конфиденциальности
                </a>
                <span className="text-gray-500">•</span>
                <a
                  href="/cookie.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 hover:text-sky-300 underline transition-colors duration-300"
                >
                  Политика использования файлов cookie
                </a>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => handleConsent(true)}
                  className="px-6 py-3 bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  Принять
                </button>
                <button
                  onClick={() => handleConsent(false)}
                  className="px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-white font-semibold rounded-xl border border-gray-600/50 transition-all duration-300"
                >
                  Отклонить
                </button>
              </div>
            </div>

            <button
              onClick={() => handleConsent(false)}
              className="flex-shrink-0 p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-300"
              aria-label="Закрыть"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CookieConsent;
