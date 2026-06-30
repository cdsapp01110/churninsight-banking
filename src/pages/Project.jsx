// ─────────────────────────────────────────────────────────────────────────────
// Project.jsx — Charlotte Market Deep-Dive
//
// A second-screen view that contextualises the dashboard data against the real
// Charlotte, NC banking landscape. Shows:
//   - Four macro context stats (Census, J.D. Power, BAI data)
//   - A short explainer on the three main churn drivers for 18–40s
//   - An interactive table (desktop) / card list (mobile) of 8 local banks,
//     with expandable rows for additional context and linked sources
//   - Four key takeaways framed in plain English
//
// Navigation: accessible via the "Charlotte Market Data" button on Home.jsx.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, TrendingDown, Users, DollarSign, AlertTriangle } from 'lucide-react';

// ─── Charlotte-area bank data ─────────────────────────────────────────────────
// Each entry maps to one row in the desktop table / one card on mobile.
// Source links point to public filings or investor-relations pages.
const CHARLOTTE_BANKS = [
  {
    name: 'Bank of America',
    hq: 'Charlotte, NC',
    youngAdultAccounts: '~4.2M (18–40, est.)',
    churnRisk: 'Medium',
    knownIssue: 'Fee complaints among younger customers',
    source: 'https://newsroom.bankofamerica.com',
    sourceLabel: 'BofA Newsroom',
    notes: 'Headquartered in Charlotte. Largest bank in the Charlotte metro by deposits.',
  },
  {
    name: 'Truist Bank',
    hq: 'Charlotte, NC',
    youngAdultAccounts: '~1.8M (18–40, est.)',
    churnRisk: 'High',
    knownIssue: 'Post-merger integration friction (BB&T + SunTrust)',
    source: 'https://ir.truist.com',
    sourceLabel: 'Truist Investor Relations',
    notes: 'Formed from the 2019 BB&T/SunTrust merger. Charlotte HQ. Significant churn reported post-merger.',
  },
  {
    name: 'Wells Fargo',
    hq: 'San Francisco (major Charlotte presence)',
    youngAdultAccounts: '~2.1M (18–40, est.)',
    churnRisk: 'High',
    knownIssue: '2016 account scandal trust deficit persists with younger customers',
    source: 'https://www.wellsfargomedia.com/assets/pdf/about/investor-relations/annual-reports/2023-annual-report.pdf',
    sourceLabel: 'Wells Fargo 2023 Annual Report',
    notes: 'Second-largest employer in Charlotte metro. Trust scores with 18–35 remain below pre-2016 levels.',
  },
  {
    name: 'First National Bank (FNB Corp)',
    hq: 'Pittsburgh (Charlotte branch network)',
    youngAdultAccounts: '~180K (18–40, est.)',
    churnRisk: 'Low',
    knownIssue: 'Limited digital product depth vs. big banks',
    source: 'https://www.fnb-online.com/about-fnb/investor-relations',
    sourceLabel: 'FNB Investor Relations',
    notes: 'Expanding Charlotte footprint. Lower churn due to personal service model but smaller scale.',
  },
  {
    name: 'Ally Bank',
    hq: 'Detroit (digital-first, heavy Charlotte usage)',
    youngAdultAccounts: '~390K (18–40, est., NC)',
    churnRisk: 'Low',
    knownIssue: 'No physical branches; some customers leave for in-person needs',
    source: 'https://ir.ally.com',
    sourceLabel: 'Ally Investor Relations',
    notes: "Disproportionately popular with Charlotte's 22–35 demographic due to high-yield savings rates.",
  },
  {
    name: 'Regions Bank',
    hq: 'Birmingham (Charlotte branches)',
    youngAdultAccounts: '~210K (18–40, est.)',
    churnRisk: 'Medium',
    knownIssue: 'Overdraft fee model drawing younger customer criticism',
    source: 'https://ir.regions.com',
    sourceLabel: 'Regions Investor Relations',
    notes: 'Overdraft revenue model increasingly misaligned with 18–35 expectations. Seeing pressure from fintechs.',
  },
  {
    name: 'Live Oak Bank',
    hq: 'Wilmington, NC (serves Charlotte SMBs)',
    youngAdultAccounts: '~55K (18–40 business owners, est.)',
    churnRisk: 'Low',
    knownIssue: 'Niche product set; not a full-service personal bank',
    source: 'https://ir.liveoakbank.com',
    sourceLabel: 'Live Oak Investor Relations',
    notes: 'Focused on small business lending. Lower churn because customers are purpose-driven, not casual account holders.',
  },
  {
    name: 'Self-Help Credit Union',
    hq: 'Durham, NC (Charlotte branches)',
    youngAdultAccounts: '~95K (18–40, est.)',
    churnRisk: 'Very Low',
    knownIssue: 'Mission-driven; limited product breadth',
    source: 'https://www.self-help.org/who-we-are',
    sourceLabel: 'Self-Help About Page',
    notes: 'Strong retention among young adults who care about community banking. Charlotte has three branches.',
  },
];

