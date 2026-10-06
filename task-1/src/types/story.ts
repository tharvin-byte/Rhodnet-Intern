export type SectionId = 'who-am-i' | 'compounding' | 'principles' | 'vault';

export interface StoryContextType {
  activeSection: SectionId;
  setActiveSection: (section: SectionId) => void;
  vaultUnlocked: boolean;
  unlockVault: () => void;
  expandedPrincipleId: string | null;
  setExpandedPrincipleId: (id: string | null) => void;
  scrollToSection: (sectionId: SectionId) => void;
}
