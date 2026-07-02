// ChurnTaxonomy.jsx — "Which customers are we losing and why?"
// Breaks churn into voluntary, involuntary, and feature/product churn.
// Also shows coded exit reasons from cancellation surveys + CFPB data.

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

// Top-level churn type split
const churnTypes = [
  {
    name: 'Voluntary',
    pct: 61,
    color: '#f43f5e',
    desc: 'Customer actively chose to leave — fee dissatisfaction, competitor switch, or lifestyle change.',
  },
  {
    name: 'Involuntary',
    pct: 22,
    color: '#f59e0b',
    desc: 'Account closure due to failed payments, fraud flags, or regulatory closure. Often recoverable.',
  },
  {
    name: 'Product/Feature',
    pct: 17,
    color: '#6366f1',
    desc: 'Customer kept core account but dropped a product line — credit card, savings, or overdraft protection.',
  },
];

// Exit reason taxonomy — coded from cancellation surveys and CFPB complaint data
const exitReasons = [
  { reason: 'Fee dissatisfaction',      pct: 34, segment: 'Ages 18–35' },
  { reason: 'Competitor offer (rate)',  pct: 21, segment: 'High-balance accounts' },
  { reason: 'Poor mobile experience',  pct: 14, segment: 'Ages 22–30' },
  { reason: 'Lack of product fit',     pct: 11, segment: 'Single-product accounts' },
  { reason: 'Life event (relocation)', pct: 9,  segment: 'Ages 26–34' },
  { reason: 'Trust / brand concern',   pct: 7,  segment: 'Wells Fargo, Truist switchers' },
  { reason: 'Business closure',        pct: 4,  segment: 'SMB accounts' },
];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 shadow-xl max-w-xs text-xs">
      <p className="text-white font-medium">{d.name} Churn — {d.pct}%</p>
      <p className="text-slate-400 mt-1 leading-snug">{d.desc}</p>
    </div>
  );
};

export default function ChurnTaxonomy() {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
      <div className="mb-1">
        <h3 className="text-white font-semibold">Churn Taxonomy — Why They Leave</h3>
        <p className="text-xs text-slate-500 mt-1">
          Voluntary vs. involuntary vs. product churn · Exit reason coding from cancellation surveys + CFPB data
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 mt-4">
        {/* Donut — churn type split */}
        <div className="flex-shrink-0">
          <p className="text-[10px] text-slate-500 mb-2 uppercase tracking-wider">Churn type split</p>
          <div className="w-40 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={churnTypes} cx="50%" cy="50%" innerRadius={36} outerRadius={60} paddingAngle={3} dataKey="pct">
                  {churnTypes.map((c, i) => <Cell key={i} fill={c.color} />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5 mt-2">
            {churnTypes.map(c => (
              <div key={c.name} className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: c.color }} />
                <span className="text-slate-300">{c.name}</span>
                <span className="text-slate-500 ml-auto font-mono">{c.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Exit reason breakdown */}
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-slate-500 mb-3 uppercase tracking-wider">Exit reason taxonomy</p>
          <div className="space-y-2.5">
            {exitReasons.map(r => (
              <div key={r.reason}>
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-xs text-slate-300">{r.reason}</span>
                  <span className="text-xs text-slate-400 font-mono">{r.pct}%</span>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${r.pct}%` }} />
                </div>
                <p className="text-[10px] text-slate-600 mt-0.5">{r.segment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}