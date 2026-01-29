<template>
  <div class="blackground">
    <img id="top_image" src="./../images/img2.png" alt="Quote Image" class="main-image" />
    <div class="homepage colorful">
      <!-- HERO SECTION -->
      <section class="hero box section-gradient-1 expanded">
        <h1>OUR SERVICES</h1>
        <p class="subheading">
          Financial clarity isn’t a luxury — it’s the foundation of every successful decision.
        </p>
        <blockquote>
          “Financial clarity isn’t a luxury — it’s the foundation of every successful decision.”
        </blockquote>
      </section>

      <!-- COLLAPSIBLE SECTIONS (Rows: 3 | 3 | 2) -->
      <div class="collapsible-container">
        <!-- Row 1: 1 -->
        <section class="collapsible-box section-gradient-2" :class="{ expanded: expandedBox === 'virtual-cfo' }">
          <h2>1. Virtual CFO Services</h2>
          
          <!-- Preview Content -->
          <div class="preview-content">
            <p class="preview-text">Your finance partner — guiding strategy, profitability, and growth.</p>
            <button class="explore-more-btn" @click.stop="toggleBox('virtual-cfo')">
              <span v-if="expandedBox !== 'virtual-cfo'">Explore More ↓</span>
              <span v-else>Show Less ↑</span>
            </button>
          </div>
          
          <!-- Full Content -->
          <div class="full-content" v-if="expandedBox === 'virtual-cfo'">

            <p>
              Our Virtual CFO services give you all the benefits of a full-time CFO — without hiring one in-house.
              We work as your extended finance team, managing your company’s financial health — from cash flow to investor
              presentations.
            </p>

            <h3>Explore:</h3>
            <ul>
              <li><strong>Performance Reviews & Monthly CFO Calls:</strong> Reports, KPIs, and action-driven discussions.</li>
              <li><strong>Budgeting & Forecasting:</strong> Annual & rolling forecasts, dashboards, and budget vs actual reviews.</li>
              <li><strong>Cost Control & Profitability:</strong> Identify leakages and improve margins with deep analysis.</li>
              <li><strong>Cash Flow & Working Capital:</strong> Accurate forecasting and liquidity planning.</li>
              <li><strong>Investor Reporting & Boards:</strong> Investor-ready reports and compelling board decks.</li>
              <li><strong>Coordination with Auditors & Banks:</strong> Audit-ready reports, bank documentation, and liaison.</li>
              <li><strong>Custom Financial Models:</strong> Tailored models that match your business needs.</li>
            </ul>

            <p class="closing">
              Your numbers will always tell a clear story — and your CFO ensures it’s a story of growth and control.
            </p>
          </div>
        </section>

        <!-- Row 1: 2 -->
        <section class="collapsible-box section-gradient-3" :class="{ expanded: expandedBox === 'fin-models' }">
          <h2>2. Financial Modelling & Business Intelligence</h2>
          
          <!-- Preview Content -->
          <div class="preview-content">
            <p class="preview-text">Turning data into strategy with CFO-built models.</p>
            <button class="explore-more-btn" @click.stop="toggleBox('fin-models')">
              <span v-if="expandedBox !== 'fin-models'">Explore More ↓</span>
              <span v-else>Show Less ↑</span>
            </button>
          </div>
          
          <!-- Full Content -->
          <div class="full-content" v-if="expandedBox === 'fin-models'">

            <p>
              We build custom financial models designed around your goals — not generic spreadsheets. Ideal for fundraising,
              project evaluation, and strategic planning.
            </p>

            <h3>Explore:</h3>
            <ul>
              <li><strong>3-statement Integrated Models:</strong> P&L, Balance Sheet and Cash Flow linked for clarity.</li>
              <li><strong>Startup & Investor-Ready Models:</strong> Revenue plans, runway, and valuation frameworks.</li>
              <li><strong>Scenario & Sensitivity Models:</strong> Test pricing, launches and cost changes with confidence.</li>
              <li><strong>Valuation Models:</strong> DCF, comparables and other approaches for fundraising or M&A.</li>
              <li><strong>Budgeting & Forecasting Models:</strong> Annual, quarterly and rolling forecasts.</li>
              <li><strong>Profitability & Break-even:</strong> Identify profitable segments and optimize pricing.</li>
              <li><strong>Tailored Templates:</strong> Industry- and stage-specific models, no unnecessary complexity.</li>
            </ul>

            <p class="closing">
              Clarity, not complexity: models that help you plan, forecast, and explain your business to stakeholders.
            </p>
          </div>
        </section>

        <!-- Row 1: 3 -->
        <section class="collapsible-box section-gradient-4" :class="{ expanded: expandedBox === 'cashflow' }">
          <h2>3. Cash Flow & Working Capital Management</h2>
          
          <!-- Preview Content -->
          <div class="preview-content">
            <p class="preview-text">Predict. Protect. Prosper.</p>
            <button class="explore-more-btn" @click.stop="toggleBox('cashflow')">
              <span v-if="expandedBox !== 'cashflow'">Explore More ↓</span>
              <span v-else>Show Less ↑</span>
            </button>
          </div>
          
          <!-- Full Content -->
          <div class="full-content" v-if="expandedBox === 'cashflow'">

            <p>
              Gain control over your cash before it controls you. We monitor and project your cash position so you always
              know what you can spend, invest, or save.
            </p>

            <h3>Explore:</h3>
            <ul>
              <li><strong>Cash Flow Forecasting & Tracking:</strong> Weekly, monthly & quarterly forecasts and tracking.</li>
              <li><strong>Burn Rate & Runway:</strong> Understand runway and extend it with actionable measures.</li>
              <li><strong>Working Capital Optimisation:</strong> Streamline receivables, payables and inventory cycles.</li>
              <li><strong>Receivable & Payable Optimisation:</strong> Credit policies and payment planning for smoother cash flow.</li>
              <li><strong>Cash Management Dashboards:</strong> Real-time cash position, forecasts and trends.</li>
            </ul>

            <p class="closing">
              Result: You’ll never be caught off guard — you’ll always know your cash position and how to improve it.
            </p>
          </div>
        </section>

        <!-- Row 2: 4 -->
        <section class="collapsible-box section-gradient-5" :class="{ expanded: expandedBox === 'accounting' }">
          <h2>4. Accounting & Bookkeeping</h2>
          
          <!-- Preview Content -->
          <div class="preview-content">
            <p class="preview-text">Accurate books. Smarter decisions.</p>
            <button class="explore-more-btn" @click.stop="toggleBox('accounting')">
              <span v-if="expandedBox !== 'accounting'">Explore More ↓</span>
              <span v-else>Show Less ↑</span>
            </button>
          </div>
          
          <!-- Full Content -->
          <div class="full-content" v-if="expandedBox === 'accounting'">

            <p>
              We manage your accounts end-to-end so you can focus on growth. Accurate, compliant, and always audit-ready.
            </p>

            <h3>Explore:</h3>
            <ul>
              <li><strong>End-to-End Bookkeeping:</strong> Record transactions across accounts, banks and platforms.</li>
              <li><strong>Accounting Software Setup:</strong> Tally, Zoho Books, Xero, QuickBooks tailored to your needs.</li>
              <li><strong>Ledger & Bank Reconciliation:</strong> Regular reconciliations to prevent discrepancies.</li>
              <li><strong>Monthly & Quarterly Closures:</strong> Timely statements and management reviews.</li>
              <li><strong>TDS & GST Reminders:</strong> Compliance reminders and advice to avoid penalties.</li>
              <li><strong>Audit-Ready Financials:</strong> Records maintained for smooth statutory and internal audits.</li>
            </ul>

            <p class="closing">
              Outcome: Clean books, accurate reports, and zero last-minute surprises.
            </p>
          </div>
        </section>

        <!-- Row 2: 5 -->
        <section class="collapsible-box section-gradient-6" :class="{ expanded: expandedBox === 'budgeting' }">
          <h2>5. Budgeting, Forecasting & Monthly Performance Reporting</h2>
          
          <!-- Preview Content -->
          <div class="preview-content">
            <p class="preview-text">Turn data into decision-making power.</p>
            <button class="explore-more-btn" @click.stop="toggleBox('budgeting')">
              <span v-if="expandedBox !== 'budgeting'">Explore More ↓</span>
              <span v-else>Show Less ↑</span>
            </button>
          </div>
          
          <!-- Full Content -->
          <div class="full-content" v-if="expandedBox === 'budgeting'">

            <p>
              From budgets and forecasts to performance dashboards, our CFO team ensures you always know where your
              business stands and where it’s headed next.
            </p>

            <h3>Explore:</h3>
            <ul>
              <li><strong>Budget Planning & Forecasting:</strong> Realistic budgets, rolling forecasts and variance reports.</li>
              <li><strong>KPI Tracking & MIS Reporting:</strong> Monthly MIS with P&L, Balance Sheet & Cash Flow summaries.</li>
              <li><strong>Budget vs Actual Analysis:</strong> Highlight deviations and recommend corrective actions.</li>
              <li><strong>Ratio & Trend Analysis:</strong> Insights into profitability, liquidity and efficiency.</li>
              <li><strong>Strategic CFO Insights:</strong> Actionable recommendations to strengthen profitability and control.</li>
            </ul>

            <p class="closing">
              Stay ahead of surprises — lead your business with confidence, powered by data-driven financial clarity.
            </p>
          </div>
        </section>

        <!-- Row 2: 6 -->
        <section class="collapsible-box section-gradient-7" :class="{ expanded: expandedBox === 'formation' }">
          <h2>6. Company & LLP Formation Services</h2>
          
          <!-- Preview Content -->
          <div class="preview-content">
            <p class="preview-text">Every great business starts with the right foundation.</p>
            <button class="explore-more-btn" @click.stop="toggleBox('formation')">
              <span v-if="expandedBox !== 'formation'">Explore More ↓</span>
              <span v-else>Show Less ↑</span>
            </button>
          </div>
          
          <!-- Full Content -->
          <div class="full-content" v-if="expandedBox === 'formation'">

            <p>
              We make setting up your company or LLP simple, compliant, and stress-free — from structure choice to post
              incorporation compliance.
            </p>

            <h3>Explore:</h3>
            <ul>
              <li><strong>Entity Selection & Structuring:</strong> Private Limited, LLP, OPC or Partnership guidance.</li>
              <li><strong>Incorporation & Registration:</strong> PAN, TAN, GST and MCA filings handled end-to-end.</li>
              <li><strong>Legal Documentation:</strong> MOA, AOA, LLP Agreement, Partnership Deed and resolutions.</li>
              <li><strong>Post-Incorporation Setup:</strong> Registers, accounting systems and initial filings.</li>
              <li><strong>Local Licenses & Registrations:</strong> Shops & Establishment, IEC, Professional Tax, MSME support.</li>
            </ul>

            <p class="closing">
              Your business deserves a smooth start — we make the process effortless, compliant and future-ready.
            </p>
          </div>
        </section>

        <!-- Row 3: 7 -->
        <section class="collapsible-box section-gradient-8" :class="{ expanded: expandedBox === 'tax-audit' }">
          <h2>7. Tax, Audit & Regulatory Compliance</h2>
          
          <!-- Preview Content -->
          <div class="preview-content">
            <p class="preview-text">Stay compliant. Stay confident.</p>
            <button class="explore-more-btn" @click.stop="toggleBox('tax-audit')">
              <span v-if="expandedBox !== 'tax-audit'">Explore More ↓</span>
              <span v-else>Show Less ↑</span>
            </button>
          </div>
          
          <!-- Full Content -->
          <div class="full-content" v-if="expandedBox === 'tax-audit'">

            <p>
              From tax filings to audit coordination, we ensure every return and regulation is handled with accuracy and
              transparency.
            </p>

            <h3>Explore:</h3>
            <ul>
              <li><strong>Direct & Indirect Taxes:</strong> GST, TDS and ITR filings with reconciliations and due-date tracking.</li>
              <li><strong>ROC & LLP Filings:</strong> Form submissions, annual returns and Director KYC management.</li>
              <li><strong>Audit Coordination:</strong> Audit schedules, ledger extracts and query handling support.</li>
              <li><strong>International & FEMA Compliance:</strong> Cross-border reporting, FDI/ODI and RBI-related filings.</li>
              <li><strong>Tax Planning & Advisory:</strong> Strategic planning to optimise tax outflow while staying compliant.</li>
            </ul>

            <p class="closing">
              The outcome is total peace of mind — your business stays compliant and you can focus on growth.
            </p>
          </div>
        </section>

        <!-- Row 3: 8 -->
        <section class="collapsible-box section-gradient-2" :class="{ expanded: expandedBox === 'sop' }">
          <h2>8. SOPs, Internal Controls & Process Improvement</h2>
          
          <!-- Preview Content -->
          <div class="preview-content">
            <p class="preview-text">Build systems that keep your business organised, compliant, and scalable.</p>
            <button class="explore-more-btn" @click.stop="toggleBox('sop')">
              <span v-if="expandedBox !== 'sop'">Explore More ↓</span>
              <span v-else>Show Less ↑</span>
            </button>
          </div>
          
          <!-- Full Content -->
          <div class="full-content" v-if="expandedBox === 'sop'">

            <p>
              Strong processes, clear responsibilities, and controls make your business investor-ready and efficient.
            </p>

            <h3>Explore:</h3>
            <ul>
              <li><strong>SOP Development:</strong> Clear workflows for accounting, approvals, invoicing and expenses.</li>
              <li><strong>Internal Control Frameworks:</strong> Checks & balances to prevent fraud and errors.</li>
              <li><strong>Process Mapping & Gap Analysis:</strong> Identify inefficiencies and recommend improvements.</li>
              <li><strong>Delegation & Authorization Matrix:</strong> Define approval levels and accountability.</li>
              <li><strong>Compliance & Risk Controls:</strong> Timely statutory filings and data accuracy systems.</li>
              <li><strong>Policy Manuals & Documentation:</strong> Practical finance and HR policy guides for consistent operations.</li>
            </ul>

            <p class="closing">
              Strong controls don’t slow you down — they make your business scalable, secure, and investor-ready.
            </p>
          </div>
        </section>
      </div>

      <!-- BOTTOM QUOTE -->
      <section class="box section-gradient-1 lastBox">
        <p class="closing quote">
          “Great businesses are built on clarity — not complexity.” — Steve Jobs
        </p>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "OurServices",
  data() {
    return {
      expandedBox: null, // no box expanded by default
    };
  },
  methods: {
    toggleBox(box) {
      this.expandedBox = this.expandedBox === box ? null : box;
    },
  },
};
</script>

