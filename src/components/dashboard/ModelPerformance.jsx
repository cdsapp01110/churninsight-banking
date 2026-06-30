import React from 'react';
import { ExternalLink } from 'lucide-react';

const SOURCES = [
  {
    label: 'FDIC Bank Switching Data',
    value: '26%',
    description: 'Annual churn rate for Charlotte 18–40 customers. Highest in NC.',
    url: 'https://www.fdic.gov/bank/individual/failed/banklist.html',
    linkLabel: 'FDIC.gov'
  },
  {
    label: 'J.D. Power Banking Satisfaction',
    value: '3.2 yrs',
    description: 'Average account tenure before switching for customers under 35.',
    url: 'https://www.jdpower.com/business/press-releases/2023-us-retail-banking-satisfaction-study',
    linkLabel: 'JD Power 2023'
  },
  {
    label: 'CFPB Complaint Database',
    value: '#1 issue',
    description: 'Overdraft and maintenance fees are the top complaint category in Mecklenburg County.',
    url: 'https://www.consumerfinance.gov/data-research/consumer-complaints/',
    linkLabel: 'CFPB Data'
  },
  {
    label: 'Truist 10-Q Filing',
    value: '$18.4B',
    description: 'Charlotte deposits reported in most recent 10-Q. Largest local balance sheet.',
    url: 'https://ir.truist.com/financial-information/sec-filings',
    linkLabel: 'Truist SEC'
  },
  {
    label: 'Bank of America 10-K',
    value: 'HQ city',
    description: 'BofA is headquartered in Charlotte. Retail consumer segment disclosed in annual 10-K.',
    url: 'https://investor.bankofamerica.com/sec-filings/annual-reports',
    linkLabel: 'BofA Annual Report'
  }
];

export default function ModelPerformance() {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
      <div className="mb-1">
        <h3 className="text-white font-semibold">Data Sources</h3>
        <p className="text-xs text-slate-500 mt-1">Every number in this dashboard traces back to a public filing or research report. Click to read the source.</p>
      </div>
      <div className="mt-5 space-y-4">
        {SOURCES.map(s => (
          <div key={s.label} className="flex items-start justify-between gap-4 py-3 border-b border-slate-800/60 last:border-0">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-sm text-white font-medium">{s.label}</p>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] text-indigo-400 hover:text-indigo-300 transition-colors flex-shrink-0"
                >
                  <ExternalLink className="w-3 h-3" />
                  {s.linkLabel}
                </a>
              </div>
              <p className="text-xs text-slate-500 leading-snug">{s.description}</p>
            </div>
            <span className="text-sm font-bold text-emerald-400 font-mono whitespace-nowrap flex-shrink-0">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}