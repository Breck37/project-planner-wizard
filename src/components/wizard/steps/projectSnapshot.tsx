'use client';

import { PartialPlan } from '@/lib/schema';

interface ProjectSnapshotProps {
  plan: PartialPlan;
  onUpdate: (updates: Partial<PartialPlan>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ProjectSnapshot({ plan, onUpdate, onNext, onBack }: ProjectSnapshotProps) {
  const handleChange = (field: keyof NonNullable<PartialPlan['snapshot']>, value: string) => {
    onUpdate({
      snapshot: {
        ...plan.snapshot,
        [field]: value,
      } as PartialPlan['snapshot'],
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-heading">Project Snapshot</h2>
        <p className="text-muted">Give your project a basic identity</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-body">Project Name *</label>
          <input
            type="text"
            value={plan.snapshot?.name || ''}
            onChange={e => handleChange('name', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="My Awesome Project"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-body">Project Type *</label>
          <input
            type="text"
            value={plan.snapshot?.type || ''}
            onChange={e => handleChange('type', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Web app, Mobile app, CLI tool"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-body">Status *</label>
          <select
            value={plan.snapshot?.status || 'idea'}
            onChange={e => handleChange('status', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="idea">Idea</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-body">One-liner Description *</label>
          <textarea
            value={plan.snapshot?.oneLiner || ''}
            onChange={e => handleChange('oneLiner', e.target.value)}
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="A brief, compelling description of what this project does"
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
