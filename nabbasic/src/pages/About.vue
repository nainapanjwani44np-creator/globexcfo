<template>
  <div class="blackground">
    <img id="top_image" src="./../images/img2.png" alt="Quote Image" class="main-image" />
    <div class="homepage colorful">

      <!-- ABOUT THE COMPANY - Horizontal Collapsible Section -->
      <section v-if="content.company" class="hero-horizontal-collapsible box section-gradient-hero" :class="{ expanded: expandedBox === 'company' }">
        <div class="horizontal-header">
          <h1>{{ content.company.heading }}</h1>
          <p class="hero-subtitle">{{ content.company.preview }}</p>
        </div>
        <button class="explore-more-btn" @click.stop="exploreMore('company')">
          <span v-if="expandedBox !== 'company'">Explore More →</span>
          <span v-else>Show Less ↑</span>
        </button>
        
        <!-- Full Content (shown when expanded) -->
        <div class="full-content" v-if="expandedBox === 'company'">
          <p v-for="(paragraph, index) in content.company.paragraphs" :key="index">
            {{ paragraph }}
          </p>
          <ul v-if="content.company.services">
            <li v-for="(service, index) in content.company.services" :key="index">{{ service }}</li>
          </ul>
          <p v-if="content.company.additionalText">{{ content.company.additionalText }}</p>
          <p class="closing">
            {{ content.company.closing }}
          </p>
        </div>
      </section>

      <!-- COLLAPSIBLE SECTIONS -->
      <div class="collapsible-container">

        <!-- OUR VISION -->
        <section v-if="content.vision" class="collapsible-box section-gradient-1" :class="{ expanded: expandedBox === 'vision' }">
          <h2>{{ content.vision.heading }}</h2>
          
          <!-- Preview Content (always visible) -->
          <div class="preview-content">
            <p class="preview-text">{{ content.vision.preview }}</p>
            <button class="explore-more-btn" @click.stop="exploreMore('vision')">
              <span v-if="expandedBox !== 'vision'">Explore More →</span>
              <span v-else>Show Less ↑</span>
            </button>
          </div>
          
          <!-- Full Content (shown when expanded) -->
          <div class="full-content" v-if="expandedBox === 'vision'">
            <p v-for="(paragraph, index) in content.vision.paragraphs" :key="index">
              {{ paragraph }}
            </p>
            <p class="closing">
              {{ content.vision.closing }}
            </p>
          </div>
        </section>

        <!-- OUR MISSION -->
        <section v-if="content.mission" class="collapsible-box section-gradient-2" :class="{ expanded: expandedBox === 'mission' }">
          <h2>{{ content.mission.heading }}</h2>
          
          <!-- Preview Content (always visible) -->
          <div class="preview-content">
            <p class="preview-text">{{ content.mission.preview }}</p>
            <button class="explore-more-btn" @click.stop="exploreMore('mission')">
              <span v-if="expandedBox !== 'mission'">Explore More →</span>
              <span v-else>Show Less ↑</span>
            </button>
          </div>
          
          <!-- Full Content (shown when expanded) -->
          <div class="full-content" v-if="expandedBox === 'mission'">
            <p v-for="(paragraph, index) in content.mission.paragraphs" :key="index">
              {{ paragraph }}
            </p>
            
            <!-- Core Values Table -->
            <table v-if="content.mission.coreValues" border="1" cellpadding="10" cellspacing="0">
              <thead>
                <tr>
                  <th style="text-align: left; width: 30%;">Core Value</th>
                  <th style="text-align: left;">What It Means</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(value, index) in content.mission.coreValues" :key="index">
                  <td>{{ value.name }}</td>
                  <td>{{ value.description }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- BELIEF / PROMISE -->
        <section v-if="content.belief" class="collapsible-box section-gradient-3" :class="{ expanded: expandedBox === 'belief' }">
          <h2>{{ content.belief.heading }}</h2>
          
          <!-- Preview Content (always visible) -->
          <div class="preview-content">
            <p class="preview-text">{{ content.belief.preview }}</p>
            <button class="explore-more-btn" @click.stop="exploreMore('belief')">
              <span v-if="expandedBox !== 'belief'">Explore More →</span>
              <span v-else>Show Less ↑</span>
            </button>
          </div>
          
          <!-- Full Content (shown when expanded) -->
          <div class="full-content" v-if="expandedBox === 'belief'">
            <p v-for="(paragraph, index) in content.belief.paragraphs" :key="index">
              {{ paragraph }}
            </p>
            <p class="closing">
              {{ content.belief.closing }}
            </p>
          </div>
        </section>

        <!-- ABOUT THE FOUNDER -->
        <section v-if="content.founder" class="collapsible-box section-gradient-4" :class="{ expanded: expandedBox === 'founder' }">
          <h2>About Founder</h2>
          
          <!-- Preview Content (always visible) -->
          <div class="preview-content">
            <p class="preview-text">{{ content.founder.preview }}</p>
            <button class="explore-more-btn" @click.stop="exploreMore('founder')">
              <span v-if="expandedBox !== 'founder'">Explore More →</span>
              <span v-else>Show Less ↑</span>
            </button>
          </div>
          
          <!-- Full Content (shown when expanded) -->
          <div class="full-content" v-if="expandedBox === 'founder'">
            <p v-for="(paragraph, index) in content.founder.paragraphs" :key="index">
              {{ paragraph }}
            </p>
            <p class="closing">
              {{ content.founder.closing }}
            </p>
          </div>
        </section>

        <!-- FOUNDER MESSAGE -->
        <section v-if="content.message" class="collapsible-box section-gradient-5" :class="{ expanded: expandedBox === 'message' }">
          <h2>{{ content.message.heading }}</h2>
          
          <!-- Preview Content (always visible) -->
          <div class="preview-content">
            <p class="preview-text">{{ content.message.preview }}</p>
            <button class="explore-more-btn" @click.stop="exploreMore('message')">
              <span v-if="expandedBox !== 'message'">Explore More →</span>
              <span v-else>Show Less ↑</span>
            </button>
          </div>
          
          <!-- Full Content (shown when expanded) -->
          <div class="full-content" v-if="expandedBox === 'message'">
            <p v-for="(paragraph, index) in content.message.paragraphs" :key="index">
              {{ paragraph }}
            </p>
            <p class="closing" v-html="content.message.signature"></p>
          </div>
        </section>

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "AboutGlobex",
  data() {
    return {
      activeBox: null,
      expandedBox: null,
      loading: true,
      content: {
        message: null,
        company: null,
        vision: null,
        mission: null,
        belief: null,
        founder: null
      }
    };
  },
  async mounted() {
    await this.loadAllContent();
  },
  methods: {
    toggleBox(box) {
      this.activeBox = this.activeBox === box ? null : box;
    },
    exploreMore(box) {
      this.expandedBox = this.expandedBox === box ? null : box;
    },
    async loadAllContent() {
      try {
        // Fetch all about content sections in parallel
        const [messageRes, companyRes, visionRes, missionRes, beliefRes, founderRes] = await Promise.all([
          axios.get('/api/content/founder-message').catch(() => null),
          axios.get('/api/content/about-company').catch(() => null),
          axios.get('/api/content/vision').catch(() => null),
          axios.get('/api/content/mission').catch(() => null),
          axios.get('/api/content/belief').catch(() => null),
          axios.get('/api/content/about-founder').catch(() => null)
        ]);
        
        // Load sections if available
        if (messageRes?.data?.status === 'success') {
          this.content.message = messageRes.data.data;
        }
        
        if (companyRes?.data?.status === 'success') {
          this.content.company = companyRes.data.data;
        }
        
        if (visionRes?.data?.status === 'success') {
          this.content.vision = visionRes.data.data;
        }
        
        if (missionRes?.data?.status === 'success') {
          this.content.mission = missionRes.data.data;
        }
        
        if (beliefRes?.data?.status === 'success') {
          this.content.belief = beliefRes.data.data;
        }
        
        if (founderRes?.data?.status === 'success') {
          this.content.founder = founderRes.data.data;
        }
      } catch (error) {
        console.error('Error loading about content:', error);
      } finally {
        this.loading = false;
      }
    }
  },
};
</script>

