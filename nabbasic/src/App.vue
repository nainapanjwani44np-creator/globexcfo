<script setup>
import { onMounted, ref } from 'vue';

// Logo state
const logoLoaded = ref(false);
const logoError = ref(false);

// Handle logo loading
onMounted(() => {
  const logo = document.querySelector('.logo');
  
  if (logo) {
    // Add loading indicator
    logo.style.opacity = '0';
    logo.style.transition = 'opacity 0.3s ease';
    
    // Handle successful load
    logo.addEventListener('load', () => {
      logoLoaded.value = true;
      logo.style.opacity = '1';
      console.log('✅ Logo loaded successfully');
    });
    
    // Handle error
    logo.addEventListener('error', () => {
      logoError.value = true;
      console.error('❌ Logo failed to load');
      // Fallback: Show text instead
      const container = logo.parentElement;
      if (container) {
        container.innerHTML = '<span style="font-size: 1.5rem; font-weight: 700; color: #1e3a8a;">GLOBEX CFO</span>';
      }
    });
    
    // Optimize image rendering
    logo.setAttribute('loading', 'eager');
    logo.setAttribute('decoding', 'async');
  }
  
  // Add smooth scroll behavior
  document.documentElement.style.scrollBehavior = 'smooth';
  
  // Prevent horizontal scroll on mobile
  const preventHorizontalScroll = () => {
    if (window.innerWidth <= 768) {
      document.body.style.overflowX = 'hidden';
      document.documentElement.style.overflowX = 'hidden';
    }
  };
  
  preventHorizontalScroll();
  window.addEventListener('resize', preventHorizontalScroll);
});
</script>

<template>
  <div>
    <!-- Top Info Bar -->
    <div class="top-bar">
      <div class="top-bar-content">
        <div class="contact-info">
          <a href="mailto:support@globexcfo.com" class="info-item">
            <span class="icon">📧</span>
            <span class="text">support@globexcfo.com</span>
          </a>
          <a href="tel:+917204105500" class="info-item">
            <span class="icon">📱</span>
            <span class="text">+91 720 410 5500</span>
          </a>
        </div>
        <div class="social-links">
          <a href="https://www.linkedin.com/company/globexcfo/" target="_blank" rel="noopener" class="social-icon linkedin" aria-label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          <router-link to="/ComingSoon" class="social-icon youtube" aria-label="YouTube">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Navigation Menu -->
    <nav class="menu">
      <div class="menu-container">
        <div class="logo-container">
          <router-link to="/Home">
            <img src="./images/logo.png" alt="Globex CFO Logo" class="logo" />
          </router-link>
        </div>
        <ul>
          <li><router-link to="/Home">Home</router-link></li>
          <li><router-link to="/About">About Us</router-link></li>
          <li><router-link to="/Services">Services</router-link></li>
          <li><router-link to="/Query">Query</router-link></li>
          <li><router-link to="/Blogs">Blogs</router-link></li>
        </ul>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<style>
/* Import Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');

/* Global Reset - Remove white borders on mobile */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

#app {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
}
</style>

