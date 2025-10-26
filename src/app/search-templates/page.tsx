'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaPlus, FaTrash } from 'react-icons/fa';
import { FaEdit, FaCog, FaSync } from 'react-icons/fa';
import { SearchTemplate } from '@/models/SearchTemplateModel';
import useSearchTemplates from '@/hooks/useSearchTemplates';
import ErrorBoundary from '@/components/atoms/ErrorBoundary';

const SearchTemplatesPage: React.FC = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const {
    templates,
    loading,
    error,
    addTemplate,
    updateTemplate,
    deleteTemplate,
    refreshTemplates,
  } = useSearchTemplates();

  useEffect(() => {
    setIsClient(true);
  }, []);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<SearchTemplate | null>(
    null,
  );
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', template: '' });

  const handleGoBack = () => {
    router.back();
  };

  const handleAddTemplate = async () => {
    if (!formData.name.trim() || !formData.template.trim()) {
      return;
    }

    const success = await addTemplate(formData.name, formData.template);
    if (success) {
      await refreshTemplates(); // Refresh templates after add
      setFormData({ name: '', template: '' });
      setShowAddForm(false);
    }
  };

  const handleEditTemplate = (template: SearchTemplate) => {
    setEditingTemplate(template);
    setFormData({ name: template.name, template: template.template });
    setIsEditing(true);
  };

  const handleUpdateTemplate = async () => {
    if (
      !editingTemplate ||
      !formData.name.trim() ||
      !formData.template.trim()
    ) {
      return;
    }

    const success = await updateTemplate(
      editingTemplate._id?.toString() || '',
      formData.name,
      formData.template,
    );
    if (success) {
      await refreshTemplates(); // Refresh templates after update
      setEditingTemplate(null);
      setFormData({ name: '', template: '' });
      setIsEditing(false);
    }
  };

  const handleDeleteTemplate = async (template: SearchTemplate) => {
    if (template.isDefault) {
      alert('Cannot delete default templates');
      return;
    }

    if (window.confirm(`Are you sure you want to delete "${template.name}"?`)) {
      const success = await deleteTemplate(template._id?.toString() || '');
      if (success) {
        await refreshTemplates(); // Refresh templates after delete
      }
    }
  };

  const handleCancel = () => {
    setEditingTemplate(null);
    setFormData({ name: '', template: '' });
    setIsEditing(false);
    setShowAddForm(false);
  };

  return (
    <ErrorBoundary>
      <div
        className='min-h-screen'
        style={{
          background: 'var(--background)',
        }}
      >
        {/* Header */}
        <header
          className='backdrop-blur-glass sticky top-0 z-50 border-b'
          style={{
            borderColor: 'var(--border)',
            background: 'var(--background)',
          }}
        >
          <div className='mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-5'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-4'>
                <motion.button
                  className='rounded-lg p-2 transition-all hover:scale-105'
                  style={{
                    background: 'var(--secondary)',
                    color: 'var(--secondary-foreground)',
                  }}
                  onClick={handleGoBack}
                  whileTap={{ scale: 0.95 }}
                >
                  {isClient ? (
                    <FaArrowLeft className='h-5 w-5' />
                  ) : (
                    <span className='h-5 w-5'>←</span>
                  )}
                </motion.button>

                <div>
                  <h1 className='gradient-text-accent text-xl font-bold sm:text-2xl'>
                    Search Templates
                  </h1>
                  <p
                    className='text-sm'
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    Manage your search query templates
                  </p>
                </div>
              </div>

              <div className='flex gap-2'>
                <motion.button
                  className='rounded-lg px-4 py-2 transition-all hover:scale-105'
                  style={{
                    background: 'var(--secondary)',
                    color: 'var(--secondary-foreground)',
                  }}
                  onClick={async () => {
                    await refreshTemplates();
                  }}
                  whileTap={{ scale: 0.95 }}
                  title='Refresh templates'
                >
                  <FaSync className='mr-2 h-4 w-4' />
                  Refresh
                </motion.button>
                <motion.button
                  className='rounded-lg px-4 py-2 transition-all hover:scale-105'
                  style={{
                    background: 'var(--primary)',
                    color: 'var(--primary-foreground)',
                  }}
                  onClick={() => setShowAddForm(true)}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPlus className='mr-2 h-4 w-4' />
                  Add Template
                </motion.button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className='mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8'>
          {error && (
            <div
              className='mb-6 rounded-lg border p-4'
              style={{
                background: 'var(--destructive)',
                color: 'var(--destructive-foreground)',
                borderColor: 'var(--destructive)',
              }}
            >
              <p className='text-sm'>{error}</p>
            </div>
          )}

          {loading ? (
            <div className='flex items-center justify-center py-12'>
              <div className='text-center'>
                <div className='mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600'></div>
                <p
                  className='mt-2 text-sm'
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  Loading templates...
                </p>
              </div>
            </div>
          ) : (
            <div className='space-y-6'>
              {/* Templates Grid */}
              <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                {templates.map((template) => (
                  <motion.div
                    key={template._id?.toString() || template.name}
                    className='rounded-xl border p-6 transition-all hover:shadow-lg'
                    style={{
                      background: 'var(--card)',
                      borderColor: 'var(--border)',
                    }}
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className='mb-4 flex items-start justify-between'>
                      <div className='flex-1'>
                        <h3
                          className='text-lg font-semibold'
                          style={{ color: 'var(--foreground)' }}
                        >
                          {template.name}
                        </h3>
                        {template.isDefault && (
                          <span
                            className='mt-1 inline-block rounded-full px-2 py-1 text-xs font-medium'
                            style={{
                              background: 'var(--primary)',
                              color: 'var(--primary-foreground)',
                            }}
                          >
                            Default
                          </span>
                        )}
                      </div>
                      <div className='flex gap-2'>
                        <button
                          className='rounded-lg p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700'
                          onClick={() => handleEditTemplate(template)}
                          title='Edit template'
                        >
                          <FaEdit
                            className='h-4 w-4'
                            style={{ color: 'var(--primary)' }}
                          />
                        </button>
                        {!template.isDefault && (
                          <button
                            className='rounded-lg p-2 transition-colors hover:bg-red-100 dark:hover:bg-red-900/20'
                            onClick={() => handleDeleteTemplate(template)}
                            title='Delete template'
                          >
                            <FaTrash
                              className='h-4 w-4'
                              style={{ color: 'var(--destructive)' }}
                            />
                          </button>
                        )}
                      </div>
                    </div>

                    <div
                      className='rounded-lg p-3 text-sm'
                      style={{
                        background: 'var(--muted)',
                        color: 'var(--muted-foreground)',
                      }}
                    >
                      <p className='font-mono'>{template.template}</p>
                    </div>

                    <div
                      className='mt-4 text-xs'
                      style={{ color: 'var(--muted-foreground)' }}
                    >
                      Created:{' '}
                      {new Date(template.createdAt).toLocaleDateString()}
                    </div>
                  </motion.div>
                ))}
              </div>

              {templates.length === 0 && (
                <div className='py-12 text-center'>
                  <FaCog
                    className='mx-auto h-12 w-12'
                    style={{ color: 'var(--muted-foreground)' }}
                  />
                  <h3
                    className='mt-4 text-lg font-semibold'
                    style={{ color: 'var(--foreground)' }}
                  >
                    No templates found
                  </h3>
                  <p
                    className='mt-2 text-sm'
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    Create your first search template to get started
                  </p>
                </div>
              )}
            </div>
          )}
        </main>

        {/* Add/Edit Modal */}
        {(showAddForm || isEditing) && (
          <div className='bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black'>
            <motion.div
              className='w-full max-w-md rounded-lg border p-6'
              style={{
                background: 'var(--card)',
                borderColor: 'var(--border)',
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <h3
                className='mb-4 text-lg font-semibold'
                style={{ color: 'var(--foreground)' }}
              >
                {isEditing ? 'Edit Template' : 'Add Template'}
              </h3>

              <div className='space-y-4'>
                <div>
                  <label
                    className='mb-1 block text-sm font-medium'
                    style={{ color: 'var(--foreground)' }}
                  >
                    Template Name
                  </label>
                  <input
                    type='text'
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className='w-full rounded border px-3 py-2 text-sm'
                    style={{
                      background: 'var(--input)',
                      borderColor: 'var(--border)',
                      color: 'var(--foreground)',
                    }}
                    placeholder='Enter template name...'
                  />
                </div>

                <div>
                  <label
                    className='mb-1 block text-sm font-medium'
                    style={{ color: 'var(--foreground)' }}
                  >
                    Template (use {`{x}`} for the search text)
                  </label>
                  <textarea
                    value={formData.template}
                    onChange={(e) =>
                      setFormData({ ...formData, template: e.target.value })
                    }
                    className='w-full resize-none rounded border px-3 py-2 text-sm'
                    style={{
                      background: 'var(--input)',
                      borderColor: 'var(--border)',
                      color: 'var(--foreground)',
                    }}
                    rows={3}
                    placeholder='Enter template...'
                  />
                  <p
                    className='mt-1 text-xs'
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    Example: &quot;What is {`{x}`}?&quot; or &quot;Explain{' '}
                    {`{x}`} in detail&quot;
                  </p>
                </div>
              </div>

              <div className='mt-6 flex gap-3'>
                <button
                  onClick={handleCancel}
                  className='flex-1 rounded px-4 py-2 text-sm font-medium transition-colors'
                  style={{
                    background: 'var(--secondary)',
                    color: 'var(--secondary-foreground)',
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={isEditing ? handleUpdateTemplate : handleAddTemplate}
                  disabled={!formData.name.trim() || !formData.template.trim()}
                  className='flex-1 rounded px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50'
                  style={{
                    background: 'var(--primary)',
                    color: 'var(--primary-foreground)',
                  }}
                >
                  {isEditing ? 'Update' : 'Add'} Template
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default SearchTemplatesPage;
