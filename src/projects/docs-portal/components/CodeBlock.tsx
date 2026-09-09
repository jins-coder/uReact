import React from 'react';
import { TorchCode } from './TorchCode';

export interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
}

export function CodeBlock({
  code,
  language = 'tsx',
  title,
  showLineNumbers = true,
  highlightLines = []
}: CodeBlockProps) {
  return (
    <TorchCode
      code={code}
      title={title || language.toUpperCase()}
      highlightLines={highlightLines}
    />
  );
}
