'use client';

import { PartialPlan } from '@/lib/schema';
import { generateMarkdown } from '@/lib/markdown-generator';

interface PlanPreviewProps {
  plan: PartialPlan;
}

export default function PlanPreview({ plan }: PlanPreviewProps) {
  const markdown = generateMarkdown(plan);

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-gray-200 pb-4 mb-4">
        <h2 className="text-xl font-bold">Live Preview</h2>
        <p className="text-sm text-muted">Your plan updates as you type</p>
      </div>
      <div className="flex-1 overflow-auto">
        <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-body bg-gray-50 p-4 rounded-lg">
          {markdown}
        </pre>
      </div>
    </div>
  );
}
