// LeadingIndicators.jsx — "Which signals appear before a customer churns?"
// Shows the behavioral warning signs observed in the weeks before cancellation.
// Separates retrospective reporting from an operational retention system.

import React from 'react';
import { AlertTriangle, TrendingDown, PhoneCall, Clock, CreditCard, Layers } from 'lucide-react';

const signals = [
  {
    icon: TrendingDown,
    label: 'Login frequency drops >50%',
    timing: '6–8 weeks before churn',
    lift: '3.2×',
    liftLabel: 'more likely to churn',
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    action: 'Trigger re-engagement push notification + fee waiver offer',
  },
  {
    icon: CreditCard,
    label: 'Debit card spend drops to <2 transactions/month',
    timing: '4–6 weeks before churn',
    lift: '2.8×',
    liftLabel: 'more likely to churn',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    action: 'Offer cashback activation or direct deposit bonus',
  },
  {
    icon: Layers,
    label: 'Product count drops from 2 to 1',
    timing: '3–5 weeks before churn',
    lift: '2.4×',
    liftLabel: 'more likely to churn',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    action: 'CSM outreach — understand why the second product was closed',
  },
  {
    icon: PhoneCall,
    label: 'Support contact about fees (1+ call)',
    timing: '2–4 weeks before churn',
    lift: '2.1×',
    liftLabel: 'more likely to churn',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
    action: 'Proactive fee waiver or loyalty credit on next statement',
  },
  {
    icon: Clock,
    label: 'Session depth falls (views 1–2 screens, exits)',
    timing: '3–6 weeks before churn',
    lift: '1.9×',
    liftLabel: 'more likely to churn',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
    action: 'In-app tooltip highlighting unused features tied to their profile',
  },
  {
    icon: AlertTriangle,
    label: 'Balance falls below $250 for 30+ days',
    timing: '2–3 weeks before churn',
    lift: '1.7×',
    liftLabel: 'more likely to churn',
    color: 'text-slate-400',
    bg: 'bg-slate-500/10',
    border: 'border-slate-700',
    action: 'Alert: waive minimum balance fee; surface savings rate offer',
  },
];

export default function LeadingIndicators() {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
      <div className="mb-1">
        <h3 className="text-white font-semibold">Leading Indicators — Signals Before Churn</h3>
        <p className="text-xs text-slate-500 mt-1">
          These behaviors appear weeks before cancellation · Each maps directly to an intervention
        </p>
      </div>

      <div className="mt-4 space-y-3">
        {signals.map(s => (
          <div key={s.label} className={`rounded-xl border p-4 ${s.bg} ${s.border}`}>
            <div className="flex items-start gap-3">
              <s.icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${s.color}`} />
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-0.5">
                  <p className="text-sm text-white font-medium">{s.label}</p>
                  <span className={`text-[10px] font-mono font-bold ${s.color}`}>{s.lift} {s.liftLabel}</span>
                </div>
                <p className="text-[10px] text-slate-500 mb-1">{s.timing}</p>
                <p className="text-[11px] text-slate-400 leading-snug">→ {s.action}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}