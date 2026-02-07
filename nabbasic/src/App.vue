<script setup>
import { onMounted } from 'vue';

onMounted(() => {
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
  
  console.log('✅ Globex logo initialized');
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
          <router-link to="/Home" class="logo-link">
            <div class="logo-design">
              <svg class="logo-globe" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
                <!-- Outer dark blue circle (globe base) -->
                <circle cx="60" cy="60" r="45" fill="#2c5f8d" stroke="#1e4a6f" stroke-width="2"/>
                
                <!-- Inner circle with gradient effect -->
                <circle cx="60" cy="60" r="42" fill="#3a7ca5" opacity="0.9"/>
                
                <!-- Latitude lines (horizontal curves) - 3D perspective -->
                <ellipse cx="60" cy="60" rx="42" ry="18" fill="none" stroke="#7dd3fc" stroke-width="2.5" opacity="0.8"/>
                <ellipse cx="60" cy="60" rx="42" ry="30" fill="none" stroke="#7dd3fc" stroke-width="2" opacity="0.6"/>
                <ellipse cx="60" cy="60" rx="42" ry="38" fill="none" stroke="#7dd3fc" stroke-width="1.5" opacity="0.4"/>
                
                <!-- Longitude lines (vertical curves) - 3D perspective -->
                <ellipse cx="60" cy="60" rx="18" ry="42" fill="none" stroke="#7dd3fc" stroke-width="2.5" opacity="0.8"/>
                <ellipse cx="60" cy="60" rx="30" ry="42" fill="none" stroke="#7dd3fc" stroke-width="2" opacity="0.6"/>
                
                <!-- Arrow wrapping around globe from bottom-left to top-right -->
                <defs>
                  <linearGradient id="arrowGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" style="stop-color:#60a5fa;stop-opacity:1" />
                    <stop offset="50%" style="stop-color:#7dd3fc;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#93c5fd;stop-opacity:1" />
                  </linearGradient>
                </defs>
                
                <!-- Arrow body - wraps around the edge/circumference of globe -->
                <path d="M 18 88 Q 12 75 12 60 Q 12 45 18 32 Q 25 20 38 12 Q 52 5 68 5 Q 84 5 98 12 Q 108 18 114 28" 
                      fill="none" 
                      stroke="url(#arrowGradient)" 
                      stroke-width="10" 
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      opacity="0.95"/>
                
                <!-- Arrow head pointing top-right -->
                <path d="M 114 28 L 106 26 L 110 34 Z" 
                      fill="#93c5fd" 
                      opacity="0.95"/>
                <path d="M 114 28 L 110 21 L 106 26 Z" 
                      fill="#bfdbfe" 
                      opacity="0.95"/>
              </svg>
              <div class="logo-text-container">
                <span class="logo-title">GLOBEX CFO</span>
                <span class="logo-subtitle">& Financial Advisory</span>
              </div>
            </div>
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
  justify-content: flex-start;
  padding: 0;
  margin-right: 3rem;
  background: transparent;
  transition: all 0.3s ease;
}

.logo-link {
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.logo-link:hover {
  transform: scale(1.05);
}

.logo-design {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
}

.logo-globe {
  width: 58px;
  height: 58px;
  flex-shrink: 0;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3));
  transition: all 0.3s ease;
}

.logo-link:hover .logo-globe {
  filter: drop-shadow(3px 3px 6px rgba(0, 0, 0, 0.4));
  transform: rotate(5deg);
}

.logo-text-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.1rem;
}

.logo-title {
  font-family: 'Poppins', sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 2px;
  line-height: 1;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.logo-subtitle {
  font-family: 'Poppins', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  color: #e0e7ff;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  line-height: 1;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.logo-link:hover .logo-title {
  color: #fef08a;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
  letter-spacing: 2.5px;
}

.logo-link:hover .logo-subtitle {
  color: #fef9c3;
  letter-spacing: 2px;
}

/* Logo responsive sizing */
@media (max-width: 1200px) {
  .logo-globe {
    width: 53px;
    height: 53px;
  }
  
  .logo-title {
    font-size: 1.7rem;
  }
  
  .logo-subtitle {
    font-size: 0.65rem;
  }
  
  .logo-design {
    gap: 0.7rem;
  }
  
  .logo-container {
    margin-right: 2.5rem;
  }
}

@media (max-width: 1024px) {
  .logo-globe {
    width: 48px;
    height: 48px;
  }
  
  .logo-title {
    font-size: 1.5rem;
  }
  
  .logo-subtitle {
    font-size: 0.6rem;
  }
  
  .logo-design {
    gap: 0.65rem;
  }
  
  .logo-container {
    margin-right: 2rem;
  }
}

@media (max-width: 768px) {
  .logo-globe {
    width: 43px;
    height: 43px;
  }
  
  .logo-title {
    font-size: 1.3rem;
  }
  
  .logo-subtitle {
    font-size: 0.55rem;
    letter-spacing: 1px;
  }
  
  .logo-design {
    gap: 0.6rem;
  }
  
  .logo-container {
    margin-right: 1.5rem;
  }
}

@media (max-width: 480px) {
  .logo-globe {
    width: 38px;
    height: 38px;
  }
  
  .logo-title {
    font-size: 1.1rem;
    letter-spacing: 1.5px;
  }
  
  .logo-subtitle {
    font-size: 0.5rem;
    letter-spacing: 0.8px;
  }
  
  .logo-design {
    gap: 0.5rem;
  }
  
  .logo-container {
    margin-right: 1rem;
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
