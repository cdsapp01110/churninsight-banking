// RevenueImpact.jsx — "What does churn cost the business?"
// Shows MRR loss, GRR, NRR, and how much growth budget is consumed just refilling attrition.

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';

const metrics = [
  {
    label: 'Gross Revenue Retention (GRR)',
    value: '81%',
    benchmark: '85%+ is strong for retail banking',
    status: 'below',
    color: 'text-amber-400',
  },
  {
    label: 'Net Revenue Retention (NRR)',
    value: '94%',
    benchmark: 'Expansion partially offsets churn losses',
    status: 'ok',
    color: 'text-emerald-400',
  },
  {
    label: 'Monthly Revenue Lost to Churn',
    value: '$1.4M',
    benchmark: '~26% of new revenue goes to refilling attrition',
    status: 'below',
    color: 'text-red-400',
  },
  {
    label: 'Avg. Revenue per Churned Customer',
    value: '$182/yr',
    benchmark: 'Mostly single-product, low-balance accounts',
    status: 'neutral',
    color: 'text-slate-300',
  },
];

// Shows how much of each month's new revenue is consumed by churn vs. actually growing the base
const growthBridgeData = [
  { month: 'Jan', new: 420, lost: -110 },
  { month: 'Feb', new: 390, lost: -130 },
  { month: 'Mar', new: 510, lost: -145 },
  { month: 'Apr', new: 480, lost: -160 },
  { month: 'May', new: 530, lost: -175 },
  { month: 'Jun', new: 560, lost: -190 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const newMrr = payload.find(p => p.dataKey === 'new');
  const lost   = payload.find(p => p.dataKey === 'lost');
  const net    = (newMrr?.value || 0) + (lost?.value || 0);
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 shadow-xl text-xs">
      <p className="text-white font-medium mb-1">{label}</p>
      <p className="text-emerald-400">New MRR: +${newMrr?.value}K</p>
      <p className="text-red-400">Churn MRR: ${lost?.value}K</p>
      <p className="text-slate-300 mt-1 border-t border-slate-700 pt-1">Net: +${net}K</p>
    </div>
  );
};

export default function RevenueImpact() {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
      <div className="mb-1">
        <h3 className="text-white font-semibold">Revenue Impact of Churn</h3>
        <p className="text-xs text-slate-500 mt-1">GRR · NRR · MRR bridge — how much growth is consumed refilling attrition</p>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 gap-3 mt-4 mb-5">
        {metrics.map(m => (
          <div key={m.label} className="bg-slate-800/50 rounded-xl p-3">
            <p className={`text-xl font-bold font-mono ${m.color}`}>{m.value}</p>
            <p className="text-xs text-white mt-0.5">{m.label}</p>
            <p className="text-[10px] text-slate-500 mt-1 leading-snug">{m.benchmark}</p>
          </div>
        ))}
      </div>

      {/* MRR bridge chart */}
      <p className="text-xs text-slate-500 mb-2">Monthly MRR bridge (new vs. churned, $K)</p>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={growthBridgeData} barCategoryGap="30%">
            <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} unit="K" />
            <ReferenceLine y={0} stroke="#334155" />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(148,163,184,0.05)' }} />
            <Bar dataKey="new"  radius={[4, 4, 0, 0]} fill="#10b981" />
            <Bar dataKey="lost" radius={[4, 4, 0, 0]} fill="#f43f5e" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}