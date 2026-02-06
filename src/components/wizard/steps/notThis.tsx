'use client';

import { PartialPlan } from '@/lib/schema';
import { useState } from 'react';

interface NotThisProps {
  plan: PartialPlan;
  onUpdate: (updates: Partial<PartialPlan>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function NotThis({ plan, onUpdate, onNext, onBack }: NotThisProps) {
  const [currentItem, setCurrentItem] = useState('');

  const handleAdd = () => {
    if (currentItem.trim()) {
      onUpdate({
        notThis: [...(plan.notThis || []), currentItem.trim()],
      });
      setCurrentItem('');
    }
  };

  const handleRemove = (index: number) => {
    const updated = [...(plan.notThis || [])];
    updated.splice(index, 1);
    onUpdate({ notThis: updated });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-heading">This is NOT...</h2>
        <p className="text-muted">Define scope guardrails to keep your project focused</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-body">Add a scope guardrail *</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={currentItem}
              onChange={e => setCurrentItem(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., This is NOT a social network"
            />
            <button
              onClick={handleAdd}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add
            </button>
          </div>
        </div>

        {plan.notThis && plan.notThis.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-body">Scope guardrails:</p>
            <ul className="space-y-2">
              {plan.notThis.map((item, index) => (
                <li key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span>{item}</span>
                  <button
                    onClick={() => handleRemove(index)}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
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
