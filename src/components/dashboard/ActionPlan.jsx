// ActionPlan.jsx — "What specific interventions should we run next?"
// Prioritized action plan — each driver maps to an owner, intervention, segment, and expected impact.
// Churn reduction is a company-wide sport: columns show which team owns each action.

import React, { useState } from 'react';

const actions = [
  {
    priority: '01',
    owner: 'Product',
    ownerColor: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
    title: 'Fix month-3 onboarding drop-off (Q2 2023 cohort)',
    segment: 'All new accounts',
    trigger: 'Login frequency < 3× in first 30 days',
    intervention: 'Introduce 2-product default onboarding: prompt savings account setup at day 7, not day 30.',
    impact: '~4–6 pt improvement in 6-month retention',
    effort: 'Medium',
    urgency: 'high',
  },
  {
    priority: '02',
    owner: 'CS / Ops',
    ownerColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    title: 'Re-engage at 45-day inactivity, not 90',
    segment: 'Ages 18–35, single-product',
    trigger: 'No login for 45 consecutive days',
    intervention: 'Automated push + in-app message with a targeted fee waiver or cashback activation offer.',
    impact: 'Recovers est. 12–18% of at-risk accounts before disengagement hardens',
    effort: 'Low',
    urgency: 'high',
  },
  {
    priority: '03',
    owner: 'Finance / Pricing',
    ownerColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    title: 'Audit overdraft and maintenance fee structure',
    segment: 'Ages 18–35, Mecklenburg County',
    trigger: 'Any fee-related support contact',
    intervention: 'Proactive fee waiver for first-year customers + no-fee tier for accounts with direct deposit.',
    impact: 'Addresses #1 CFPB complaint category; est. 20% reduction in fee-driven churn',
    effort: 'Medium',
    urgency: 'high',
  },
  {
    priority: '04',
    owner: 'Marketing',
    ownerColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    title: 'Differentiate acquisition pitch for 18–25 cohort',
    segment: 'Ages 18–25, Charlotte MSA',
    trigger: 'New account signup without direct deposit in 60 days',
    intervention: 'Mobile-first onboarding journey: fee transparency upfront, HYSA rate highlight, digital-only perks.',
    impact: 'Reduces 1-year exit rate for weakest cohort by est. 8–12 pts',
    effort: 'Medium',
    urgency: 'medium',
  },
  {
    priority: '05',
    owner: 'Finance / Ops',
    ownerColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    title: 'Improve involuntary churn recovery (billing failures)',
    segment: '22% of churned customers — involuntary',
    trigger: 'Failed payment or fraud flag',
    intervention: 'Automated dunning sequence: SMS + email + in-app at day 1, 3, 7. Offer payment plan at day 5.',
    impact: 'Industry recovery rate 20–40% of involuntary churn with a proper dunning flow',
    effort: 'Low',
    urgency: 'medium',
  },
  {
    priority: '06',
    owner: 'Product',
    ownerColor: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
    title: 'Add loyalty milestones at 1yr, 3yr, 5yr tenure',
    segment: 'All segments, post-year-1',
    trigger: 'Tenure anniversary with no rate/benefit acknowledgment',
    intervention: 'Automatic rate bump, fee waiver, or bonus tied to tenure milestones — triggered in-app.',
    impact: 'Targets the long-tenure churn spike; est. 10% improvement in 3-yr retention',
    effort: 'Low',
    urgency: 'low',
  },
];

const EFFORT_COLORS = {
  Low:    'bg-emerald-500/15 text-emerald-400',
  Medium: 'bg-amber-500/15 text-amber-400',
  High:   'bg-red-500/15 text-red-400',
};

const URGENCY_BORDER = {
  high:   'border-l-red-500',
  medium: 'border-l-amber-500',
  low:    'border-l-slate-600',
};

export default function ActionPlan() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
      <div className="mb-1">
        <h3 className="text-white font-semibold">Prioritized Retention Action Plan</h3>
        <p className="text-xs text-slate-500 mt-1">
          Each churn driver mapped to an owner, trigger, intervention, and expected impact · Click to expand
        </p>
      </div>

      {/* Owner legend */}
      <div className="flex flex-wrap gap-2 mt-3 mb-5">
        {['Product', 'CS / Ops', 'Finance / Pricing', 'Marketing'].map(o => (
          <span key={o} className="text-[10px] text-slate-400 bg-slate-800 rounded-full px-2.5 py-1">{o}</span>
        ))}
      </div>

      <div className="space-y-2">
        {actions.map((a, i) => {
          const isOpen = expanded === i;
          return (
            <div
              key={a.priority}
              className={`border-l-4 border border-slate-800 rounded-xl cursor-pointer transition-colors ${URGENCY_BORDER[a.urgency]} ${isOpen ? 'bg-slate-800/40' : 'bg-slate-800/10 hover:bg-slate-800/30'}`}
              onClick={() => setExpanded(isOpen ? null : i)}
            >
              <div className="flex items-center gap-3 px-4 py-3">
                <span className="text-lg font-bold text-slate-700 font-mono flex-shrink-0">{a.priority}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white font-medium leading-snug">{a.title}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{a.segment}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${a.ownerColor}`}>{a.owner}</span>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${EFFORT_COLORS[a.effort]}`}>{a.effort} effort</span>
                </div>
              </div>
              {isOpen && (
                <div className="px-4 pb-4 border-t border-slate-800 pt-3 space-y-2">
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Trigger</p>
                    <p className="text-xs text-slate-300">{a.trigger}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Intervention</p>
                    <p className="text-xs text-slate-300 leading-relaxed">{a.intervention}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Expected Impact</p>
                    <p className="text-xs text-emerald-400 font-medium">{a.impact}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex gap-4 mt-4 pt-3 border-t border-slate-800/60 text-[10px] text-slate-600">
        <span className="flex items-center gap-1"><span className="w-2 h-3 rounded-sm bg-red-500 inline-block" />High urgency</span>
        <span className="flex items-center gap-1"><span className="w-2 h-3 rounded-sm bg-amber-500 inline-block" />Medium urgency</span>
        <span className="flex items-center gap-1"><span className="w-2 h-3 rounded-sm bg-slate-600 inline-block" />Low urgency</span>
      </div>
    </div>
  );
}