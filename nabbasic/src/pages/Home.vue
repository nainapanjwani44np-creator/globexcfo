<template>
  <div class="home-page">
    <!-- Loading State -->
    <div v-if="loading" class="loading-overlay">
      <div class="loading-spinner"></div>
      <p>Loading content...</p>
    </div>

    <!-- Hero Banner Image (Separate from content) -->
    <section class="hero-banner">
      <img src="../images/img1.png" alt="Financial Advisory Team" class="hero-banner-image" />
    </section>

    <!-- Hero Content Section (After image) -->
    <section v-if="content.hero" class="hero-content-section">
      <div class="hero-container">
        <div class="hero-content">
          <h1 class="hero-title">{{ content.hero.title }}</h1>
          <p class="hero-subtitle">{{ content.hero.subtitle }}</p>
          <div class="hero-cta">
            <router-link to="/query" class="btn btn-primary">
              <span class="btn-text">Get Started</span>
              <svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </router-link>
            <router-link to="/services" class="btn btn-secondary">
              <span class="btn-text">Our Services</span>
            </router-link>
          </div>
          <div class="hero-quote">
            <div class="quote-icon">"</div>
            <p>{{ content.hero.quote }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CFO Section -->
    <section v-if="content.cfoSection" class="section cfo-section">
      <div class="section-container">
        <div class="section-header">
          <h2 class="section-title">{{ content.cfoSection.heading }}</h2>
          <p class="section-subtitle">{{ content.cfoSection.subheading }}</p>
        </div>
        
        <p class="section-description">{{ content.cfoSection.description }}</p>

        <div class="benefits-grid">
          <div 
            v-for="(benefit, index) in content.cfoSection.benefits" 
            :key="index"
            class="benefit-card"
          >
            <div class="benefit-icon-svg">
              <!-- Professional SVG icons instead of emojis -->
              <svg v-if="index === 0" class="benefit-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <svg v-else-if="index === 1" class="benefit-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <svg v-else-if="index === 2" class="benefit-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              <svg v-else-if="index === 3" class="benefit-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <svg v-else class="benefit-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="benefit-title">{{ benefit.title }}</h3>
            <p class="benefit-description">{{ benefit.description }}</p>
          </div>
        </div>

        <div class="section-quote">
          <p>{{ content.cfoSection.closingQuote }}</p>
        </div>
      </div>
    </section>

    <!-- Why Us Section -->
    <section v-if="content.whyUs" class="section why-us-section">
      <div class="section-container">
        <div class="unified-features-card">
          <!-- Header inside card -->
          <div class="unified-card-header">
            <h2 class="unified-card-title">{{ content.whyUs.heading }}</h2>
            <p class="unified-card-subtitle">{{ content.whyUs.subheading }}</p>
          </div>

          <!-- Divider after header -->
          <div class="unified-header-divider"></div>

          <!-- Features list -->
          <div class="features-unified-list">
            <div 
              v-for="(benefit, index) in content.whyUs.benefits" 
              :key="index"
              class="feature-unified-item"
            >
              <div class="feature-unified-number">{{ index + 1 }}</div>
              <div class="feature-unified-content">
                <h3 class="feature-unified-title">{{ benefit.title }}</h3>
                <p class="feature-unified-description">{{ benefit.description }}</p>
              </div>
            </div>
          </div>

          <!-- Quote at bottom -->
          <div class="unified-quote">
            <p>{{ content.whyUs.closingQuote }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Financial Models Section -->
    <section v-if="content.financialModels" class="section models-section">
      <div class="section-container">
        <div class="section-header">
          <h2 class="section-title">{{ content.financialModels.heading }}</h2>
          <p class="section-subtitle">{{ content.financialModels.subheading }}</p>
        </div>

        <div class="models-content">
          <div class="models-intro">
            <h3>{{ content.financialModels.whyItMatters.title }}</h3>
            <p>{{ content.financialModels.whyItMatters.description }}</p>
          </div>

          <div class="models-grid">
            <div 
              v-for="(model, index) in content.financialModels.modelTypes.list" 
              :key="index"
              class="model-card"
            >
              <svg class="model-svg-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h4>{{ model }}</h4>
            </div>
          </div>

          <div class="section-quote">
            <p>{{ content.financialModels.closingQuote }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="cta-container">
        <h2>Ready to Transform Your Financial Strategy?</h2>
        <p>Let's discuss how we can help your business grow</p>
        <router-link to="/query" class="btn btn-cta">
          <span class="btn-text">Schedule a Consultation</span>
          <svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HomePage',
  data() {
    return {
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
    async loadAllContent() {
      try {
        this.loading = true;
        
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
        console.error('Error loading content:', error);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
/* ==================== GLOBAL STYLES ==================== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.home-page {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  color: #0f172a;
  background: #ffffff;
  overflow-x: hidden;
  width: 100%;
  max-width: 100vw;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Mobile Touch Optimizations */
@media (max-width: 768px) {
  * {
    -webkit-tap-highlight-color: transparent;
  }
  
  .home-page {
    overflow-x: hidden;
    position: relative;
  }
  
  /* Prevent text size adjustment on orientation change */
  html {
    -webkit-text-size-adjust: 100%;
    -moz-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
  }
}

/* ==================== LOADING STATE ==================== */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.98);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #e2e8f0;
  border-top-color: #2563eb;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-overlay p {
  margin-top: 20px;
  color: #475569;
  font-weight: 500;
  font-size: 2rem;
}

/* ==================== HERO BANNER IMAGE ==================== */
.hero-banner {
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.hero-banner-image {
  width: 100%;
  height: 60vh;
  object-fit: cover;
  object-position: center;
  display: block;
}

/* ==================== HERO CONTENT SECTION ==================== */
.hero-content-section {
  background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
  padding: 60px 20px;
  position: relative;
  overflow: hidden;
}

.hero-content-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  opacity: 0.3;
}

.hero-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
  position: relative;
  z-index: 1;
}

.hero-content {
  color: white;
  max-width: 800px;
  text-align: center;
  margin: 0 auto;
}

.hero-title {
  font-size: 3.25rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 16px;
  letter-spacing: -0.01em;
}

.hero-subtitle {
  font-size: 2.05rem;
  line-height: 1.6;
  margin-bottom: 24px;
  opacity: 0.95;
  font-weight: 400;
}

.hero-cta {
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.95rem;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
}

.btn-text {
  display: inline-block;
  white-space: nowrap;
}

.btn-primary {
  background: white;
  color: #2563eb;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-3px);
  border-color: rgba(255, 255, 255, 0.5);
}

.btn-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.hero-quote {
  position: relative;
  padding: 20px 28px;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(15px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.25);
}

.quote-icon {
  position: absolute;
  top: -12px;
  left: 18px;
  font-size: 4.5rem;
  opacity: 0.2;
  line-height: 1;
  color: white;
}

.hero-quote p {
  font-style: italic;
  font-size: 1.95rem;
  line-height: 1.6;
  margin: 0;
  position: relative;
  z-index: 1;
}

/* ==================== FLOATING CARDS (Professional SVG Icons) ==================== */
.hero-image {
  position: relative;
  height: 500px;
}

.floating-card {
  position: absolute;
  background: white;
  padding: 28px 36px;
  border-radius: 18px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  animation: float 6s ease-in-out infinite;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  min-width: 180px;
}

.card-svg-icon {
  width: 48px;
  height: 48px;
  color: #2563eb;
  stroke-width: 2;
}

.floating-card p {
  margin: 0;
  font-weight: 600;
  color: #0f172a;
  font-size: 2.05rem;
  text-align: center;
}

.card-1 {
  top: 10%;
  right: 10%;
  animation-delay: 0s;
}

.card-2 {
  top: 45%;
  right: 25%;
  animation-delay: 2s;
}

.card-3 {
  bottom: 15%;
  right: 5%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* ==================== SECTIONS ==================== */
.section {
  padding: 40px 40px;
  position: relative;
}

.section:nth-child(even) {
  background: #f8fafc;
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 30px;
}

.section-title {
  font-size: 2.85rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: #0f172a;
  letter-spacing: -0.01em;
}

.section-subtitle {
  font-size: 2.05rem;
  color: #475569;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

.section-description {
  font-size: 1.95rem;
  color: #475569;
  text-align: center;
  max-width: 800px;
  margin: 0 auto 30px;
  line-height: 1.7;
}

.section-quote {
  text-align: center;
  margin-top: 30px;
  padding: 24px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  border-radius: 12px;
  color: white;
  box-shadow: 0 10px 40px rgba(37, 99, 235, 0.3);
}

.section-quote p {
  font-size: 2.05rem;
  font-style: italic;
  margin: 0;
  line-height: 1.6;
}

/* ==================== BENEFITS GRID ==================== */
.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.benefit-card {
  background: white;
  padding: 28px;
  border-radius: 14px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
  text-align: center;
}

.benefit-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  border-color: #3b82f6;
}

.benefit-icon-svg {
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
}

.benefit-svg {
  width: 48px;
  height: 48px;
  color: #3b82f6;
  stroke-width: 1.5;
}

.benefit-title {
  font-size: 2.15rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: #0f172a;
}

.benefit-description {
  font-size: 1.95rem;
  color: #64748b;
  line-height: 1.5;
  margin: 0;
}

/* ==================== UNIFIED FEATURES CARD ==================== */
.unified-features-card {
  background: white;
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  border: 2px solid #e2e8f0;
  max-width: 1100px;
  margin: 0 auto;
}

.unified-card-header {
  text-align: center;
  margin-bottom: 20px;
}

.unified-card-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: #0f172a;
  letter-spacing: -0.01em;
}

.unified-card-subtitle {
  font-size: 1.95rem;
  color: #475569;
  line-height: 1.5;
  margin: 0;
}

.unified-header-divider {
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #3b82f6, transparent);
  margin-bottom: 20px;
}

.features-unified-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
  margin-bottom: 20px;
}

.feature-unified-item {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 18px;
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
  border-radius: 12px;
  border: 2px solid #e2e8f0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.feature-unified-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #60a5fa, #3b82f6);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.feature-unified-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(59, 130, 246, 0.15);
  border-color: #93c5fd;
  background: linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%);
}

.feature-unified-item:hover::before {
  transform: scaleX(1);
}

.feature-unified-item:last-child {
  border: 2px solid #e2e8f0;
}

.feature-unified-number {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.1rem;
  font-weight: 700;
  box-shadow: 0 3px 10px rgba(59, 130, 246, 0.3);
  transition: all 0.3s ease;
}

.feature-unified-item:hover .feature-unified-number {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 4px 14px rgba(59, 130, 246, 0.4);
}

.feature-unified-content {
  flex: 1;
}

.feature-unified-title {
  font-size: 1.95rem;
  font-weight: 700;
  margin-bottom: 4px;
  color: #0f172a;
}

.feature-unified-description {
  font-size: 1.85rem;
  color: #64748b;
  line-height: 1.5;
  margin: 0;
}

.unified-quote {
  text-align: center;
  padding: 16px 18px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  border-radius: 10px;
  color: white;
  margin-top: 20px;
}

.unified-quote p {
  font-size: 1.9rem;
  font-style: italic;
  margin: 0;
  line-height: 1.6;
}

/* ==================== MODELS SECTION ==================== */
.models-intro {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 30px;
  padding: 28px;
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  border-radius: 14px;
}

.models-intro h3 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 14px;
  color: #1e40af;
}

.models-intro p {
  font-size: 1.95rem;
  color: #1e40af;
  line-height: 1.6;
}

.models-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
  margin-top: 30px;
}

