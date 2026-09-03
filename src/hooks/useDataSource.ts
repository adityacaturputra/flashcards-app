'use client';
import { useState, useEffect, useCallback } from 'react';
import { DataSource } from '@/types/dataSource';
import {
  DEFAULT_DATA_SOURCE,
  STORAGE_KEY_DATA_SOURCE,
} from '@/constants/dataSource';

interface UseDataSourceReturn {
  dataSource: DataSource;
  setDataSource: (source: DataSource) => void;
  toggleDataSource: () => void;
  isLocal: boolean;
  isMongo: boolean;
}

export const useDataSource = (
  onSourceChange?: (newSource: DataSource) => void,
): UseDataSourceReturn => {
  const [dataSource, setDataSourceState] = useState<DataSource>(DEFAULT_DATA_SOURCE);

  // Read saved source on initial mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DATA_SOURCE) as DataSource;
      if (saved && Object.values(DataSource).includes(saved)) {
        setDataSourceState(saved);
      }
    } catch (e) {
      console.warn('Unable to read data source from localStorage', e);
    }
  }, []);

  const setDataSource = useCallback(
    (newSource: DataSource) => {
      setDataSourceState(newSource);
      try {
        localStorage.setItem(STORAGE_KEY_DATA_SOURCE, newSource);
      } catch (e) {
        console.warn('Unable to save data source to localStorage', e);
      }
      if (onSourceChange) {
        onSourceChange(newSource);
      }
    },
    [onSourceChange],
  );

  const toggleDataSource = useCallback(() => {
    const next =
      dataSource === DataSource.Local ? DataSource.MongoDB : DataSource.Local;
    setDataSource(next);
  }, [dataSource, setDataSource]);

  return {
    dataSource,
    setDataSource,
    toggleDataSource,
    isLocal: dataSource === DataSource.Local,
    isMongo: dataSource === DataSource.MongoDB,
  };
};

export default useDataSource;
