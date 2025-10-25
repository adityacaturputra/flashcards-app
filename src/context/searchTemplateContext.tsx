'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { SearchTemplate } from '@/models/SearchTemplateModel';
import useSearchTemplates from '@/hooks/useSearchTemplates';

interface SearchTemplateContextType {
  selectedTemplate: SearchTemplate | null;
  setSelectedTemplate: (template: SearchTemplate) => void;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  openModal: () => void;
  closeModal: () => void;
  generateSearchQuery: (text: string) => string;
  refreshTemplates: () => Promise<void>;
  templates: SearchTemplate[];
  loading: boolean;
}

const SearchTemplateContext = createContext<
  SearchTemplateContextType | undefined
>(undefined);

export const useSearchTemplateContext = () => {
  const context = useContext(SearchTemplateContext);
  if (!context) {
    throw new Error(
      'useSearchTemplateContext must be used within a SearchTemplateProvider',
    );
  }
  return context;
};

interface SearchTemplateProviderProps {
  children: React.ReactNode;
}

export const SearchTemplateProvider: React.FC<SearchTemplateProviderProps> = ({
  children,
}) => {
  const [selectedTemplate, setSelectedTemplate] =
    useState<SearchTemplate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { templates, loading, refreshTemplates } = useSearchTemplates();

  // Set default template when templates are loaded
  useEffect(() => {
    if (templates.length > 0 && !selectedTemplate) {
      const defaultTemplate =
        templates.find((t) => t.isDefault) || templates[0];
      setSelectedTemplate(defaultTemplate);
    }
  }, [templates, selectedTemplate]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const generateSearchQuery = (text: string) => {
    return selectedTemplate?.template.replace('{x}', text) || text;
  };

  const value: SearchTemplateContextType = {
    selectedTemplate,
    setSelectedTemplate,
    isModalOpen,
    setIsModalOpen,
    openModal,
    closeModal,
    generateSearchQuery,
    refreshTemplates,
    templates,
    loading,
  };

  return (
    <SearchTemplateContext.Provider value={value}>
      {children}
    </SearchTemplateContext.Provider>
  );
};
