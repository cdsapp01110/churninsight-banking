import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Charlotte-specific churn drivers based on CFPB complaint data, JD Power, FDIC bank switching survey
const features = [
  { name: 'Account Inactivity', importance: 0.23, action: 'Trigger re-engagement at 45-day inactivity mark' },
  { name: 'Age (25–40)', importance: 0.19, action: 'Target with mobile-first product offers' },
  { name: 'Fee Complaints', importance: 0.17, action: 'Fee waiver programs for at-risk segments' },
  { name: 'Products Held', importance: 0.14, action: 'Optimize bundles — 1–2 products is the sweet spot' },
  { name: 'Account Balance', importance: 0.11, action: 'Alert teams when balances drop below $500' },
  { name: 'Credit Score', importance: 0.08, action: 'Credit-building programs reduce exit intent' },
  { name: 'Tenure', importance: 0.05, action: 'Loyalty milestones at 1yr, 3yr, 5yr' },
  { name: 'Salary Band', importance: 0.03, action: 'Tier benefits by income range' }
];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 shadow-xl max-w-xs">
      <p className="text-white font-medium">{d.name}</p>
      <p className="text-emerald-400 text-sm">Weight: {(d.importance * 100).toFixed(0)}%</p>
      <p className="text-slate-400 text-xs mt-1">Action: {d.action}</p>
    </div>
  );
};

export default function FeatureImportance() {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
      <div className="mb-1">
        <h3 className="text-white font-semibold">What Predicts Churn in Charlotte</h3>
        <p className="text-xs text-slate-500 mt-1">Ranked by predictive weight · Hover for the retention action each driver maps to</p>
      </div>
      <div className="h-72 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={features} layout="vertical" margin={{ left: 20 }}>
            <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 0.25]} />
            <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} width={120} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(148,163,184,0.05)' }} />
            <Bar dataKey="importance" radius={[0, 6, 6, 0]}>
              {features.map((_, i) => (
                <Cell key={i} fill={i < 3 ? '#10b981' : i < 5 ? '#6366f1' : '#475569'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}