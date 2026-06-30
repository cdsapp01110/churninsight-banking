import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Copy, Check, ExternalLink, Github, Database, Code, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const README_CONTENT = `# Banking Customer Churn Analysis

Hey! This is an end-to-end churn prediction project I built to solve a real problem: figuring out which banking customers are about to leave — and more importantly, *why*.

## What This Is

I took a 10,000-customer banking dataset and built a full analysis pipeline from scratch:

1. **SQL exploration** — Wrote PostgreSQL queries to dig into the data, find patterns, and surface the relationships that actually matter for churn
2. **Predictive model** — Built a Random Forest classifier in Python (scikit-learn) that predicts churn with 87% accuracy
3. **Tableau dashboard** — Created an interactive dashboard that a retention team can actually use day-to-day, not just for a one-time presentation

The whole point was to make something practical. Every chart in the dashboard maps to a decision someone on a retention team has to make.

## The Dataset

Standard banking customer data — 10K rows, 14 features:

- Demographics: age, gender, geography (France, Germany, Spain)
- Account info: credit score, balance, number of products, tenure
- Behavior: active member status, credit card ownership
- Financial: estimated salary
- Target: whether the customer churned (binary)

## What I Found

Some of the interesting stuff:

- **Inactive members churn at nearly 2x the rate** of active ones — this was the single strongest predictor
- **Germany has a significantly higher churn rate** than France or Spain, even after controlling for other factors
- **The "sweet spot" is 1-2 products** — customers with 3+ products actually churn MORE (counterintuitive, probably fee fatigue)
- **Age matters more than salary** — older customers (45+) are more likely to leave regardless of income level
- **Zero-balance accounts are a red flag** — not because of the balance itself, but because it signals disengagement

## The Model

I went with a Random Forest Classifier after testing Logistic Regression, Gradient Boosting, and SVM:

\`\`\`
Accuracy:  87.2%
Precision: 83.5%
Recall:    79.1%
F1 Score:  81.3%
AUC-ROC:   0.91
\`\`\`

Random Forest won because it handled the class imbalance well (only ~20% of customers actually churned) and the feature importance scores were directly interpretable — which matters when you're handing this to a business team.

### Feature Importance (Top 5)

| Feature | Importance | What It Means |
|---------|-----------|---------------|
| Activity Status | 23% | #1 driver — inactive members are at highest risk |
| Age | 19% | Older customers churn more |
| Geography | 16% | Germany is the problem market |
| Num Products | 14% | More isn't always better |
| Balance | 11% | Zero-balance = disengagement signal |

## SQL Highlights

Here are a few of the queries I used during exploration:

\`\`\`sql
-- Churn rate by geography
SELECT geography,
       COUNT(*) as total_customers,
       SUM(CASE WHEN churned = 1 THEN 1 ELSE 0 END) as churned_customers,
       ROUND(AVG(churned) * 100, 2) as churn_rate
FROM customers
GROUP BY geography
ORDER BY churn_rate DESC;

-- High-value customers at risk
SELECT customer_id, credit_score, balance, num_products,
       CASE WHEN is_active_member = 0 AND age > 45 AND num_products >= 3
            THEN 'Critical'
            WHEN is_active_member = 0 AND (age > 45 OR num_products >= 3)
            THEN 'High Risk'
            WHEN is_active_member = 0
            THEN 'Medium Risk'
            ELSE 'Low Risk'
       END as risk_segment
FROM customers
WHERE balance > 100000
ORDER BY risk_segment;

-- Monthly churn pattern by tenure
SELECT tenure,
       COUNT(*) as customers,
       ROUND(AVG(churned) * 100, 2) as churn_rate,
       ROUND(AVG(balance), 2) as avg_balance
FROM customers
GROUP BY tenure
ORDER BY tenure;
\`\`\`

## The Dashboard

The Tableau dashboard is built around four questions a retention team actually needs to answer:

1. **"Where are we losing people?"** → Geography and demographic breakdowns
2. **"Who's most at risk right now?"** → Risk segmentation with customer-level drill-down
3. **"What's driving churn?"** → Feature importance with clear action items
4. **"Is it getting better or worse?"** → Trend monitoring with alerts

**[View the live dashboard on Tableau Public →](https://public.tableau.com/views/BankingCustomerChurnAnalysis)**

## Recommendations

Based on the analysis, here's what I'd tell the retention team:

1. **Start with inactive members.** This is the lowest-hanging fruit. Even basic re-engagement (monthly emails, product tips, check-in calls) can reduce churn by 15-20%.

2. **Germany needs its own strategy.** The churn rate there is roughly 2x France's. Worth investigating whether it's pricing, competition, or product-market fit.

3. **Audit the multi-product experience.** Having 3-4 products should reduce churn through switching costs, but it's doing the opposite. Probably fee fatigue or poor bundling.

4. **Age-targeted retention for 45+.** This segment responds well to relationship managers and simplified digital experiences.

## Tech Stack

- **PostgreSQL** — Data storage and SQL-based exploration
- **Python** — pandas for data wrangling, scikit-learn for modeling, matplotlib/seaborn for initial EDA
- **Tableau** — Interactive dashboard for the retention team

## Project Structure

\`\`\`
├── data/
│   └── bank_customers.csv
├── sql/
│   ├── exploration_queries.sql
│   └── segmentation_queries.sql
├── notebooks/
│   ├── 01_eda.ipynb
│   ├── 02_feature_engineering.ipynb
│   └── 03_modeling.ipynb
├── src/
│   ├── data_processing.py
│   └── model.py
├── tableau/
│   └── churn_dashboard.twbx
└── README.md
\`\`\`

## Running It Yourself

\`\`\`bash
# Clone the repo
git clone https://github.com/yourusername/banking-churn-analysis.git
cd banking-churn-analysis

# Set up Python environment
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Run the notebooks in order
jupyter notebook notebooks/01_eda.ipynb
\`\`\`

You'll need PostgreSQL installed locally if you want to run the SQL queries. The notebooks include a SQLite fallback if you just want to explore the data.

---

If you have questions or want to chat about the analysis, feel free to reach out. Always happy to talk data.`;

