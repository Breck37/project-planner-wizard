'use client';

import { PartialPlan } from '@/lib/schema';

interface UserProps {
  plan: PartialPlan;
  onUpdate: (updates: Partial<PartialPlan>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function User({ plan, onUpdate, onNext, onBack }: UserProps) {
  const handleChange = (field: keyof NonNullable<PartialPlan['user']>, value: string) => {
    onUpdate({
      user: {
        ...plan.user,
        [field]: value,
      } as PartialPlan['user'],
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-heading">User</h2>
        <p className="text-muted">Who is this project for?</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-body">For whom? *</label>
          <textarea
            value={plan.user?.forWhom || ''}
            onChange={e => handleChange('forWhom', e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Describe the target user or audience"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-body">Why not someone else? (optional)</label>
          <textarea
            value={plan.user?.whyNotSomeoneElse || ''}
            onChange={e => handleChange('whyNotSomeoneElse', e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="What makes this user specifically the right fit?"
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
