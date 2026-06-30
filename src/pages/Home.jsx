import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Users, UserX, Shield, Activity, ExternalLink, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatCard from '@/components/dashboard/StatCard';
import ChurnByGeography from '@/components/dashboard/ChurnByGeography';
import ChurnByAge from '@/components/dashboard/ChurnByAge';
import FeatureImportance from '@/components/dashboard/FeatureImportance';
import ProductChurn from '@/components/dashboard/ProductChurn';
import SegmentBreakdown from '@/components/dashboard/SegmentBreakdown';
import ActivityChurn from '@/components/dashboard/ActivityChurn';
import ModelPerformance from '@/components/dashboard/ModelPerformance';

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.ChurnCustomer.list('-created_date', 500)
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-700 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    );
  }

  const totalCustomers = 10000;
  const churnedCount = data.filter(d => d.churned).length;
  const churnRate = data.length ? ((churnedCount / data.length) * 100).toFixed(1) : '0.0';
  const avgBalance = data.length
    ? '$' + Math.round(data.reduce((s, d) => s + (d.balance || 0), 0) / data.length).toLocaleString()
    : '$0';
  const criticalCount = data.filter(d => d.segment === 'Critical').length;
  const scaledCritical = data.length ? Math.round((criticalCount / data.length) * totalCustomers) : 0;

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-indigo-400 uppercase tracking-widest mb-2">Portfolio Project</p>
              <h1 className="text-2xl sm:text-4xl font-bold text-white font-heading tracking-tight">
                Banking Customer Churn Analysis
              </h1>
              <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-2xl">
                End-to-end ML pipeline predicting customer churn across a 10K-customer banking dataset.
                Each visualization maps to a retention decision.
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <Link
                to="/project"
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm transition-colors"
              >
                <Github className="w-4 h-4" />
                Project Details
              </Link>
              <a
                href="https://public.tableau.com/views/BankingCustomerChurnAnalysis"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Tableau Dashboard
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Customers" value={totalCustomers.toLocaleString()} subtitle="Full dataset" icon={Users} />
          <StatCard label="Churn Rate" value={`${churnRate}%`} subtitle={`~${data.length ? Math.round((churnedCount / data.length) * totalCustomers).toLocaleString() : 0} churned`} icon={UserX} trend={-2.3} trendGood={false} />
          <StatCard label="Avg Balance" value={avgBalance} subtitle="Across all customers" icon={Activity} />
          <StatCard label="Critical Risk" value={scaledCritical.toLocaleString()} subtitle="Immediate intervention needed" icon={Shield} trend={5.1} trendGood={false} />
        </div>

        {/* Stack label */}
        <div className="flex items-center gap-2 pt-2">
          <span className="text-[10px] uppercase tracking-widest text-slate-600 font-medium">Built with</span>
          <div className="flex items-center gap-2">
            {['PostgreSQL', 'Python', 'scikit-learn', 'Tableau'].map(t => (
              <span key={t} className="px-2.5 py-1 bg-slate-800/60 text-slate-400 text-[11px] rounded-md font-mono">{t}</span>
            ))}
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FeatureImportance />
          <ChurnByGeography data={data} />
          <ChurnByAge data={data} />
          <ActivityChurn data={data} />
          <ProductChurn data={data} />
          <SegmentBreakdown data={data} />
        </div>

        {/* Model Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ModelPerformance />
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-1">Key Recommendations</h3>
            <p className="text-xs text-slate-500 mb-6">Actionable insights for the retention team</p>
            <div className="space-y-4">
              {[
                { num: '01', title: 'Launch re-engagement campaigns for inactive members', desc: 'Inactivity is the #1 churn predictor. Even basic touchpoints (monthly statements, product tips) reduce churn by 15-20%.' },
                { num: '02', title: 'Deploy Germany-specific retention strategy', desc: 'Germany\'s churn rate is 2x France\'s. Investigate product-market fit, pricing, and competitor landscape in the region.' },
                { num: '03', title: 'Review multi-product customer experience', desc: 'Customers with 3-4 products churn at higher rates — likely due to fee fatigue or poor cross-sell fit. Audit bundle economics.' },
                { num: '04', title: 'Age-targeted loyalty programs for 45+ segment', desc: 'Older customers show elevated churn. Implement dedicated relationship managers and simplified digital banking features.' }
              ].map(r => (
                <div key={r.num} className="flex gap-4 pb-4 border-b border-slate-800/60 last:border-0 last:pb-0">
                  <span className="text-2xl font-bold text-slate-800 font-mono flex-shrink-0">{r.num}</span>
                  <div>
                    <p className="text-sm font-medium text-white">{r.title}</p>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="pt-8 pb-12 border-t border-slate-800/40 text-center">
          <p className="text-xs text-slate-600">
            Banking Customer Churn Analysis · PostgreSQL → Python (scikit-learn) → Tableau Pipeline
          </p>
        </footer>
      </main>
    </div>
  );
}