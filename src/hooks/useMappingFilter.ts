// src/hooks/useMappingFilter.ts
import { useState, useMemo, useCallback } from 'react';
import { MappingItem } from '@/types/mapping';

interface UseMappingFilterReturn {
  selectedModule: string | null;
  setSelectedModule: (mod: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  moduleStats: Record<string, number>;
  uniqueModules: string[];
  filteredItems: MappingItem[];
  activeModalItem: MappingItem | null;
  setActiveModalItem: (item: MappingItem | null) => void;
  currentModalIndex: number;
  handleNextModalItem: () => void;
  handlePrevModalItem: () => void;
  hasPrevModalItem: boolean;
  hasNextModalItem: boolean;
}

/**
 * Custom Hook for managing Mapping Table filtering, module selection,
 * search indexing, and modal inspection navigation.
 */
export function useMappingFilter(items: MappingItem[]): UseMappingFilterReturn {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalItem, setActiveModalItem] = useState<MappingItem | null>(null);

  // Extract unique modules with counts
  const moduleStats = useMemo(() => {
    const counts: Record<string, number> = {};
    items.forEach((item) => {
      counts[item.module] = (counts[item.module] || 0) + 1;
    });
    return counts;
  }, [items]);

  const uniqueModules = useMemo(() => {
    return Object.keys(moduleStats).sort();
  }, [moduleStats]);

  // Filter items based on selected module and search query
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchModule = selectedModule === null || item.module === selectedModule;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchModule;

      const matchSearch =
        item.module.toLowerCase().includes(query) ||
        item.title.toLowerCase().includes(query) ||
        item.question.toLowerCase().includes(query) ||
        item.correction.toLowerCase().includes(query) ||
        item.remarks.toLowerCase().includes(query) ||
        (item.source && item.source.toLowerCase().includes(query)) ||
        (item.chapter && item.chapter.toLowerCase().includes(query)) ||
        (item.tags && item.tags.some((t) => t.toLowerCase().includes(query)));

      return matchModule && matchSearch;
    });
  }, [items, selectedModule, searchQuery]);

  // Modal navigation index
  const currentModalIndex = useMemo(() => {
    if (!activeModalItem) return -1;
    return filteredItems.findIndex((i) => i.id === activeModalItem.id);
  }, [activeModalItem, filteredItems]);

  const hasNextModalItem =
    currentModalIndex >= 0 && currentModalIndex < filteredItems.length - 1;
  const hasPrevModalItem = currentModalIndex > 0;

  const handleNextModalItem = useCallback(() => {
    if (currentModalIndex >= 0 && currentModalIndex < filteredItems.length - 1) {
      setActiveModalItem(filteredItems[currentModalIndex + 1]);
    }
  }, [currentModalIndex, filteredItems]);

  const handlePrevModalItem = useCallback(() => {
    if (currentModalIndex > 0) {
      setActiveModalItem(filteredItems[currentModalIndex - 1]);
    }
  }, [currentModalIndex, filteredItems]);

  return {
    selectedModule,
    setSelectedModule,
    searchQuery,
    setSearchQuery,
    moduleStats,
    uniqueModules,
    filteredItems,
    activeModalItem,
    setActiveModalItem,
    currentModalIndex,
    handleNextModalItem,
    handlePrevModalItem,
    hasPrevModalItem,
    hasNextModalItem,
  };
}

export default useMappingFilter;
