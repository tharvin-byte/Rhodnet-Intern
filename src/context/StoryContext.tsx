import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode, FC } from 'react';

export type SectionId = 'who-am-i' | 'compounding' | 'principles' | 'vault';
export type AllocationTab = 'company' | 'sector' | 'value' | 'ownership';

interface StoryContextType {
  activeSection: SectionId;
  setActiveSection: (section: SectionId) => void;
  readingProgress: number;
  vaultUnlocked: boolean;
  unlockVault: () => void;
  activeAllocationTab: AllocationTab;
  setActiveAllocationTab: (tab: AllocationTab) => void;
  expandedPrincipleId: string | null;
  setExpandedPrincipleId: (id: string | null) => void;
  scrollToSection: (sectionId: SectionId) => void;
}

const StoryContext = createContext<StoryContextType | undefined>(undefined);

export const StoryProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [activeSection, setActiveSection] = useState<SectionId>('who-am-i');
  const [readingProgress, setReadingProgress] = useState<number>(0);
  const [vaultUnlocked, setVaultUnlocked] = useState<boolean>(false);
  const [activeAllocationTab, setActiveAllocationTab] = useState<AllocationTab>('company');
  const [expandedPrincipleId, setExpandedPrincipleId] = useState<string | null>('circle-of-competence');

  // Track overall scroll percentage
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setReadingProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver to sync active section
  useEffect(() => {
    const sectionIds: SectionId[] = ['who-am-i', 'compounding', 'principles', 'vault'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
              setActiveSection(id);
              if (id === 'vault') {
                setVaultUnlocked(true);
              }
            }
          });
        },
        {
          threshold: [0.25, 0.5, 0.75],
          rootMargin: '-10% 0px -40% 0px',
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const unlockVault = () => {
    setVaultUnlocked(true);
    const vaultElement = document.getElementById('vault');
    if (vaultElement) {
      vaultElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (sectionId: SectionId) => {
    if (sectionId === 'vault') {
      setVaultUnlocked(true);
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <StoryContext.Provider
      value={{
        activeSection,
        setActiveSection,
        readingProgress,
        vaultUnlocked,
        unlockVault,
        activeAllocationTab,
        setActiveAllocationTab,
        expandedPrincipleId,
        setExpandedPrincipleId,
        scrollToSection,
      }}
    >
      {children}
    </StoryContext.Provider>
  );
};

export const useStory = (): StoryContextType => {
  const context = useContext(StoryContext);
  if (!context) {
    throw new Error('useStory must be used within a StoryProvider');
  }
  return context;
};
