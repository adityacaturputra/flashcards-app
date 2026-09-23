'use client';
import React, { useEffect, useState, useId, useRef } from 'react';

interface MermaidDiagramProps {
  chart: string;
  className?: string;
}

export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({
  chart,
  className = '',
}) => {
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const uniqueId = useId().replace(/[^a-zA-Z0-9]/g, '');

  useEffect(() => {
    let isCancelled = false;

    async function renderDiagram() {
      if (!chart.trim()) return;

      try {
        setError(null);
        const mermaid = (await import('mermaid')).default;

        const isDarkMode =
          typeof document !== 'undefined' &&
          (document.documentElement.classList.contains('dark') ||
            document.documentElement.getAttribute('data-theme') === 'dark');

        mermaid.initialize({
          startOnLoad: false,
          theme: isDarkMode ? 'dark' : 'default',
          securityLevel: 'loose',
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          fontSize: 13,
          flowchart: {
            htmlLabels: false,
            curve: 'basis',
            useMaxWidth: true,
            padding: 14,
            nodeSpacing: 30,
            rankSpacing: 30,
          },
        });

        // Generate a clean valid DOM id without colons
        const id = `mermaid_${uniqueId}_${Math.random().toString(36).substring(2, 7)}`;
        const { svg: renderedSvg } = await mermaid.render(id, chart.trim());

        if (!isCancelled) {
          setSvg(renderedSvg);
        }
      } catch (err: unknown) {
        console.error('Mermaid render failure:', err);
        if (!isCancelled) {
          const errorMessage =
            err instanceof Error ? err.message : 'Gagal memproses diagram';
          setError(errorMessage);
        }
      }
    }

    renderDiagram();

    return () => {
      isCancelled = true;
    };
  }, [chart, uniqueId]);

  if (error) {
    return (
      <div
        className={`not-prose my-3 overflow-x-auto rounded-xl border p-3 text-xs ${className}`}
        style={{
          background: 'var(--secondary)',
          borderColor: 'var(--border)',
        }}
      >
        <div className='mb-1.5 text-[11px] font-semibold text-muted-foreground uppercase'>
          Diagram Alir (Kode Sumber)
        </div>
        <pre className='font-mono text-xs overflow-x-auto p-2.5 bg-black/5 dark:bg-white/5 rounded-lg'>
          <code>{chart}</code>
        </pre>
      </div>
    );
  }

  if (!svg) {
    return (
      <div
        className={`not-prose my-3 flex items-center justify-center p-6 rounded-xl border border-dashed text-xs text-muted-foreground animate-pulse ${className}`}
        style={{ borderColor: 'var(--border)' }}
      >
        <span>Memuat diagram alir...</span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`mermaid-diagram not-prose my-4 w-full max-w-full overflow-hidden rounded-2xl border p-3 sm:p-5 flex flex-col items-center shadow-xs min-w-0 ${className}`}
      style={{
        background: 'var(--card)',
        borderColor: 'var(--border)',
      }}
    >
      <div
        className='w-full max-w-full overflow-x-auto py-2'
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div
          className='w-fit mx-auto flex justify-center [&>svg]:h-auto [&>svg]:max-w-full sm:[&>svg]:max-w-none'
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </div>
      <div className='mt-1.5 flex items-center gap-1.5 text-[10px] text-muted-foreground sm:hidden'>
        <span>↔ Geser horizontal untuk melihat diagram lengkap</span>
      </div>
    </div>
  );
};

export default MermaidDiagram;