<style scoped>
/* Import Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');

.homepage {
  font-family: "Inter", sans-serif;
  max-width: 1200px;
  margin: auto;
  padding: 40px;
  background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%);
  min-height: 100vh;
  line-height: 1.7;
}

.blackground {
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

/* Ensure hero content appears above the pattern */
.hero > * {
  position: relative;
  z-index: 1;
}

/* HERO HORIZONTAL COLLAPSIBLE SECTION */
.hero-horizontal-collapsible {
  padding: 30px 40px;
  margin-bottom: 40px;
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease;
}

/* Light blue textured background for hero horizontal collapsible */
.hero-horizontal-collapsible::after {
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

.hero-horizontal-collapsible::before {
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

.hero-horizontal-collapsible > * {
  position: relative;
  z-index: 1;
}

.hero-horizontal-collapsible.expanded {
  padding: 40px;
}

.horizontal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  margin-bottom: 20px;
  flex-wrap: nowrap;
}

.hero-horizontal-collapsible .explore-more-btn {
  margin-top: 10px;
}

/* HERO HORIZONTAL SECTION - Single Line Layout */
.hero-horizontal {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  padding: 30px 40px;
  margin-bottom: 40px;
  flex-wrap: nowrap;
  position: relative;
  overflow: hidden;
}

/* Light blue textured background for hero horizontal */
.hero-horizontal::after {
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

.hero-horizontal::before {
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

.hero-horizontal > * {
  position: relative;
  z-index: 1;
}

.horizontal-header h1 {
  font-family: 'Poppins', sans-serif;
  font-size: 2rem;
  font-weight: 800;
  line-height: 1.2;
  margin: 0;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 10px rgba(59, 130, 246, 0.3);
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  white-space: nowrap;
  flex-shrink: 0;
}

.horizontal-header .hero-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  margin: 0;
  color: #1e293b;
  flex: 1;
}

.hero-horizontal h1 {
  font-family: 'Poppins', sans-serif;
  font-size: 2rem;
  font-weight: 800;
  line-height: 1.2;
  margin: 0;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 10px rgba(59, 130, 246, 0.3);
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  white-space: nowrap;
  flex-shrink: 0;
}

.hero-horizontal .hero-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  margin: 0;
  color: #1e293b;
  flex: 1;
}

/* HERO SECTION - Main Heading (Legacy - kept for compatibility) */
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
  font-weight: 400;
  line-height: 1.8;
  margin-bottom: 2rem;
  color: #1e293b;
  max-width: 900px;
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
  font-size: 1.05rem;
  line-height: 1.8;
}

