// ─────────────────────────────────────────────────────────────────────────────
// CustomerList.jsx — Searchable, filterable customer directory
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const SEGMENT_COLORS = {
  'Low Risk':    { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  'Medium Risk': { bg: 'bg-blue-500/10',    text: 'text-blue-400',    border: 'border-blue-500/20'    },
  'High Risk':   { bg: 'bg-amber-500/10',   text: 'text-amber-400',   border: 'border-amber-500/20'   },
  'Critical':    { bg: 'bg-red-500/10',     text: 'text-red-400',     border: 'border-red-500/20'     },
};

const SORT_OPTIONS = [
  { label: 'Churn Risk ↑',  field: 'churn_probability', dir: -1 },
  { label: 'Balance ↓',     field: 'balance',            dir: -1 },
  { label: 'Balance ↑',     field: 'balance',            dir:  1 },
  { label: 'Age ↑',         field: 'age',                dir:  1 },
  { label: 'Tenure ↓',      field: 'tenure',             dir: -1 },
];

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState('');
  const [segment, setSegment]     = useState('All');
  const [sortIdx, setSortIdx]     = useState(0);
  const [expanded, setExpanded]   = useState(null);

  useEffect(() => {
    base44.entities.ChurnCustomer.list('-churn_probability', 500)
      .then(setCustomers)
      .finally(() => setLoading(false));
  }, []);

  const sort = SORT_OPTIONS[sortIdx];

  const visible = customers
    .filter(c => {
      const matchSegment = segment === 'All' || c.segment === segment;
      const q = search.toLowerCase();
      const matchSearch = !q || c.customer_id?.toLowerCase().includes(q) || c.segment?.toLowerCase().includes(q);
      return matchSegment && matchSearch;
    })
    .sort((a, b) => sort.dir * ((a[sort.field] ?? 0) - (b[sort.field] ?? 0)));

  return (
    <div className="min-h-screen bg-slate-950">
      <header className="border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-indigo-400 uppercase tracking-widest mb-2">Charlotte, NC · Banking Market</p>
              <h1 className="text-2xl sm:text-3xl font-bold text-white font-heading">Customer List</h1>
              <p className="mt-2 text-slate-400 text-sm">Search and filter the full customer dataset by segment, balance, or risk level.</p>
            </div>
            <p className="text-sm text-slate-500 flex-shrink-0">{visible.length} customers shown</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search by customer ID or segment…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
          <select
            value={segment}
            onChange={e => setSegment(e.target.value)}
            className="px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors"
          >
            <option value="All">All Segments</option>
            <option value="Low Risk">Low Risk</option>
            <option value="Medium Risk">Medium Risk</option>
            <option value="High Risk">High Risk</option>
            <option value="Critical">Critical</option>
          </select>
          <select
            value={sortIdx}
            onChange={e => setSortIdx(Number(e.target.value))}
            className="px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors"
          >
            {SORT_OPTIONS.map((o, i) => <option key={i} value={i}>{o.label}</option>)}
          </select>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-slate-700 border-t-indigo-500 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-800">
                    {['Customer ID', 'Age', 'Balance', 'Products', 'Tenure (yrs)', 'Credit Score', 'Segment', 'Churn %'].map(h => (
                      <th key={h} className="text-left text-xs font-medium text-slate-500 px-5 py-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {visible.map((c, i) => {
                    const risk = SEGMENT_COLORS[c.segment] || SEGMENT_COLORS['Medium Risk'];
                    const isExp = expanded === i;
                    return (
                      <React.Fragment key={c.id}>
                        <tr
                          className={`border-b border-slate-800/50 last:border-0 cursor-pointer transition-colors ${isExp ? 'bg-slate-800/40' : 'hover:bg-slate-800/20'}`}
                          onClick={() => setExpanded(isExp ? null : i)}
                        >
                          <td className="px-5 py-3.5 font-mono text-xs text-slate-300">{c.customer_id || `CUS-${c.id?.slice(-6)}`}</td>
                          <td className="px-5 py-3.5 text-slate-400">{c.age ?? '—'}</td>
                          <td className="px-5 py-3.5 text-white font-medium">${(c.balance ?? 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                          <td className="px-5 py-3.5 text-slate-400">{c.num_products ?? '—'}</td>
                          <td className="px-5 py-3.5 text-slate-400">{c.tenure ?? '—'}</td>
                          <td className="px-5 py-3.5 text-slate-400">{c.credit_score ?? '—'}</td>
                          <td className="px-5 py-3.5">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${risk.bg} ${risk.text} ${risk.border}`}>
                              {c.segment || 'Unknown'}
                            </span>
                          </td>
                          <td className="px-5 py-3.5">
                            <span className={c.churn_probability > 0.6 ? 'text-red-400' : c.churn_probability > 0.3 ? 'text-amber-400' : 'text-emerald-400'}>
                              {c.churn_probability != null ? `${Math.round(c.churn_probability * 100)}%` : '—'}
                            </span>
                          </td>
                        </tr>
                        {isExp && (
                          <tr className="bg-slate-800/30">
                            <td colSpan={8} className="px-5 py-4">
                              <div className="grid grid-cols-3 gap-6 text-xs text-slate-400">
                                <div><span className="text-slate-500">Gender:</span> {c.gender || '—'}</div>
                                <div><span className="text-slate-500">Active Member:</span> {c.is_active_member ? 'Yes' : 'No'}</div>
                                <div><span className="text-slate-500">Has Credit Card:</span> {c.has_credit_card ? 'Yes' : 'No'}</div>
                                <div><span className="text-slate-500">Est. Salary:</span> ${(c.estimated_salary ?? 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                                <div><span className="text-slate-500">Churned:</span> {c.churned ? 'Yes' : 'No'}</div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-slate-800">
              {visible.map((c, i) => {
                const risk = SEGMENT_COLORS[c.segment] || SEGMENT_COLORS['Medium Risk'];
                const isExp = expanded === i;
                return (
                  <div key={c.id} className="p-4 cursor-pointer" onClick={() => setExpanded(isExp ? null : i)}>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <p className="font-mono text-xs text-slate-300">{c.customer_id || `CUS-${c.id?.slice(-6)}`}</p>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border flex-shrink-0 ${risk.bg} ${risk.text} ${risk.border}`}>
                        {c.segment || 'Unknown'}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-400">
                      <span>Balance: <span className="text-white">${(c.balance ?? 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></span>
                      <span>Age: {c.age ?? '—'}</span>
                      <span>Products: {c.num_products ?? '—'}</span>
                      <span>Churn: <span className={c.churn_probability > 0.6 ? 'text-red-400' : c.churn_probability > 0.3 ? 'text-amber-400' : 'text-emerald-400'}>{c.churn_probability != null ? `${Math.round(c.churn_probability * 100)}%` : '—'}</span></span>
                    </div>
                    {isExp && (
                      <div className="mt-3 pt-3 border-t border-slate-800 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-400">
                        <span>Credit Score: {c.credit_score ?? '—'}</span>
                        <span>Tenure: {c.tenure ?? '—'} yrs</span>
                        <span>Active: {c.is_active_member ? 'Yes' : 'No'}</span>
                        <span>Churned: {c.churned ? 'Yes' : 'No'}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {visible.length === 0 && !loading && (
              <div className="py-16 text-center text-slate-500 text-sm">No customers match your filters.</div>
            )}
          </div>
        )}

        <footer className="pt-4 pb-12 text-center">
          <p className="text-xs text-slate-600">Charlotte, NC Banking Market · Data sourced from ChurnCustomer dataset</p>
        </footer>
      </main>
    </div>
  );
}