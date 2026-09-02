// src/hooks/useMappingFilter.ts
import { useState, useMemo, useCallback } from 'react';
import { MappingItem } from '@/types/mapping';

interface UseMappingFilterReturn {
  selectedModule: string | null;
  setSelectedModule: (mod: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortOrder: 'desc' | 'asc';
  setSortOrder: (order: 'desc' | 'asc') => void;
  toggleSortOrder: () => void;
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
 * search indexing, descending/ascending sorting, and modal inspection navigation.
 */
export function useMappingFilter(items: MappingItem[]): UseMappingFilterReturn {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [activeModalItem, setActiveModalItem] = useState<MappingItem | null>(null);

  const toggleSortOrder = useCallback(() => {
    setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'));
  }, []);

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

  // Filter items based on selected module, search query, and sort order (default: descending / newest first)
  const filteredItems = useMemo(() => {
    const list = items.filter((item) => {
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

    return sortOrder === 'desc' ? [...list].reverse() : list;
  }, [items, selectedModule, searchQuery, sortOrder]);

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
    sortOrder,
    setSortOrder,
    toggleSortOrder,
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
