<template>
    <!-- Coming Soon Section -->
    <div v-if="!blogs || blogs.length === 0" class="coming-soon-container">
      <div class="coming-soon-content">
        <div class="icon-container">
          <svg xmlns="http://www.w3.org/2000/svg" class="blog-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
          </svg>
        </div>
        <h1 class="main-title">Insights & Articles Coming Soon</h1>
        <p class="subtitle">We're crafting valuable content to help you navigate financial excellence</p>
        
        <div class="info-box">
          <h2 class="info-title">What to Expect</h2>
          <ul class="features-list">
            <li>
              <span class="feature-icon">📊</span>
              <div class="feature-content">
                <strong>Financial Strategy Insights</strong>
                <p>Expert guidance on CFO services, financial planning, and business growth strategies</p>
              </div>
            </li>
            <li>
              <span class="feature-icon">💡</span>
              <div class="feature-content">
                <strong>Industry Best Practices</strong>
                <p>Practical tips and proven methodologies for financial management excellence</p>
              </div>
            </li>
            <li>
              <span class="feature-icon">📈</span>
              <div class="feature-content">
                <strong>Market Trends & Analysis</strong>
                <p>Up-to-date insights on financial markets, compliance, and emerging opportunities</p>
              </div>
            </li>
            <li>
              <span class="feature-icon">🎯</span>
              <div class="feature-content">
                <strong>Case Studies & Success Stories</strong>
                <p>Real-world examples of how strategic financial guidance drives business success</p>
              </div>
            </li>
          </ul>
        </div>

        <div class="cta-section">
          <p class="cta-text">In the meantime, we'd love to discuss your financial needs</p>
          <router-link to="/Query" class="cta-button">Get In Touch</router-link>
        </div>

        <div class="stay-tuned">
          <p>Stay tuned for valuable insights that empower your business growth</p>
        </div>
      </div>
    </div>

    <!-- Blogs Content (when available) -->
    <div v-else class="container">
      <!-- Left Section (20%) -->
      <div class="left-panel">
        <div
          v-for="(blog, index) in blogs"
          :key="index"
          class="blog-heading"
          :class="{ active: selectedBlog && selectedBlog.id === blog.id }"
          @click="selectBlog(blog)"
        >
          {{ blog.header }}
        </div>
      </div>
  
      <!-- Right Section (80%) -->
      <div class="right-panel">
        <div v-html="selectedBlog.heading"></div>
        <div v-html="selectedBlog.body"></div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import axios from 'axios';
  async function getTestData() {
    const response = await axios.get('/api/blogs');
    return response.data;
}
  const blogs = ref([]);
  const selectedBlog = ref(null);
  
  const selectBlog = (blog) => {
    selectedBlog.value = blog;
  };
  
  onMounted(async() => {
    blogs.value = await getTestData();
    console.log('the blogs looks like ',blogs.value);
    // Show first blog by default
    if (blogs.value.length > 0) {
      selectedBlog.value = blogs.value[0];
    }
  });
  </script>
  
<style scoped>
/* Coming Soon Styles */
.coming-soon-container {
  min-height: calc(100vh - 150px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%);
  padding: 3rem 2rem;
}

.coming-soon-content {
  max-width: 900px;
  text-align: center;
  animation: fadeIn 0.8s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.icon-container {
  margin-bottom: 2rem;
}

.blog-icon {
  width: 80px;
  height: 80px;
  color: #3b82f6;
  filter: drop-shadow(0 4px 6px rgba(59, 130, 246, 0.3));
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.main-title {
  font-size: 3rem;
  font-weight: 700;
  color: #1e3a8a;
  margin-bottom: 1rem;
  font-family: 'Poppins', sans-serif;
  letter-spacing: -0.5px;
}

.subtitle {
  font-size: 1.3rem;
  color: #64748b;
  margin-bottom: 3rem;
  font-weight: 400;
  line-height: 1.6;
}

.info-box {
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  margin-bottom: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  text-align: left;
}

.info-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #1e3a8a;
  margin-bottom: 2rem;
  text-align: center;
  font-family: 'Poppins', sans-serif;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.features-list li {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.features-list li:hover {
  background: #f1f5f9;
  transform: translateX(8px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
}

.feature-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.feature-content {
  flex: 1;
}

.feature-content strong {
  font-size: 1.1rem;
  color: #1e3a8a;
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.feature-content p {
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
}

.cta-section {
  margin-bottom: 2rem;
}

.cta-text {
  font-size: 1.2rem;
  color: #475569;
  margin-bottom: 1.5rem;
  font-weight: 500;
}

.cta-button {
  display: inline-block;
  padding: 1rem 3rem;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
  letter-spacing: 0.5px;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
  background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
}

.stay-tuned {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 2px solid #e2e8f0;
}

.stay-tuned p {
  font-size: 1rem;
  color: #64748b;
  font-style: italic;
}

/* Responsive Design */
@media (max-width: 768px) {
  .coming-soon-container {
    padding: 2rem 1rem;
  }

  .main-title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1.1rem;
  }

  .info-box {
    padding: 1.5rem;
  }

  .info-title {
    font-size: 1.5rem;
  }

  .features-list li {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }

  .feature-icon {
    font-size: 1.5rem;
  }

  .feature-content strong {
    font-size: 1rem;
  }

  .cta-button {
    padding: 0.9rem 2rem;
    font-size: 1rem;
  }
}

/* Blogs Content Styles */
.container {
  display: flex;
  height: 100vh;
}

/* Left Panel */
.left-panel {
  width: 20%;
  background: #f4f4f4;
  border-right: 1px solid #ddd;
  padding: 10px;
  overflow-y: auto;
}

.blog-heading {
  padding: 12px;
  cursor: pointer;
  border-radius: 6px;
  margin-bottom: 8px;
  background: #ffffff;
  transition: 0.2s;
  font-weight: 500;
}

.blog-heading:hover {
  background: #e7e7e7;
}

/* Highlight selected blog */
.blog-heading.active {
  background: #409eff;
  color: white;
}

/* Right Panel */
.right-panel {
  width: 80%;
  padding: 20px;
  overflow-y: auto;
}
</style>
