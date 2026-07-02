// ─────────────────────────────────────────────────────────────────────────────
// RetentionStrategy.jsx — Retention playbook for Charlotte customers aged 18–40
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Zap, MessageSquare, Gift, Shield, Clock } from 'lucide-react';

const STRATEGIES = [
  {
    icon: Clock,
    priority: '01',
    title: 'The 45-Day Inactivity Trigger',
    owner: 'Retention Team',
    effort: 'Low',
    impact: 'High',
    segment: '18–30',
    color: 'indigo',
    summary: 'Re-engage customers before disengagement hardens into a decision to leave.',
    detail:
      "Most banks wait until 90 days of inactivity to act. By then, the customer has mentally moved on. At 45 days without an app login or debit transaction, send a personal-sounding push notification — not a promotional email — that acknowledges the gap and offers something specific: a fee waiver, a rate bump on savings, or a quick call with a banker. This group is not yet churned. They're drifting.",
    triggers: ['No app login in 45 days', 'No debit card transaction in 30 days', 'No direct deposit in 2 cycles'],
    actions: [
      'Push notification: "We noticed you haven\'t logged in — here\'s what\'s new for you"',
      'Offer a one-time $5 credit for completing a profile update or setting up a savings goal',
      'Route High Risk and Critical segments to a live banker call within 48 hours',
    ],
    kpi: '~12% re-engagement rate expected within 7 days of outreach',
  },
  {
    icon: Gift,
    priority: '02',
    title: 'The Two-Product Bundle Push',
    owner: 'Product Team + Retention',
    effort: 'Medium',
    impact: 'Very High',
    segment: '22–35',
    color: 'emerald',
    summary: 'Move single-product customers to two products before the 6-month mark.',
    detail:
      "Customers with only a checking account churn at nearly three times the rate of those with two products. The most effective second product in this age group is a high-yield savings account — not a credit card. Credit cards feel like a sales pitch. A savings account with a competitive rate feels like the bank is working for them. Make the offer at account opening and again at 30 days if they haven't adopted it.",
    triggers: ['Account age: 14–45 days', 'One product held', 'No savings account linked'],
    actions: [
      'In-app modal at day 14: "Open a savings account — currently earning 4.8% APY"',
      'Email at day 30 if no savings account: personalized with their balance and potential earnings',
      'Banker prompt in CRM for any 18–35 single-product customer calling in',
    ],
    kpi: 'Two-product customers churn at 11% vs. 31% for single-product accounts',
  },
  {
    icon: MessageSquare,
    priority: '03',
    title: 'Fee Transparency Campaign',
    owner: 'Marketing + Compliance',
    effort: 'Low',
    impact: 'High',
    segment: '18–40',
    color: 'amber',
    summary: 'Get ahead of fee complaints before they become CFPB filings.',
    detail:
      "Overdraft and maintenance fees are the #1 complaint in Mecklenburg County CFPB data. The issue isn't always the fee itself — it's the surprise. Customers who understand exactly when and why they're charged are significantly less likely to close their account over a fee. A simple proactive notification system ('You're $12 away from an overdraft fee — move money now?') reduces complaints and builds trust at the same time.",
    triggers: ['Balance drops below $50', 'First overdraft event', 'Maintenance fee charged'],
    actions: [
      'Real-time push when balance drops below $50: warn before the fee hits',
      'After first overdraft: proactive email explaining exactly what happened and how to avoid it',
      'Offer a one-time fee waiver to any customer who calls to complain — costs less than losing them',
    ],
    kpi: 'Proactive fee communication reduces complaint-driven churn by ~18% per BAI data',
  },
  {
    icon: Zap,
    priority: '04',
    title: 'Mobile Experience Audit (18–25 cohort)',
    owner: 'Product / UX',
    effort: 'High',
    impact: 'Very High',
    segment: '18–25',
    color: 'rose',
    summary: "Fix the friction that sends the youngest cohort straight to Chime.",
    detail:
      "Charlotte's 18–25 segment churns at 31% — the highest of any age group. When surveyed, this group cites app friction and lack of instant payment features as their top complaints. They're not switching because of rates. They're switching because they tried to Zelle someone at 11pm, hit an error, and downloaded Chime instead. An audit of the top 5 in-app failure points — failed transfers, unclear balance displays, confusing overdraft warnings — followed by targeted fixes will reduce first-year churn in this cohort.",
    triggers: ['App session ends without completing a transaction', 'Support contact within first 60 days', 'Failed Zelle or P2P transfer'],
    actions: [
      'Map the top 5 in-app drop-off points using session data',
      'Add real-time balance + pending transaction clarity to the home screen',
      'Implement instant P2P transfers with clear confirmation screens',
      'A/B test a simplified onboarding flow for 18–25 new accounts',
    ],
    kpi: '1-year churn for 18–25 cohort currently at 31%; target: under 22% within 2 quarters',
  },
  {
    icon: Shield,
    priority: '05',
    title: 'Loyalty Milestone Program (Tenure-Based)',
    owner: 'Retention Team',
    effort: 'Medium',
    impact: 'Medium',
    segment: '25–40',
    color: 'blue',
    summary: 'Reward tenure at the moments it actually matters — before customers start looking.',
    detail:
      "Most loyalty programs reward spending, not staying. The 25–40 age group in Charlotte is at peak life-transition activity — buying homes, changing jobs, starting families. Each of these events is a moment when a competitor can offer a better deal and win the relationship. A milestone-based program that acknowledges the 1-year, 3-year, and 5-year marks with something tangible — a rate increase, a fee waiver period, or access to a premium account tier — creates a reason to stay that isn't just inertia.",
    triggers: ['Account anniversary: 1 year', 'Account anniversary: 3 years', 'Account anniversary: 5 years'],
    actions: [
      'Year 1: In-app message + $10 credit or savings rate boost for 6 months',
      'Year 3: Upgrade offer to fee-waived premium checking if not already on it',
      'Year 5: Personal outreach from a banker + dedicated relationship manager assignment',
    ],
    kpi: 'Tenure-based recognition reduces 3-year churn by ~9% per J.D. Power loyalty data',
  },
  {
    icon: Users,
    priority: '06',
    title: 'Life Event Intercept Program',
    owner: 'Retail Banking + Retention',
    effort: 'High',
    impact: 'Very High',
    segment: '28–40',
    color: 'violet',
    summary: 'Show up when it matters most — mortgages, new jobs, and babies are churn moments in disguise.',
    detail:
      "The highest-risk period for a 28–40 customer isn't inactivity — it's life transitions. A customer buying a first home is talking to a mortgage officer who might be at a competing bank. A customer starting a new job might set up direct deposit somewhere else without thinking. Intercepting these moments with a proactive, helpful offer — not a generic upsell — turns a churn risk into a deepened relationship. Banks that do this well use transaction signals like large payroll changes, wire transfers to escrow, or new employer direct deposits as triggers.",
    triggers: ['New direct deposit from a different employer', 'Large outbound wire (potential home purchase)', 'Significant balance increase (inheritance, bonus)'],
    actions: [
      'New employer signal: outreach to confirm direct deposit is set up correctly + offer a mortgage pre-qual',
      'Large wire signal: assign a relationship banker to follow up within 24 hours',
      'Balance spike: offer a personal financial review — no pitch, just service',
    ],
    kpi: 'Life-event intercept programs show 2.3x higher product attachment vs. cold outreach (BAI)',
  },
];