<style scoped>
/* Top Info Bar */
.top-bar {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.875rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.top-bar-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.6rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.contact-info {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  transition: all 0.3s ease;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
}

.info-item:hover {
  color: #ffffff;
  transform: translateX(3px);
}

.info-item .icon {
  font-size: 1rem;
  opacity: 0.9;
}

.info-item .text {
  font-weight: 500;
}

.social-links {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 0.75rem;
  align-items: center;
  justify-content: center;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.social-icon svg {
  transition: all 0.3s ease;
}

.social-icon:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* LinkedIn Hover */
.social-icon.linkedin:hover {
  background: #0077b5;
  color: #ffffff;
}

/* YouTube Hover */
.social-icon.youtube:hover {
  background: #FF0000;
  color: #ffffff;
}

/* Navigation Menu */
.menu {
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #6366f1 100%);
}

.menu-container {
  display: flex;
  align-items: center;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0.5rem 2rem;
}

.logo-container {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  /* Match the navigation bar gradient */
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #6366f1 100%);
  border-radius: 8px;
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;
}

.logo-container:hover {
  transform: scale(1.03);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.logo {
  height: 55px;
  width: auto;
  min-width: 250px;
  max-width: 350px;
  display: block;
  transition: all 0.3s ease;
  
  /* Crop out Gemini symbol (bottom-right corner) */
  object-fit: cover;
  object-position: left center;
  
  /* Clip the right side to remove Gemini symbol */
  clip-path: inset(0 50px 15px 0);
  
  /* Blend logo's blue with gradient background */
  background: transparent;
  
  /* Make logo background blend with container gradient */
  mix-blend-mode: screen;
  opacity: 0.95;
  
  /* Ensure crisp rendering */
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  
  /* Enhance visibility and color harmony */
  filter: brightness(1.15) contrast(1.05) saturate(1.1);
}

.logo:hover {
  opacity: 1;
  filter: brightness(1.2) contrast(1.08) saturate(1.15);
  transform: scale(1.02);
}

/* Logo responsive sizing */
@media (max-width: 1200px) {
  .logo {
    height: 50px;
    min-width: 230px;
    max-width: 320px;
    clip-path: inset(0 45px 12px 0);
  }
  
  .logo-container {
    padding: 0.45rem 0.9rem;
  }
}

@media (max-width: 1024px) {
  .logo {
    height: 48px;
    min-width: 220px;
    max-width: 300px;
    clip-path: inset(0 40px 10px 0);
  }
  
  .logo-container {
    padding: 0.4rem 0.8rem;
  }
}

@media (max-width: 768px) {
  .logo {
    height: 42px;
    min-width: 180px;
    max-width: 250px;
    clip-path: inset(0 35px 8px 0);
  }
  
  .logo-container {
    padding: 0.35rem 0.7rem;
  }
}

@media (max-width: 480px) {
  .logo {
    height: 38px;
    min-width: 160px;
    max-width: 220px;
    clip-path: inset(0 30px 6px 0);
  }
  
  .logo-container {
    padding: 0.3rem 0.6rem;
  }
}

.menu ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
}

.menu li {
  cursor: pointer;
  flex: 0 1 auto;
}

.menu li a {
  display: inline-block;
  padding: 0.7rem 1.2rem;
  color: #ffffff;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  position: relative;
  transition: all 0.35s ease;
  border-radius: 8px;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.3);
  white-space: nowrap;
  min-width: fit-content;
}

/* Clean Zoom Hover Effect */
.menu li a:hover {
  transform: scale(1.12);
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.7);
  color: #fff;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

/* Active/Current Route Styling */
.menu li a.router-link-active {
  background: rgba(255, 255, 255, 0.25);
  border-color: #ffffff;
  color: #fff;
  font-weight: 700;
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.menu li a.router-link-active:hover {
  transform: scale(1.12);
}

/* Clean Underline Animation */
.menu li a::after {
  content: '';
  position: absolute;
  bottom: 6px;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: 60%;
  height: 2px;
  background: #ffffff;
  border-radius: 2px;
  transition: transform 0.35s ease;
}

.menu li a:hover::after {
  transform: translateX(-50%) scaleX(1);
}

.menu li a.router-link-active::after {
  transform: translateX(-50%) scaleX(1);
  height: 3px;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .top-bar-content {
    padding: 0.6rem 1rem;
  }

  .menu ul {
    max-width: 800px;
    gap: 0.6rem;
  }
  
  .menu li a {
    padding: 0.65rem 1rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 768px) {
  .top-bar-content {
    padding: 0.5rem 1rem;
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }

  .contact-info {
    flex-direction: column;
    gap: 0.5rem;
  }

  .info-item {
    font-size: 0.8rem;
  }

  .social-links {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 0.6rem;
    justify-content: center;
  }

  .social-icon {
    width: 32px;
    height: 32px;
    flex-shrink: 0;
  }

  .social-icon svg {
    width: 16px;
    height: 16px;
  }

  .menu-container {
    padding: 0.5rem 1rem;
    gap: 1rem;
  }

  .logo {
    height: 40px;
  }

  .menu ul {
    max-width: 100%;
    flex-wrap: nowrap;
    overflow-x: auto;
    gap: 0.5rem;
    padding: 0;
    justify-content: flex-start;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }

  .menu ul::-webkit-scrollbar {
    display: none;
  }
  
  .menu li {
    flex-shrink: 0;
  }
  
  .menu li a {
    padding: 0.6rem 0.9rem;
    font-size: 0.85rem;
    letter-spacing: 0.3px;
    white-space: nowrap;
  }
  
  .menu li a:hover {
    transform: scale(1.08);
  }
}

@media (max-width: 480px) {
  .top-bar {
    font-size: 0.8rem;
  }

  .top-bar-content {
    padding: 0.5rem;
  }

  .info-item .text {
    font-size: 0.75rem;
  }

  .social-links {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 0.5rem;
    justify-content: center;
  }

  .social-icon {
    width: 30px;
    height: 30px;
    flex-shrink: 0;
  }

  .social-icon svg {
    width: 15px;
    height: 15px;
  }

  .menu-container {
    padding: 0.4rem 0.5rem;
    gap: 0.75rem;
  }

  .logo {
    height: 35px;
  }

  .menu ul {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    overflow-x: auto;
    gap: 0.4rem;
    padding: 0;
    justify-content: flex-start;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }

  .menu ul::-webkit-scrollbar {
    display: none;
  }
  
  .menu li {
    flex-shrink: 0;
  }
  
  .menu li a {
    display: block;
    text-align: center;
    padding: 0.65rem 0.8rem;
    font-size: 0.75rem;
    white-space: nowrap;
  }
  
  .menu li a:hover {
    transform: scale(1.05);
  }
}

.main-image {
  display: block;
  margin: 0 auto 16px auto;
  width: 100%;
  height: 45vh;
  object-fit: cover;
  max-width: none;
}

.content {
  font-size: 1.2em;
  text-align: center;
  margin-top: 16px;
}
</style>
