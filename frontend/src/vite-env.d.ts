/// <reference types="vite/client" />

declare global {
  interface Window {
    ymaps: any; // Declare ymaps global object
    ym: (counterId: number, method: string, ...args: any[]) => void;
  }
}

type YandexMetricaMethod = 'init' | 'hit' | 'reachGoal' | 'params' | 'userParams' | 'extLink' | 'file' | 'notBounce';

interface YandexMetricaInitOptions {
  ssr?: boolean;
  webvisor?: boolean;
  clickmap?: boolean;
  trackLinks?: boolean;
  accurateTrackBounce?: boolean;
  ecommerce?: string | boolean;
  referrer?: string;
  url?: string;
}

