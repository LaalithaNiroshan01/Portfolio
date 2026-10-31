import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { MotionConfig } from 'framer-motion';

export type MotionTier = 'full' | 'balanced' | 'minimal';

export interface ConnectionMetrics {
  effectiveType?: string;
  downlink?: number;
  saveData?: boolean;
}

interface MotionPreferences {
  tier: MotionTier;
  prefersReducedMotion: boolean;
}

interface MotionPreferencesContextValue extends MotionPreferences {
  shouldReduceMotion: boolean;
}

interface NetworkInformation extends EventTarget, ConnectionMetrics {}

interface ExtendedNavigator extends Navigator {
  connection?: NetworkInformation;
}

const MotionPreferencesContext = createContext<MotionPreferencesContextValue>({
  tier: 'full',
  prefersReducedMotion: false,
  shouldReduceMotion: false
});

export function getMotionTier(
  connection: ConnectionMetrics | null,
  isOnline: boolean
): MotionTier {
  if (!isOnline || connection?.saveData) return 'minimal';

  const connectionType = connection?.effectiveType?.toLowerCase();
  if (connectionType === 'slow-2g' || connectionType === '2g') return 'minimal';
  if (connectionType === '3g' || (connection?.downlink !== undefined && connection.downlink < 1.5)) {
    return 'balanced';
  }

  return 'full';
}

interface BrowserMotionPreferences extends MotionPreferences {
  mediaQuery: MediaQueryList | null;
  connection: NetworkInformation | undefined;
}

function readBrowserPreferences(): BrowserMotionPreferences {
  const mediaQuery = typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : null;
  const connection = typeof navigator !== 'undefined'
    ? (navigator as ExtendedNavigator).connection
    : undefined;

  return {
    tier: getMotionTier(connection ?? null, typeof navigator === 'undefined' || navigator.onLine),
    prefersReducedMotion: mediaQuery?.matches ?? false,
    mediaQuery,
    connection
  };
}

export const MotionPreferencesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<BrowserMotionPreferences>(readBrowserPreferences);

  useEffect(() => {
    const updatePreferences = () => setPreferences(readBrowserPreferences());
    const mediaQuery = preferences.mediaQuery;
    const connection = preferences.connection;

    mediaQuery?.addEventListener('change', updatePreferences);
    connection?.addEventListener('change', updatePreferences);
    window.addEventListener('online', updatePreferences);
    window.addEventListener('offline', updatePreferences);

    return () => {
      mediaQuery?.removeEventListener('change', updatePreferences);
      connection?.removeEventListener('change', updatePreferences);
      window.removeEventListener('online', updatePreferences);
      window.removeEventListener('offline', updatePreferences);
    };
  }, [preferences.connection, preferences.mediaQuery]);

  const tier = preferences.prefersReducedMotion ? 'minimal' : preferences.tier;
  const shouldReduceMotion = tier === 'minimal';

  return (
    <MotionPreferencesContext.Provider value={{ ...preferences, tier, shouldReduceMotion }}>
      <MotionConfig reducedMotion={shouldReduceMotion ? 'always' : 'user'}>
        <div data-motion-tier={tier}>
          {children}
        </div>
      </MotionConfig>
    </MotionPreferencesContext.Provider>
  );
};

export function useMotionPreferences(): MotionPreferencesContextValue {
  return useContext(MotionPreferencesContext);
}
