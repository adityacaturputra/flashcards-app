'use client';
import React, { useState, useMemo } from 'react';
import {
  FaCheck,
  FaRotate,
  FaCodeFork,
  FaChevronDown,
  FaChevronUp,
  FaLayerGroup,
  FaCloudArrowUp,
  FaCloudArrowDown,
} from 'react-icons/fa6';
import { SyncCardDiff } from '@/services/syncService';
import { Flashcard } from '@/types/flashcard';

interface ConflictResolverCardProps {
  item: SyncCardDiff;
  onResolved?: (cardId: string) => void;
}

type Choice = 'local' | 'cloud';

export const ConflictResolverCard: React.FC<ConflictResolverCardProps> = ({
  item,
  onResolved,
}) => {
  const localCard = item.localCard;
  const cloudCard = item.cloudCard;

  // Collect all unique keys across local and cloud dynamic fields
  const allDynamicKeys = useMemo(() => {
    const keys = new Set<string>();
    if (localCard?.dynamicFields) {
      Object.keys(localCard.dynamicFields).forEach((k) => keys.add(k));
    }
    if (cloudCard?.dynamicFields) {
      Object.keys(cloudCard.dynamicFields).forEach((k) => keys.add(k));
    }
    return Array.from(keys);
  }, [localCard, cloudCard]);

  // Track field-by-field choices
  const [questionChoice, setQuestionChoice] = useState<Choice>('local');
  const [answerChoice, setAnswerChoice] = useState<Choice>('local');
  const [dynamicChoices, setDynamicChoices] = useState<Record<string, Choice>>(() => {
    const initial: Record<string, Choice> = {};
    allDynamicKeys.forEach((k) => {
      initial[k] = 'local';
    });
    return initial;
  });

  const [showPreview, setShowPreview] = useState(false);
  const [isResolving, setIsResolving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resolvedSuccess, setResolvedSuccess] = useState<string | null>(null);

  // Bulk selection shortcuts
  const handleSelectAll = (choice: Choice) => {
    setQuestionChoice(choice);
    setAnswerChoice(choice);
    const updated: Record<string, Choice> = {};
    allDynamicKeys.forEach((k) => {
      updated[k] = choice;
    });
    setDynamicChoices(updated);
  };

  const handleSelectAllDynamic = (choice: Choice) => {
    const updated: Record<string, Choice> = {};
    allDynamicKeys.forEach((k) => {
      updated[k] = choice;
    });
    setDynamicChoices(updated);
  };

  const handleKeyChoice = (key: string, choice: Choice) => {
    setDynamicChoices((prev) => ({
      ...prev,
      [key]: choice,
    }));
  };

  // Build the live merged flashcard object
  const mergedCard: Flashcard = useMemo(() => {
    const chosenQuestion =
      questionChoice === 'local'
        ? localCard?.question || item.question
        : cloudCard?.question || item.question;

    const chosenAnswer =
      answerChoice === 'local'
        ? localCard?.answer || ''
        : cloudCard?.answer || '';

    const chosenDynamic: Record<string, string> = {};
    allDynamicKeys.forEach((k) => {
      const choice = dynamicChoices[k] || 'local';
      const val =
        choice === 'local'
          ? localCard?.dynamicFields?.[k]
          : cloudCard?.dynamicFields?.[k];
      if (val !== undefined && val !== null && val !== '') {
        chosenDynamic[k] = val;
      }
    });

    const base = localCard || cloudCard!;
    return {
      ...base,
      _id: item.id,
      question: chosenQuestion,
      answer: chosenAnswer,
      dynamicFields: chosenDynamic,
    };
  }, [
    questionChoice,
    answerChoice,
    dynamicChoices,
    localCard,
    cloudCard,
    item.id,
    item.question,
    allDynamicKeys,
  ]);

  // Execute conflict resolution request
  const handleResolve = async (target: 'both' | 'local' | 'cloud') => {
    setIsResolving(true);
    setErrorMessage(null);
    try {
      const res = await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'resolve_conflict',
          cardId: item.id,
          resolvedCard: mergedCard,
          target,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to apply resolution.');
      }
      setResolvedSuccess(data.message || 'Conflict resolved successfully!');
      setTimeout(() => {
        onResolved?.(item.id);
      }, 700);
    } catch (err: unknown) {
      console.error('Resolve conflict error:', err);
      const msg =
        err instanceof Error ? err.message : 'Failed to apply resolution.';
      setErrorMessage(msg);
    } finally {
      setIsResolving(false);
    }
  };

  const hasQuestionDiff =
    (localCard?.question || '').trim() !== (cloudCard?.question || '').trim();
  const hasAnswerDiff =
    (localCard?.answer || '').trim() !== (cloudCard?.answer || '').trim();
  const hasDynamicDiff =
    JSON.stringify(localCard?.dynamicFields || {}) !==
    JSON.stringify(cloudCard?.dynamicFields || {});

  return (
    <div
      className='rounded-xl border p-4 space-y-3.5 text-xs transition-all shadow-xs'
      style={{
        background: 'var(--card)',
        borderColor: 'var(--border)',
      }}
    >
      {/* Header: Title, Conflict Badge & Bulk Card Shortcuts */}
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b' style={{ borderColor: 'var(--border)' }}>
        <div className='flex items-center gap-2 min-w-0'>
          <div className='flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 shrink-0'>
            <FaCodeFork className='h-3.5 w-3.5' />
          </div>
          <div className='font-semibold text-foreground text-sm truncate'>
            &quot;{item.question}&quot;
          </div>
        </div>

        {/* Bulk Card Level Shortcuts */}
        <div className='flex items-center gap-1.5 shrink-0 self-end sm:self-auto'>
          <span className='text-[10px] text-muted-foreground uppercase font-bold tracking-wider mr-1 hidden xs:inline'>
            Bulk Card:
          </span>
          <button
            onClick={() => handleSelectAll('local')}
            disabled={isResolving}
            className={`rounded-lg px-2.5 py-1 text-[11px] font-bold border transition-all ${
              questionChoice === 'local' &&
              answerChoice === 'local' &&
              Object.values(dynamicChoices).every((c) => c === 'local')
                ? 'bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/40 shadow-2xs'
                : 'bg-slate-100 dark:bg-slate-800 text-muted-foreground hover:text-foreground border-transparent'
            }`}
            title='Set Question, Answer, and all Dynamic Fields to Local'
          >
            Use All Local
          </button>
          <button
            onClick={() => handleSelectAll('cloud')}
            disabled={isResolving}
            className={`rounded-lg px-2.5 py-1 text-[11px] font-bold border transition-all ${
              questionChoice === 'cloud' &&
              answerChoice === 'cloud' &&
              Object.values(dynamicChoices).every((c) => c === 'cloud')
                ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/40 shadow-2xs'
                : 'bg-slate-100 dark:bg-slate-800 text-muted-foreground hover:text-foreground border-transparent'
            }`}
            title='Set Question, Answer, and all Dynamic Fields to Cloud'
          >
            Use All Cloud
          </button>
        </div>
      </div>

      {/* Field 1: Question Conflict (if differing) */}
      {hasQuestionDiff && (
        <div className='rounded-lg border overflow-hidden' style={{ borderColor: 'var(--border)' }}>
          <div
            className='flex items-center justify-between px-3 py-1.5 border-b'
            style={{
              background: 'var(--secondary)',
              borderColor: 'var(--border)',
            }}
          >
            <span className='font-bold uppercase tracking-wider text-[10px] text-muted-foreground'>
              Question
            </span>
            <div className='flex items-center gap-1.5'>
              <button
                onClick={() => setQuestionChoice('local')}
                className={`rounded-md px-2 py-0.5 text-[10px] font-bold border transition-all ${
                  questionChoice === 'local'
                    ? 'bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/40'
                    : 'text-muted-foreground hover:text-foreground border-transparent'
                }`}
              >
                {questionChoice === 'local' ? '✓ ' : ''}Local
              </button>
              <button
                onClick={() => setQuestionChoice('cloud')}
                className={`rounded-md px-2 py-0.5 text-[10px] font-bold border transition-all ${
                  questionChoice === 'cloud'
                    ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/40'
                    : 'text-muted-foreground hover:text-foreground border-transparent'
                }`}
              >
                {questionChoice === 'cloud' ? '✓ ' : ''}Cloud
              </button>
            </div>
          </div>
          <div className='p-2.5 space-y-2 font-mono text-[11px]'>
            <div
              onClick={() => setQuestionChoice('local')}
              className={`p-2 rounded-md cursor-pointer border transition-all ${
                questionChoice === 'local'
                  ? 'bg-red-500/10 border-red-500/40 text-red-700 dark:text-red-300 ring-1 ring-red-500/30'
                  : 'opacity-50 hover:opacity-80 border-transparent bg-slate-50 dark:bg-slate-900 text-muted-foreground'
              }`}
            >
              <span className='font-bold select-none text-red-500 mr-2'>- Local:</span>
              <span>{localCard?.question || '(empty)'}</span>
            </div>
            <div
              onClick={() => setQuestionChoice('cloud')}
              className={`p-2 rounded-md cursor-pointer border transition-all ${
                questionChoice === 'cloud'
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500/30'
                  : 'opacity-50 hover:opacity-80 border-transparent bg-slate-50 dark:bg-slate-900 text-muted-foreground'
              }`}
            >
              <span className='font-bold select-none text-emerald-500 mr-2'>+ Cloud:</span>
              <span>{cloudCard?.question || '(empty)'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Field 2: Answer Conflict (if differing) */}
      {hasAnswerDiff && (
        <div className='rounded-lg border overflow-hidden' style={{ borderColor: 'var(--border)' }}>
          <div
            className='flex items-center justify-between px-3 py-1.5 border-b'
            style={{
              background: 'var(--secondary)',
              borderColor: 'var(--border)',
            }}
          >
            <span className='font-bold uppercase tracking-wider text-[10px] text-muted-foreground'>
              Answer
            </span>
            <div className='flex items-center gap-1.5'>
              <button
                onClick={() => setAnswerChoice('local')}
                className={`rounded-md px-2 py-0.5 text-[10px] font-bold border transition-all ${
                  answerChoice === 'local'
                    ? 'bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/40'
                    : 'text-muted-foreground hover:text-foreground border-transparent'
                }`}
              >
                {answerChoice === 'local' ? '✓ ' : ''}Local
              </button>
              <button
                onClick={() => setAnswerChoice('cloud')}
                className={`rounded-md px-2 py-0.5 text-[10px] font-bold border transition-all ${
                  answerChoice === 'cloud'
                    ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/40'
                    : 'text-muted-foreground hover:text-foreground border-transparent'
                }`}
              >
                {answerChoice === 'cloud' ? '✓ ' : ''}Cloud
              </button>
            </div>
          </div>
          <div className='p-2.5 space-y-2 font-mono text-[11px]'>
            <div
              onClick={() => setAnswerChoice('local')}
              className={`p-2 rounded-md cursor-pointer border transition-all ${
                answerChoice === 'local'
                  ? 'bg-red-500/10 border-red-500/40 text-red-700 dark:text-red-300 ring-1 ring-red-500/30'
                  : 'opacity-50 hover:opacity-80 border-transparent bg-slate-50 dark:bg-slate-900 text-muted-foreground'
              }`}
            >
              <span className='font-bold select-none text-red-500 mr-2'>- Local:</span>
              <span className='whitespace-pre-wrap'>{localCard?.answer || '(empty)'}</span>
            </div>
            <div
              onClick={() => setAnswerChoice('cloud')}
              className={`p-2 rounded-md cursor-pointer border transition-all ${
                answerChoice === 'cloud'
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500/30'
                  : 'opacity-50 hover:opacity-80 border-transparent bg-slate-50 dark:bg-slate-900 text-muted-foreground'
              }`}
            >
              <span className='font-bold select-none text-emerald-500 mr-2'>+ Cloud:</span>
              <span className='whitespace-pre-wrap'>{cloudCard?.answer || '(empty)'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Field 3: Dynamic Fields Key-by-Key Conflict */}
      {hasDynamicDiff && allDynamicKeys.length > 0 && (
        <div className='rounded-lg border overflow-hidden' style={{ borderColor: 'var(--border)' }}>
          {/* Dynamic Fields Header with Bulk Actions */}
          <div
            className='flex items-center justify-between px-3 py-1.5 border-b'
            style={{
              background: 'var(--secondary)',
              borderColor: 'var(--border)',
            }}
          >
            <div className='flex items-center gap-1.5'>
              <FaLayerGroup className='h-3 w-3 text-muted-foreground' />
              <span className='font-bold uppercase tracking-wider text-[10px] text-muted-foreground'>
                Dynamic Fields (Granular Key-by-Key)
              </span>
            </div>
            <div className='flex items-center gap-1.5'>
              <button
                onClick={() => handleSelectAllDynamic('local')}
                className='rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-muted-foreground hover:text-foreground hover:bg-slate-200 dark:hover:bg-slate-700 transition-all'
                title='Select Local for all dynamic keys'
              >
                All Local
              </button>
              <button
                onClick={() => handleSelectAllDynamic('cloud')}
                className='rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-muted-foreground hover:text-foreground hover:bg-slate-200 dark:hover:bg-slate-700 transition-all'
                title='Select Cloud for all dynamic keys'
              >
                All Cloud
              </button>
            </div>
          </div>

          {/* List of each individual key in dynamicFields */}
          <div className='divide-y' style={{ borderColor: 'var(--border)' }}>
            {allDynamicKeys.map((key) => {
              const currentChoice = dynamicChoices[key] || 'local';
              const localVal = localCard?.dynamicFields?.[key];
              const cloudVal = cloudCard?.dynamicFields?.[key];
              const isKeyDiffering = (localVal || '').trim() !== (cloudVal || '').trim();

              return (
                <div key={key} className='p-2.5 space-y-1.5'>
                  {/* Key Label & Row Controls */}
                  <div className='flex items-center justify-between'>
                    <span className='font-semibold text-foreground text-[11px]'>
                      {key}
                      {!isKeyDiffering && (
                        <span className='ml-2 text-[9px] text-muted-foreground font-normal'>
                          (Identical)
                        </span>
                      )}
                    </span>
                    <div className='flex items-center gap-1'>
                      <button
                        onClick={() => handleKeyChoice(key, 'local')}
                        className={`rounded-md px-2 py-0.5 text-[10px] font-bold border transition-all ${
                          currentChoice === 'local'
                            ? 'bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/40'
                            : 'text-muted-foreground hover:text-foreground border-transparent'
                        }`}
                      >
                        {currentChoice === 'local' ? '✓ ' : ''}Local
                      </button>
                      <button
                        onClick={() => handleKeyChoice(key, 'cloud')}
                        className={`rounded-md px-2 py-0.5 text-[10px] font-bold border transition-all ${
                          currentChoice === 'cloud'
                            ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/40'
                            : 'text-muted-foreground hover:text-foreground border-transparent'
                        }`}
                      >
                        {currentChoice === 'cloud' ? '✓ ' : ''}Cloud
                      </button>
                    </div>
                  </div>

                  {/* Key Value Comparison Box */}
                  <div className='font-mono text-[10px] space-y-1'>
                    <div
                      onClick={() => handleKeyChoice(key, 'local')}
                      className={`p-1.5 rounded cursor-pointer border transition-all flex items-start gap-1.5 ${
                        currentChoice === 'local'
                          ? 'bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-300 font-semibold'
                          : 'opacity-50 hover:opacity-80 border-transparent text-muted-foreground'
                      }`}
                    >
                      <span className='text-red-500 font-bold select-none shrink-0'>- Local:</span>
                      <span className='whitespace-pre-wrap break-all'>
                        {localVal !== undefined ? localVal : '(not present)'}
                      </span>
                    </div>

                    <div
                      onClick={() => handleKeyChoice(key, 'cloud')}
                      className={`p-1.5 rounded cursor-pointer border transition-all flex items-start gap-1.5 ${
                        currentChoice === 'cloud'
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-semibold'
                          : 'opacity-50 hover:opacity-80 border-transparent text-muted-foreground'
                      }`}
                    >
                      <span className='text-emerald-500 font-bold select-none shrink-0'>+ Cloud:</span>
                      <span className='whitespace-pre-wrap break-all'>
                        {cloudVal !== undefined ? cloudVal : '(not present)'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Live Merged Card Preview Toggle */}
      <div className='pt-1'>
        <button
          onClick={() => setShowPreview((prev) => !prev)}
          className='flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground hover:text-foreground transition-colors'
        >
          {showPreview ? <FaChevronUp className='h-3 w-3' /> : <FaChevronDown className='h-3 w-3' />}
          <span>{showPreview ? 'Hide Merged Card Preview' : 'Preview Merged Card Result'}</span>
        </button>

        {showPreview && (
          <div
            className='mt-2 rounded-lg border p-3 font-mono text-[11px] space-y-1.5'
            style={{
              background: 'var(--secondary)',
              borderColor: 'var(--border)',
            }}
          >
            <div>
              <span className='text-muted-foreground font-sans font-bold uppercase text-[9px] block'>
                Resolved Question:
              </span>
              <div className='text-foreground font-medium'>{mergedCard.question}</div>
            </div>
            <div>
              <span className='text-muted-foreground font-sans font-bold uppercase text-[9px] block'>
                Resolved Answer:
              </span>
              <div className='text-foreground font-medium whitespace-pre-wrap'>{mergedCard.answer}</div>
            </div>
            {Object.keys(mergedCard.dynamicFields || {}).length > 0 && (
              <div>
                <span className='text-muted-foreground font-sans font-bold uppercase text-[9px] block'>
                  Resolved Dynamic Fields:
                </span>
                <pre className='text-foreground text-[10px] overflow-x-auto whitespace-pre-wrap'>
                  {JSON.stringify(mergedCard.dynamicFields, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Feedback Messages */}
      {errorMessage && (
        <div className='rounded-lg bg-red-500/10 border border-red-500/30 p-2 text-xs text-red-600 dark:text-red-400'>
          {errorMessage}
        </div>
      )}

      {resolvedSuccess && (
        <div className='rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-2 text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-2'>
          <FaCheck className='h-3.5 w-3.5 shrink-0' />
          <span>{resolvedSuccess}</span>
        </div>
      )}

      {/* Conflict Resolution Action Buttons */}
      <div className='flex flex-wrap items-center justify-between gap-2 pt-2 border-t' style={{ borderColor: 'var(--border)' }}>
        <div className='text-[11px] text-muted-foreground'>
          Choose where to apply this merged card:
        </div>

        <div className='flex items-center gap-2'>
          {/* Secondary: Apply to Local Only */}
          <button
            onClick={() => handleResolve('local')}
            disabled={isResolving}
            className='flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold shadow-2xs transition-all hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50'
            style={{
              background: 'var(--card)',
              borderColor: 'var(--border)',
            }}
            title='Update Local Repository only with the merged card'
          >
            <FaCloudArrowDown className='h-3 w-3 text-amber-500' />
            <span>Apply to Local</span>
          </button>

          {/* Secondary: Apply to Cloud Only */}
          <button
            onClick={() => handleResolve('cloud')}
            disabled={isResolving}
            className='flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold shadow-2xs transition-all hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50'
            style={{
              background: 'var(--card)',
              borderColor: 'var(--border)',
            }}
            title='Update MongoDB Cloud only with the merged card'
          >
            <FaCloudArrowUp className='h-3 w-3 text-blue-500' />
            <span>Apply to Cloud</span>
          </button>

          {/* Primary: Resolve & Sync Both (Recommended) */}
          <button
            onClick={() => handleResolve('both')}
            disabled={isResolving}
            className='flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 text-xs font-bold shadow-xs transition-all disabled:opacity-50'
            title='Save to both Local and Cloud, completely resolving the conflict'
          >
            {isResolving ? (
              <FaRotate className='h-3 w-3 animate-spin' />
            ) : (
              <FaCheck className='h-3 w-3' />
            )}
            <span>Resolve & Sync Both</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConflictResolverCard;
