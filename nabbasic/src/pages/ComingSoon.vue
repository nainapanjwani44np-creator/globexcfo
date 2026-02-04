<template>
  <div class="blackground">
    <div class="coming-soon-page">
      <div class="coming-soon-container">
        
        <!-- YouTube Icon -->
        <div class="youtube-icon-wrapper">
          <svg class="youtube-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          <div class="pulse-ring"></div>
          <div class="pulse-ring-2"></div>
        </div>

        <!-- Main Title -->
        <h1 class="coming-soon-title">Our YouTube Channel is Coming Soon</h1>
        
        <!-- Subtitle -->
        <p class="coming-soon-subtitle">
          We're creating valuable content to help you master financial strategy and business growth.
        </p>

        <!-- What to Expect Section -->
        <div class="what-to-expect">
          <h2>What to Expect:</h2>
          <div class="features-grid">
            <div class="feature-item">
              <svg class="feature-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <h3>Expert Insights</h3>
              <p>CFO tips and financial strategies for business growth</p>
            </div>
            
            <div class="feature-item">
              <svg class="feature-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h3>Educational Tutorials</h3>
              <p>Step-by-step guides on financial modeling and analysis</p>
            </div>
            
            <div class="feature-item">
              <svg class="feature-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <h3>Case Studies</h3>
              <p>Real business examples and success stories</p>
            </div>
            
            <div class="feature-item">
              <svg class="feature-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
              <h3>Q&A Sessions</h3>
              <p>Answering your financial and business questions</p>
            </div>
          </div>
        </div>

        <!-- Stay Tuned Message -->
        <div class="stay-tuned-box">
          <p class="stay-tuned-text">
            Stay tuned for expert financial insights, practical business advice, and strategies that drive growth.
          </p>
          <p class="launch-text">
            We're working hard to bring you valuable content. Our channel will be launching soon!
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="button-group">
          <router-link to="/" class="btn btn-primary">
            <svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Home
          </router-link>
          
          <router-link to="/query" class="btn btn-secondary">
            <svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Get In Touch
          </router-link>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
// No script needed for this static page
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&family=Inter:wght@300;400;500;600&display=swap');

.blackground {
  background: linear-gradient(180deg, #dbeafe 0%, #bfdbfe 50%, #93c5fd 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.coming-soon-page {
  font-family: "Inter", sans-serif;
  width: 100%;
  max-width: 900px;
}

.coming-soon-container {
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  border-left: 4px solid #3b82f6;
  border-radius: 16px;
  padding: 60px 50px;
  box-shadow: 0 20px 60px rgba(59, 130, 246, 0.3);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.coming-soon-container::after {
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

.coming-soon-container > * {
  position: relative;
  z-index: 1;
}

/* YouTube Icon with Pulse Animation */
.youtube-icon-wrapper {
  position: relative;
  display: inline-block;
  margin-bottom: 40px;
}

.youtube-icon {
  width: 120px;
  height: 120px;
  color: #FF0000;
  filter: drop-shadow(0 10px 30px rgba(255, 0, 0, 0.3));
  animation: float 3s ease-in-out infinite;
  position: relative;
  z-index: 2;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.pulse-ring,
.pulse-ring-2 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  border: 3px solid #FF0000;
  border-radius: 50%;
  opacity: 0;
  animation: pulse 2s ease-out infinite;
}

.pulse-ring-2 {
  animation-delay: 1s;
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.6;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.8);
    opacity: 0;
  }
}

.coming-soon-title {
  font-family: 'Poppins', sans-serif;
  font-size: 2.8rem;
  font-weight: 800;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
}

.coming-soon-subtitle {
  font-size: 1.3rem;
  color: #1e40af;
  margin-bottom: 50px;
  line-height: 1.7;
  font-weight: 400;
}

.what-to-expect {
  margin-bottom: 50px;
  text-align: left;
}

.what-to-expect h2 {
  font-family: 'Poppins', sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: #1e40af;
  margin-bottom: 30px;
  text-align: center;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 30px;
}

.feature-item {
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.15);
  border: 1px solid #bfdbfe;
  transition: all 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(59, 130, 246, 0.25);
  border-color: #3b82f6;
}

.feature-icon {
  width: 50px;
  height: 50px;
  color: #3b82f6;
  margin-bottom: 15px;
  stroke-width: 1.5;
}

.feature-item h3 {
  font-family: 'Poppins', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #1e40af;
  margin-bottom: 10px;
}

.feature-item p {
  font-size: 1rem;
  color: #64748b;
  line-height: 1.6;
  margin: 0;
}

.stay-tuned-box {
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  padding: 30px;
  border-radius: 12px;
  border: 2px solid #3b82f6;
  margin-bottom: 40px;
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.2);
}

.stay-tuned-text {
  font-family: 'Poppins', sans-serif;
  font-size: 1.3rem;
  font-weight: 600;
  color: #1e40af;
  margin-bottom: 15px;
  line-height: 1.7;
}

.launch-text {
  font-size: 1.1rem;
  color: #475569;
  font-style: italic;
  margin: 0;
  line-height: 1.6;
}

.button-group {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 32px;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: 2px solid transparent;
}

.btn-icon {
  width: 20px;
  height: 20px;
}

.btn-primary {
  color: white;
  background: linear-gradient(135deg, #3b82f6, #60a5fa);
  border-color: #3b82f6;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
}

.btn-primary:hover {
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  border-color: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(59, 130, 246, 0.5);
}

.btn-secondary {
  color: #1e40af;
  background: white;
  border-color: #3b82f6;
}

.btn-secondary:hover {
  background: #dbeafe;
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(59, 130, 246, 0.2);
}

/* Responsive Design */
@media (max-width: 768px) {
  .coming-soon-container {
    padding: 50px 40px;
  }

  .coming-soon-title {
    font-size: 2.2rem;
  }

  .coming-soon-subtitle {
    font-size: 1.15rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .stay-tuned-text {
    font-size: 1.15rem;
  }

  .launch-text {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .coming-soon-container {
    padding: 40px 25px;
  }

  .youtube-icon {
    width: 90px;
    height: 90px;
  }

  .coming-soon-title {
    font-size: 1.8rem;
  }

  .coming-soon-subtitle {
    font-size: 1rem;
  }

  .what-to-expect h2 {
    font-size: 1.5rem;
  }

  .feature-item {
    padding: 20px;
  }

  .feature-icon {
    width: 40px;
    height: 40px;
  }

  .feature-item h3 {
    font-size: 1.1rem;
  }

  .feature-item p {
    font-size: 0.95rem;
  }

  .stay-tuned-box {
    padding: 25px 20px;
  }

  .stay-tuned-text {
    font-size: 1.05rem;
  }

  .launch-text {
    font-size: 0.95rem;
  }

  .button-group {
    flex-direction: column;
  }

  .btn {
    width: 100%;
    justify-content: center;
    font-size: 0.9rem;
    padding: 12px 24px;
  }
}
</style>
