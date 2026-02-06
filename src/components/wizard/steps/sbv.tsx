'use client';

import { PartialPlan } from '@/lib/schema';

interface SBVProps {
  plan: PartialPlan;
  onUpdate: (updates: Partial<PartialPlan>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function SBV({ plan, onUpdate, onNext, onBack }: SBVProps) {
  const handleChange = (field: keyof NonNullable<PartialPlan['sbv']>, value: string | number) => {
    onUpdate({
      sbv: {
        ...plan.sbv,
        [field]: value,
      } as PartialPlan['sbv'],
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-heading">Smallest Believable Version (SBV)</h2>
        <p className="text-muted">Define the minimal version that still feels complete</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-body">Inputs *</label>
          <textarea
            value={plan.sbv?.inputs || ''}
            onChange={e => handleChange('inputs', e.target.value)}
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="What data or information does the user provide?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-body">Outputs *</label>
          <textarea
            value={plan.sbv?.outputs || ''}
            onChange={e => handleChange('outputs', e.target.value)}
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="What does the user get or achieve?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-body">Workflow *</label>
          <textarea
            value={plan.sbv?.workflow || ''}
            onChange={e => handleChange('workflow', e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Step-by-step: how does the user accomplish the goal?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-body">Estimated Screens *</label>
          <input
            type="number"
            min="1"
            value={plan.sbv?.screensEstimate || 1}
            onChange={e => handleChange('screensEstimate', parseInt(e.target.value) || 1)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-2 border border-gray-400 rounded-lg text-body hover:bg-gray-200 hover:border-gray-500 transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
