import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 shadow-xl max-w-xs">
      <p className="text-white font-medium">{d.name}</p>
      <p className="text-slate-400 text-sm">{d.total.toLocaleString()} customers</p>
      <p className="text-red-400 text-sm font-medium">{d.rate}% churn rate</p>
      <p className="text-slate-400 text-xs mt-1">{d.detail}</p>
    </div>
  );
};

// Charlotte engagement tiers — mirrors CFPB and JD Power engagement-churn correlation
const engagementData = [
  { name: 'Weekly App Users', total: 2800, rate: 8, detail: 'Logging in weekly is the strongest retention signal. These customers rarely leave.' },
  { name: 'Monthly App Users', total: 3200, rate: 17, detail: 'Moderately engaged. Fee changes or a competitor offer can tip them out.' },
  { name: 'Rare Logins (<3/yr)', total: 2400, rate: 34, detail: 'High churn risk. Many maintain the account passively until they find a reason to close it.' },
  { name: 'No Digital Activity', total: 1600, rate: 47, detail: 'Highest risk segment. Often have no direct deposit and can be gone in a week.' },
];

export default function ActivityChurn() {
  const COLORS = ['#10b981', '#6366f1', '#f59e0b', '#f43f5e'];
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
      <div className="mb-1">
        <h3 className="text-white font-semibold">Churn by Digital Engagement Level</h3>
        <p className="text-xs text-slate-500 mt-1">App login frequency is the fastest proxy for churn risk · Hover for detail</p>
      </div>
      <div className="h-64 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={engagementData} barCategoryGap="25%">
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} unit="%" />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(148,163,184,0.05)' }} />
            <Bar dataKey="rate" radius={[8, 8, 0, 0]}>
              {engagementData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}