.model-card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  text-align: center;
  border: 1px solid #e2e8f0;
}

.model-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  border-color: #3b82f6;
}

.model-svg-icon {
  width: 44px;
  height: 44px;
  margin: 0 auto 14px;
  color: #2563eb;
  stroke-width: 2;
}

.model-card h4 {
  font-size: 1.95rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0;
  line-height: 1.4;
}

/* ==================== CTA SECTION ==================== */
.cta-section {
  padding: 50px 40px;
  background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
  color: white;
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  opacity: 0.2;
}

.cta-container {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
}

.cta-container h2 {
  font-size: 2.85rem;
  font-weight: 700;
  margin-bottom: 20px;
  letter-spacing: -0.01em;
}

.cta-container p {
  font-size: 2.05rem;
  margin-bottom: 36px;
  opacity: 0.95;
}

.btn-cta {
  background: white;
  color: #2563eb;
  padding: 14px 36px;
  font-size: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  display: inline-flex;
}

.btn-cta:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 60px rgba(0, 0, 0, 0.3);
}

/* ==================== RESPONSIVE ==================== */

/* Tablet (768px - 968px) */
@media (max-width: 968px) {
  .hero-banner-image {
    height: 50vh;
  }

  .hero-content-section {
    padding: 50px 20px;
  }

  .hero-container {
    padding: 0 30px;
  }

  .hero-title {
    font-size: 2.85rem;
    line-height: 1.2;
  }

  .hero-subtitle {
    font-size: 2rem;
  }

  .hero-image {
    height: 350px;
    display: none; /* Hide floating cards on tablet for cleaner look */
  }

  .section {
    padding: 32px 24px;
  }

  .section-header {
    margin-bottom: 24px;
  }

  .section-title {
    font-size: 2.5rem;
  }

  .section-description {
    font-size: 2.05rem;
  }

  .benefits-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .benefit-card {
    padding: 35px;
  }

  .hero-cta {
    flex-direction: column;
    width: 100%;
    gap: 12px;
  }

  .btn {
    width: 100%;
    justify-content: center;
    padding: 14px 30px;
  }

  .section-quote {
    padding: 24px 20px;
    margin-top: 28px;
  }

  .section-quote p {
    font-size: 1.05rem;
  }
}

