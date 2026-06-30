import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 shadow-xl">
      <p className="text-white font-medium">{d.range}</p>
      <p className="text-slate-400 text-sm">{d.count} customers</p>
      <p className="text-red-400 text-sm font-medium">{d.rate}% churn rate</p>
    </div>
  );
};

export default function ChurnByAge({ data }) {
  const ranges = [
    { range: '18-25', min: 18, max: 25 },
    { range: '26-35', min: 26, max: 35 },
    { range: '36-45', min: 36, max: 45 },
    { range: '46-55', min: 46, max: 55 },
    { range: '56-65', min: 56, max: 65 },
    { range: '65+', min: 65, max: 100 }
  ];

  const ageData = ranges.map(r => {
    const customers = data.filter(d => d.age >= r.min && d.age <= r.max);
    const churned = customers.filter(d => d.churned);
    return {
      range: r.range,
      rate: customers.length ? Math.round((churned.length / customers.length) * 100) : 0,
      count: customers.length
    };
  });

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
      <div className="mb-1">
        <h3 className="text-white font-semibold">Churn Rate by Age Group</h3>
        <p className="text-xs text-slate-500 mt-1">Decision: Which age segments need targeted retention campaigns</p>
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