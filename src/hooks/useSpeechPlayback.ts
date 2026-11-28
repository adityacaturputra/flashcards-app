/**
 * src/hooks/useSpeechPlayback.ts
 * Unified React hook for managing in-browser speech playback with lifecycle safety,
 * reactive reset triggers, and an audio button props factory.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  playSpeech,
  stopSpeech,
  getSpeechButtonAriaProps,
  SpeechButtonAriaProps,
} from '@/utils/speechSynthesis';
import {
  stopNeuralAudio,
  tryPlayNeuralSpeech,
} from '@/utils/neuralAudioCache';
import { AccentPreference } from '@/types/phonemic';
import { useAccentContext } from '@/context/accentContext';
import { FlashcardField } from '@/types/flashcard';

export { getSpeechButtonAriaProps };
export type { SpeechButtonAriaProps };

export interface UseSpeechPlaybackOptions {
  /**
   * Array of reactive dependencies that, when changed, should immediately stop speech and reset state
   * (e.g. [flashcard._id], [currentIndex], [item?.id, isOpen])
   */
  resetTriggers?: unknown[];
  /**
   * Optional flashcard ID for instant pre-generated Neural MP3 lookup in /audio/commute/manifest.json
   */
  cardId?: string;
  /**
   * Prefer Microsoft Neural MP3 (static manifest -> /api/commute/tts) before Web Speech API fallback (default: true)
   */
  preferNeural?: boolean;
  /**
   * Accent preference (defaults to General American US)
   */
  accent?: AccentPreference;
  /**
   * Speech speed rate (default: 0.88)
   */
  rate?: number;
  /**
   * Speech pitch (default: 1.0)
   */
  pitch?: number;
}

export interface AudioButtonDomProps extends SpeechButtonAriaProps {
  onClick: (e: React.MouseEvent) => void;
}

export interface AudioButtonProps extends AudioButtonDomProps {
  isPlaying: boolean;
}

export interface SpeechPlaybackReturn<TField extends string = FlashcardField> {
  /** Currently playing field identifier, or null if idle */
  activeField: TField | null;
  /** Check if a specific field is playing, or if any field is playing when called with no arguments */
  isPlaying: (field?: TField) => boolean;
  /** Toggle speech playback for a specific field and text */
  toggleSpeech: (
    field: TField,
    text: string,
    e?: React.MouseEvent,
    overrideCardId?: string
  ) => void;
  /** Stop any active speech playback */
  stopSpeech: () => void;
  /**
   * Factory function returning DOM button props (onClick, title, aria-label) safe for spreading directly onto <button>
   */
  getAudioButtonProps: (
    field: TField,
    text: string,
    label?: string,
    overrideCardId?: string
  ) => AudioButtonDomProps;
  /**
   * Factory function that produces standardized accessible button props and isPlaying flag
   */
  createAudioButtonProps: (
    field: TField,
    text: string,
    label?: string,
    overrideCardId?: string
  ) => AudioButtonProps;
}

export function useSpeechPlayback<TField extends string = FlashcardField>({
  resetTriggers = [],
  cardId,
  preferNeural = true,
  accent: explicitAccent,
  rate,
  pitch,
}: UseSpeechPlaybackOptions = {}): SpeechPlaybackReturn<TField> {
  const { accent: globalAccent } = useAccentContext();
  const effectiveAccent = explicitAccent ?? globalAccent;
  const [activeField, setActiveField] = useState<TField | null>(null);

  // Stable refs to prevent race conditions during rapid clicks or async Neural audio fetch
  const activeFieldRef = useRef<TField | null>(null);
  activeFieldRef.current = activeField;
  const requestSeqRef = useRef(0);

  const handleStopSpeech = useCallback(() => {
    requestSeqRef.current += 1;
    stopNeuralAudio();
    stopSpeech();
    setActiveField(null);
  }, []);

  // Stop audio on unmount
  useEffect(() => {
    return () => {
      requestSeqRef.current += 1;
      stopNeuralAudio();
      stopSpeech();
    };
  }, []);

  // Stop and reset audio whenever resetTriggers change
  useEffect(() => {
    handleStopSpeech();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, resetTriggers);

  const isPlaying = useCallback(
    (field?: TField): boolean => {
      if (field !== undefined) {
        return activeField === field;
      }
      return activeField !== null;
    },
    [activeField]
  );

  const playWebSpeechFallback = useCallback(
    (field: TField, text: string, seq: number) => {
      if (requestSeqRef.current !== seq) return;
      playSpeech({
        text,
        accent: effectiveAccent,
        rate,
        pitch,
        onStart: () => {
          if (requestSeqRef.current === seq) {
            setActiveField(field);
          }
        },
        onEnd: () => {
          if (requestSeqRef.current === seq && activeFieldRef.current === field) {
            setActiveField(null);
          }
        },
        onError: () => {
          if (requestSeqRef.current === seq && activeFieldRef.current === field) {
            setActiveField(null);
          }
        },
      });
    },
    [effectiveAccent, rate, pitch]
  );

  const toggleSpeech = useCallback(
    (field: TField, text: string, e?: React.MouseEvent, overrideCardId?: string) => {
      if (e) {
        e.stopPropagation();
      }

      if (activeFieldRef.current === field) {
        handleStopSpeech();
        return;
      }

      stopNeuralAudio();
      stopSpeech();
      const seq = ++requestSeqRef.current;
      setActiveField(field);

      if (!preferNeural) {
        playWebSpeechFallback(field, text, seq);
        return;
      }

      const resolvedCardId = overrideCardId ?? cardId;
      void tryPlayNeuralSpeech({
        cardId: resolvedCardId,
        uiField: field,
        text,
        accent: effectiveAccent,
        onStart: () => {
          if (requestSeqRef.current === seq) {
            setActiveField(field);
          }
        },
        onEnd: () => {
          if (requestSeqRef.current === seq && activeFieldRef.current === field) {
            setActiveField(null);
          }
        },
        onError: () => {
          if (requestSeqRef.current === seq && activeFieldRef.current === field) {
            setActiveField(null);
          }
        },
      }).then((started) => {
        if (!started && requestSeqRef.current === seq) {
          playWebSpeechFallback(field, text, seq);
        }
      });
    },
    [cardId, preferNeural, effectiveAccent, handleStopSpeech, playWebSpeechFallback]
  );

  const getAudioButtonProps = useCallback(
    (
      field: TField,
      text: string,
      label?: string,
      overrideCardId?: string
    ): AudioButtonDomProps => {
      const playing = activeField === field;
      const descriptor = label || field;
      return {
        onClick: (e: React.MouseEvent) => toggleSpeech(field, text, e, overrideCardId),
        ...getSpeechButtonAriaProps(playing, descriptor),
      };
    },
    [activeField, toggleSpeech]
  );

  const createAudioButtonProps = useCallback(
    (
      field: TField,
      text: string,
      label?: string,
      overrideCardId?: string
    ): AudioButtonProps => {
      const playing = activeField === field;
      return {
        ...getAudioButtonProps(field, text, label, overrideCardId),
        isPlaying: playing,
      };
    },
    [activeField, getAudioButtonProps]
  );

  return {
    activeField,
    isPlaying,
    toggleSpeech,
    stopSpeech: handleStopSpeech,
    getAudioButtonProps,
    createAudioButtonProps,
  };
}
