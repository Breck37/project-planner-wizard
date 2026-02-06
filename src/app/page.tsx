'use client';

import { useState } from 'react';
import { defaultPlan } from '@/lib/templates';
import { PartialPlan } from '@/lib/schema';
import WizardSidebar from '@/components/wizard/wizardSidebar';
import PlanPreview from '@/components/wizard/planPreview';
import TemplatePicker from '@/components/wizard/steps/templatePicker';
import ProjectSnapshot from '@/components/wizard/steps/projectSnapshot';
import PersonalFriction from '@/components/wizard/steps/personalFriction';
import NotThis from '@/components/wizard/steps/notThis';
import SBV from '@/components/wizard/steps/sbv';
import User from '@/components/wizard/steps/user';
import Success from '@/components/wizard/steps/success';
import ParkingLot from '@/components/wizard/steps/parkingLot';
import Energy from '@/components/wizard/steps/energy';
import StoppingPoint from '@/components/wizard/steps/stoppingPoint';
import Export from '@/components/wizard/steps/export';

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [plan, setPlan] = useState<PartialPlan>(defaultPlan);

  const updatePlan = (updates: Partial<PartialPlan>) => {
    setPlan(prev => ({ ...prev, ...updates }));
  };

  const goToNextStep = () => {
    if (currentStep < 11) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <TemplatePicker plan={plan} onUpdate={updatePlan} onNext={goToNextStep} />;
      case 2:
        return <ProjectSnapshot plan={plan} onUpdate={updatePlan} onNext={goToNextStep} onBack={goToPrevStep} />;
      case 3:
        return <PersonalFriction plan={plan} onUpdate={updatePlan} onNext={goToNextStep} onBack={goToPrevStep} />;
      case 4:
        return <NotThis plan={plan} onUpdate={updatePlan} onNext={goToNextStep} onBack={goToPrevStep} />;
      case 5:
        return <SBV plan={plan} onUpdate={updatePlan} onNext={goToNextStep} onBack={goToPrevStep} />;
      case 6:
        return <User plan={plan} onUpdate={updatePlan} onNext={goToNextStep} onBack={goToPrevStep} />;
      case 7:
        return <Success plan={plan} onUpdate={updatePlan} onNext={goToNextStep} onBack={goToPrevStep} />;
      case 8:
        return <ParkingLot plan={plan} onUpdate={updatePlan} onNext={goToNextStep} onBack={goToPrevStep} />;
      case 9:
        return <Energy plan={plan} onUpdate={updatePlan} onNext={goToNextStep} onBack={goToPrevStep} />;
      case 10:
        return <StoppingPoint plan={plan} onUpdate={updatePlan} onNext={goToNextStep} onBack={goToPrevStep} />;
      case 11:
        return <Export plan={plan} onBack={goToPrevStep} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-heading">Project Planner Wizard</h1>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Left sidebar with step navigation */}
        <aside className="w-64 bg-white border-r border-gray-200 p-6 overflow-y-auto">
          <WizardSidebar currentStep={currentStep} onStepClick={setCurrentStep} />
        </aside>

        {/* Main content area with wizard steps */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-3xl mx-auto">
            {renderStep()}
          </div>
        </main>

        {/* Right panel with live preview */}
        <aside className="w-96 bg-white border-l border-gray-200 p-6 overflow-y-auto">
          <PlanPreview plan={plan} />
        </aside>
      </div>
    </div>
  );
}
