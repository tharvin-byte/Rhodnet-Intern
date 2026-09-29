export interface WhoAmIMilestone {
  id: string;
  year?: string;
  epoch: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  detailQuote?: string;
}

export interface CompoundingChapter {
  id: string;
  chapterNumber: string;
  title: string;
  period: string;
  age: string;
  headline: string;
  story: string;
  keyTakeaway: string;
  metricLabel?: string;
  metricValue?: string;
}
