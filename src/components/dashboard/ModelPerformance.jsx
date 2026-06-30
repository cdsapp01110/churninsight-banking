import React from 'react';
import { CheckCircle } from 'lucide-react';

const metrics = [
  { label: 'Accuracy', value: '87.2%', description: 'Overall prediction accuracy' },
  { label: 'Precision', value: '83.5%', description: 'True positives among predicted churners' },
  { label: 'Recall', value: '79.1%', description: 'Caught churners vs. actual churners' },
  { label: 'F1 Score', value: '81.3%', description: 'Harmonic mean of precision & recall' },
  { label: 'AUC-ROC', value: '0.91', description: 'Model discrimination ability' }
];

export default function ModelPerformance() {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
      <div className="mb-1">
        <h3 className="text-white font-semibold">Model Performance</h3>
        <p className="text-xs text-slate-500 mt-1">Random Forest Classifier · scikit-learn · 10-fold CV</p>
      </div>
      <div className="mt-6 space-y-3">
        {metrics.map(m => (
          <div key={m.label} className="flex items-center justify-between py-2 border-b border-slate-800/60 last:border-0">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <div>
                <p className="text-sm text-white font-medium">{m.label}</p>
                <p className="text-xs text-slate-500">{m.description}</p>
              </div>
            </div>
            <span className="text-lg font-bold text-emerald-400 font-mono">{m.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}