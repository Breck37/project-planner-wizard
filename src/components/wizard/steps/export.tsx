'use client';

import { PartialPlan } from '@/lib/schema';
import { validatePlanForExport } from '@/lib/validation';
import { generateMarkdown } from '@/lib/markdown-generator';
import { useState } from 'react';

interface ExportProps {
  plan: PartialPlan;
  onBack: () => void;
}

export default function Export({ plan, onBack }: ExportProps) {
  const [isExporting, setIsExporting] = useState(false);
  const validation = validatePlanForExport(plan);

  const handleMarkdownExport = () => {
    const markdown = generateMarkdown(plan);
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${plan.snapshot?.name || 'project-plan'}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePdfExport = async () => {
    setIsExporting(true);
    try {
      const response = await fetch('/api/export-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(plan),
      });

      if (!response.ok) {
        throw new Error('PDF export failed');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${plan.snapshot?.name || 'project-plan'}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('PDF export failed:', error);
      alert('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handlePptxExport = async () => {
    setIsExporting(true);
    try {
      const response = await fetch('/api/export-pptx', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(plan),
      });

      if (!response.ok) {
        throw new Error('PPTX export failed');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${plan.snapshot?.name || 'project-plan'}.pptx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('PPTX export failed:', error);
      alert('Failed to export PowerPoint. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-heading">Export Your Plan</h2>
        <p className="text-muted">Download your project plan in multiple formats</p>
      </div>

      {!validation.isValid && (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="font-semibold text-yellow-900 mb-2">⚠️ Plan incomplete</p>
          <p className="text-sm text-yellow-800 mb-2">Please complete all required fields:</p>
          <ul className="list-disc list-inside text-sm text-yellow-800 space-y-1">
            {validation.errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-4">
        <button
          onClick={handleMarkdownExport}
          disabled={!validation.isValid || isExporting}
          className="w-full p-4 bg-white border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-left"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">📄 Markdown</h3>
              <p className="text-sm text-muted">Download as .md file</p>
            </div>
            <span className="text-2xl">→</span>
          </div>
        </button>

        <button
          onClick={handlePdfExport}
          disabled={!validation.isValid || isExporting}
          className="w-full p-4 bg-white border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-left"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">📑 PDF</h3>
              <p className="text-sm text-muted">Download as PDF document</p>
            </div>
            <span className="text-2xl">→</span>
          </div>
        </button>

        <button
          onClick={handlePptxExport}
          disabled={!validation.isValid || isExporting}
          className="w-full p-4 bg-white border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-left"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">📊 PowerPoint</h3>
              <p className="text-sm text-muted">Download as .pptx presentation</p>
            </div>
            <span className="text-2xl">→</span>
          </div>
        </button>
      </div>

      {isExporting && (
        <div className="text-center py-4">
          <p className="text-muted">Exporting...</p>
        </div>
      )}

      <div className="flex justify-between pt-4">
        <button
          onClick={onBack}
          disabled={isExporting}
          className="px-6 py-2 border border-gray-400 rounded-lg text-body hover:bg-gray-200 hover:border-gray-500 transition-colors disabled:opacity-50"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}
