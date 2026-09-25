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

export const ACCENT_CYCLE: AccentPreference[] = [
  ACCENT_PREFERENCE.US,
  ACCENT_PREFERENCE.UK,
  ACCENT_PREFERENCE.AU,
  ACCENT_PREFERENCE.ZA,
  ACCENT_PREFERENCE.IN,
];

export function getNextAccent(current: AccentPreference): AccentPreference {
  const currentIndex = ACCENT_CYCLE.indexOf(current);
  if (currentIndex === -1 || currentIndex === ACCENT_CYCLE.length - 1) {
    return ACCENT_CYCLE[0];
  }
  return ACCENT_CYCLE[currentIndex + 1];
}

export interface AccentContextType {
  accent: AccentPreference;
  setAccent: (accent: AccentPreference) => void;
  toggleAccent: () => void;
  isUk: boolean;
  isUs: boolean;
  isAu: boolean;
  isZa: boolean;
  isIn: boolean;
}

const defaultContextValue: AccentContextType = {
  accent: DEFAULT_ACCENT,
  setAccent: setGlobalAccent,
  toggleAccent: () => {
    const next = getNextAccent(getGlobalAccent());
    setGlobalAccent(next);
  },
  isUk: false,
  isUs: true,
  isAu: false,
  isZa: false,
  isIn: false,
};

const AccentContext = createContext<AccentContextType>(defaultContextValue);

/**
 * Access the global English accent preference (US, UK, AU, ZA, IN)
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
      const next = getNextAccent(prev);
      setGlobalAccent(next);
      return next;
    });
  }, []);

  // Listen to cross-tab storage changes and custom accentchange events
  useEffect(() => {
    const isValidAccent = (val: unknown): val is AccentPreference => {
      return (
        typeof val === 'string' &&
        Object.values(ACCENT_PREFERENCE).includes(val as AccentPreference)
      );
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === ACCENT_STORAGE_KEY && isValidAccent(e.newValue)) {
        setAccentState(e.newValue);
      }
    };

    const handleCustomChange = (e: Event) => {
      const detail = (e as CustomEvent<{ accent: AccentPreference }>).detail;
      if (detail?.accent && isValidAccent(detail.accent)) {
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
    isAu: accent === ACCENT_PREFERENCE.AU,
    isZa: accent === ACCENT_PREFERENCE.ZA,
    isIn: accent === ACCENT_PREFERENCE.IN,
  };

  return (
    <AccentContext.Provider value={value}>{children}</AccentContext.Provider>
  );
};

export default AccentProvider;
