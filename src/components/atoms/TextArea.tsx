// components/atoms/TextArea.tsx
import React, { useRef, useCallback } from 'react';
import { FaBold, FaListUl, FaListOl } from 'react-icons/fa';

type TextAreaProps = {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  value?: string;
  rows?: number;
  showToolbar?: boolean;
};

const TextArea: React.FC<TextAreaProps> = ({
  placeholder,
  value = '',
  onChange,
  className = '',
  rows = 3,
  showToolbar = true,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Insert text at cursor position
  const insertAtCursor = useCallback(
    (before: string, after: string = '') => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = value.substring(start, end);
      const newText =
        value.substring(0, start) +
        before +
        selectedText +
        after +
        value.substring(end);

      // Create a synthetic event
      const syntheticEvent = {
        target: { value: newText },
      } as React.ChangeEvent<HTMLTextAreaElement>;

      onChange(syntheticEvent);

      // Restore cursor position after state update
      setTimeout(() => {
        textarea.focus();
        const newCursorPos = start + before.length + selectedText.length;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      }, 0);
    },
    [value, onChange]
  );

  // Toolbar actions
  const handleBold = () => {
    insertAtCursor('**', '**');
  };

  const handleBulletList = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const lineStart = value.lastIndexOf('\n', start - 1) + 1;
    const prefix = start === lineStart || start === 0 ? '• ' : '\n• ';
    insertAtCursor(prefix);
  };

  const handleNumberedList = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const lineStart = value.lastIndexOf('\n', start - 1) + 1;
    const prefix = start === lineStart || start === 0 ? '1. ' : '\n1. ';
    insertAtCursor(prefix);
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Ctrl/Cmd + B for bold
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
      e.preventDefault();
      handleBold();
    }
  };

  return (
    <div className={`flex w-full flex-col ${className}`}>
      {showToolbar && (
        <div
          className='flex items-center gap-1 rounded-t-lg border border-b-0 px-2 py-1'
          style={{
            background: 'var(--muted)',
            borderColor: 'var(--border)',
          }}
        >
          <button
            type='button'
            onClick={handleBold}
            className='rounded p-1.5 transition-colors hover:bg-slate-200 dark:hover:bg-slate-600'
            title='Bold (Ctrl+B)'
          >
            <FaBold className='h-3 w-3' style={{ color: 'var(--foreground)' }} />
          </button>
          <button
            type='button'
            onClick={handleBulletList}
            className='rounded p-1.5 transition-colors hover:bg-slate-200 dark:hover:bg-slate-600'
            title='Bullet List'
          >
            <FaListUl
              className='h-3 w-3'
              style={{ color: 'var(--foreground)' }}
            />
          </button>
          <button
            type='button'
            onClick={handleNumberedList}
            className='rounded p-1.5 transition-colors hover:bg-slate-200 dark:hover:bg-slate-600'
            title='Numbered List'
          >
            <FaListOl
              className='h-3 w-3'
              style={{ color: 'var(--foreground)' }}
            />
          </button>
          <span
            className='ml-auto text-xs'
            style={{ color: 'var(--muted-foreground)' }}
          >
            Supports **bold**, • bullets
          </span>
        </div>
      )}
      <textarea
        ref={textareaRef}
        className={`flex-1 resize-none border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none ${
          showToolbar ? 'rounded-b-lg rounded-t-none' : 'rounded-lg'
        }`}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        value={value}
        rows={rows}
        style={{
          background: 'var(--input)',
          color: 'var(--foreground)',
          borderColor: 'var(--border)',
          minHeight: rows ? `${rows * 1.5}rem` : undefined,
        }}
      />
    </div>
  );
};

export default TextArea;
