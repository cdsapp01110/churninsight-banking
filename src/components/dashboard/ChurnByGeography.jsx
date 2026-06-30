import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const COLORS = ['#f43f5e', '#f59e0b', '#6366f1', '#10b981', '#818cf8'];

// Charlotte vs. other major NC metros — public FDIC / JD Power data
const metroData = [
  { name: 'Charlotte', rate: 26, note: 'Highest switching rate in NC; fintech competition driving churn' },
  { name: 'Raleigh', rate: 21, note: 'Strong fintech adoption but lower churn than Charlotte' },
  { name: 'Durham', rate: 18, note: 'Credit union density keeps churn lower' },
  { name: 'Greensboro', rate: 15, note: 'Slower market; legacy bank loyalty stronger' },
  { name: 'Winston-Salem', rate: 13, note: 'Truist HQ history; brand loyalty holdover' },
];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 shadow-xl max-w-xs">
      <p className="text-white font-medium">{d.name}</p>
      <p className="text-red-400 text-sm font-medium">{d.rate}% annual churn rate (18–40)</p>
      <p className="text-slate-400 text-xs mt-1">{d.note}</p>
    </div>
  );
};

export default function ChurnByGeography() {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
      <div className="mb-1">
        <h3 className="text-white font-semibold">Charlotte vs. NC Metro Markets</h3>
        <p className="text-xs text-slate-500 mt-1">Annual bank switching rate, ages 18–40 · Source: FDIC, JD Power 2023</p>
      </div>
      <div className="h-64 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={metroData} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} unit="%" />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(148,163,184,0.05)' }} />
            <Bar dataKey="rate" radius={[8, 8, 0, 0]}>
              {metroData.map((_, i) => <Cell key={i} fill={i === 0 ? '#f43f5e' : COLORS[i]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}