const EFFORT_COLORS = {
  'Low':    'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'Medium': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'High':   'bg-red-500/10 text-red-400 border-red-500/20',
};

const IMPACT_COLORS = {
  'High':      'text-amber-400',
  'Very High': 'text-emerald-400',
  'Medium':    'text-blue-400',
};

const ICON_COLORS = {
  indigo:  'bg-indigo-500/10 text-indigo-400',
  emerald: 'bg-emerald-500/10 text-emerald-400',
  amber:   'bg-amber-500/10 text-amber-400',
  rose:    'bg-rose-500/10 text-rose-400',
  blue:    'bg-blue-500/10 text-blue-400',
  violet:  'bg-violet-500/10 text-violet-400',
};

export default function RetentionStrategy() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <div className="min-h-screen bg-slate-950">
      <header className="border-b border-slate-800/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <p className="text-xs font-medium text-indigo-400 uppercase tracking-widest mb-2">Charlotte, NC · Banking Market</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-heading">Retention Strategy</h1>
          <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-2xl">
            Six prioritized playbooks for keeping Charlotte's 18–40 customers. Each one ties to a specific signal, a clear owner, and a measurable result.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-4">

        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-xs text-slate-500 pb-2">
          <span>Effort:
            <span className="ml-1.5 px-2 py-0.5 rounded border bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Low</span>
            <span className="ml-1 px-2 py-0.5 rounded border bg-amber-500/10 text-amber-400 border-amber-500/20">Medium</span>
            <span className="ml-1 px-2 py-0.5 rounded border bg-red-500/10 text-red-400 border-red-500/20">High</span>
          </span>
          <span>Impact: <span className="text-emerald-400">Very High</span> · <span className="text-amber-400">High</span> · <span className="text-blue-400">Medium</span></span>
        </div>

        {STRATEGIES.map((s, i) => {
          const isOpen = openIdx === i;
          const iconStyle = ICON_COLORS[s.color] || ICON_COLORS['indigo'];
          return (
            <div
              key={i}
              className={`bg-slate-900/60 border rounded-2xl overflow-hidden transition-colors cursor-pointer ${isOpen ? 'border-slate-600' : 'border-slate-800 hover:border-slate-700'}`}
              onClick={() => setOpenIdx(isOpen ? null : i)}
            >
              {/* Header row */}
              <div className="px-6 py-5 flex items-start gap-4">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${iconStyle}`}>
                  <s.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-[10px] text-slate-600 font-mono">{s.priority}</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest">{s.owner}</span>
                    <span className={`text-[10px] font-semibold uppercase tracking-wide ${IMPACT_COLORS[s.impact]}`}>
                      {s.impact} Impact
                    </span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${EFFORT_COLORS[s.effort]}`}>
                      {s.effort} Effort
                    </span>
                    <span className="text-[10px] text-slate-600">Ages {s.segment}</span>
                  </div>
                  <p className="text-white font-medium text-sm sm:text-base">{s.title}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{s.summary}</p>
                </div>
                <span className="text-slate-600 text-xs flex-shrink-0 mt-1">{isOpen ? '▲' : '▼'}</span>
              </div>

              {/* Expanded detail */}
              {isOpen && (
                <div className="px-6 pb-6 border-t border-slate-800 space-y-5">
                  <p className="text-sm text-slate-400 leading-relaxed mt-4">{s.detail}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Triggers */}
                    <div className="bg-slate-800/50 rounded-xl p-4">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Triggers</p>
                      <ul className="space-y-2">
                        {s.triggers.map((t, j) => (
                          <li key={j} className="flex items-start gap-2 text-xs text-slate-400">
                            <span className="text-indigo-500 mt-0.5 flex-shrink-0">→</span>
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Actions */}
                    <div className="bg-slate-800/50 rounded-xl p-4">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Actions</p>
                      <ul className="space-y-2">
                        {s.actions.map((a, j) => (
                          <li key={j} className="flex items-start gap-2 text-xs text-slate-400">
                            <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* KPI */}
                  <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-xl px-4 py-3">
                    <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-1">Expected Outcome</p>
                    <p className="text-sm text-slate-300">{s.kpi}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <footer className="pt-8 pb-12 text-center">
          <p className="text-xs text-slate-600">
            Charlotte, NC Banking Market · Strategies informed by FDIC, J.D. Power, BAI, and CFPB data
          </p>
        </footer>
      </main>
    </div>
  );
}