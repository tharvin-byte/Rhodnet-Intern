export interface PrincipleItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  summary: string;
  coreRule: string;
  breakdown: {
    label: string;
    description: string;
  }[];
  visualType: 'circle' | 'moat' | 'margin' | 'timeline' | 'management' | 'compounding';
}
