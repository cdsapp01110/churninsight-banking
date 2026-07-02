// CohortRetention.jsx — "When are customers most vulnerable?"
// Tracks how each acquisition quarter retains over 12 months.
// Weaker cohorts signal onboarding changes, pricing shifts, or bad-fit acquisitions.

import React from 'react';

// Retention % by cohort at month 1, 3, 6, 9, 12
// Q1 2023 is the baseline; later cohorts show the impact of product changes
const cohorts = [
  { label: 'Q1 2023', months: [98, 91, 84, 78, 71], note: 'Pre-fee-restructure. Strongest cohort.' },
  { label: 'Q2 2023', months: [97, 89, 80, 72, 64], note: 'Fee change introduced in month 2 — visible drop at month 3.' },
  { label: 'Q3 2023', months: [96, 88, 79, 73, 67], note: 'Partial recovery after fee waiver for new accounts.' },
  { label: 'Q4 2023', months: [97, 90, 82, 76, 70], note: 'New onboarding flow. Month-3 retention improved vs. Q2/Q3.' },
  { label: 'Q1 2024', months: [98, 92, 85, 79, null], note: 'Strongest recent cohort. 2-product default onboarding in effect.' },
];

const MONTHS = ['Mo. 1', 'Mo. 3', 'Mo. 6', 'Mo. 9', 'Mo. 12'];

// Colour gradient: green above 85, amber 70–84, red below 70
function cellColor(val) {
  if (val === null) return 'bg-slate-800/30 text-slate-700';
  if (val >= 85) return 'bg-emerald-500/15 text-emerald-400';
  if (val >= 70) return 'bg-amber-500/15 text-amber-400';
  return 'bg-red-500/15 text-red-400';
}

export default function CohortRetention() {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
      <div className="mb-1">
        <h3 className="text-white font-semibold">Cohort Retention by Acquisition Quarter</h3>
        <p className="text-xs text-slate-500 mt-1">
          Each row tracks how a signup cohort retains over 12 months · Weaker cohorts reveal when something changed
        </p>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr>
              <th className="text-left text-slate-500 pb-2 pr-4 font-medium">Cohort</th>
              {MONTHS.map(m => (
                <th key={m} className="text-center text-slate-500 pb-2 px-2 font-medium">{m}</th>
              ))}
            </tr>
          </thead>
          <tbody className="space-y-1">
            {cohorts.map(c => (
              <tr key={c.label} className="group">
                <td className="pr-4 py-1.5 text-slate-300 font-medium whitespace-nowrap">{c.label}</td>
                {c.months.map((val, i) => (
                  <td key={i} className="px-2 py-1.5 text-center">
                    <span className={`inline-block rounded px-2 py-1 font-mono font-semibold ${cellColor(val)}`}>
                      {val !== null ? `${val}%` : '—'}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cohort notes */}
      <div className="mt-4 space-y-1.5">
        {cohorts.map(c => (
          <div key={c.label} className="flex gap-2 text-[11px]">
            <span className="text-slate-500 flex-shrink-0 w-14">{c.label}</span>
            <span className="text-slate-600">{c.note}</span>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-4 pt-3 border-t border-slate-800/60">
        <span className="flex items-center gap-1.5 text-[10px] text-slate-500"><span className="w-2 h-2 rounded-sm bg-emerald-500/40 inline-block" />≥85% healthy</span>
        <span className="flex items-center gap-1.5 text-[10px] text-slate-500"><span className="w-2 h-2 rounded-sm bg-amber-500/40 inline-block" />70–84% watch</span>
        <span className="flex items-center gap-1.5 text-[10px] text-slate-500"><span className="w-2 h-2 rounded-sm bg-red-500/40 inline-block" />&lt;70% at risk</span>
      </div>
    </div>
  );
}