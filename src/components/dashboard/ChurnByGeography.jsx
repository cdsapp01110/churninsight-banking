import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const COLORS = ['#6366f1', '#f43f5e', '#f59e0b'];

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

export default function ChurnByGeography({ data }) {
  const geoData = ['France', 'Germany', 'Spain'].map(geo => {
    const customers = data.filter(d => d.geography === geo);
    const churned = customers.filter(d => d.churned);
    return {
      name: geo,
      rate: customers.length ? Math.round((churned.length / customers.length) * 100) : 0,
      total: customers.length
    };
  });

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
      <div className="mb-1">
        <h3 className="text-white font-semibold">Churn Rate by Geography</h3>
        <p className="text-xs text-slate-500 mt-1">Decision: Where to allocate retention budget geographically</p>
      </div>
      <div className="h-64 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={geoData} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} unit="%" />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(148,163,184,0.05)' }} />
            <Bar dataKey="rate" radius={[8, 8, 0, 0]}>
              {geoData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}