'use client';

interface WizardSidebarProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

const steps = [
  { id: 1, name: 'Template' },
  { id: 2, name: 'Snapshot' },
  { id: 3, name: 'Friction' },
  { id: 4, name: 'Not This' },
  { id: 5, name: 'SBV' },
  { id: 6, name: 'User' },
  { id: 7, name: 'Success' },
  { id: 8, name: 'Parking Lot' },
  { id: 9, name: 'Energy' },
  { id: 10, name: 'Stopping Point' },
  { id: 11, name: 'Export' },
];

export default function WizardSidebar({ currentStep, onStepClick }: WizardSidebarProps) {
  return (
    <nav className="space-y-1">
      {steps.map(step => (
        <button
          key={step.id}
          onClick={() => onStepClick(step.id)}
          className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
            currentStep === step.id
              ? 'bg-blue-600 text-white font-semibold'
              : 'hover:bg-gray-100 text-body'
          }`}
        >
          <span className="text-sm">
            {step.id}. {step.name}
          </span>
        </button>
      ))}
    </nav>
  );
}
