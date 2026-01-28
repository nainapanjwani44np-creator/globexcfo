<template>
  <div class="blackground">
  <img id="top_image" src="./../images/img1.png" alt="Sample Image" class="main-image" />
  <div class="homepage colorful">
    <!-- HERO SECTION -->

    <section class="hero box section-gradient-1 expanded" v-if="content.hero">
      <h1>{{ content.hero.title }}</h1>
      <p class="subheading">
        {{ content.hero.subtitle }}
      </p>
      <blockquote>
        {{ content.hero.quote }}
      </blockquote>
    </section>

    <!-- COLLAPSIBLE SECTIONS -->
    <div class="collapsible-container">
      <!-- WHY CFO SECTION -->
      <section v-if="content.cfoSection" class="collapsible-box section-gradient-2 cfo-section" :class="{ expanded: expandedBox === 'cfo' }">
        <h2>{{ content.cfoSection.heading }}</h2>
        
        <!-- Preview Content -->
        <div class="preview-content">
          <p class="preview-text">{{ content.cfoSection.subheading }}</p>
          <button class="explore-more-btn" @click.stop="toggleBox('cfo')">
            <span v-if="expandedBox !== 'cfo'">Explore More →</span>
            <span v-else>Show Less ↑</span>
          </button>
        </div>
        
        <!-- Full Content -->
        <div class="full-content" v-if="expandedBox === 'cfo'">
          <p class="subheading highlight-text">
            {{ content.cfoSection.subheading }}
          </p>
          <p class="intro-text">
            {{ content.cfoSection.description }}
          </p>
          <ul class="benefits-list">
            <li class="benefit-item" v-for="(benefit, index) in content.cfoSection.benefits" :key="index">
              <span class="benefit-icon">{{ index + 1 }}</span>
              <div class="benefit-content">
                <strong class="benefit-title">{{ benefit.title }}</strong>
                <span class="benefit-desc">{{ benefit.description }}</span>
              </div>
            </li>
          </ul>
          <p class="closing highlight-quote">
            {{ content.cfoSection.closingQuote }}
          </p>
        </div>
      </section>

      <!-- WHY WORK WITH US SECTION -->
      <section v-if="content.whyUs" class="collapsible-box section-gradient-3 why-us-section" :class="{ expanded: expandedBox === 'why-us' }">
        <h2>{{ content.whyUs.heading }}</h2>
        
        <!-- Preview Content -->
        <div class="preview-content">
          <p class="preview-text">{{ content.whyUs.subheading }}</p>
          <button class="explore-more-btn" @click.stop="toggleBox('why-us')">
            <span v-if="expandedBox !== 'why-us'">Explore More →</span>
            <span v-else>Show Less ↑</span>
          </button>
        </div>
        
        <!-- Full Content -->
        <div class="full-content" v-if="expandedBox === 'why-us'">
          <p class="subheading highlight-text">
            {{ content.whyUs.subheading }}
          </p>
          <ul class="benefits-list">
            <li class="benefit-item" v-for="(benefit, index) in content.whyUs.benefits" :key="index">
              <span class="benefit-icon">{{ index + 1 }}</span>
              <div class="benefit-content">
                <strong class="benefit-title">{{ benefit.title }}</strong>
                <span class="benefit-desc">{{ benefit.description }}</span>
              </div>
            </li>
          </ul>
          <p class="closing highlight-quote">
            {{ content.whyUs.closingQuote }}
          </p>
        </div>
      </section>

      <!-- FINANCIAL MODELS SECTION -->
      <section v-if="content.financialModels" class="collapsible-box section-gradient-4 financial-models-section" :class="{ expanded: expandedBox === 'models' }">
        <h2>{{ content.financialModels.heading }}</h2>
        
        <!-- Preview Content -->
        <div class="preview-content">
          <p class="preview-text">{{ content.financialModels.subheading }}</p>
          <button class="explore-more-btn" @click.stop="toggleBox('models')">
            <span v-if="expandedBox !== 'models'">Explore More →</span>
            <span v-else>Show Less ↑</span>
          </button>
        </div>
        
        <!-- Full Content -->
        <div class="full-content" v-if="expandedBox === 'models'">
          <p class="subheading highlight-text">{{ content.financialModels.subheading }}</p>
          
          <div class="why-it-matters-block">
            <h3 class="section-title">
              <span class="icon icon-lightbulb"></span>
              {{ content.financialModels.whyItMatters.title }}
            </h3>
            <p class="description-text">
              {{ content.financialModels.whyItMatters.description }}
            </p>
          </div>
          
          <div class="model-types-block">
            <h3 class="section-title">
              <span class="icon icon-chart"></span>
              {{ content.financialModels.modelTypes.title }}
            </h3>
            <div class="models-grid">
              <div v-for="(model, index) in content.financialModels.modelTypes.list" :key="index" class="model-card">
                <span class="model-icon">{{ index + 1 }}</span>
                <span class="model-name">{{ model }}</span>
              </div>
            </div>
          </div>
          
          <blockquote class="closing-quote-financial">
            {{ content.financialModels.closingQuote }}
          </blockquote>
        </div>
      </section>
    </div>

    <!-- PROFESSIONAL SIGNATURE -->
    <section class="professional-signature box section-gradient-1">
      <div class="signature-content">
        <p class="signature-text">
          At <strong>Globex CFO Advisory LLP</strong>, we believe that every business deserves financial clarity, strategic guidance, and a partner who cares about your growth as much as you do.
        </p>
        <p class="signature-closing">
          Let's build something extraordinary together.
        </p>
        <div class="signature-line">
          <p class="signature-name"><strong>— The Globex CFO Advisory Team</strong></p>
          <p class="signature-tagline">"Your Financial Partners in Growth"</p>
        </div>
      </div>
    </section>
  </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "GlobexHome",
  data() {
    return {
      expandedBox: null,
      loading: true,
      content: {
        hero: null,
        cfoSection: null,
        whyUs: null,
        financialModels: null
      },
    };
  },
  async mounted() {
    await this.loadAllContent();
  },
  methods: {
    toggleBox(box) {
      this.expandedBox = this.expandedBox === box ? null : box;
    },
    async loadAllContent() {
      try {
        // Fetch all content sections in parallel
        const [heroRes, cfoRes, whyUsRes, modelsRes] = await Promise.all([
          axios.get('/api/content/hero').catch(() => null),
          axios.get('/api/content/cfo-section').catch(() => null),
          axios.get('/api/content/why-us').catch(() => null),
          axios.get('/api/content/financial-models').catch(() => null)
        ]);
        
        // Load sections if available
        if (heroRes?.data?.status === 'success') {
          this.content.hero = heroRes.data.data;
        }
        
        if (cfoRes?.data?.status === 'success') {
          this.content.cfoSection = cfoRes.data.data;
        }
        
        if (whyUsRes?.data?.status === 'success') {
          this.content.whyUs = whyUsRes.data.data;
        }
        
        if (modelsRes?.data?.status === 'success') {
          this.content.financialModels = modelsRes.data.data;
        }
      } catch (error) {
        // Silently fail - page will be blank if no content
      } finally {
        this.loading = false;
      }
    }
  },
};
</script>

