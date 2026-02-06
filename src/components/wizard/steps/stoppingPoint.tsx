'use client';

import { PartialPlan } from '@/lib/schema';

interface StoppingPointProps {
  plan: PartialPlan;
  onUpdate: (updates: Partial<PartialPlan>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StoppingPoint({ plan, onUpdate, onNext, onBack }: StoppingPointProps) {
  const handleChange = (value: string) => {
    onUpdate({
      stoppingPoint: {
        doneWhen: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-heading">Stopping Point</h2>
        <p className="text-muted">Define when you'll consider this project complete</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-body">Done when... *</label>
          <textarea
            value={plan.stoppingPoint?.doneWhen || ''}
            onChange={e => handleChange(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="What specific condition or milestone marks the end of this project?"
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
