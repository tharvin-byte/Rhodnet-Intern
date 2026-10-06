import { createContext } from 'react';
import type { StoryContextType } from '../types/story';

export const StoryContext = createContext<StoryContextType | undefined>(undefined);