/* Mobile (376px - 640px) */
@media (max-width: 640px) {
  .hero-banner-image {
    height: 40vh;
  }

  .hero-content-section {
    padding: 40px 16px;
  }

  .hero-container {
    padding: 0 16px;
  }

  .hero-title {
    font-size: 2.4rem;
    line-height: 1.2;
    margin-bottom: 14px;
  }

  .hero-subtitle {
    font-size: 1.9rem;
    margin-bottom: 28px;
  }

  .hero-cta {
    margin-bottom: 40px;
  }

  .btn {
    padding: 12px 24px;
    font-size: 1.95rem;
  }

  .btn-icon {
    width: 18px;
    height: 18px;
  }

  .hero-quote {
    padding: 20px 24px;
  }

  .hero-quote p {
    font-size: 2rem;
    line-height: 1.6;
  }

  .quote-icon {
    font-size: 4.5rem;
    top: -10px;
  }

  .section {
    padding: 28px 20px;
  }

  .section-header {
    margin-bottom: 20px;
  }

  .section-title {
    font-size: 2.3rem;
    line-height: 1.3;
    margin-bottom: 14px;
  }

  .section-subtitle {
    font-size: 1.9rem;
    line-height: 1.5;
  }

  .section-description {
    font-size: 1.85rem;
    margin-bottom: 24px;
  }

  .benefits-grid {
    gap: 16px;
  }

  .benefit-card {
    padding: 20px 18px;
  }

  .benefit-svg {
    width: 52px;
    height: 52px;
  }

  .benefit-title {
    font-size: 2.2rem;
    margin-bottom: 12px;
  }

  .benefit-description {
    font-size: 1.95rem;
  }

  .unified-features-card {
    padding: 18px;
    border-radius: 10px;
  }

  .unified-card-header {
    margin-bottom: 16px;
  }

  .unified-card-title {
    font-size: 2.3rem;
    margin-bottom: 8px;
  }

  .unified-card-subtitle {
    font-size: 1.9rem;
  }

  .unified-header-divider {
    margin-bottom: 16px;
  }

  .features-unified-list {
    grid-template-columns: 1fr;
    gap: 12px;
    margin-bottom: 16px;
  }

  .feature-unified-item {
    flex-direction: column;
    gap: 10px;
    padding: 16px;
  }

  .feature-unified-number {
    width: 36px;
    height: 36px;
    font-size: 2rem;
  }

  .feature-unified-title {
    font-size: 2.05rem;
    margin-bottom: 6px;
  }

  .feature-unified-description {
    font-size: 1.9rem;
  }

  .unified-quote {
    padding: 18px;
    margin-top: 20px;
  }

  .unified-quote p {
    font-size: 1.95rem;
  }

  .models-intro {
    padding: 20px 18px;
    margin-bottom: 24px;
  }

  .models-intro h3 {
    font-size: 2.5rem;
    margin-bottom: 14px;
  }

  .models-intro p {
    font-size: 2rem;
  }

  .models-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .model-card {
    padding: 20px 18px;
  }

  .model-svg-icon {
    width: 48px;
    height: 48px;
    margin-bottom: 16px;
  }

  .model-card h4 {
    font-size: 2.05rem;
  }

  .section-quote {
    padding: 20px 16px;
    margin-top: 24px;
    border-radius: 12px;
  }

  .section-quote p {
    font-size: 2rem;
    line-height: 1.5;
  }

  .cta-section {
    padding: 36px 20px;
  }

  .cta-container h2 {
    font-size: 2.75rem;
    line-height: 1.3;
    margin-bottom: 16px;
  }

  .cta-container p {
    font-size: 2.05rem;
    margin-bottom: 35px;
  }

  .btn-cta {
    padding: 16px 36px;
    font-size: 2.05rem;
    width: 100%;
    justify-content: center;
  }
}

