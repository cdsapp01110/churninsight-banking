// ─────────────────────────────────────────────────────────────────────────────
// HelpCenter.jsx — Guide to reading churn metrics and using the dashboard
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BarChart2, Users, TrendingDown, Zap, Map, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

const SECTIONS = [
  {
    icon: BarChart2,
    title: 'Understanding the KPI Cards',
    color: 'indigo',
    items: [
      {
        q: 'What does "Churn Rate" mean here?',
        a: 'Churn rate is the percentage of customers who closed or abandoned their account during the observation period. A 20% churn rate means 1 in 5 customers left. The dashboard calculates this from the sample dataset and scales it to the assumed 10,000-customer population.',
      },
      {
        q: 'What is "Critical Risk" count?',
        a: '"Critical" customers have the highest predicted probability of churning — typically above 70%. They show multiple warning signals at once: no digital activity, a single product, low balance, and no direct deposit. The count is scaled from the sample to the full 10,000-customer dataset.',
      },
      {
        q: 'What does the trend arrow mean?',
        a: 'The small arrow next to a KPI shows whether that metric improved or worsened compared to the prior period. A red upward arrow on Churn Rate means churn is rising — which is bad. Context matters: the color reflects whether the direction is good or bad for retention, not just the direction itself.',
      },
      {
        q: 'Why does "Avg Balance" matter for churn?',
        a: 'Balance is a proxy for relationship depth. Customers with very low balances (under $500) are statistically much more likely to churn — they have less invested in the account and less to lose by switching. The average balance KPI helps you track whether your customer base is financially engaged overall.',
      },
    ],
  },
  {
    icon: TrendingDown,
    title: 'Reading the Charts',
    color: 'rose',
    items: [
      {
        q: 'How do I read the MRR Growth Bridge chart?',
        a: 'The bridge chart in the Revenue Impact panel shows two bars per month: new revenue added and revenue lost to churn. When the "churned" bar is taller than the "new" bar, you\'re losing more than you\'re gaining — even if total customer count is holding steady. It\'s the clearest way to see whether growth is real or just offsetting attrition.',
      },
      {
        q: 'What does the Cohort Retention table show?',
        a: 'Each row is a group of customers who joined in the same quarter. The columns show what percentage of that cohort was still active at 1, 3, 6, 9, and 12 months. Green cells are healthy retention (above 80%). Amber is a warning (65–80%). Red means significant drop-off — often tied to a specific product change, pricing shift, or acquisition channel problem during that period.',
      },
      {
        q: 'What is "churn lift" in the Leading Indicators panel?',
        a: 'Lift measures how much more likely a customer is to churn given a specific behavior, compared to the baseline. A lift of 3.1x on "No login in 45 days" means customers showing that signal churn at 3.1 times the normal rate. Higher lift = higher urgency to act on that signal.',
      },
      {
        q: 'Why does the Churn Taxonomy donut chart have three slices?',
        a: 'Churn breaks into three types: Voluntary (the customer chose to leave), Involuntary (the account was closed due to fraud, fees, or inactivity), and Product (the customer kept the bank relationship but dropped a specific product like a credit card or savings account). Each type needs a different response — you can\'t fix involuntary churn with a marketing campaign.',
      },
      {
        q: 'How should I interpret the Feature Importance chart?',
        a: 'Feature importance shows which customer attributes the predictive model found most useful for identifying churners. A higher bar means that variable — like inactivity status or number of products — was more predictive. It doesn\'t mean that variable directly causes churn; it means it\'s a reliable signal worth monitoring.',
      },
    ],
  },
  {
    icon: Zap,
    title: 'Using the Interactive Tools',
    color: 'amber',
    items: [
      {
        q: 'How do I hover for more detail on charts?',
        a: 'Every chart on the dashboard supports hover tooltips. Move your cursor (or tap on mobile) over any bar, line, or data point to see the exact values, customer count, and a plain-English explanation of what that data point means. The tooltip disappears when you move away.',
      },
      {
        q: 'How does the Customer List search work?',
        a: 'The search bar on the Customer List page filters by customer ID or segment name in real time as you type. Use the segment dropdown to narrow to a specific risk tier (Low Risk, Medium Risk, High Risk, Critical), and use the sort dropdown to reorder by balance, age, tenure, or churn probability. Click any row to expand the full customer profile.',
      },
      {
        q: 'How do I export the data?',
        a: 'Click "Export CSV" in the top-right of the main dashboard. This downloads a multi-section spreadsheet covering all KPIs, geographic comparisons, segment breakdowns, activity analysis, feature importance scores, model performance, and key recommendations — formatted for sharing in a team review or stakeholder meeting.',
      },
      {
        q: 'What does clicking a row in the Customer List do?',
        a: 'Clicking any customer row expands it to show additional profile fields: gender, active member status, credit card status, estimated salary, and whether the customer has already churned. Click the row again to collapse it. On mobile, the same expand/collapse behavior works with a tap.',
      },
    ],
  },
  {
    icon: Map,
    title: 'Navigating the Dashboard Sections',
    color: 'emerald',
    items: [
      {
        q: 'What are the six numbered sections on the main dashboard?',
        a: 'The dashboard is organized around six questions a retention team actually needs to answer: ① How much are we losing? ② Which customers are we losing? ③ When are they most vulnerable? ④ What behaviors predict that loss? ⑤ What does the market context look like? ⑥ What interventions should we run next? Each section contains charts specifically chosen to answer that question.',
      },
      {
        q: 'What is the Charlotte Market Data page for?',
        a: 'It provides external context for the dashboard data — real numbers on the Charlotte banking landscape, including which institutions are most exposed to churn, what the 18–40 demographic looks like, and what the three main churn drivers are in this market. All data is sourced from public filings and linked directly.',
      },
      {
        q: 'What is the Market Trends page for?',
        a: 'Market Trends covers six macro forces shaping banking in Charlotte right now — deposit growth, satisfaction scores, fintech competition, overdraft reform, branch closures, and rate competition. Each trend is expandable and cites a specific external source like the FDIC or CFPB.',
      },
      {
        q: 'What is the Retention Strategy page for?',
        a: 'Retention Strategy is a playbook for teams. Each of the six strategies maps a specific customer signal to a set of actions, assigns an owner, and includes an expected outcome. It\'s designed to be handed directly to a retention or product team as a working document.',
      },
    ],
  },
  {
    icon: BookOpen,
    title: 'Metrics Glossary',
    color: 'blue',
    items: [
      {
        q: 'GRR — Gross Revenue Retention',
        a: 'The percentage of revenue retained from existing customers, before accounting for any expansion (upsells, cross-sells). A GRR of 78% means you kept 78 cents of every dollar from last period\'s customer base. Lower GRR = more revenue leaking through churn. Industry benchmark for retail banking is 82–88%.',
      },
      {
        q: 'NRR — Net Revenue Retention',
        a: 'NRR adds expansion revenue (new products, fee income from existing customers) on top of GRR. An NRR above 100% means existing customers are generating more revenue over time even accounting for churn. Below 100%, the customer base is shrinking in revenue terms even if headcount is flat.',
      },
      {
        q: 'MRR — Monthly Recurring Revenue',
        a: 'MRR is the predictable monthly revenue from the customer base — fees, interest spread, and subscription-style income. The MRR bridge chart tracks how much new MRR is added each month versus how much is lost to churn, giving a clear picture of net revenue momentum.',
      },
      {
        q: 'AUC-ROC — Model Discrimination Score',
        a: 'AUC-ROC measures how well the churn prediction model separates churners from non-churners. A score of 0.5 is no better than random guessing. A score of 1.0 is perfect. The dashboard model scores 0.91, meaning it correctly ranks a churner above a non-churner 91% of the time — strong enough to act on in production.',
      },
      {
        q: 'Churn Probability',
        a: 'Each customer in the dataset has a churn probability score between 0 and 1, generated by the predictive model. A score of 0.82 means the model believes there\'s an 82% chance that customer will churn. Scores above 0.6 are displayed in red on the Customer List; 0.3–0.6 in amber; below 0.3 in green.',
      },
    ],
  },
];

