'use client';

import { PartialPlan } from '@/lib/schema';

interface PersonalFrictionProps {
  plan: PartialPlan;
  onUpdate: (updates: Partial<PartialPlan>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function PersonalFriction({ plan, onUpdate, onNext, onBack }: PersonalFrictionProps) {
  const handleChange = (field: keyof NonNullable<PartialPlan['friction']>, value: string) => {
    onUpdate({
      friction: {
        ...plan.friction,
        [field]: value,
      } as PartialPlan['friction'],
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-heading">Personal Friction</h2>
        <p className="text-muted">What problem are you solving for yourself?</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-body">What's the problem? *</label>
          <textarea
            value={plan.friction?.problem || ''}
            onChange={e => handleChange('problem', e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Describe the friction or pain point you experience"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-body">When does this happen? *</label>
          <textarea
            value={plan.friction?.when || ''}
            onChange={e => handleChange('when', e.target.value)}
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="In what context or situation do you encounter this problem?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-body">Why does it matter? *</label>
          <textarea
            value={plan.friction?.why || ''}
            onChange={e => handleChange('why', e.target.value)}
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="What's the impact of this problem on you or others?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-body">Current workaround? *</label>
          <textarea
            value={plan.friction?.workaround || ''}
            onChange={e => handleChange('workaround', e.target.value)}
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="How are you currently dealing with this problem?"
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
