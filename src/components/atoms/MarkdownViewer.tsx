'use client';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import MermaidDiagram from './MermaidDiagram';
import AccentAudioLab from '@/components/organisms/AccentAudioLab';
import { playSpeech, stopSpeech } from '@/utils/speechSynthesis';
import {
  FaCheck,
  FaCopy,
  FaLightbulb,
  FaCircleInfo,
  FaTriangleExclamation,
  FaCircleExclamation,
  FaVolumeHigh,
} from 'react-icons/fa6';

export const GITHUB_ALERT_TYPE = {
  TIP: 'tip',
  NOTE: 'note',
  WARNING: 'warning',
  IMPORTANT: 'important',
  CAUTION: 'caution',
} as const;

export type GitHubAlertType =
  (typeof GITHUB_ALERT_TYPE)[keyof typeof GITHUB_ALERT_TYPE];

function safeDecode(str: string): string {
  try {
    return decodeURIComponent(str.replace(/\+/g, ' '));
  } catch {
    return str.replace(/\+/g, ' ');
  }
}

function parseAudioHref(href: string): { lang: string; text: string } {
  const raw = href.replace(/^(audio|speech):/, '');
  if (raw.includes('?')) {
    const [lang, query] = raw.split('?');
    const params = new URLSearchParams(query);
    const text = params.get('text') || '';
    return {
      lang: lang || 'en-GB',
      text: safeDecode(text),
    };
  }
  const colonIdx = raw.indexOf(':');
  if (colonIdx !== -1) {
    const lang = raw.substring(0, colonIdx);
    const text = raw.substring(colonIdx + 1);
    return {
      lang: lang || 'en-GB',
      text: safeDecode(text),
    };
  }
  return {
    lang: 'en-GB',
    text: safeDecode(raw),
  };
}

function cleanAudioLabel(children: React.ReactNode): React.ReactNode {
  if (typeof children === 'string') {
    return children.replace(/^[🔊▶️🎙️]\s*/, '').trim();
  }
  return children;
}

interface MarkdownViewerProps {
  content: string;
  className?: string;
  showCopyButton?: boolean;
  onMappingClick?: (mappingId: string) => void;
}

