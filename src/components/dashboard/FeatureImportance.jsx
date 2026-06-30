import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const features = [
  { name: 'Activity Status', importance: 0.23, action: 'Re-engagement campaigns' },
  { name: 'Age', importance: 0.19, action: 'Age-targeted offers' },
  { name: 'Geography', importance: 0.16, action: 'Regional retention teams' },
  { name: 'Num Products', importance: 0.14, action: 'Cross-sell optimization' },
  { name: 'Balance', importance: 0.11, action: 'Balance threshold alerts' },
  { name: 'Credit Score', importance: 0.08, action: 'Credit improvement programs' },
  { name: 'Tenure', importance: 0.05, action: 'Loyalty rewards' },
  { name: 'Salary', importance: 0.04, action: 'Tier-based retention' }
];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 shadow-xl">
      <p className="text-white font-medium">{d.name}</p>
      <p className="text-emerald-400 text-sm">Importance: {(d.importance * 100).toFixed(0)}%</p>
      <p className="text-slate-400 text-xs mt-1">→ {d.action}</p>
    </div>
  );
};

export default function FeatureImportance() {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
      <div className="mb-1">
        <h3 className="text-white font-semibold">Top Churn Drivers (Feature Importance)</h3>
        <p className="text-xs text-slate-500 mt-1">Decision: Which levers to pull first for maximum retention impact</p>
      </div>
      <div className="h-72 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={features} layout="vertical" margin={{ left: 20 }}>
            <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 0.25]} />
            <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} width={100} />
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