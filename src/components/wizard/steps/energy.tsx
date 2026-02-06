'use client';

import { PartialPlan } from '@/lib/schema';

interface EnergyProps {
  plan: PartialPlan;
  onUpdate: (updates: Partial<PartialPlan>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Energy({ plan, onUpdate, onNext, onBack }: EnergyProps) {
  const handleChange = (value: string) => {
    onUpdate({
      energy: {
        profile: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-heading">Energy Profile</h2>
        <p className="text-muted">What kind of effort and excitement does this project require?</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-body">Describe the energy profile *</label>
          <textarea
            value={plan.energy?.profile || ''}
            onChange={e => handleChange(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Quick sprint, steady marathon, exploratory adventure, etc."
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
