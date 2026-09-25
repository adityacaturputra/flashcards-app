'use client';
import React, { useState, useMemo } from 'react';
import {
  SyncCardDiff,
  SyncSource,
  SyncTarget,
  SYNC_SOURCE,
} from '@/types/sync';
import { Flashcard, Progression } from '@/types/flashcard';
import {
  ConflictResolverHeader,
  ProgressionConflictSection,
  TextFieldConflictSection,
  DynamicFieldsConflictSection,
  MergedCardPreview,
  ConflictResolverFooter,
  CategoriesConflictSection,
  CategoryConflictChoice,
} from './conflictResolver';

interface ConflictResolverCardProps {
  item: SyncCardDiff;
  onResolved?: (cardId: string) => void;
}

export const ConflictResolverCard: React.FC<ConflictResolverCardProps> = ({
  item,
  onResolved,
}) => {
  const localCard = item.localCard;
  const cloudCard = item.cloudCard;

  // Track category arrays and check if they differ
  const localCats = useMemo(
    () => Array.from(new Set(localCard?.categories || [])).sort(),
    [localCard?.categories],
  );
  const cloudCats = useMemo(
    () => Array.from(new Set(cloudCard?.categories || [])).sort(),
    [cloudCard?.categories],
  );
  const hasCategoryDiff = useMemo(() => {
    if (localCats.length !== cloudCats.length) return true;
    return localCats.some((cat, i) => cat !== cloudCats[i]);
  }, [localCats, cloudCats]);

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
  const [questionChoice, setQuestionChoice] = useState<SyncSource>(SYNC_SOURCE.LOCAL);
  const [answerChoice, setAnswerChoice] = useState<SyncSource>(SYNC_SOURCE.LOCAL);
  const [progressionChoice, setProgressionChoice] = useState<SyncSource>(SYNC_SOURCE.LOCAL);
  const [categoryChoice, setCategoryChoice] = useState<CategoryConflictChoice>(SYNC_SOURCE.LOCAL);
  const [dynamicChoices, setDynamicChoices] = useState<Record<string, SyncSource>>(() => {
    const initial: Record<string, SyncSource> = {};
    allDynamicKeys.forEach((k) => {
      initial[k] = SYNC_SOURCE.LOCAL;
    });
    return initial;
  });

  const [showPreview, setShowPreview] = useState(false);
  const [isResolving, setIsResolving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resolvedSuccess, setResolvedSuccess] = useState<string | null>(null);

  // Bulk selection shortcuts
  const handleSelectAll = (choice: SyncSource) => {
    setQuestionChoice(choice);
    setAnswerChoice(choice);
    setProgressionChoice(choice);
    setCategoryChoice(choice);
    const updated: Record<string, SyncSource> = {};
    allDynamicKeys.forEach((k) => {
      updated[k] = choice;
    });
    setDynamicChoices(updated);
  };

  const handleSelectAllDynamic = (choice: SyncSource) => {
    const updated: Record<string, SyncSource> = {};
    allDynamicKeys.forEach((k) => {
      updated[k] = choice;
    });
    setDynamicChoices(updated);
  };

  const handleKeyChoice = (key: string, choice: SyncSource) => {
    setDynamicChoices((prev) => ({
      ...prev,
      [key]: choice,
    }));
  };

  // Build the live merged flashcard object
  const mergedCard: Flashcard = useMemo(() => {
    const chosenQuestion =
      questionChoice === SYNC_SOURCE.LOCAL
        ? localCard?.question || item.question
        : cloudCard?.question || item.question;

    const chosenAnswer =
      answerChoice === SYNC_SOURCE.LOCAL
        ? localCard?.answer || ''
        : cloudCard?.answer || '';

    const chosenProgression =
      progressionChoice === SYNC_SOURCE.LOCAL
        ? localCard?.progression ?? Progression.New
        : cloudCard?.progression ?? Progression.New;

    const chosenSrsSource = progressionChoice === SYNC_SOURCE.LOCAL ? localCard : cloudCard;
    const chosenReps = chosenSrsSource?.repetitions ?? 0;
    const chosenInterval = chosenSrsSource?.interval ?? 0;
    const chosenEase = chosenSrsSource?.easeFactor ?? 2.5;
    const chosenLapses = chosenSrsSource?.lapses ?? 0;
    const chosenNextReview = chosenSrsSource?.nextReviewDate ?? new Date();
    const chosenLastReviewed = chosenSrsSource?.lastReviewedDate;

    const chosenDynamic: Record<string, string> = {};
    allDynamicKeys.forEach((k) => {
      const choice = dynamicChoices[k] || SYNC_SOURCE.LOCAL;
      const val =
        choice === SYNC_SOURCE.LOCAL
          ? localCard?.dynamicFields?.[k]
          : cloudCard?.dynamicFields?.[k];
      if (val !== undefined && val !== null && val !== '') {
        chosenDynamic[k] = val;
      }
    });

    let chosenCategories = localCard?.categories || cloudCard?.categories || [];
    if (hasCategoryDiff) {
      if (categoryChoice === SYNC_SOURCE.LOCAL) {
        chosenCategories = localCard?.categories || [];
      } else if (categoryChoice === SYNC_SOURCE.CLOUD) {
        chosenCategories = cloudCard?.categories || [];
      } else {
        // Union / merge both
        chosenCategories = Array.from(
          new Set([
            ...(localCard?.categories || []),
            ...(cloudCard?.categories || []),
          ]),
        );
      }
    }

    const base = localCard || cloudCard!;
    return {
      ...base,
      _id: item.id,
      question: chosenQuestion,
      answer: chosenAnswer,
      progression: chosenProgression,
      repetitions: chosenReps,
      interval: chosenInterval,
      easeFactor: chosenEase,
      lapses: chosenLapses,
      nextReviewDate: chosenNextReview,
      lastReviewedDate: chosenLastReviewed,
      dynamicFields: chosenDynamic,
      categories: chosenCategories,
    };
  }, [
    questionChoice,
    answerChoice,
    progressionChoice,
    categoryChoice,
    hasCategoryDiff,
    dynamicChoices,
    localCard,
    cloudCard,
    item.id,
    item.question,
    allDynamicKeys,
  ]);

  // Execute conflict resolution request
  const handleResolve = async (target: SyncTarget) => {
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
  const hasProgressionDiff =
    localCard?.progression !== cloudCard?.progression ||
    (localCard?.interval ?? 0) !== (cloudCard?.interval ?? 0) ||
    Math.abs((localCard?.easeFactor ?? 2.5) - (cloudCard?.easeFactor ?? 2.5)) >= 0.01 ||
    (localCard?.repetitions ?? 0) !== (cloudCard?.repetitions ?? 0);

  const isAllLocalActive =
    questionChoice === SYNC_SOURCE.LOCAL &&
    answerChoice === SYNC_SOURCE.LOCAL &&
    progressionChoice === SYNC_SOURCE.LOCAL &&
    (!hasCategoryDiff || categoryChoice === SYNC_SOURCE.LOCAL) &&
    Object.values(dynamicChoices).every((c) => c === SYNC_SOURCE.LOCAL);

  const isAllCloudActive =
    questionChoice === SYNC_SOURCE.CLOUD &&
    answerChoice === SYNC_SOURCE.CLOUD &&
    progressionChoice === SYNC_SOURCE.CLOUD &&
    (!hasCategoryDiff || categoryChoice === SYNC_SOURCE.CLOUD) &&
    Object.values(dynamicChoices).every((c) => c === SYNC_SOURCE.CLOUD);

  return (
    <div
      className='rounded-xl border p-3 sm:p-4 space-y-3 sm:space-y-3.5 text-xs transition-all shadow-xs'
      style={{
        background: 'var(--card)',
        borderColor: 'var(--border)',
      }}
    >
      {/* Header: Title, Conflict Badge & Bulk Card Shortcuts */}
      <ConflictResolverHeader
        question={item.question}
        isResolving={isResolving}
        isAllLocalActive={isAllLocalActive}
        isAllCloudActive={isAllCloudActive}
        onSelectAll={handleSelectAll}
      />

      {/* Field: Difficulty / Progression & Anki SRS (if differing) */}
      {hasProgressionDiff && (
        <ProgressionConflictSection
          localCard={localCard}
          cloudCard={cloudCard}
          progressionChoice={progressionChoice}
          onChoiceChange={setProgressionChoice}
        />
      )}

      {/* Field: Categories Conflict (if differing) */}
      {hasCategoryDiff && (
        <CategoriesConflictSection
          localCategories={localCard?.categories}
          cloudCategories={cloudCard?.categories}
          choice={categoryChoice}
          onChoiceChange={setCategoryChoice}
        />
      )}

      {/* Field 1: Question Conflict (if differing) */}
      {hasQuestionDiff && (
        <TextFieldConflictSection
          label='Question'
          localValue={localCard?.question}
          cloudValue={cloudCard?.question}
          choice={questionChoice}
          onChoiceChange={setQuestionChoice}
        />
      )}

      {/* Field 2: Answer Conflict (if differing) */}
      {hasAnswerDiff && (
        <TextFieldConflictSection
          label='Answer'
          localValue={localCard?.answer}
          cloudValue={cloudCard?.answer}
          choice={answerChoice}
          onChoiceChange={setAnswerChoice}
          isPreWrap
        />
      )}

      {/* Field 3: Dynamic Fields Key-by-Key Conflict */}
      {hasDynamicDiff && allDynamicKeys.length > 0 && (
        <DynamicFieldsConflictSection
          allDynamicKeys={allDynamicKeys}
          localDynamicFields={localCard?.dynamicFields}
          cloudDynamicFields={cloudCard?.dynamicFields}
          dynamicChoices={dynamicChoices}
          onSelectAllDynamic={handleSelectAllDynamic}
          onKeyChoiceChange={handleKeyChoice}
        />
      )}

      {/* Live Merged Card Preview Toggle */}
      <MergedCardPreview
        mergedCard={mergedCard}
        showPreview={showPreview}
        onTogglePreview={() => setShowPreview((prev) => !prev)}
      />

      {/* Feedback Messages & Resolution Action Buttons */}
      <ConflictResolverFooter
        isResolving={isResolving}
        errorMessage={errorMessage}
        resolvedSuccess={resolvedSuccess}
        onResolve={handleResolve}
      />
    </div>
  );
};

export default ConflictResolverCard;