.content p, .full-content p {
  margin-bottom: 1.25rem;
  color: #334155;
}

.content .subheading {
  font-size: 1.25rem;
  font-weight: 500;
  color: #1e293b;
  padding-left: 15px;
  border-left: 3px solid rgba(59, 130, 246, 0.5);
  margin-bottom: 1.5rem;
}

.content .closing, .full-content .closing {
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

/* Professional List Styling */
.content ul, .full-content ul {
  list-style: none;
  padding-left: 0;
  margin: 1.5rem 0;
}

.content ul li, .full-content ul li {
  padding-left: 30px;
  position: relative;
  margin-bottom: 0.75rem;
  color: #334155;
}

.content ul li::before, .full-content ul li::before {
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

/* PROFESSIONAL LIGHT BLUE GRADIENTS */
.section-gradient-hero {
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  border-top: 3px solid #3b82f6;
}

.section-gradient-1 {
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  border-left: 3px solid #3b82f6;
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

/* Hover effects - Subtle professional highlights */
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

.section-gradient-5:not(.expanded):hover {
  background: linear-gradient(135deg, #bae6fd, #7dd3fc);
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(59, 130, 246, 0.3);
}

.section-gradient-6:not(.expanded):hover {
  background: linear-gradient(135deg, #bfdbfe, #93c5fd);
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(59, 130, 246, 0.3);
}

.section-gradient-7:not(.expanded):hover {
  background: linear-gradient(135deg, #93c5fd, #60a5fa);
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(59, 130, 246, 0.3);
}

/* Professional Table Styling */
.content table, .full-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 2rem 0;
  background: rgba(191, 219, 254, 0.3);
  border-radius: 8px;
  overflow: hidden;
}

.content table thead, .full-content table thead {
  background: linear-gradient(135deg, #3b82f6, #60a5fa);
}

.content table thead th, .full-content table thead th {
  padding: 1.25rem 1.5rem;
  text-align: left;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.content table tbody tr, .full-content table tbody tr {
  border-bottom: 1px solid rgba(59, 130, 246, 0.2);
  transition: all 0.3s ease;
}

.content table tbody tr:last-child, .full-content table tbody tr:last-child {
  border-bottom: none;
}

.content table tbody tr:hover, .full-content table tbody tr:hover {
  background: rgba(59, 130, 246, 0.15);
}

.content table tbody td, .full-content table tbody td {
  padding: 1.25rem 1.5rem;
  color: #334155;
  line-height: 1.6;
}

.content table tbody td:first-child, .full-content table tbody td:first-child {
  font-weight: 600;
  color: #1e40af;
  font-family: 'Poppins', sans-serif;
}

.main-image {
  display: block;
  width: 100%;
  height: 25vh;
  object-fit: cover;
  margin: 0 auto 16px auto;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-horizontal-collapsible {
    padding: 25px 30px;
  }
  
  .horizontal-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .horizontal-header h1 {
    font-size: 1.5rem;
    white-space: normal;
  }
  
  .horizontal-header .hero-subtitle {
    font-size: 0.95rem;
  }
  
  .hero-horizontal {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
    padding: 25px 30px;
  }
  
  .hero-horizontal h1 {
    font-size: 1.5rem;
    white-space: normal;
  }
  
  .hero-horizontal .hero-subtitle {
    font-size: 0.95rem;
  }
  
  .hero h1 {
    font-size: 2.5rem;
  }
  
  .hero .subheading {
    font-size: 1.15rem;
  }
  
  .collapsible-container {
    flex-direction: column;
  }
  
  .collapsible-box {
    flex: 1 1 100%;
    min-width: 100%;
  }
  
  .collapsible-box h2 {
    font-size: 1.3rem;
  }
  
  .content, .full-content {
    font-size: 1rem;
  }
  
  .content table, .full-content table {
    font-size: 0.9rem;
  }
  
  .content table thead th,
  .content table tbody td,
  .full-content table thead th,
  .full-content table tbody td {
    padding: 1rem;
  }
  
  .preview-text {
    font-size: 1rem;
  }
  
  .explore-more-btn {
    font-size: 0.9rem;
    padding: 10px 22px;
  }
}

@media (max-width: 480px) {
  .hero-horizontal-collapsible {
    padding: 20px;
  }
  
  .horizontal-header h1 {
    font-size: 1.3rem;
  }
  
  .horizontal-header .hero-subtitle {
    font-size: 0.9rem;
  }
  
  .hero-horizontal {
    padding: 20px;
  }
  
  .hero-horizontal h1 {
    font-size: 1.3rem;
  }
  
  .hero-horizontal .hero-subtitle {
    font-size: 0.9rem;
  }
  
  .hero h1 {
    font-size: 2rem;
  }
  
  .hero .subheading {
    font-size: 1rem;
  }
  
  .homepage {
    padding: 20px;
  }
  
  .content table, .full-content table {
    font-size: 0.85rem;
  }
  
  .content table thead th,
  .content table tbody td,
  .full-content table thead th,
  .full-content table tbody td {
    padding: 0.75rem;
  }
  
  .preview-text {
    font-size: 0.95rem;
  }
  
  .explore-more-btn {
    font-size: 0.85rem;
    padding: 8px 18px;
    width: 100%;
    justify-content: center;
  }
}

</style>

