<template>
  <div class="home-page">
    <!-- Loading State -->
    <div v-if="loading" class="loading-overlay">
      <div class="loading-spinner"></div>
      <p>Loading content...</p>
    </div>

    <!-- Hero Section -->
    <section v-if="content.hero" class="hero-section" data-aos="fade-up">
      <div class="hero-container">
        <div class="hero-content">
          <h1 class="hero-title">{{ content.hero.title }}</h1>
          <p class="hero-subtitle">{{ content.hero.subtitle }}</p>
          <div class="hero-cta">
            <router-link to="/query" class="btn btn-primary">
              Get Started
              <svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </router-link>
            <router-link to="/services" class="btn btn-secondary">
              Our Services
            </router-link>
          </div>
          <div class="hero-quote">
            <div class="quote-icon">"</div>
            <p>{{ content.hero.quote }}</p>
          </div>
        </div>
        <div class="hero-image">
          <div class="floating-card card-1">
            <div class="card-icon">📊</div>
            <p>Financial Clarity</p>
          </div>
          <div class="floating-card card-2">
            <div class="card-icon">📈</div>
            <p>Growth Strategy</p>
          </div>
          <div class="floating-card card-3">
            <div class="card-icon">💰</div>
            <p>Cash Flow Mastery</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CFO Section -->
    <section v-if="content.cfoSection" class="section cfo-section" data-aos="fade-up">
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
            :data-aos="'fade-up'"
            :data-aos-delay="index * 100"
          >
            <div class="benefit-icon">{{ benefit.icon }}</div>
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
    <section v-if="content.whyUs" class="section why-us-section" data-aos="fade-up">
      <div class="section-container">
        <div class="section-header">
          <h2 class="section-title">{{ content.whyUs.heading }}</h2>
          <p class="section-subtitle">{{ content.whyUs.subheading }}</p>
        </div>

        <div class="features-list">
          <div 
            v-for="(benefit, index) in content.whyUs.benefits" 
            :key="index"
            class="feature-item"
            :data-aos="'fade-right'"
            :data-aos-delay="index * 100"
          >
            <div class="feature-number">{{ index + 1 }}</div>
            <div class="feature-content">
              <div class="feature-icon">{{ benefit.icon }}</div>
              <h3 class="feature-title">{{ benefit.title }}</h3>
              <p class="feature-description">{{ benefit.description }}</p>
            </div>
          </div>
        </div>

        <div class="section-quote">
          <p>{{ content.whyUs.closingQuote }}</p>
        </div>
      </div>
    </section>

    <!-- Financial Models Section -->
    <section v-if="content.financialModels" class="section models-section" data-aos="fade-up">
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
              :data-aos="'zoom-in'"
              :data-aos-delay="index * 50"
            >
              <div class="model-icon">📑</div>
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
    <section class="cta-section" data-aos="fade-up">
      <div class="cta-container">
        <h2>Ready to Transform Your Financial Strategy?</h2>
        <p>Let's discuss how we can help your business grow</p>
        <router-link to="/query" class="btn btn-cta">
          Schedule a Consultation
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
import AOS from 'aos';
import 'aos/dist/aos.css';

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
    
    // Initialize AOS animations
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100
    });
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
/* ==================== VARIABLES ==================== */
:root {
  --primary-color: #2563eb;
  --primary-dark: #1e40af;
  --primary-light: #3b82f6;
  --secondary-color: #64748b;
  --accent-color: #0ea5e9;
  --success-color: #10b981;
  --background: #ffffff;
  --surface: #f8fafc;
  --text-primary: #0f172a;
  --text-secondary: #475569;
  --text-tertiary: #94a3b8;
  --border: #e2e8f0;
  --shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 20px 60px rgba(0, 0, 0, 0.12);
}

/* ==================== GLOBAL STYLES ==================== */
.home-page {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: var(--text-primary);
  background: var(--background);
  overflow-x: hidden;
}

/* ==================== LOADING STATE ==================== */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid var(--border);
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-overlay p {
  margin-top: 20px;
  color: var(--text-secondary);
  font-weight: 500;
}