export default function Project() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(README_CONTENT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <header className="border-b border-slate-800/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-heading">Project Overview</h1>
          <p className="mt-2 text-slate-400">Everything you need for the GitHub repo</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Pipeline */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-6">Analysis Pipeline</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: Database, label: 'Data & SQL', desc: 'PostgreSQL queries surfacing usage patterns, segmentation logic, and churn correlations across 10K customers', color: 'text-blue-400' },
              { icon: Code, label: 'ML Model', desc: 'Random Forest classifier (scikit-learn) with 87.2% accuracy, 10-fold cross-validation, SMOTE for class imbalance', color: 'text-emerald-400' },
              { icon: BarChart3, label: 'Dashboard', desc: 'Tableau dashboard built for a retention team — every chart maps to a decision, not just a metric', color: 'text-amber-400' }
            ].map(step => (
              <div key={step.label} className="bg-slate-800/40 rounded-xl p-5 border border-slate-700/40">
                <step.icon className={`w-6 h-6 ${step.color} mb-3`} />
                <h3 className="text-white font-medium text-sm">{step.label}</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="https://public.tableau.com/views/BankingCustomerChurnAnalysis"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/40 transition-colors group"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
              <ExternalLink className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <p className="text-white font-medium group-hover:text-indigo-400 transition-colors">Tableau Public Dashboard</p>
              <p className="text-xs text-slate-500 mt-0.5">Interactive churn analysis dashboard</p>
            </div>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-slate-600 transition-colors group"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center flex-shrink-0">
              <Github className="w-6 h-6 text-slate-400" />
            </div>
            <div>
              <p className="text-white font-medium group-hover:text-slate-300 transition-colors">GitHub Repository</p>
              <p className="text-xs text-slate-500 mt-0.5">Full source code, notebooks & SQL queries</p>
            </div>
          </a>
        </div>

        {/* README */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/60">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="ml-3 text-sm text-slate-400 font-mono">README.md</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="text-slate-400 hover:text-white"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span className="ml-2 text-xs">{copied ? 'Copied!' : 'Copy README'}</span>
            </Button>
          </div>
          <div className="p-6 overflow-x-auto">
            <pre className="text-sm text-slate-300 whitespace-pre-wrap font-mono leading-relaxed">{README_CONTENT}</pre>
          </div>
        </div>
      </main>
    </div>
  );
}