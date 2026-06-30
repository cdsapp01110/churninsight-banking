# ChurnInsight Banking — Charlotte, NC Market Dashboard

A data-driven churn analysis dashboard focused on the Charlotte, NC banking market.
It visualizes churn patterns across a 10,000-customer dataset and surfaces
actionable retention strategies for banking teams.

---

## What's inside

| Page | Route | Description |
|---|---|---|
| **Dashboard** | `/` | Top-line KPIs, eight analytics charts, retention recommendations, and a CSV export |
| **Charlotte Market Data** | `/project` | Bank-by-bank churn risk breakdown, demographic context stats, and key takeaways |

---

## How to run the app locally

### Option A — Full stack with Base44 CLI (recommended)

This runs both the frontend dev server and the local Base44 backend together.

**1. Install the Base44 CLI (one-time)**

```bash
npm install -g base44@latest
```

**2. Clone the repo and install dependencies**

```bash
git clone <your-repo-url>
cd <project-folder>
npm install
```

**3. Start the development environment**

```bash
base44 dev
```

The CLI will print a local URL — open it in your browser to see the live dashboard.
Hot-reload is on by default; any file change reflects immediately.

---

### Option B — Frontend only (against the hosted backend)

Use this if you only want to work on the UI without running the Base44 backend locally.

**1. Create a `.env.local` file in the project root**

```bash
VITE_BASE44_APP_ID=your_app_id
VITE_BASE44_APP_BASE_URL=https://your-app.base44.app
```

Replace the values with your actual app ID and hosted URL from the Base44 dashboard.

**2. Start the Vite dev server**

```bash
npm run dev
```

Open the URL printed by Vite — typically `http://localhost:5173`.

---

## Project structure

```
src/
  pages/
    Home.jsx          # Main dashboard — KPIs, charts, recommendations
    Project.jsx       # Charlotte market deep-dive — bank table, takeaways
  components/
    dashboard/
      StatCard.jsx        # Reusable KPI card with trend indicator
      ChurnByGeography.jsx # NC metro churn rate bar chart
      ChurnByAge.jsx       # Age-band churn area chart
      FeatureImportance.jsx# Horizontal bar chart of churn drivers
      ActivityChurn.jsx    # Digital engagement vs. churn correlation
      ProductChurn.jsx     # Donut chart — products held vs. churn rate
      SegmentBreakdown.jsx # Risk segment distribution (uses live data)
      ModelPerformance.jsx # Data sources panel with external links
    ProtectedRoute.jsx  # Auth guard for protected routes
    AuthLayout.jsx      # Shared layout for login/register pages
  api/
    base44Client.js     # Pre-initialized Base44 SDK client
base44/
  entities/
    ChurnCustomer.jsonc  # Customer schema — credit score, tenure, churn flag, etc.
```

---

## Deploying changes

After pushing to git, publish from the Base44 dashboard:

```bash
base44 dashboard open
```

Or open the dashboard directly at [app.base44.com](https://app.base44.com) and hit **Publish**.

---

## Data sources

All market figures used in the dashboard come from publicly available sources:

- [FDIC](https://www.fdic.gov) — bank deposit and branch data
- [J.D. Power 2023 US Retail Banking Satisfaction Study](https://www.jdpower.com/business/press-releases/2023-us-retail-banking-satisfaction-study)
- [CFPB Consumer Complaint Database](https://www.consumerfinance.gov/data-research/consumer-complaints/)
- [U.S. Census Bureau — Charlotte MSA](https://www.census.gov/quickfacts/charlottemecklenburgcitynorthcarolina)
- Individual bank investor relations pages (linked inline on each chart tooltip and table row)

---

## Support

Base44 docs: [docs.base44.com](https://docs.base44.com)  
Base44 support: [app.base44.com/support](https://app.base44.com/support)