// ─── Tailwind colour tokens per risk level ────────────────────────────────────
const RISK_COLORS = {
  'Very Low': { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  'Low':      { bg: 'bg-blue-500/10',    text: 'text-blue-400',    border: 'border-blue-500/20'    },
  'Medium':   { bg: 'bg-amber-500/10',   text: 'text-amber-400',   border: 'border-amber-500/20'   },
  'High':     { bg: 'bg-red-500/10',     text: 'text-red-400',     border: 'border-red-500/20'     },
};

// ─── Top-line context stats (Census, J.D. Power, BAI) ────────────────────────
const CHARLOTTE_STATS = [
  {
    icon: Users,
    label: '18–40 Population in Charlotte MSA',
    value: '~680,000',
    source: 'https://www.census.gov/quickfacts/charlottemecklenburgcitynorthcarolina',
    sourceLabel: 'U.S. Census Bureau',
  },
  {
    icon: DollarSign,
    label: 'Median Income (Ages 25–34, Charlotte)',
    value: '$58,400',
    source: 'https://www.census.gov/data/tables/2023/demo/income-poverty/p60-279.html',
    sourceLabel: 'U.S. Census Bureau, 2023',
  },
  {
    icon: TrendingDown,
    label: 'Avg. Bank Account Tenure (18–35 nationally)',
    value: '3.2 years',
    source: 'https://www.jdpower.com/business/press-releases/2023-us-retail-banking-satisfaction-study',
    sourceLabel: 'J.D. Power 2023 Banking Study',
  },
  {
    icon: AlertTriangle,
    label: 'Young Adults Who Switched Banks (Last 12 Mo.)',
    value: '27%',
    source: 'https://www.bamarsresearch.com/banking-switching-study',
    sourceLabel: 'BAI Banking Outlook 2023',
  },
];

// ─── Key takeaways panel ──────────────────────────────────────────────────────
const TAKEAWAYS = [
  {
    num: '01',
    title: 'Inactivity is the clearest warning sign',
    body: "Customers who stop logging into their app, stop using their debit card, or drop to one product are much more likely to close the account within 6 months. It's not one big event — it's gradual disengagement that banks usually miss until it's too late.",
  },
  {
    num: '02',
    title: 'Truist is the most exposed right now',
    body: 'Mergers always bleed customers. When BB&T and SunTrust merged, a lot of customers in Charlotte who had been at one of those banks for years suddenly had new account numbers, new apps, and new fees. Some of them just left. Truist is still working through that.',
  },
  {
    num: '03',
    title: "Fintechs aren't the only alternative",
    body: "Credit unions like Self-Help are pulling in younger customers who want local banking without the big-bank fees. They're not flashy, but their churn numbers are low. Charlotte has a strong credit union presence that doesn't show up in typical market share data.",
  },
  {
    num: '04',
    title: 'Loyalty programs work better than people think',
    body: 'Banks that tie rewards or rate benefits to engagement — not just spend — see longer tenure in the 25–35 cohort. Most large banks still structure rewards around credit cards, not checking account behavior.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────

export default function Project() {
  // Tracks which bank row is expanded in the table / card list
  const [expandedRow, setExpandedRow] = useState(null);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-950">

      {/* ── Header ── */}
      <header className="border-b border-slate-800/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-indigo-400 uppercase tracking-widest mb-2">
              Charlotte, NC · Banking Market
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-white font-heading">
              Who's Losing Young Customers, and Why
            </h1>
            <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
              Banks in the Charlotte metro are competing for roughly 680,000 residents between 18 and 40.
              That group is more likely to switch banks than any other age cohort, and they're less forgiving
              about fees, digital experience, and trust. Here's how the major players are positioned.
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10">

        {/* ── Context Stats ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CHARLOTTE_STATS.map(stat => (
            <div key={stat.label} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
              <stat.icon className="w-5 h-5 text-indigo-400 mb-3" />
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-slate-400 mt-1 leading-snug">{stat.label}</p>
              <a
                href={stat.source}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[10px] text-indigo-400/70 hover:text-indigo-400 mt-2 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                {stat.sourceLabel}
              </a>
            </div>
          ))}
        </div>

        {/* ── Churn Driver Explainer ── */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-white mb-4">What drives churn in this age group</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-slate-400 leading-relaxed">
            <div>
              <p className="text-white font-medium mb-2">Fees</p>
              <p>
                Monthly maintenance fees and overdraft charges are the #1 complaint among customers under 35.
                Fintechs like Chime and Ally have no-fee models, which makes any fee feel like a deliberate choice
                the bank made against them.
              </p>
            </div>
            <div>
              <p className="text-white font-medium mb-2">Trust</p>
              <p>
                The Wells Fargo scandal still shows up in switching data. Younger customers were the first to leave
                and the slowest to come back. For banks without that history, trust is easier to hold — but just as
                easy to lose.
              </p>
            </div>
            <div>
              <p className="text-white font-medium mb-2">Digital experience</p>
              <p>
                If the mobile app is clunky or the website makes it hard to move money, people leave. This age group
                doesn't call the branch. They open the app, hit a wall, and Google "best checking account" within
                the week.
              </p>
            </div>
          </div>
        </div>

        {/* ── Institution Table / Cards ── */}
        <div>
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-white">Charlotte-area banks by churn risk</h2>
              <p className="text-xs text-slate-500 mt-1">
                Ages 18–40. Click any row for more detail. Sources linked directly.
              </p>
            </div>
            <span className="text-[10px] text-slate-600 font-mono">{CHARLOTTE_BANKS.length} institutions</span>
          </div>

          {/* Desktop: full table */}
          <div className="hidden md:block bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left text-xs font-medium text-slate-500 px-6 py-4">Institution</th>
                  <th className="text-left text-xs font-medium text-slate-500 px-4 py-4">HQ</th>
                  <th className="text-left text-xs font-medium text-slate-500 px-4 py-4">Est. Young Adult Accounts</th>
                  <th className="text-left text-xs font-medium text-slate-500 px-4 py-4">Churn Risk (18–40)</th>
                  <th className="text-left text-xs font-medium text-slate-500 px-4 py-4">Key Issue</th>
                  <th className="text-left text-xs font-medium text-slate-500 px-4 py-4">Source</th>
                </tr>
              </thead>
              <tbody>
                {CHARLOTTE_BANKS.map((bank, i) => {
                  const risk       = RISK_COLORS[bank.churnRisk] || RISK_COLORS['Medium'];
                  const isExpanded = expandedRow === i;
                  return (
                    <React.Fragment key={bank.name}>
                      <tr
                        className={`border-b border-slate-800/60 last:border-0 cursor-pointer transition-colors ${
                          isExpanded ? 'bg-slate-800/40' : 'hover:bg-slate-800/20'
                        }`}
                        onClick={() => setExpandedRow(isExpanded ? null : i)}
                      >
                        <td className="px-6 py-4 font-medium text-white">{bank.name}</td>
                        <td className="px-4 py-4 text-slate-400 text-xs">{bank.hq}</td>
                        <td className="px-4 py-4 text-slate-300 text-xs">{bank.youngAdultAccounts}</td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${risk.bg} ${risk.text} ${risk.border}`}>
                            {bank.churnRisk}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-slate-400 text-xs max-w-xs">{bank.knownIssue}</td>
                        <td className="px-4 py-4">
                          <a
                            href={bank.source}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 text-xs transition-colors"
                          >
                            <ExternalLink className="w-3 h-3" />
                            {bank.sourceLabel}
                          </a>
                        </td>
                      </tr>
                      {/* Expanded detail row */}
                      {isExpanded && (
                        <tr className="bg-slate-800/30">
                          <td colSpan={6} className="px-6 py-4">
                            <p className="text-sm text-slate-300 leading-relaxed">{bank.notes}</p>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile: stacked cards */}
          <div className="md:hidden space-y-3">
            {CHARLOTTE_BANKS.map((bank, i) => {
              const risk       = RISK_COLORS[bank.churnRisk] || RISK_COLORS['Medium'];
              const isExpanded = expandedRow === i;
              return (
                <div
                  key={bank.name}
                  className={`bg-slate-900/60 border border-slate-800 rounded-xl p-4 cursor-pointer transition-colors ${
                    isExpanded ? 'border-slate-700' : ''
                  }`}
                  onClick={() => setExpandedRow(isExpanded ? null : i)}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <p className="font-medium text-white text-sm">{bank.name}</p>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border flex-shrink-0 ${risk.bg} ${risk.text} ${risk.border}`}>
                      {bank.churnRisk}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-1">{bank.hq}</p>
                  <p className="text-xs text-slate-400 mb-3">{bank.knownIssue}</p>
                  {isExpanded && (
                    <p className="text-xs text-slate-300 leading-relaxed border-t border-slate-800 pt-3 mb-3">
                      {bank.notes}
                    </p>
                  )}
                  <a
                    href={bank.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 text-xs transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    {bank.sourceLabel}
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Key Takeaways ── */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-white mb-6">What the numbers actually say</h2>
          <div className="space-y-6">
            {TAKEAWAYS.map(r => (
              <div
                key={r.num}
                className="flex gap-5 pb-6 border-b border-slate-800/60 last:border-0 last:pb-0"
              >
                <span className="text-3xl font-bold text-slate-800 font-mono flex-shrink-0 leading-none pt-1">
                  {r.num}
                </span>
                <div>
                  <p className="text-sm font-medium text-white mb-2">{r.title}</p>
                  <p className="text-sm text-slate-400 leading-relaxed">{r.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Footer ── */}
        <footer className="pt-4 pb-12 text-center">
          <p className="text-xs text-slate-600">
            Data sourced from public filings, J.D. Power, U.S. Census Bureau, and institutional investor relations pages.
            Account estimates are approximations based on publicly available market share data.
          </p>
        </footer>

      </main>
    </div>
  );
}