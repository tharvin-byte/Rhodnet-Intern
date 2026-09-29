import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type { ReactNode } from 'react';
import { StoryContext } from './StoryContextInstance';
import type { SectionId, StoryContextType } from '../types/story';

const SECTION_IDS: readonly SectionId[] = ['who-am-i', 'compounding', 'principles', 'vault'];

export const StoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeSection, setActiveSection] = useState<SectionId>('who-am-i');
  const [vaultUnlocked, setVaultUnlocked] = useState<boolean>(false);
  const [expandedPrincipleId, setExpandedPrincipleId] = useState<string | null>('circle-of-competence');

  // Single unified IntersectionObserver to sync active section efficiently without scroll polling
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
            const id = entry.target.id as SectionId;
            setActiveSection(id);
            if (id === 'vault') {
              setVaultUnlocked(true);
            }
          }
        }
      },
      {
        threshold: [0.2, 0.5],
        rootMargin: '-10% 0px -40% 0px',
      }
    );

    SECTION_IDS.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const unlockVault = useCallback(() => {
    setVaultUnlocked(true);
    const vaultElement = document.getElementById('vault');
    if (vaultElement) {
      vaultElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const scrollToSection = useCallback((sectionId: SectionId) => {
    if (sectionId === 'vault') {
      setVaultUnlocked(true);
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Memoize context value so consuming components don't re-render on unrelated state ticks
  const contextValue = useMemo<StoryContextType>(
    () => ({
      activeSection,
      setActiveSection,
      vaultUnlocked,
      unlockVault,
      expandedPrincipleId,
      setExpandedPrincipleId,
      scrollToSection,
    }),
    [activeSection, vaultUnlocked, expandedPrincipleId, unlockVault, scrollToSection]
  );

  return (
    <StoryContext.Provider value={contextValue}>
      {children}
    </StoryContext.Provider>
  );
};
