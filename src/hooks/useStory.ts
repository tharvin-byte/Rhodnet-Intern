import { useContext } from 'react';
import { StoryContext } from '../context/StoryContextInstance';
import type { StoryContextType, SectionId } from '../types/story';

export type { SectionId, StoryContextType };

export const useStory = (): StoryContextType => {
  const context = useContext(StoryContext);
  if (!context) {
    throw new Error('useStory must be used within a StoryProvider');
  }
  return context;
};
