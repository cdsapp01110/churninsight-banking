import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#10b981', '#6366f1', '#f59e0b', '#f43f5e'];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 shadow-xl">
      <p className="text-white font-medium">{d.name}</p>
      <p className="text-slate-400 text-sm">{d.count} customers</p>
      <p className="text-red-400 text-sm">{d.rate}% churn rate</p>
    </div>
  );
};

export default function ProductChurn({ data }) {
  const productData = [1, 2, 3, 4].map(n => {
    const customers = data.filter(d => d.num_products === n);
    const churned = customers.filter(d => d.churned);
    return {
      name: `${n} Product${n > 1 ? 's' : ''}`,
      count: customers.length,
      rate: customers.length ? Math.round((churned.length / customers.length) * 100) : 0,
      value: customers.length
    };
  }).filter(d => d.count > 0);

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
      <div className="mb-1">
        <h3 className="text-white font-semibold">Churn by Products Held</h3>
        <p className="text-xs text-slate-500 mt-1">Decision: Optimal product bundling for retention</p>
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
        <div className="flex flex-col gap-2 flex-1">
          {productData.map((d, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                <span className="text-sm text-slate-300">{d.name}</span>
              </div>
              <span className="text-sm font-medium text-slate-400">{d.rate}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}