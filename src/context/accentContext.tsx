// src/context/accentContext.tsx
'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  PropsWithChildren,
} from 'react';
import {
  AccentPreference,
  ACCENT_PREFERENCE,
  DEFAULT_ACCENT,
} from '@/types/phonemic';
import {
  getGlobalAccent,
  setGlobalAccent,
  ACCENT_STORAGE_KEY,
} from '@/utils/speechSynthesis';

export interface AccentContextType {
  accent: AccentPreference;
  setAccent: (accent: AccentPreference) => void;
  toggleAccent: () => void;
  isUk: boolean;
  isUs: boolean;
}

const defaultContextValue: AccentContextType = {
  accent: DEFAULT_ACCENT,
  setAccent: setGlobalAccent,
  toggleAccent: () => {
    const next =
      getGlobalAccent() === ACCENT_PREFERENCE.UK
        ? ACCENT_PREFERENCE.US
        : ACCENT_PREFERENCE.UK;
    setGlobalAccent(next);
  },
  isUk: false,
  isUs: true,
};

const AccentContext = createContext<AccentContextType>(defaultContextValue);

/**
 * Access the global English accent preference (British RP vs American US)
 */
export const useAccentContext = (): AccentContextType => {
  return useContext(AccentContext);
};

export const AccentProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [accent, setAccentState] = useState<AccentPreference>(() => {
    if (typeof window !== 'undefined') {
      return getGlobalAccent();
    }
    return DEFAULT_ACCENT;
  });

  const setAccent = useCallback((newAccent: AccentPreference) => {
    setAccentState(newAccent);
    setGlobalAccent(newAccent);
  }, []);

  const toggleAccent = useCallback(() => {
    setAccentState((prev) => {
      const next =
        prev === ACCENT_PREFERENCE.UK
          ? ACCENT_PREFERENCE.US
          : ACCENT_PREFERENCE.UK;
      setGlobalAccent(next);
      return next;
    });
  }, []);

  // Listen to cross-tab storage changes and custom accentchange events
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (
        e.key === ACCENT_STORAGE_KEY &&
        (e.newValue === ACCENT_PREFERENCE.UK ||
          e.newValue === ACCENT_PREFERENCE.US)
      ) {
        setAccentState(e.newValue);
      }
    };

    const handleCustomChange = (e: Event) => {
      const detail = (e as CustomEvent<{ accent: AccentPreference }>).detail;
      if (
        detail?.accent &&
        (detail.accent === ACCENT_PREFERENCE.UK ||
          detail.accent === ACCENT_PREFERENCE.US)
      ) {
        setAccentState(detail.accent);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('accentchange', handleCustomChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('accentchange', handleCustomChange);
    };
  }, []);

  const value: AccentContextType = {
    accent,
    setAccent,
    toggleAccent,
    isUk: accent === ACCENT_PREFERENCE.UK,
    isUs: accent === ACCENT_PREFERENCE.US,
  };

  return (
    <AccentContext.Provider value={value}>{children}</AccentContext.Provider>
  );
};

export default AccentProvider;
