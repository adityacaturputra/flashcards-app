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
import { AccentPreference } from '@/types/phonemic';
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
  toggleSpeech: (field: TField, text: string, e?: React.MouseEvent) => void;
  /** Stop any active speech playback */
  stopSpeech: () => void;
  /**
   * Factory function returning DOM button props (onClick, title, aria-label) safe for spreading directly onto <button>
   */
  getAudioButtonProps: (
    field: TField,
    text: string,
    label?: string
  ) => AudioButtonDomProps;
  /**
   * Factory function that produces standardized accessible button props and isPlaying flag
   */
  createAudioButtonProps: (
    field: TField,
    text: string,
    label?: string
  ) => AudioButtonProps;
}

export function useSpeechPlayback<TField extends string = FlashcardField>({
  resetTriggers = [],
  accent,
  rate,
  pitch,
}: UseSpeechPlaybackOptions = {}): SpeechPlaybackReturn<TField> {
  const [activeField, setActiveField] = useState<TField | null>(null);

  // Stable ref to prevent race conditions during rapid clicks
  const activeFieldRef = useRef<TField | null>(null);
  activeFieldRef.current = activeField;

  const handleStopSpeech = useCallback(() => {
    stopSpeech();
    setActiveField(null);
  }, []);

  // Stop audio on unmount
  useEffect(() => {
    return () => {
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

  const toggleSpeech = useCallback(
    (field: TField, text: string, e?: React.MouseEvent) => {
      if (e) {
        e.stopPropagation();
      }

      if (activeFieldRef.current === field) {
        handleStopSpeech();
        return;
      }

      setActiveField(field);
      playSpeech({
        text,
        accent,
        rate,
        pitch,
        onStart: () => setActiveField(field),
        onEnd: () => {
          if (activeFieldRef.current === field) {
            setActiveField(null);
          }
        },
        onError: () => {
          if (activeFieldRef.current === field) {
            setActiveField(null);
          }
        },
      });
    },
    [accent, rate, pitch, handleStopSpeech]
  );

  const getAudioButtonProps = useCallback(
    (field: TField, text: string, label?: string): AudioButtonDomProps => {
      const playing = activeField === field;
      const descriptor = label || field;
      return {
        onClick: (e: React.MouseEvent) => toggleSpeech(field, text, e),
        ...getSpeechButtonAriaProps(playing, descriptor),
      };
    },
    [activeField, toggleSpeech]
  );

  const createAudioButtonProps = useCallback(
    (field: TField, text: string, label?: string): AudioButtonProps => {
      const playing = activeField === field;
      return {
        ...getAudioButtonProps(field, text, label),
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
