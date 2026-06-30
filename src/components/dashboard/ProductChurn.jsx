import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#10b981', '#6366f1', '#f59e0b', '#f43f5e'];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 shadow-xl max-w-xs">
      <p className="text-white font-medium">{d.name}</p>
      <p className="text-slate-400 text-sm">{d.count.toLocaleString()} customers</p>
      <p className="text-red-400 text-sm">{d.rate}% churn rate</p>
      <p className="text-slate-400 text-xs mt-1">{d.context}</p>
    </div>
  );
};

// Charlotte product-bundling data — 1–2 products = retention sweet spot
const productData = [
  { name: '1 Product', count: 3800, rate: 29, value: 3800, context: 'Checking only. No anchor. Easiest to leave — they have nothing to untangle.' },
  { name: '2 Products', count: 4100, rate: 11, value: 4100, context: 'Checking + savings or credit card. The sweet spot. Switching cost kicks in.' },
  { name: '3 Products', count: 1600, rate: 38, value: 1600, context: 'Counterintuitive churn spike. Usually fee fatigue from bundled products they didn\'t ask for.' },
  { name: '4+ Products', count: 500, rate: 51, value: 500, context: 'Highest churn. Likely a cross-sell-heavy onboarding that didn\'t stick. Customers feel oversold.' },
];

export default function ProductChurn() {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
      <div className="mb-1">
        <h3 className="text-white font-semibold">Churn by Products Held</h3>
        <p className="text-xs text-slate-500 mt-1">More products doesn't always mean more loyalty · Hover each segment for context</p>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-6 mt-4">
        <div className="h-48 w-48 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={productData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={4} dataKey="value">
                {productData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col gap-3 flex-1">
          {productData.map((d, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i] }} />
                <span className="text-sm text-slate-300">{d.name}</span>
              </div>
              <span className="text-sm font-medium text-slate-400">{d.rate}% churn</span>
            </div>
          ))}
          <p className="text-xs text-slate-600 mt-1">Sweet spot: 2 products. Beyond that, churn rises.</p>
        </div>
      </div>
    </div>
  );
}