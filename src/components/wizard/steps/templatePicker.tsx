"use client";

import { templates } from "@/lib/templates";
import { PartialPlan } from "@/lib/schema";

interface TemplatePickerProps {
  plan: PartialPlan;
  onUpdate: (updates: Partial<PartialPlan>) => void;
  onNext: () => void;
}

export default function TemplatePicker({
  plan,
  onUpdate,
  onNext,
}: TemplatePickerProps) {
  const handleSelect = (templateId: PartialPlan["templateId"]) => {
    onUpdate({ templateId });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-heading">
          Choose Your Template
        </h2>
        <p className="text-muted">
          Select the type of project you're planning
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => handleSelect(template.id)}
            className={`p-6 rounded-lg border-2 text-left transition-all hover:shadow-md ${
              plan.templateId === template.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="text-4xl mb-3">{template.icon}</div>
            <h3 className="text-lg font-semibold mb-2 text-heading">
              {template.name}
            </h3>
            <p className="text-sm text-muted">{template.description}</p>
          </button>
        ))}
      </div>

      <div className="flex justify-end">
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
