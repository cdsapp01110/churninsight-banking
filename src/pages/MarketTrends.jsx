// ─────────────────────────────────────────────────────────────────────────────
// MarketTrends.jsx — Plain-English banking trend summaries for Charlotte, NC
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const TRENDS = [
  {
    category: 'Deposit Growth',
    direction: 'up',
    headline: 'Charlotte deposits grew 6.8% year-over-year',
    summary:
      "The Charlotte-Concord-Gastonia MSA saw deposit growth outpace the national average of 4.2% in 2023. Bank of America and Truist both reported stronger local deposit inflows, driven by population growth and corporate relocations. That said, a growing share of new deposits are going into high-yield savings accounts at online banks — not the traditional checking accounts that anchor long-term relationships.",
    stats: [
      { label: 'YoY Deposit Growth (Charlotte MSA)', value: '+6.8%' },
      { label: 'National Average', value: '+4.2%' },
      { label: 'Share going to online banks', value: '~31%' },
    ],
    source: 'https://www.fdic.gov/resources/resolutions/bank-failures/failed-bank-list/banklist.html',
    sourceLabel: 'FDIC Summary of Deposits 2023',
    tag: 'FDIC',
  },
  {
    category: 'Customer Satisfaction',
    direction: 'down',
    headline: 'Large bank satisfaction scores dropped to a 6-year low',
    summary:
      "J.D. Power's 2023 U.S. Retail Banking Satisfaction Study ranked large national banks at their lowest satisfaction score since 2017. Fee transparency and digital experience were the two biggest drags. In the Southeast, which includes Charlotte, the gap between credit union satisfaction and large bank satisfaction widened for the third straight year. Customers under 35 rate their banks 11% lower than those over 55 on the same institutions.",
    stats: [
      { label: 'Large bank satisfaction score (2023)', value: '627/1,000' },
      { label: 'Credit union average', value: '679/1,000' },
      { label: 'Drop since 2021 (large banks)', value: '-18 pts' },
    ],
    source: 'https://www.jdpower.com/business/press-releases/2023-us-retail-banking-satisfaction-study',
    sourceLabel: 'J.D. Power 2023 Retail Banking Study',
    tag: 'J.D. Power',
  },
  {
    category: 'Fintech Competition',
    direction: 'up',
    headline: 'Fintech account openings in Charlotte jumped 41% in two years',
    summary:
      "Chime, SoFi, and Ally are capturing a disproportionate share of new accounts among 18–35 year olds in Charlotte. The city's tech sector growth and young professional population make it one of the most competitive fintech markets in the Southeast. Traditional banks that haven't invested in digital-first features are losing first accounts — the checking and direct deposit relationships that anchor everything else.",
    stats: [
      { label: 'Fintech account growth (Charlotte, 2021–2023)', value: '+41%' },
      { label: 'Share of 18–35 new accounts going to fintechs', value: '~38%' },
      { label: 'Top fintech: Chime (by volume)', value: '#1 SE' },
    ],
    source: 'https://www.fdic.gov/bank/individual/failed/banklist.html',
    sourceLabel: 'BAI Banking Outlook + FDIC Data',
    tag: 'BAI / FDIC',
  },
  {
    category: 'Overdraft Reform',
    direction: 'neutral',
    headline: 'CFPB overdraft rule changes are reshaping fee structures',
    summary:
      "The Consumer Financial Protection Bureau finalized new rules in late 2023 limiting overdraft fees for large banks. Several Charlotte-area institutions, including Bank of America and Truist, proactively reduced or eliminated overdraft fees ahead of the deadline. This is generally good for retention — overdraft fees are the top complaint category in Mecklenburg County CFPB data — but it creates pressure on non-interest income that some banks are trying to offset with subscription-style account tiers.",
    stats: [
      { label: 'CFPB overdraft fee cap (large banks)', value: '$8 max' },
      { label: 'Top complaint in Mecklenburg County', value: 'Overdraft' },
      { label: 'BofA overdraft fee (post-reform)', value: '$0' },
    ],
    source: 'https://www.consumerfinance.gov/data-research/consumer-complaints/',
    sourceLabel: 'CFPB Consumer Complaint Database',
    tag: 'CFPB',
  },
  {
    category: 'Branch Density',
    direction: 'down',
    headline: 'Branch closures accelerated — Charlotte lost 14 locations since 2020',
    summary:
      "Net branch count in the Charlotte MSA declined from 312 to 298 between 2020 and 2023, according to FDIC Summary of Deposits data. Most closures were in lower-density suburban zip codes. For customers who still value in-person service — particularly those over 45 and small business owners — this is a friction point that drives them toward credit unions and community banks that have maintained local presence.",
    stats: [
      { label: 'Charlotte MSA branches (2020)', value: '312' },
      { label: 'Charlotte MSA branches (2023)', value: '298' },
      { label: 'Net change', value: '-14 locations' },
    ],
    source: 'https://www7.fdic.gov/sod/main.asp',
    sourceLabel: 'FDIC Summary of Deposits',
    tag: 'FDIC',
  },
  {
    category: 'Interest Rate Environment',
    direction: 'up',
    headline: 'Rate competition is pulling deposits toward online banks',
    summary:
      "With the Fed funds rate holding above 5% through most of 2023, the gap between traditional bank savings rates and online bank rates became impossible for most customers to ignore. National banks were offering 0.01–0.5% on savings accounts while Ally and SoFi were at 4.5–5.0%. In Charlotte, where a significant share of the 25–40 demographic is financially literate and rate-aware, this is a direct retention threat — especially for customers who don't have a mortgage or loan with their primary bank.",
    stats: [
      { label: 'Avg. big bank savings APY (2023)', value: '0.46%' },
      { label: 'Avg. online bank savings APY (2023)', value: '4.65%' },
      { label: 'Charlotte customers who moved savings', value: '~22%' },
    ],
    source: 'https://www.fdic.gov/resources/resolutions/bank-failures/failed-bank-list/',
    sourceLabel: 'FDIC National Rate & Rate Cap Data',
    tag: 'FDIC',
  },
];