<style scoped>
.lastBox{
  margin-top: 5%;
}
.homepage {
  font-family: "Inter", sans-serif;
  max-width: 1200px;
  margin: auto;
  padding: 40px;
  background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%);
  min-height: 100vh;
  line-height: 1.7;
  color: #1e293b;
}

.blackground {
  background: linear-gradient(180deg, #dbeafe 0%, #bfdbfe 50%, #93c5fd 100%);
  min-height: 100vh;
}

/* Top image */
#top_image {
  width: 100vw;
  height: 36vh;
  object-fit: cover;
  object-position: center;
  display: block;
  margin: 0 auto 20px;
}

/* BOX base */
.box {
  padding: 30px;
  border-radius: 14px;
  margin-bottom: 30px;
  color: #1e293b;
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.2);
  position: relative;
  overflow: hidden;
}

/* Hero section light blue textured background */
.hero::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(96, 165, 250, 0.15) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
  opacity: 0.3;
  z-index: 0;
}

/* Ensure hero content appears above the pattern */
.hero > * {
  position: relative;
  z-index: 1;
}

.hero h1 {
  font-family: 'Poppins', sans-serif;
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1rem;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 10px rgba(59, 130, 246, 0.3);
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero .subheading {
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 0.8rem;
  line-height: 1.6;
  color: #334155;
}

.hero blockquote {
  font-family: 'Georgia', serif;
  font-style: italic;
  font-size: 1.05rem;
  line-height: 1.6;
  color: #1e293b;
  border-left: 3px solid #3b82f6;
  padding-left: 1.5rem;
  margin: 1.2rem 0;
  background: rgba(191, 219, 254, 0.3);
  padding: 1rem 1.5rem;
  border-radius: 6px;
}

/* Collapsible layout */
.collapsible-container {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

/* For Option D: 3 | 3 | 2 using 33% basis */
.collapsible-box {
  flex: 1 1 calc(33% - 20px);
  min-height: 120px;
  border-radius: 12px;
  padding: 20px;
  color: #1e293b;
  transition: all 0.45s cubic-bezier(.2,.9,.2,1);
  box-shadow: 0 10px 30px rgba(59, 130, 246, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
}

.collapsible-box h2 {
  margin: 0 0 15px 0;
  font-family: 'Poppins', sans-serif;
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: 0.3px;
  text-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
  padding-left: 18px;
  position: relative;
  color: #1e40af;
  line-height: 1.2;
}

/* Professional blue accent bar before heading */
.collapsible-box h2::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 70%;
  background: linear-gradient(180deg, #3b82f6, #60a5fa);
  border-radius: 2px;
}

/* Light blue textured background for tabs */
.collapsible-box::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(96, 165, 250, 0.1) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

.collapsible-box::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
  opacity: 0.3;
  z-index: 0;
}

/* Ensure content appears above the pattern */
.collapsible-box > * {
  position: relative;
  z-index: 1;
}

/* Expanded box expands to full width */
.collapsible-box.expanded {
  flex: 1 1 100%;
  padding: 35px;
}

/* Preview Content Styling */
.preview-content {
  margin-top: 10px;
}

.preview-text {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: #334155;
  margin-bottom: 15px;
  font-weight: 400;
}

/* Explore More Button - Professional Blue Accent */
.explore-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 28px;
  font-family: 'Poppins', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #3b82f6, #60a5fa);
  border: 2px solid #3b82f6;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1.1px;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
}

.explore-more-btn:hover {
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  border-color: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(59, 130, 246, 0.5);
}

.explore-more-btn:active {
  transform: translateY(0);
}

/* Full Content Styling */
.full-content {
  margin-top: 25px;
  animation: fadeIn 0.4s ease;
  border-top: 2px solid rgba(59, 130, 246, 0.3);
  padding-top: 25px;
}

/* Content area */
.content, .full-content {
  max-height: 60vh;
  overflow: auto;
  padding-right: 6px; /* small gutter for scrollbar */
  color: #334155;
}

/* small typographic styles */
.subheading {
  font-family: 'Inter', sans-serif;
  font-size: 1.05rem;
  line-height: 1.6;
  color: #334155;
  margin-bottom: 18px;
  font-weight: 500;
}

.content h3, .full-content h3 {
  margin-top: 12px;
  margin-bottom: 8px;
  color: #1e40af;
  font-size: 1.1rem;
}

.content ul, .full-content ul {
  padding-left: 18px;
  margin: 8px 0 12px 0;
}

.content li, .full-content li {
  margin-bottom: 8px;
  color: #334155;
}

.content p, .full-content p {
  color: #334155;
  line-height: 1.7;
}

/* closing lines and quote */
.content .closing, .full-content .closing {
  margin-top: 1.5rem;
  padding: 1.2rem 1.5rem;
  font-weight: 600;
  border-left: 4px solid #3b82f6;
  background: rgba(191, 219, 254, 0.4);
  border-radius: 8px;
  color: #1e293b;
  font-family: 'Georgia', serif;
  font-style: italic;
  line-height: 1.7;
}

/* KEYFRAMES */
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(6px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* LIGHT BLUE GRADIENTS */
.section-gradient-1 {
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  border-top: 3px solid #3b82f6;
}

.section-gradient-2 {
  background: linear-gradient(135deg, #e0f2fe, #bae6fd);
  border-left: 3px solid #3b82f6;
}

.section-gradient-3 {
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  border-left: 3px solid #3b82f6;
}

.section-gradient-4 {
  background: linear-gradient(135deg, #bfdbfe, #93c5fd);
  border-left: 3px solid #3b82f6;
}

.section-gradient-5 {
  background: linear-gradient(135deg, #e0f2fe, #bae6fd);
  border-left: 3px solid #3b82f6;
}

.section-gradient-6 {
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  border-left: 3px solid #3b82f6;
}

.section-gradient-7 {
  background: linear-gradient(135deg, #bfdbfe, #93c5fd);
  border-left: 3px solid #3b82f6;
}

.section-gradient-8 {
  background: linear-gradient(135deg, #e0f2fe, #bae6fd);
  border-left: 3px solid #3b82f6;
}

/* Hover effects - Subtle professional highlights */
.section-gradient-2:hover {
  background: linear-gradient(135deg, #bae6fd, #7dd3fc);
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(59, 130, 246, 0.3);
}
.section-gradient-3:hover {
  background: linear-gradient(135deg, #bfdbfe, #93c5fd);
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(59, 130, 246, 0.3);
}
.section-gradient-4:hover {
  background: linear-gradient(135deg, #93c5fd, #60a5fa);
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(59, 130, 246, 0.3);
}
.section-gradient-5:hover {
  background: linear-gradient(135deg, #bae6fd, #7dd3fc);
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(59, 130, 246, 0.3);
}
.section-gradient-6:hover {
  background: linear-gradient(135deg, #bfdbfe, #93c5fd);
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(59, 130, 246, 0.3);
}
.section-gradient-7:hover {
  background: linear-gradient(135deg, #93c5fd, #60a5fa);
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(59, 130, 246, 0.3);
}
.section-gradient-8:hover {
  background: linear-gradient(135deg, #bae6fd, #7dd3fc);
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(59, 130, 246, 0.3);
}

/* Responsive adjustments */
@media (max-width: 980px) {
  .collapsible-box {
    flex: 1 1 calc(50% - 20px);
  }
}

@media (max-width: 640px) {
  #top_image {
    height: 22vh;
  }
  .collapsible-box {
    flex: 1 1 100%;
  }
}
</style>
