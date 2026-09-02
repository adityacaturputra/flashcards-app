'use client';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import {
  FaCheck,
  FaCopy,
  FaLightbulb,
  FaCircleInfo,
  FaTriangleExclamation,
  FaCircleExclamation,
} from 'react-icons/fa6';

interface MarkdownViewerProps {
  content: string;
  className?: string;
  showCopyButton?: boolean;
}

export const MarkdownViewer: React.FC<MarkdownViewerProps> = ({
  content,
  className = '',
  showCopyButton = true,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy markdown:', err);
    }
  };

  return (
    <div className={`max-w-full overflow-hidden ${className}`}>
      {showCopyButton && (
        <div
          className='flex items-center justify-end pb-2 mb-2 border-b'
          style={{ borderColor: 'var(--border)' }}
        >
          <button
            onClick={handleCopy}
            className='flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium transition-all hover:scale-105 shadow-sm'
            style={{
              background: 'var(--secondary)',
              color: 'var(--secondary-foreground)',
              borderColor: 'var(--border)',
            }}
            title='Copy Markdown Content'
          >
            {copied ? (
              <>
                <FaCheck className='h-3 w-3 text-green-500' />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <FaCopy className='h-3 w-3' />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      )}

      <div className='markdown-content prose prose-slate dark:prose-invert max-w-none text-xs leading-relaxed sm:text-sm md:text-base break-words'>
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={{
            h1: ({ children }) => (
              <h1 className='mt-4 mb-2 text-lg font-bold text-foreground sm:text-xl md:text-2xl'>
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className='mt-3 mb-2 text-base font-bold text-foreground sm:text-lg md:text-xl'>
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className='mt-3 mb-1.5 text-sm font-semibold text-foreground sm:text-base md:text-lg'>
                {children}
              </h3>
            ),
            h4: ({ children }) => (
              <h4 className='mt-2.5 mb-1 text-xs font-semibold uppercase tracking-wider text-foreground sm:text-sm'>
                {children}
              </h4>
            ),
            p: ({ children }) => (
              <p className='my-2 leading-relaxed text-foreground/90'>
                {children}
              </p>
            ),
            ul: ({ children }) => (
              <ul className='my-2 ml-4 list-disc space-y-1 text-foreground/90'>
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className='my-2 ml-4 list-decimal space-y-1 text-foreground/90'>
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className='leading-relaxed'>{children}</li>
            ),
            blockquote: ({ children }) => {
              // Check for GitHub Alerts: [!TIP], [!NOTE], [!WARNING], [!IMPORTANT], [!CAUTION]
              const childrenArray = React.Children.toArray(children);
              let alertType: 'tip' | 'note' | 'warning' | 'important' | 'caution' | null = null;
              let cleanChildren = children;

              if (childrenArray.length > 0) {
                const firstChild = childrenArray[0];
                if (React.isValidElement(firstChild)) {
                  const element = firstChild as React.ReactElement<{ children?: React.ReactNode }>;
                  if (element.props && element.props.children) {
                    const pChildren = React.Children.toArray(element.props.children);
                    if (typeof pChildren[0] === 'string') {
                      const str = pChildren[0];
                      if (str.includes('[!TIP]')) alertType = 'tip';
                      else if (str.includes('[!NOTE]')) alertType = 'note';
                      else if (str.includes('[!WARNING]')) alertType = 'warning';
                      else if (str.includes('[!IMPORTANT]')) alertType = 'important';
                      else if (str.includes('[!CAUTION]')) alertType = 'caution';

                      if (alertType) {
                        const newFirstStr = str.replace(/\[!(TIP|NOTE|WARNING|IMPORTANT|CAUTION)\]\s*/i, '');
                        cleanChildren = [
                          React.cloneElement(element, {
                            key: 'alert-first',
                            children: [newFirstStr, ...pChildren.slice(1)],
                          }),
                          ...childrenArray.slice(1),
                        ];
                      }
                    }
                  }
                }
              }

              if (alertType === 'tip') {
                return (
                  <div className='my-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs leading-relaxed sm:text-sm text-foreground'>
                    <div className='mb-1 flex items-center gap-1.5 font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider text-[11px] sm:text-xs'>
                      <FaLightbulb className='h-3.5 w-3.5 shrink-0' />
                      <span>Tip & Kunci Ingatan</span>
                    </div>
                    <div>{cleanChildren}</div>
                  </div>
                );
              }

              if (alertType === 'warning' || alertType === 'caution') {
                return (
                  <div className='my-3 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs leading-relaxed sm:text-sm text-foreground'>
                    <div className='mb-1 flex items-center gap-1.5 font-bold text-red-600 dark:text-red-400 uppercase tracking-wider text-[11px] sm:text-xs'>
                      <FaTriangleExclamation className='h-3.5 w-3.5 shrink-0' />
                      <span>Perhatian / Warning</span>
                    </div>
                    <div>{cleanChildren}</div>
                  </div>
                );
              }

              if (alertType === 'note' || alertType === 'important') {
                return (
                  <div className='my-3 rounded-xl border border-blue-500/30 bg-blue-500/10 p-3 text-xs leading-relaxed sm:text-sm text-foreground'>
                    <div className='mb-1 flex items-center gap-1.5 font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider text-[11px] sm:text-xs'>
                      {alertType === 'important' ? (
                        <FaCircleExclamation className='h-3.5 w-3.5 shrink-0' />
                      ) : (
                        <FaCircleInfo className='h-3.5 w-3.5 shrink-0' />
                      )}
                      <span>{alertType === 'important' ? 'Penting' : 'Catatan'}</span>
                    </div>
                    <div>{cleanChildren}</div>
                  </div>
                );
              }

              return (
                <blockquote
                  className='my-3 rounded-r-xl border-l-4 p-3 pl-4 italic text-xs leading-relaxed sm:text-sm'
                  style={{
                    borderColor: 'var(--primary)',
                    background: 'var(--muted)',
                    color: 'var(--foreground)',
                  }}
                >
                  {children}
                </blockquote>
              );
            },
            hr: () => (
              <hr
                className='my-4'
                style={{ borderColor: 'var(--border)' }}
              />
            ),
            table: ({ children }) => (
              <div
                className='my-3 w-full overflow-x-auto rounded-xl border shadow-sm'
                style={{
                  borderColor: 'var(--border)',
                  WebkitOverflowScrolling: 'touch',
                }}
              >
                <table className='min-w-[480px] w-full border-collapse text-left text-xs sm:text-sm'>
                  {children}
                </table>
              </div>
            ),
            th: ({ children }) => (
              <th
                className='border-b p-2 sm:p-2.5 font-bold text-xs'
                style={{
                  background: 'var(--muted)',
                  borderColor: 'var(--border)',
                  color: 'var(--foreground)',
                }}
              >
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td
                className='border-b p-2 sm:p-2.5 text-xs sm:text-sm align-top leading-relaxed'
                style={{
                  borderColor: 'var(--border)',
                  color: 'var(--foreground)',
                }}
              >
                {children}
              </td>
            ),
            code: ({ className, children, ...props }) => {
              const isInline = !className && typeof children === 'string' && !children.includes('\n');
              return isInline ? (
                <code
                  className='rounded px-1.5 py-0.5 text-[11px] sm:text-xs font-mono font-semibold break-words'
                  style={{
                    background: 'var(--secondary)',
                    color: 'var(--primary)',
                  }}
                  {...props}
                >
                  {children}
                </code>
              ) : (
                <div
                  className='my-2 w-full overflow-x-auto rounded-xl p-2.5 sm:p-3 text-xs font-mono leading-relaxed'
                  style={{
                    background: 'var(--secondary)',
                    color: 'var(--secondary-foreground)',
                    WebkitOverflowScrolling: 'touch',
                  }}
                >
                  <code {...props}>{children}</code>
                </div>
              );
            },
            strong: ({ children }) => (
              <strong className='font-bold text-foreground'>{children}</strong>
            ),
            em: ({ children }) => (
              <em className='italic text-foreground/90'>{children}</em>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownViewer;