<style scoped>
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

.blackground{
  background: linear-gradient(180deg, #dbeafe 0%, #bfdbfe 50%, #93c5fd 100%);
  min-height: 100vh;
}

.box {
  padding: 40px;
  border-radius: 16px;
  margin-bottom: 40px;
  color: #1e293b;
  box-shadow: 0 10px 30px rgba(59, 130, 246, 0.2);
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

.hero > * {
  position: relative;
  z-index: 1;
}

/* HERO SECTION - Main Heading */
.hero h1 {
  font-family: 'Poppins', sans-serif;
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  letter-spacing: -1px;
  text-shadow: 0 3px 15px rgba(59, 130, 246, 0.3);
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero .subheading {
  font-family: 'Inter', sans-serif;
  font-size: 1.35rem;
  font-weight: 500;
  line-height: 1.8;
  margin-bottom: 2rem;
  color: #334155;
  max-width: 900px;
}

/* Blockquote Styling */
blockquote {
  font-family: 'Georgia', serif;
  font-size: 1.2rem;
  font-style: italic;
  line-height: 1.8;
  color: #1e293b;
  border-left: 4px solid #3b82f6;
  padding-left: 2rem;
  margin: 2rem 0;
  background: rgba(191, 219, 254, 0.3);
  padding: 1.5rem 2rem;
  border-radius: 8px;
  position: relative;
}

blockquote::before {
  content: '"';
  font-size: 4rem;
  position: absolute;
  left: 10px;
  top: -10px;
  opacity: 0.2;
  font-family: 'Georgia', serif;
  color: #3b82f6;
}

.collapsible-container {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.collapsible-box {
  flex: 1 1 calc(33% - 20px);
  min-height: 150px;
  border-radius: 16px;
  padding: 25px;
  cursor: pointer;
  color: #1e293b;
  transition: all 0.4s ease;
  box-shadow: 0 10px 30px rgba(59, 130, 246, 0.2);
  position: relative;
  overflow: hidden;
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

/* Section Headings (h2) */
.collapsible-box h2 {
  margin: 0 0 20px 0;
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.3px;
  text-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
  padding-left: 20px;
  position: relative;
  color: #1e40af;
  line-height: 1.4;
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

.collapsible-box.expanded {
  flex: 1 1 100%;
  padding: 40px;
}

/* Preview Content Styling */
.preview-content {
  margin-top: 15px;
}

.preview-text {
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  line-height: 1.7;
  color: #334155;
  margin-bottom: 20px;
  font-weight: 400;
}

/* Explore More Button - Professional Blue Accent */
.explore-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 32px;
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #3b82f6, #60a5fa);
  border: 2px solid #3b82f6;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1.2px;
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
  margin-top: 30px;
  animation: fadeIn 0.4s ease;
  border-top: 2px solid rgba(59, 130, 246, 0.3);
  padding-top: 30px;
}

.content {
  margin-top: 25px;
  animation: fadeIn 0.4s ease;
}

/* Content Subheadings */
.content .subheading {
  font-family: 'Inter', sans-serif;
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  color: #334155;
  letter-spacing: 0.2px;
}

/* Subsection Headings (h3) */
.content h3 {
  font-family: 'Poppins', sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  color: #1e40af;
  letter-spacing: 0.3px;
}

/* Paragraphs */
.content p {
  font-family: 'Inter', sans-serif;
  font-size: 1.05rem;
  line-height: 1.8;
  margin-bottom: 1.25rem;
  color: #334155;
  font-weight: 400;
}

/* Lists */
.content ul {
  list-style: none;
  padding-left: 0;
  margin: 1.5rem 0;
}

.content ul li {
  font-family: 'Inter', sans-serif;
  font-size: 1.05rem;
  line-height: 1.8;
  margin-bottom: 1rem;
  color: #334155;
  padding-left: 2rem;
  position: relative;
}

.content ul li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 10px;
  width: 8px;
  height: 8px;
  background: linear-gradient(135deg, #3b82f6, #60a5fa);
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
}

.content ul li strong {
  font-weight: 700;
  color: #1e40af;
  letter-spacing: 0.3px;
  font-size: 1.08rem;
}

/* Closing Quotes */
.content .closing {
  font-family: 'Georgia', serif;
  font-size: 1.15rem;
  font-style: italic;
  line-height: 1.8;
  color: #1e293b;
  margin-top: 2rem;
  padding: 1.5rem 2rem;
  border-left: 4px solid #3b82f6;
  background: rgba(191, 219, 254, 0.4);
  border-radius: 8px;
}

/* ===== ENHANCED CFO SECTION STYLING ===== */

/* Highlighted Subheading */
.highlight-text {
  font-size: 1.35rem !important;
  font-weight: 500 !important;
  line-height: 1.9 !important;
  padding: 1.25rem;
  background: rgba(59, 130, 246, 0.12);
  border-radius: 10px;
  border-left: 4px solid #3b82f6;
  margin-bottom: 1.75rem !important;
  color: #334155 !important;
}

/* Emphasis Spans */
.emphasis {
  font-weight: 700;
  color: #1e40af;
  position: relative;
  padding: 0 4px;
  background: rgba(59, 130, 246, 0.15);
  border-radius: 4px;
  letter-spacing: 0.3px;
}

/* Intro Text */
.intro-text {
  font-size: 1.1rem !important;
  line-height: 1.9 !important;
  margin-bottom: 2rem !important;
  padding: 1rem 0;
}

/* Benefits List Container */
.benefits-list {
  list-style: none !important;
  padding: 0 !important;
  margin: 2rem 0 !important;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

/* Individual Benefit Item */
.benefit-item {
  display: flex !important;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.25rem 1.5rem !important;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  transition: all 0.3s ease;
  margin-bottom: 0 !important;
}

.benefit-item::before {
  content: '' !important;
  display: none !important;
}

.benefit-item:hover {
  background: rgba(59, 130, 246, 0.15);
  transform: translateX(8px);
  border-color: rgba(59, 130, 246, 0.4);
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.2);
}

/* Benefit Icon - Professional Numbered Badge */
.benefit-icon {
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #3b82f6, #60a5fa);
  color: white;
  border-radius: 12px;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.benefit-item:hover .benefit-icon {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 6px 18px rgba(59, 130, 246, 0.5);
}

/* Benefit Content */
.benefit-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

/* Benefit Title */
.benefit-title {
  font-family: 'Poppins', sans-serif !important;
  font-size: 1.15rem !important;
  font-weight: 700 !important;
  color: #1e40af !important;
  letter-spacing: 0.5px !important;
  line-height: 1.4 !important;
  display: block;
}

/* Benefit Description */
.benefit-desc {
  font-family: 'Inter', sans-serif;
  font-size: 0.98rem;
  font-weight: 400;
  color: #334155;
  line-height: 1.6;
  display: block;
}

/* Enhanced Quote Styling */
.highlight-quote {
  font-family: 'Georgia', serif !important;
  font-size: 1.25rem !important;
  font-style: italic !important;
  line-height: 1.9 !important;
  color: #1e293b !important;
  margin-top: 2.5rem !important;
  padding: 2rem 2.5rem !important;
  border-left: 5px solid #3b82f6 !important;
  background: rgba(191, 219, 254, 0.4) !important;
  border-radius: 12px !important;
  position: relative;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.2);
}

.quote-mark {
  font-size: 2.5rem;
  font-family: 'Georgia', serif;
  color: rgba(59, 130, 246, 0.4);
  font-style: normal;
  line-height: 0;
}

/* Responsive for Benefits List */
@media (max-width: 768px) {
  .benefit-item {
    padding: 1rem !important;
    gap: 0.75rem;
  }
  
  .benefit-icon {
    font-size: 1.1rem;
    width: 40px;
    height: 40px;
  }
  
  .model-card .model-icon {
    font-size: 1.1rem;
    width: 40px;
    height: 40px;
  }
  
  .financial-models-section .section-title .icon {
    width: 35px;
    height: 35px;
  }
  
  .icon-lightbulb::before,
  .icon-chart::before {
    font-size: 1.3rem;
  }
  
  .benefit-title {
    font-size: 1.05rem !important;
  }
  
  .benefit-desc {
    font-size: 0.9rem;
  }
  
  .highlight-quote {
    font-size: 1.1rem !important;
    padding: 1.5rem !important;
  }
}

@media (max-width: 480px) {
  .benefit-item {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .benefit-content {
    align-items: center;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(10px);
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

/* Hover effects for boxes - only when not expanded */
.section-gradient-2:not(.expanded):hover {
  background: linear-gradient(135deg, #bae6fd, #7dd3fc);
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(59, 130, 246, 0.3);
}

.section-gradient-3:not(.expanded):hover {
  background: linear-gradient(135deg, #bfdbfe, #93c5fd);
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(59, 130, 246, 0.3);
}

.section-gradient-4:not(.expanded):hover {
  background: linear-gradient(135deg, #93c5fd, #60a5fa);
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(59, 130, 246, 0.3);
}

/* Top Image */
#top_image {
  width: 100vw;
  height: 60vh;
  object-fit: cover;
  object-position: center 35%;
  display: block;
  margin: 0 auto;
}

/* Loading Indicator */
.loading-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  gap: 1rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(59, 130, 246, 0.3);
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-indicator p {
  color: #1e293b;
  font-size: 1.1rem;
  font-weight: 500;
}

/* Financial Models Section Styling */
.financial-models-section .why-it-matters-block,
.financial-models-section .model-types-block {
  margin: 2.5rem 0;
}

.financial-models-section .section-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: 'Poppins', sans-serif;
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e40af;
  margin-bottom: 1.25rem;
  text-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
}

.financial-models-section .section-title .icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: linear-gradient(135deg, #3b82f6, #60a5fa);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  flex-shrink: 0;
}

/* Professional Icon Styles */
.icon-lightbulb::before {
  content: '◉';
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
}

.icon-chart::before {
  content: '▣';
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
}

.financial-models-section .description-text {
  font-family: 'Inter', sans-serif;
  font-size: 1.15rem;
  line-height: 1.8;
  color: #334155;
  font-weight: 400;
  letter-spacing: 0.3px;
  padding: 1rem 0;
}

/* Models Grid */
.models-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.25rem;
  margin-top: 1.5rem;
}

.model-card {
  background: rgba(59, 130, 246, 0.12);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(59, 130, 246, 0.18);
  border-radius: 12px;
  padding: 1.5rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}

.model-card:hover {
  background: rgba(59, 130, 246, 0.22);
  border-color: rgba(59, 130, 246, 0.35);
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.25);
}

.model-card .model-icon {
  font-size: 1.25rem;
  font-weight: 700;
  flex-shrink: 0;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #3b82f6, #60a5fa);
  color: white;
  border-radius: 10px;
  font-family: 'Poppins', sans-serif;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  transition: all 0.3s ease;
}

.model-card:hover .model-icon {
  transform: scale(1.1) rotate(8deg);
  box-shadow: 0 6px 18px rgba(59, 130, 246, 0.5);
}

.model-card .model-name {
  font-family: 'Poppins', sans-serif;
  font-size: 1.05rem;
  font-weight: 600;
  color: #1e40af;
  letter-spacing: 0.3px;
  line-height: 1.4;
  text-shadow: 0 1px 3px rgba(59, 130, 246, 0.2);
}

/* Closing Quote for Financial Section */
.closing-quote-financial {
  margin-top: 3rem;
  padding: 2rem;
  background: rgba(191, 219, 254, 0.4);
  border-left: 4px solid #3b82f6;
  border-radius: 8px;
  font-family: 'Georgia', serif;
  font-size: 1.2rem;
  font-style: italic;
  color: #1e293b;
  line-height: 1.8;
  text-align: center;
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.15);
}

/* Professional Signature Section */
.professional-signature {
  margin-top: 40px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.professional-signature::after {
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

.professional-signature::before {
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

.signature-content {
  position: relative;
  z-index: 1;
}

.signature-text {
  font-family: 'Inter', sans-serif;
  font-size: 1.15rem;
  line-height: 1.8;
  color: #334155;
  margin-bottom: 1.5rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.signature-text strong {
  color: #1e40af;
  font-weight: 700;
}

.signature-closing {
  font-family: 'Georgia', serif;
  font-size: 1.3rem;
  font-style: italic;
  color: #1e40af;
  margin-bottom: 2rem;
  font-weight: 600;
}

.signature-line {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 2px solid rgba(59, 130, 246, 0.3);
}

.signature-name {
  font-family: 'Poppins', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #1e40af;
  margin-bottom: 0.5rem;
}

.signature-tagline {
  font-family: 'Georgia', serif;
  font-size: 1rem;
  font-style: italic;
  color: #334155;
  margin-top: 0.5rem;
}

/* Responsive Typography */
@media (max-width: 768px) {
  .hero h1 {
    font-size: 2.5rem;
  }
  
  .hero .subheading {
    font-size: 1.15rem;
  }
  
  .collapsible-box h2 {
    font-size: 1.4rem;
  }
  
  .content .subheading {
    font-size: 1.1rem;
  }
  
  .content p,
  .content ul li {
    font-size: 1rem;
  }
  
  .models-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .model-card {
    padding: 1.25rem 1rem;
  }
  
  .financial-models-section .section-title {
    font-size: 1.5rem;
  }
  
  .closing-quote-financial {
    font-size: 1.05rem;
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .hero h1 {
    font-size: 2rem;
  }
  
  .hero .subheading {
    font-size: 1rem;
  }
  
  .homepage {
    padding: 20px;
  }
}
</style>
