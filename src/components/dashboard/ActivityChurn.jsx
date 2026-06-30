import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 shadow-xl">
      <p className="text-white font-medium">{d.name}</p>
      <p className="text-slate-400 text-sm">{d.total.toLocaleString()} customers</p>
      <p className="text-red-400 text-sm font-medium">{d.rate}% churn rate</p>
    </div>
  );
};

export default function ActivityChurn({ data }) {
  const activityData = [
    {
      name: 'Active Members',
      total: data.filter(d => d.is_active_member).length,
      rate: (() => {
        const active = data.filter(d => d.is_active_member);
        return active.length ? Math.round((active.filter(d => d.churned).length / active.length) * 100) : 0;
      })()
    },
    {
      name: 'Inactive Members',
      total: data.filter(d => !d.is_active_member).length,
      rate: (() => {
        const inactive = data.filter(d => !d.is_active_member);
        return inactive.length ? Math.round((inactive.filter(d => d.churned).length / inactive.length) * 100) : 0;
      })()
    }
  ];

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
      <div className="mb-1">
        <h3 className="text-white font-semibold">Active vs Inactive Churn</h3>
        <p className="text-xs text-slate-500 mt-1">Decision: Invest in re-activation programs for inactive members</p>
      </div>
      <div className="h-64 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={activityData} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} unit="%" />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(148,163,184,0.05)' }} />
            <Bar dataKey="rate" radius={[8, 8, 0, 0]}>
              <Cell fill="#10b981" />
              <Cell fill="#f43f5e" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}