const COLOR_MAP = {
  indigo:  { icon: 'bg-indigo-500/10 text-indigo-400', badge: 'text-indigo-400' },
  rose:    { icon: 'bg-rose-500/10 text-rose-400',     badge: 'text-rose-400'   },
  amber:   { icon: 'bg-amber-500/10 text-amber-400',   badge: 'text-amber-400'  },
  emerald: { icon: 'bg-emerald-500/10 text-emerald-400', badge: 'text-emerald-400' },
  blue:    { icon: 'bg-blue-500/10 text-blue-400',     badge: 'text-blue-400'   },
};

export default function HelpCenter() {
  const [openMap, setOpenMap] = useState({});

  const toggle = (sIdx, iIdx) => {
    const key = `${sIdx}-${iIdx}`;
    setOpenMap(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <header className="border-b border-slate-800/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <p className="text-xs font-medium text-indigo-400 uppercase tracking-widest mb-2">Charlotte, NC · Banking Market</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-heading">Help Center</h1>
          <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-2xl">
            How to read the churn metrics, use the dashboard tools, and navigate each page. Click any question to expand the answer.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {SECTIONS.map((section, sIdx) => {
          const colors = COLOR_MAP[section.color];
          return (
            <div key={sIdx}>
              {/* Section header */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${colors.icon}`}>
                  <section.icon className="w-4 h-4" />
                </div>
                <h2 className={`text-sm font-semibold uppercase tracking-widest ${colors.badge}`}>{section.title}</h2>
              </div>

              {/* FAQ items */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-800">
                {section.items.map((item, iIdx) => {
                  const isOpen = openMap[`${sIdx}-${iIdx}`];
                  return (
                    <div key={iIdx}>
                      <button
                        className="w-full flex items-start justify-between gap-4 px-6 py-4 text-left hover:bg-slate-800/30 transition-colors"
                        onClick={() => toggle(sIdx, iIdx)}
                      >
                        <p className="text-sm font-medium text-white">{item.q}</p>
                        {isOpen
                          ? <ChevronUp className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                          : <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                        }
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-5">
                          <p className="text-sm text-slate-400 leading-relaxed">{item.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        <footer className="pt-4 pb-12 text-center">
          <p className="text-xs text-slate-600">ChurnInsight Banking · Charlotte, NC Market Dashboard</p>
        </footer>
      </main>
    </div>
  );
}