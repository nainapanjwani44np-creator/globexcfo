<template>
  <div class="success-container">
    <div class="success-card">
      <!-- Success Icon -->
      <div class="success-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      </div>

      <!-- Success Message -->
      <h1 class="success-title">Successfully Submitted!</h1>
      <p class="success-message">
        Thank you for reaching out to us. We have received your query and our team will get back to you shortly.
      </p>

      <!-- Home Button -->
      <button @click="goToHome" class="home-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
        Back to Home
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const router = useRouter();

const goToHome = () => {
  router.push('/');
};

// Optional: Auto-redirect after 5 seconds
// onMounted(() => {
//   setTimeout(() => {
//     router.push('/');
//   }, 5000);
// });
</script>

<style scoped>
.success-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 2rem;
  background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
}

.success-card {
  background: white;
  border-radius: 20px;
  padding: 3rem 2rem;
  max-width: 500px;
  width: 100%;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.5s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.success-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: scaleIn 0.5s ease-out 0.2s backwards;
}

@keyframes scaleIn {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

.success-icon svg {
  width: 50px;
  height: 50px;
  color: white;
  stroke-width: 3;
}

.success-title {
  font-size: 2rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 1rem;
  animation: fadeIn 0.5s ease-out 0.3s backwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.success-message {
  font-size: 1.1rem;
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 2rem;
  animation: fadeIn 0.5s ease-out 0.4s backwards;
}

.home-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(90deg, #60a5fa 0%, #3b82f6 100%);
  color: white;
  padding: 0.875rem 2rem;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
  animation: fadeIn 0.5s ease-out 0.5s backwards;
}

.home-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.6);
  background: linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%);
}

.home-button:active {
  transform: translateY(0);
}

.home-button svg {
  transition: transform 0.3s ease;
}

.home-button:hover svg {
  transform: scale(1.1);
}

/* Responsive Design */
@media (max-width: 768px) {
  .success-container {
    padding: 1.5rem;
    min-height: 70vh;
  }

  .success-card {
    padding: 2.5rem 2rem;
  }

  .success-title {
    font-size: 1.75rem;
  }

  .success-message {
    font-size: 1.05rem;
    margin-bottom: 1.75rem;
  }

  .home-button {
    padding: 0.8rem 1.75rem;
    font-size: 1.05rem;
  }
}

@media (max-width: 600px) {
  .success-container {
    padding: 1rem;
    min-height: 60vh;
  }

  .success-card {
    padding: 2rem 1.25rem;
    border-radius: 16px;
  }

  .success-title {
    font-size: 1.5rem;
    line-height: 1.3;
  }

  .success-message {
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: 1.5rem;
  }

  .success-icon {
    width: 70px;
    height: 70px;
    margin-bottom: 1.25rem;
  }

  .success-icon svg {
    width: 40px;
    height: 40px;
  }

  .home-button {
    width: 100%;
    justify-content: center;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
}

@media (max-width: 375px) {
  .success-card {
    padding: 1.75rem 1rem;
  }

  .success-title {
    font-size: 1.35rem;
  }

  .success-message {
    font-size: 0.95rem;
  }

  .success-icon {
    width: 60px;
    height: 60px;
  }

  .success-icon svg {
    width: 35px;
    height: 35px;
  }

  .home-button {
    padding: 0.7rem 1.25rem;
    font-size: 0.95rem;
  }
}
</style>

