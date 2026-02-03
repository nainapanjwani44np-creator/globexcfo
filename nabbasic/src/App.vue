<script setup>
</script>

<template>
  <div>
    <!-- Top Info Bar -->
    <div class="top-bar">
      <div class="top-bar-content">
        <div class="contact-info">
          <a href="mailto:contact@globexcfo.com" class="info-item">
            <span class="icon">📧</span>
            <span class="text">contact@globexcfo.com</span>
          </a>
          <a href="tel:+911234567890" class="info-item">
            <span class="icon">📱</span>
            <span class="text">+91 123 456 7890</span>
          </a>
        </div>
        <div class="social-links">
          <a href="https://linkedin.com/company/your-company" target="_blank" rel="noopener" class="social-icon linkedin" aria-label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          <a href="https://twitter.com/your-handle" target="_blank" rel="noopener" class="social-icon twitter" aria-label="Twitter">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a href="https://instagram.com/your-handle" target="_blank" rel="noopener" class="social-icon instagram" aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a href="https://facebook.com/your-page" target="_blank" rel="noopener" class="social-icon facebook" aria-label="Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>

    <!-- Navigation Menu -->
    <nav class="menu">
      <ul>
        <li><router-link to="/Home">Home</router-link></li>
        <li><router-link to="/About">About Us</router-link></li>
        <li><router-link to="/Services">Services</router-link></li>
        <li><router-link to="/Query">Query</router-link></li>
        <li><router-link to="/Blogs">Blogs</router-link></li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>

<style>
/* Import Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');

/* Global font for entire app */
* {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
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

/* Twitter/X Hover */
.social-icon.twitter:hover {
  background: #000000;
  color: #ffffff;
}

/* Instagram Hover */
.social-icon.instagram:hover {
  background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
  color: #ffffff;
}

/* Facebook Hover */
.social-icon.facebook:hover {
  background: #1877f2;
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

.menu ul {
  display: flex;
  list-style: none;
  padding: 0.75rem 0;
  margin: 0 auto;
  max-width: 900px;
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

  .menu ul {
    max-width: 100%;
    flex-wrap: nowrap;
    overflow-x: auto;
    gap: 0.5rem;
    padding: 0.75rem 0.5rem;
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

  .menu ul {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    overflow-x: auto;
    gap: 0.4rem;
    padding: 0.5rem;
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
