'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaPlus, FaTrash, FaSync } from 'react-icons/fa';
import { SearchTemplate } from '@/models/SearchTemplateModel';
import useSearchTemplates from '@/hooks/useSearchTemplates';
import { FaGears, FaPencil } from 'react-icons/fa6';

interface SearchTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTemplate: SearchTemplate | null;
  onSelectTemplate: (template: SearchTemplate) => void;
}

const SearchTemplateModal: React.FC<SearchTemplateModalProps> = ({
  isOpen,
  onClose,
  selectedTemplate,
  onSelectTemplate,
}) => {
  const {
    templates: searchTemplates,
    loading: templatesLoading,
    addTemplate,
    updateTemplate,
    deleteTemplate,
    refreshTemplates,
  } = useSearchTemplates();

  const [isEditingTemplate, setIsEditingTemplate] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState({
    id: '',
    name: '',
    template: '',
  });
  const [forceUpdate] = useState(0);

  // Search template CRUD functions
  const addSearchTemplate = () => {
    const newTemplate = {
      id: '',
      name: 'New Template',
      template: 'What is {x}?',
    };
    setEditingTemplate(newTemplate);
    setIsEditingTemplate(true);
  };

  const editSearchTemplate = (template: SearchTemplate) => {
    setEditingTemplate({
      id: template._id?.toString() || '',
      name: template.name,
      template: template.template,
    });
    setIsEditingTemplate(true);
  };

  const saveSearchTemplate = async () => {
    if (editingTemplate.id) {
      // Update existing template
      const success = await updateTemplate(
        editingTemplate.id,
        editingTemplate.name,
        editingTemplate.template,
      );
      if (success) {
        await refreshTemplates(); // Refresh templates after update
        setIsEditingTemplate(false);
        setEditingTemplate({ id: '', name: '', template: '' });
      }
    } else {
      // Create new template
      const newTemplate = await addTemplate(
        editingTemplate.name,
        editingTemplate.template,
      );
      if (newTemplate) {
        await refreshTemplates(); // Refresh templates after create
        onSelectTemplate(newTemplate);
        setIsEditingTemplate(false);
        setEditingTemplate({ id: '', name: '', template: '' });
      }
    }
  };

  const deleteSearchTemplate = async (id: string) => {
    console.log('Attempting to delete template with id:', id);
    console.log('Current templates count:', searchTemplates.length);

    if (searchTemplates.length > 1) {
      const success = await deleteTemplate(id);
      console.log('Delete result:', success);

      if (success) {
        await refreshTemplates(); // Refresh templates after delete
        if (selectedTemplate?._id?.toString() === id) {
          // Find the first available template that's not being deleted
          const remainingTemplates = searchTemplates.filter(
            (t) => t._id?.toString() !== id,
          );
          if (remainingTemplates.length > 0) {
            onSelectTemplate(remainingTemplates[0]);
            console.log(
              'Set new selected template:',
              remainingTemplates[0].name,
            );
          }
        }
      }
    } else {
      console.log('Cannot delete - only one template remaining');
    }
  };

  const handleSelectTemplate = (template: SearchTemplate) => {
    console.log('Template selected:', template.name);
    onSelectTemplate(template);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-2 backdrop-blur-sm sm:p-4'
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <motion.div
        className='flex max-h-[90vh] w-full max-w-4xl flex-col rounded-lg border shadow-lg'
        style={{
          background: 'var(--card)',
          borderColor: 'var(--border)',
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        {/* Header */}
        <div
          className='flex flex-shrink-0 items-center justify-between border-b p-4 sm:p-6'
          style={{ borderColor: 'var(--border)' }}
        >
          <div className='flex items-center gap-3'>
            <div
              className='rounded-lg p-2'
              style={{
                background: 'var(--primary)',
                color: 'var(--primary-foreground)',
              }}
            >
              <FaGears className='h-5 w-5' />
            </div>
            <div>
              <h2
                className='text-xl font-bold'
                style={{ color: 'var(--foreground)' }}
              >
                Search Templates
              </h2>
              <p
                className='text-sm'
                style={{ color: 'var(--muted-foreground)' }}
              >
                Choose your preferred search template
              </p>
            </div>
          </div>
          <div className='flex gap-2'>
            <button
              className='rounded-lg p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700'
              onClick={async () => {
                await refreshTemplates();
              }}
              title='Refresh templates'
            >
              <FaSync
                className='h-5 w-5'
                style={{ color: 'var(--muted-foreground)' }}
              />
            </button>
            <button
              className='rounded-lg p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700'
              onClick={onClose}
            >
              <FaTimes
                className='h-5 w-5'
                style={{ color: 'var(--muted-foreground)' }}
              />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className='flex-1 overflow-y-auto p-4 sm:p-6'>
          {templatesLoading ? (
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
            <div className='space-y-4'>
              {/* Templates Grid */}
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                {searchTemplates.map((template) => (
                  <motion.div
                    key={`${template._id?.toString() || template.name}-${forceUpdate}`}
                    className={`cursor-pointer rounded-xl border p-4 transition-all hover:shadow-lg ${
                      selectedTemplate?._id?.toString() ===
                      template._id?.toString()
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                    style={{
                      background:
                        selectedTemplate?._id?.toString() ===
                        template._id?.toString()
                          ? 'var(--accent)'
                          : 'var(--card)',
                      borderColor:
                        selectedTemplate?._id?.toString() ===
                        template._id?.toString()
                          ? 'var(--primary)'
                          : 'var(--border)',
                    }}
                    onClick={() => handleSelectTemplate(template)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className='mb-3 flex items-start justify-between'>
                      <div className='flex-1'>
                        <div className='flex items-center gap-2'>
                          <input
                            type='radio'
                            name='searchTemplate'
                            checked={
                              selectedTemplate?._id?.toString() ===
                              template._id?.toString()
                            }
                            onChange={() => handleSelectTemplate(template)}
                            className='h-4 w-4'
                            onClick={(e) => e.stopPropagation()}
                          />
                          <h3
                            className='font-semibold'
                            style={{ color: 'var(--foreground)' }}
                          >
                            {template.name}
                            {selectedTemplate?._id?.toString() ===
                              template._id?.toString() && (
                              <span className='ml-2 text-green-600'>✓</span>
                            )}
                          </h3>
                        </div>
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
                      <div className='flex gap-1'>
                        <button
                          className='rounded p-1 transition-colors hover:bg-slate-200 dark:hover:bg-slate-600'
                          onClick={(e) => {
                            e.stopPropagation();
                            editSearchTemplate(template);
                          }}
                          title='Edit template'
                        >
                          <FaPencil
                            className='h-3 w-3'
                            style={{ color: 'var(--primary)' }}
                          />
                        </button>
                        {!template.isDefault && searchTemplates.length > 1 && (
                          <button
                            className='rounded p-1 transition-colors hover:bg-red-100 dark:hover:bg-red-900/20'
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteSearchTemplate(
                                template._id?.toString() || '',
                              );
                            }}
                            title='Delete template'
                          >
                            <FaTrash
                              className='h-3 w-3'
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
                      className='mt-3 text-xs'
                      style={{ color: 'var(--muted-foreground)' }}
                    >
                      Created:{' '}
                      {new Date(template.createdAt).toLocaleDateString()}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Add Template Button */}
              <div className='flex justify-center pt-4'>
                <motion.button
                  className='flex items-center gap-2 rounded-lg px-4 py-2 transition-all hover:scale-105'
                  style={{
                    background: 'var(--primary)',
                    color: 'var(--primary-foreground)',
                  }}
                  onClick={addSearchTemplate}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPlus className='h-4 w-4' />
                  Add New Template
                </motion.button>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Template Editing Modal */}
      {isEditingTemplate && (
        <div
          className='fixed inset-0 z-60 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm'
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsEditingTemplate(false);
              setEditingTemplate({ id: '', name: '', template: '' });
            }
          }}
        >
          <motion.div
            className='max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg border p-4 sm:p-6'
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
              {editingTemplate.id ? 'Edit Template' : 'Add Template'}
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
                  value={editingTemplate.name}
                  onChange={(e) =>
                    setEditingTemplate({
                      ...editingTemplate,
                      name: e.target.value,
                    })
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
                  value={editingTemplate.template}
                  onChange={(e) =>
                    setEditingTemplate({
                      ...editingTemplate,
                      template: e.target.value,
                    })
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
                  Example: &quot;What is {`{x}`}?&quot; or &quot;Explain {`{x}`}{' '}
                  in detail&quot;
                </p>
              </div>
            </div>

            <div className='mt-6 flex gap-3'>
              <button
                onClick={() => {
                  setIsEditingTemplate(false);
                  setEditingTemplate({ id: '', name: '', template: '' });
                }}
                className='flex-1 rounded px-4 py-2 text-sm font-medium transition-colors'
                style={{
                  background: 'var(--secondary)',
                  color: 'var(--secondary-foreground)',
                }}
              >
                Cancel
              </button>
              <button
                onClick={saveSearchTemplate}
                disabled={
                  !editingTemplate.name.trim() ||
                  !editingTemplate.template.trim()
                }
                className='flex-1 rounded px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50'
                style={{
                  background: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                }}
              >
                {editingTemplate.id ? 'Update' : 'Add'} Template
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default SearchTemplateModal;
