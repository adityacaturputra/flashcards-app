import { useState, useEffect, useCallback } from 'react';
import { SearchTemplate } from '@/types/searchTemplate';
import { API_ENDPOINTS } from '@/constants/endpoints';

interface UseSearchTemplatesResult {
  templates: SearchTemplate[];
  loading: boolean;
  error: string | null;
  addTemplate: (
    name: string,
    template: string,
  ) => Promise<SearchTemplate | null>;
  updateTemplate: (
    id: string,
    name: string,
    template: string,
  ) => Promise<boolean>;
  deleteTemplate: (id: string) => Promise<boolean>;
  refreshTemplates: () => Promise<void>;
}

export default function useSearchTemplates(
  userId?: string,
): UseSearchTemplatesResult {
  const [templates, setTemplates] = useState<SearchTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTemplates = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const url = API_ENDPOINTS.SEARCH_TEMPLATES(userId);
      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setTemplates(data.data);
      } else {
        setError(data.error || 'Failed to fetch templates');
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to fetch templates',
      );
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const addTemplate = async (
    name: string,
    template: string,
  ): Promise<SearchTemplate | null> => {
    try {
      setError(null);

      const response = await fetch(API_ENDPOINTS.SEARCH_TEMPLATES(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          template,
          isDefault: false,
          userId,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setTemplates((prev) => [...prev, data.data]);
        return data.data;
      } else {
        setError(data.error || 'Failed to create template');
        return null;
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to create template',
      );
      return null;
    }
  };

  const updateTemplate = async (
    id: string,
    name: string,
    template: string,
  ): Promise<boolean> => {
    try {
      setError(null);

      const response = await fetch(API_ENDPOINTS.SEARCH_TEMPLATE_BY_ID(id), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          template,
          userId,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setTemplates((prev) => prev.map((t) => (t._id === id ? data.data : t)));
        return true;
      } else {
        setError(data.error || 'Failed to update template');
        return false;
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to update template',
      );
      return false;
    }
  };

  const deleteTemplate = async (id: string): Promise<boolean> => {
    try {
      setError(null);

      const response = await fetch(
        API_ENDPOINTS.SEARCH_TEMPLATE_BY_ID(id, userId),
        {
          method: 'DELETE',
        },
      );

      const data = await response.json();

      if (data.success) {
        setTemplates((prev) => prev.filter((t) => t._id !== id));
        return true;
      } else {
        setError(data.error || 'Failed to delete template');
        return false;
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to delete template',
      );
      return false;
    }
  };

  const refreshTemplates = async () => {
    await fetchTemplates();
  };

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  return {
    templates,
    loading,
    error,
    addTemplate,
    updateTemplate,
    deleteTemplate,
    refreshTemplates,
  };
}