export const MarkdownViewer: React.FC<MarkdownViewerProps> = ({
  content,
  className = '',
  showCopyButton = true,
  onMappingClick,
}) => {
  const [copied, setCopied] = useState(false);
  const [playingAudioKey, setPlayingAudioKey] = useState<string | null>(null);

  const processedContent = React.useMemo(() => {
    if (!content) return '';
    return content;
  }, [content]);

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
          urlTransform={(url) => url}
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeRaw, rehypeKatex]}
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
              let alertType: GitHubAlertType | null = null;
              let cleanChildren = children;

              // Find the first valid React element (typically a <p> tag containing markdown text)
              const pElementIndex = childrenArray.findIndex((c) => React.isValidElement(c));
              if (pElementIndex !== -1) {
                const element = childrenArray[pElementIndex] as React.ReactElement<{ children?: React.ReactNode }>;
                if (element.props && element.props.children) {
                  const pChildren = React.Children.toArray(element.props.children);
                  const firstStrIndex = pChildren.findIndex((c) => typeof c === 'string' && c.trim().length > 0);
                  if (firstStrIndex !== -1) {
                    const str = pChildren[firstStrIndex] as string;
                    if (str.includes('[!TIP]')) alertType = GITHUB_ALERT_TYPE.TIP;
                    else if (str.includes('[!NOTE]')) alertType = GITHUB_ALERT_TYPE.NOTE;
                    else if (str.includes('[!WARNING]')) alertType = GITHUB_ALERT_TYPE.WARNING;
                    else if (str.includes('[!IMPORTANT]')) alertType = GITHUB_ALERT_TYPE.IMPORTANT;
                    else if (str.includes('[!CAUTION]')) alertType = GITHUB_ALERT_TYPE.CAUTION;

                    if (alertType) {
                      const newStr = str.replace(/\[!(TIP|NOTE|WARNING|IMPORTANT|CAUTION)\]\s*/i, '');
                      const newPChildren = [...pChildren];
                      if (newStr.trim().length > 0) {
                        newPChildren[firstStrIndex] = newStr;
                      } else {
                        newPChildren.splice(firstStrIndex, 1);
                      }
                      const newElement = React.cloneElement(element, {
                        key: 'alert-element',
                        children: newPChildren,
                      });
                      cleanChildren = [
                        ...childrenArray.slice(0, pElementIndex),
                        newElement,
                        ...childrenArray.slice(pElementIndex + 1),
                      ];
                    }
                  }
                }
              }

              if (alertType === GITHUB_ALERT_TYPE.TIP) {
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

              if (
                alertType === GITHUB_ALERT_TYPE.WARNING ||
                alertType === GITHUB_ALERT_TYPE.CAUTION
              ) {
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

              if (
                alertType === GITHUB_ALERT_TYPE.NOTE ||
                alertType === GITHUB_ALERT_TYPE.IMPORTANT
              ) {
                return (
                  <div className='my-3 rounded-xl border border-blue-500/30 bg-blue-500/10 p-3 text-xs leading-relaxed sm:text-sm text-foreground'>
                    <div className='mb-1 flex items-center gap-1.5 font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider text-[11px] sm:text-xs'>
                      {alertType === GITHUB_ALERT_TYPE.IMPORTANT ? (
                        <FaCircleExclamation className='h-3.5 w-3.5 shrink-0' />
                      ) : (
                        <FaCircleInfo className='h-3.5 w-3.5 shrink-0' />
                      )}
                      <span>{alertType === GITHUB_ALERT_TYPE.IMPORTANT ? 'Penting' : 'Catatan'}</span>
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
                className='my-3 w-full max-w-full overflow-x-auto rounded-xl border shadow-sm min-w-0'
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
            pre: ({ children }) => <>{children}</>,
            code: ({ className, children, ...props }) => {
              const isInline = !className && typeof children === 'string' && !children.includes('\n');
              const isMermaid =
                className === 'language-mermaid' ||
                Boolean(className?.includes('language-mermaid'));

              if (isMermaid) {
                return <MermaidDiagram chart={String(children)} />;
              }

              const isAccentLab =
                className === 'language-accent-lab' ||
                Boolean(className?.includes('language-accent-lab'));

              if (isAccentLab) {
                return <AccentAudioLab />;
              }

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
                  <pre className='m-0 p-0 overflow-x-auto bg-transparent border-0'>
                    <code {...props}>{children}</code>
                  </pre>
                </div>
              );
            },
            strong: ({ children }) => (
              <strong className='font-bold text-foreground'>{children}</strong>
            ),
            em: ({ children }) => (
              <em className='italic text-foreground/90'>{children}</em>
            ),
            button: ({ node, ...props }) => {
              void node;
              const customProps = props as Record<string, unknown>;
              const audioText =
                (customProps['data-audio'] as string | undefined) ||
                (customProps['data-speech'] as string | undefined);
              const audioLang =
                (customProps['data-lang'] as string | undefined) || 'en-GB';

              if (audioText) {
                const key = `btn-audio-${audioLang}-${audioText}`;
                const isPlaying = playingAudioKey === key;
                const displayLabel = cleanAudioLabel(props.children);
                const hasLabel = Boolean(
                  displayLabel && String(displayLabel).trim().length > 0
                );

                const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  e.stopPropagation();

                  if (isPlaying) {
                    stopSpeech();
                    setPlayingAudioKey(null);
                    return;
                  }

                  setPlayingAudioKey(key);
                  playSpeech({
                    text: audioText,
                    lang: audioLang,
                    rate: 0.88,
                    onStart: () => setPlayingAudioKey(key),
                    onEnd: () =>
                      setPlayingAudioKey((c) => (c === key ? null : c)),
                    onError: () =>
                      setPlayingAudioKey((c) => (c === key ? null : c)),
                  });
                };

                return (
                  <button
                    type='button'
                    onClick={handleClick}
                    className={`btn-compact inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-semibold transition-all cursor-pointer select-none active:scale-95 ${
                      isPlaying
                        ? 'border-primary bg-primary/15 text-primary shadow-xs ring-1 ring-primary/40'
                        : 'border-border bg-secondary/80 hover:bg-secondary text-foreground hover:border-primary/50'
                    }`}
                    title={
                      isPlaying
                        ? 'Hentikan audio'
                        : `Dengarkan "${audioText}" (${audioLang})`
                    }
                    aria-label={`Dengarkan audio ${audioText}`}
                  >
                    <FaVolumeHigh
                      className={`h-3 w-3 shrink-0 ${
                        isPlaying ? 'animate-pulse text-primary' : 'text-primary'
                      }`}
                    />
                    {hasLabel && <span>{displayLabel}</span>}
                  </button>
                );
              }

              return <button {...props} />;
            },
            a: ({ href, children }) => {
              const isAudioLink = Boolean(
                href && (href.startsWith('audio:') || href.startsWith('speech:'))
              );

              if (isAudioLink && href) {
                const isPlaying = playingAudioKey === href;
                const { lang, text } = parseAudioHref(href);
                const displayLabel = cleanAudioLabel(children);
                const hasLabel = Boolean(
                  displayLabel && String(displayLabel).trim().length > 0
                );

                const handleAudioClick = (e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  e.stopPropagation();

                  if (isPlaying) {
                    stopSpeech();
                    setPlayingAudioKey(null);
                    return;
                  }

                  setPlayingAudioKey(href);
                  playSpeech({
                    text: text || (typeof displayLabel === 'string' ? displayLabel : ''),
                    lang,
                    rate: 0.88,
                    onStart: () => setPlayingAudioKey(href),
                    onEnd: () =>
                      setPlayingAudioKey((curr) =>
                        curr === href ? null : curr
                      ),
                    onError: () =>
                      setPlayingAudioKey((curr) =>
                        curr === href ? null : curr
                      ),
                  });
                };

                return (
                  <button
                    type='button'
                    onClick={handleAudioClick}
                    className={`btn-compact inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-semibold transition-all cursor-pointer select-none active:scale-95 ${
                      isPlaying
                        ? 'border-primary bg-primary/15 text-primary shadow-xs ring-1 ring-primary/40'
                        : 'border-border bg-secondary/80 hover:bg-secondary text-foreground hover:border-primary/50'
                    }`}
                    title={
                      isPlaying
                        ? 'Hentikan audio'
                        : `Dengarkan "${text}" (${lang})`
                    }
                    aria-label={`Dengarkan audio ${text}`}
                  >
                    <FaVolumeHigh
                      className={`h-3 w-3 shrink-0 ${
                        isPlaying ? 'animate-pulse text-primary' : 'text-primary'
                      }`}
                    />
                    {hasLabel && <span>{displayLabel}</span>}
                  </button>
                );
              }

              const isMappingLink =
                Boolean(href && (
                  href.startsWith('#mapping:') ||
                  href.startsWith('/mapping?id=') ||
                  href.startsWith('/mapping?search=')
                ));

              const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                if (!href) return;
                let mappingId: string | null = null;
                if (href.startsWith('#mapping:')) {
                  mappingId = href.replace('#mapping:', '');
                } else if (href.startsWith('/mapping?id=')) {
                  mappingId = href.replace('/mapping?id=', '').split('&')[0];
                } else if (href.startsWith('/mapping?search=')) {
                  mappingId = href.replace('/mapping?search=', '').split('&')[0];
                }

                if (mappingId && onMappingClick) {
                  e.preventDefault();
                  onMappingClick(decodeURIComponent(mappingId));
                }
              };

              return (
                <a
                  href={href}
                  onClick={handleLinkClick}
                  className={`font-semibold transition-colors cursor-pointer ${
                    isMappingLink
                      ? 'inline-flex items-center gap-1 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 underline underline-offset-4 decoration-purple-400/60 font-medium'
                      : 'text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline underline-offset-2'
                  }`}
                  target={href?.startsWith('http') ? '_blank' : undefined}
                  rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {children}
                </a>
              );
            },
          }}
        >
          {processedContent}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownViewer;
