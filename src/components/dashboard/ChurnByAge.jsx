import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 shadow-xl">
      <p className="text-white font-medium">Ages {d.range}</p>
      <p className="text-slate-400 text-sm">{d.count.toLocaleString()} customers in dataset</p>
      <p className="text-red-400 text-sm font-medium">{d.rate}% churn rate</p>
      <p className="text-slate-400 text-xs mt-1">{d.insight}</p>
    </div>
  );
};

// Age-based churn rates contextualized to Charlotte's 18–40 demographic
const ageData = [
  { range: '18–25', rate: 31, count: 1420, insight: 'Highest churn. App experience and fees are the main complaints.' },
  { range: '26–30', rate: 27, count: 1880, insight: 'Still highly mobile. Switching for HYSA rates and no-fee accounts.' },
  { range: '31–35', rate: 22, count: 2140, insight: 'Starting to settle. Mortgages and joint accounts reduce switching.' },
  { range: '36–40', rate: 18, count: 1960, insight: 'More product depth. Harder to leave once a mortgage is in place.' },
  { range: '41–50', rate: 20, count: 1600, insight: 'Slight uptick. Some disillusionment with legacy bank fees.' },
  { range: '51–65', rate: 28, count: 1000, insight: 'Retirement planning moves. Churn is intentional at this stage.' },
];

export default function ChurnByAge() {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
      <div className="mb-1">
        <h3 className="text-white font-semibold">Churn Rate by Age Group</h3>
        <p className="text-xs text-slate-500 mt-1">Charlotte market · 18–25 and 51–65 are the highest-risk windows · Hover for context</p>
      </div>
      <div className="h-64 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={ageData}>
            <defs>
              <linearGradient id="ageGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="range" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} unit="%" />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="rate" stroke="#f43f5e" fill="url(#ageGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}