/* ==================== HERO SECTION ==================== */
.hero-section {
  min-height: 90vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

.hero-section::before {
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
  padding: 80px 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-content {
  color: white;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 24px;
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: 1.25rem;
  line-height: 1.7;
  margin-bottom: 40px;
  opacity: 0.95;
  font-weight: 400;
}

.hero-cta {
  display: flex;
  gap: 16px;
  margin-bottom: 60px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 32px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn-primary {
  background: white;
  color: var(--primary-color);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
}

.btn-icon {
  width: 20px;
  height: 20px;
}

.hero-quote {
  position: relative;
  padding: 24px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.quote-icon {
  position: absolute;
  top: -10px;
  left: 20px;
  font-size: 4rem;
  opacity: 0.3;
  line-height: 1;
}

.hero-quote p {
  font-style: italic;
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
}

/* Floating Cards Animation */
.hero-image {
  position: relative;
  height: 500px;
}

.floating-card {
  position: absolute;
  background: white;
  padding: 24px 32px;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  animation: float 6s ease-in-out infinite;
  display: flex;
  align-items: center;
  gap: 12px;
}

.floating-card .card-icon {
  font-size: 2rem;
}

.floating-card p {
  margin: 0;
  font-weight: 600;
  color: var(--text-primary);
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
  padding: 120px 40px;
  position: relative;
}

.section:nth-child(even) {
  background: var(--surface);
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 80px;
}

.section-title {
  font-size: 2.75rem;
  font-weight: 800;
  margin-bottom: 16px;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

.section-subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary);
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.7;
}

.section-description {
  font-size: 1.125rem;
  color: var(--text-secondary);
  text-align: center;
  max-width: 800px;
  margin: 0 auto 60px;
  line-height: 1.8;
}

.section-quote {
  text-align: center;
  margin-top: 80px;
  padding: 40px;
  background: linear-gradient(135deg, var(--primary-light) 0%, var(--primary-color) 100%);
  border-radius: 20px;
  color: white;
}

.section-quote p {
  font-size: 1.5rem;
  font-style: italic;
  margin: 0;
  line-height: 1.6;
}

/* ==================== BENEFITS GRID ==================== */
.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 60px;
}

.benefit-card {
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: var(--shadow);
  transition: all 0.3s ease;
  border: 1px solid var(--border);
}

.benefit-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
}

.benefit-icon {
  font-size: 3rem;
  margin-bottom: 20px;
}

.benefit-title {
  font-size: 1.375rem;
  font-weight: 700;
  margin-bottom: 12px;
  color: var(--text-primary);
}

.benefit-description {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0;
}

/* ==================== FEATURES LIST ==================== */
.features-list {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.feature-item {
  display: flex;
  gap: 30px;
  padding: 40px;
  background: white;
  border-radius: 20px;
  box-shadow: var(--shadow);
  transition: all 0.3s ease;
  border: 1px solid var(--border);
}

.feature-item:hover {
  transform: translateX(8px);
  box-shadow: var(--shadow-lg);
}

.feature-number {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, var(--primary-light) 0%, var(--primary-color) 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
}

.feature-content {
  flex: 1;
}

.feature-icon {
  font-size: 2rem;
  margin-bottom: 12px;
}

.feature-title {
  font-size: 1.375rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: var(--text-primary);
}

.feature-description {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0;
}

/* ==================== MODELS SECTION ==================== */
.models-intro {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 60px;
}

.models-intro h3 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: var(--text-primary);
}

.models-intro p {
  font-size: 1.125rem;
  color: var(--text-secondary);
  line-height: 1.8;
}

.models-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
  margin-top: 60px;
}

.model-card {
  background: white;
  padding: 32px;
  border-radius: 16px;
  box-shadow: var(--shadow);
  transition: all 0.3s ease;
  text-align: center;
  border: 1px solid var(--border);
}

.model-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary-color);
}

.model-icon {
  font-size: 2.5rem;
  margin-bottom: 16px;
}

.model-card h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

/* ==================== CTA SECTION ==================== */
.cta-section {
  padding: 120px 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 20px;
  letter-spacing: -0.02em;
}

.cta-container p {
  font-size: 1.25rem;
  margin-bottom: 40px;
  opacity: 0.95;
}

.btn-cta {
  background: white;
  color: var(--primary-color);
  padding: 18px 48px;
  font-size: 1.125rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.btn-cta:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 60px rgba(0, 0, 0, 0.3);
}

/* ==================== RESPONSIVE ==================== */
@media (max-width: 968px) {
  .hero-container {
    grid-template-columns: 1fr;
    gap: 60px;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-image {
    height: 400px;
  }

  .section {
    padding: 80px 24px;
  }

  .section-title {
    font-size: 2rem;
  }

  .benefits-grid {
    grid-template-columns: 1fr;
  }

  .hero-cta {
    flex-direction: column;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 640px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .section-title {
    font-size: 1.75rem;
  }

  .feature-item {
    flex-direction: column;
    text-align: center;
  }

  .models-grid {
    grid-template-columns: 1fr;
  }
}
</style>
