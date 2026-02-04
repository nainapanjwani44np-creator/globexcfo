<template>
  <div class="blackground">
    <div class="error-page">
      <div class="error-container">
        
        <!-- Error Icon -->
        <div class="error-icon-wrapper">
          <svg class="error-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <!-- Error Message -->
        <h1 class="error-title">Submission Failed</h1>
        
        <p class="error-message">
          We apologize for the inconvenience. An error occurred while submitting your inquiry.
        </p>

        <div class="error-details">
          <h3>Possible Reasons:</h3>
          <ul>
            <li>Network connection issue</li>
            <li>Server is temporarily unavailable</li>
            <li>Request timeout</li>
          </ul>
        </div>

        <div class="error-suggestions">
          <h3>What You Can Do:</h3>
          <ul>
            <li>Check your internet connection</li>
            <li>Try submitting the form again</li>
            <li>Contact us directly via phone or email</li>
          </ul>
        </div>

        <!-- Contact Information -->
        <div class="contact-info">
          <h3>Alternative Contact Methods:</h3>
          <div class="contact-methods">
            <div class="contact-item">
              <svg class="contact-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href="mailto:contact@globexcfo.com">contact@globexcfo.com</a>
            </div>
            <div class="contact-item">
              <svg class="contact-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href="tel:+911234567890">+91 123 456 7890</a>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="button-group">
          <router-link to="/query" class="btn btn-primary">
            <svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Try Again
          </router-link>
          
          <router-link to="/" class="btn btn-secondary">
            <svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Home
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
.blackground {
  background: linear-gradient(180deg, #fee2e2 0%, #fecaca 50%, #fca5a5 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.error-page {
  font-family: "Inter", sans-serif;
  width: 100%;
  max-width: 700px;
}

.error-container {
  background: linear-gradient(135deg, #fee2e2, #fecaca);
  border-left: 4px solid #ef4444;
  border-radius: 16px;
  padding: 50px 40px;
  box-shadow: 0 20px 60px rgba(239, 68, 68, 0.3);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.error-container::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 20% 50%, rgba(239, 68, 68, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(252, 165, 165, 0.1) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

.error-container > * {
  position: relative;
  z-index: 1;
}

.error-icon-wrapper {
  margin-bottom: 30px;
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}

.error-icon {
  width: 100px;
  height: 100px;
  color: #ef4444;
  stroke-width: 1.5;
  filter: drop-shadow(0 10px 20px rgba(239, 68, 68, 0.3));
}

.error-title {
  font-family: 'Poppins', sans-serif;
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #b91c1c 0%, #ef4444 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.error-message {
  font-size: 1.2rem;
  color: #7f1d1d;
  margin-bottom: 40px;
  line-height: 1.7;
}

.error-details,
.error-suggestions {
  text-align: left;
  margin-bottom: 30px;
  padding: 20px;
  background: rgba(254, 226, 226, 0.5);
  border-radius: 12px;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.error-details h3,
.error-suggestions h3 {
  font-family: 'Poppins', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #b91c1c;
  margin-bottom: 15px;
}

.error-details ul,
.error-suggestions ul {
  list-style: none;
  padding-left: 0;
}

.error-details li,
.error-suggestions li {
  padding-left: 30px;
  position: relative;
  margin-bottom: 10px;
  color: #7f1d1d;
  line-height: 1.6;
}

.error-details li::before,
.error-suggestions li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  width: 8px;
  height: 8px;
  background: #ef4444;
  border-radius: 50%;
}

.contact-info {
  margin-bottom: 40px;
  padding: 25px;
  background: rgba(254, 226, 226, 0.5);
  border-radius: 12px;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.contact-info h3 {
  font-family: 'Poppins', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #b91c1c;
  margin-bottom: 20px;
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px;
  background: white;
  border-radius: 8px;
  transition: all 0.3s ease;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.contact-item:hover {
  transform: translateX(5px);
  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.2);
  border-color: #ef4444;
}

.contact-icon {
  width: 24px;
  height: 24px;
  color: #ef4444;
  flex-shrink: 0;
}

.contact-item a {
  color: #7f1d1d;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.contact-item a:hover {
  color: #ef4444;
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
  background: linear-gradient(135deg, #ef4444, #f87171);
  border-color: #ef4444;
  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
}

.btn-primary:hover {
  background: linear-gradient(135deg, #dc2626, #ef4444);
  border-color: #dc2626;
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(239, 68, 68, 0.5);
}

.btn-secondary {
  color: #7f1d1d;
  background: white;
  border-color: #ef4444;
}

.btn-secondary:hover {
  background: #fee2e2;
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(239, 68, 68, 0.2);
}

/* Responsive Design */
@media (max-width: 768px) {
  .error-container {
    padding: 40px 30px;
  }

  .error-title {
    font-size: 2rem;
  }

  .error-message {
    font-size: 1.1rem;
  }

  .button-group {
    flex-direction: column;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .error-container {
    padding: 30px 20px;
  }

  .error-icon {
    width: 80px;
    height: 80px;
  }

  .error-title {
    font-size: 1.75rem;
  }

  .error-message {
    font-size: 1rem;
  }

  .error-details,
  .error-suggestions,
  .contact-info {
    padding: 15px;
  }

  .contact-methods {
    gap: 10px;
  }

  .btn {
    font-size: 0.9rem;
    padding: 12px 24px;
  }
}
</style>
