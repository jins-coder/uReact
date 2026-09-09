import React from 'react';
import { ReactDevCodeBlock } from './ReactDevCodeBlock';

export interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  badge?: string;
  badgeType?: 'bad' | 'good' | 'emerald' | 'neutral';
}

export function CodeBlock({
  code,
  language = 'tsx',
  title,
  showLineNumbers = false,
  highlightLines = [],
  badge,
  badgeType = 'neutral'
}: CodeBlockProps) {
  return (
    <ReactDevCodeBlock
      code={code}
      language={language}
      title={title}
      showLineNumbers={showLineNumbers}
      highlightLines={highlightLines}
      badge={badge}
      badgeType={badgeType}
    />
  );
}
