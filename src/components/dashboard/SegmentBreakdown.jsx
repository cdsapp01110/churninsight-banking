import React from 'react';

const SEGMENT_COLORS = {
  'Low Risk': { bg: 'bg-emerald-500/10', text: 'text-emerald-400', bar: 'bg-emerald-500' },
  'Medium Risk': { bg: 'bg-blue-500/10', text: 'text-blue-400', bar: 'bg-blue-500' },
  'High Risk': { bg: 'bg-amber-500/10', text: 'text-amber-400', bar: 'bg-amber-500' },
  'Critical': { bg: 'bg-red-500/10', text: 'text-red-400', bar: 'bg-red-500' }
};

export default function SegmentBreakdown({ data }) {
  const total = data.length;
  const segments = ['Low Risk', 'Medium Risk', 'High Risk', 'Critical'].map(seg => {
    const customers = data.filter(d => d.segment === seg);
    const churned = customers.filter(d => d.churned);
    return {
      name: seg,
      count: customers.length,
      pct: total ? Math.round((customers.length / total) * 100) : 0,
      churnRate: customers.length ? Math.round((churned.length / customers.length) * 100) : 0
    };
  });

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
      <div className="mb-1">
        <h3 className="text-white font-semibold">Risk Segment Breakdown</h3>
        <p className="text-xs text-slate-500 mt-1">Decision: Prioritize outreach to Critical/High Risk before they churn</p>
      </div>
      <div className="mt-6 space-y-4">
        {segments.map(seg => {
          const colors = SEGMENT_COLORS[seg.name];
          return (
            <div key={seg.name}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${colors.text}`}>{seg.name}</span>
                  <span className="text-xs text-slate-500">{seg.count} customers</span>
                </div>
                <span className="text-xs text-slate-400">{seg.churnRate}% churned</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${colors.bar} transition-all duration-700`} style={{ width: `${seg.pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}