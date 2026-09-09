import React from 'react';
import { ReactDevCodeBlock } from './ReactDevCodeBlock';

export interface TorchCodeProps {
  code: string;
  language?: string;
  title?: string;
  badge?: string;
  badgeType?: 'bad' | 'good' | 'emerald' | 'neutral';
  highlightLines?: number[];
  showLineNumbers?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function TorchCode({
  code,
  language = 'tsx',
  title,
  badge,
  badgeType = 'neutral',
  highlightLines = [],
  showLineNumbers = true,
  className = '',
  style = {}
}: TorchCodeProps) {
  return (
    <ReactDevCodeBlock
      code={code}
      language={language}
      title={title}
      badge={badge}
      badgeType={badgeType}
      highlightLines={highlightLines}
      showLineNumbers={showLineNumbers}
      className={className}
      style={style}
    />
  );
}