/* Small Mobile (320px - 375px) */
@media (max-width: 375px) {
  .hero-banner-image {
    height: 35vh;
  }

  .hero-content-section {
    padding: 35px 16px;
  }

  .hero-container {
    padding: 0 16px;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.95rem;
  }

  .section {
    padding: 40px 16px;
  }

  .section-title {
    font-size: 2.4rem;
  }

  .section-subtitle {
    font-size: 1.95rem;
  }

  .benefit-card,
  .model-card {
    padding: 24px 16px;
  }

  .unified-features-card {
    padding: 16px;
  }

  .unified-card-header {
    margin-bottom: 14px;
  }

  .unified-card-title {
    font-size: 2.2rem;
    margin-bottom: 6px;
  }

  .unified-card-subtitle {
    font-size: 1.85rem;
  }

  .unified-header-divider {
    margin-bottom: 14px;
  }

  .features-unified-list {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .feature-unified-item {
    gap: 10px;
    padding: 16px;
  }

  .feature-unified-number {
    width: 34px;
    height: 34px;
    font-size: 1.95rem;
  }

  .unified-quote {
    padding: 16px;
  }

  .section-quote {
    padding: 24px 16px;
  }

  .section-quote p {
    font-size: 2rem;
  }

  .cta-container h2 {
    font-size: 2.5rem;
  }

  .btn-cta {
    padding: 14px 28px;
    font-size: 2rem;
  }
}
</style>
