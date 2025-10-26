import { useState, useEffect } from 'react';
import { SearchTemplate } from '@/models/SearchTemplateModel';

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

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      setError(null);

      const url = userId
        ? `/api/searchTemplates?userId=${userId}`
        : '/api/searchTemplates';
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
  };

  const addTemplate = async (
    name: string,
    template: string,
  ): Promise<SearchTemplate | null> => {
    try {
      setError(null);

      const response = await fetch('/api/searchTemplates', {
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

      const response = await fetch(`/api/searchTemplates/${id}`, {
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
        `/api/searchTemplates/${id}?userId=${userId || ''}`,
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
  }, [userId]);

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
