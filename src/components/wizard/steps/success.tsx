'use client';

import { PartialPlan } from '@/lib/schema';

interface SuccessProps {
  plan: PartialPlan;
  onUpdate: (updates: Partial<PartialPlan>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Success({ plan, onUpdate, onNext, onBack }: SuccessProps) {
  const handleChange = (value: string) => {
    onUpdate({
      success: {
        definition: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-heading">Success Definition</h2>
        <p className="text-muted">How will you know when you've succeeded?</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-body">What does success look like? *</label>
          <textarea
            value={plan.success?.definition || ''}
            onChange={e => handleChange(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Define measurable or observable outcomes that indicate success"
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