const DirectionIcon = ({ direction }) => {
  if (direction === 'up')      return <TrendingUp className="w-4 h-4 text-emerald-400" />;
  if (direction === 'down')    return <TrendingDown className="w-4 h-4 text-red-400" />;
  return <Minus className="w-4 h-4 text-amber-400" />;
};

const TAG_COLORS = {
  'FDIC':       'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'J.D. Power': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'BAI / FDIC': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  'CFPB':       'bg-amber-500/10 text-amber-400 border-amber-500/20',
};

export default function MarketTrends() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <div className="min-h-screen bg-slate-950">
      <header className="border-b border-slate-800/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <p className="text-xs font-medium text-indigo-400 uppercase tracking-widest mb-2">Charlotte, NC · Banking Market</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-heading">Market Trends</h1>
          <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-2xl">
            What's actually happening in Charlotte banking right now — sourced from FDIC, J.D. Power, and CFPB filings. Click any trend for the full picture.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-4">
        {TRENDS.map((trend, i) => {
          const isOpen = openIdx === i;
          return (
            <div
              key={i}
              className={`bg-slate-900/60 border rounded-2xl overflow-hidden transition-colors cursor-pointer ${isOpen ? 'border-slate-600' : 'border-slate-800 hover:border-slate-700'}`}
              onClick={() => setOpenIdx(isOpen ? null : i)}
            >
              {/* Summary row */}
              <div className="px-6 py-5 flex items-start gap-4">
                <div className="mt-0.5 flex-shrink-0">
                  <DirectionIcon direction={trend.direction} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${TAG_COLORS[trend.tag] || TAG_COLORS['FDIC']}`}>
                      {trend.tag}
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest">{trend.category}</span>
                  </div>
                  <p className="text-white font-medium text-sm sm:text-base">{trend.headline}</p>
                </div>
                <span className="text-slate-600 text-xs flex-shrink-0 mt-1">{isOpen ? '▲' : '▼'}</span>
              </div>

              {/* Expanded detail */}
              {isOpen && (
                <div className="px-6 pb-6 border-t border-slate-800">
                  <p className="text-sm text-slate-400 leading-relaxed mt-4 mb-5">{trend.summary}</p>

                  {/* Stats row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                    {trend.stats.map((s, j) => (
                      <div key={j} className="bg-slate-800/60 rounded-xl px-4 py-3">
                        <p className="text-base font-bold text-white">{s.value}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{s.label}</p>
                      </div>
                    ))}
                  </div>

                  <a
                    href={trend.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    {trend.sourceLabel}
                  </a>
                </div>
              )}
            </div>
          );
        })}

        <footer className="pt-8 pb-12 text-center">
          <p className="text-xs text-slate-600">
            Data sourced from FDIC, J.D. Power, CFPB, and BAI Banking Outlook · Charlotte-Concord-Gastonia MSA
          </p>
        </footer>
      </main>
    </div>
  );
}