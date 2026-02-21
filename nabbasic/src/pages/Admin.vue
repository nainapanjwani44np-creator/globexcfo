<template>
  <!-- Login Form -->
  <div v-if="!isAuthenticated" class="login-container">
    <div class="login-card">
      <div class="login-header">
        <svg xmlns="http://www.w3.org/2000/svg" class="login-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
        <h1>Admin Login</h1>
        <p>Enter your credentials to access the dashboard</p>
      </div>
      
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="username">Username</label>
          <input 
            v-model="loginForm.username" 
            type="text" 
            id="username" 
            placeholder="Enter username"
            required
            :disabled="loggingIn"
          />
        </div>
        
        <div class="form-group">
          <label for="password">Password</label>
          <input 
            v-model="loginForm.password" 
            type="password" 
            id="password" 
            placeholder="Enter password"
            required
            :disabled="loggingIn"
          />
        </div>
        
        <div v-if="loginError" class="error-message">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          {{ loginError }}
        </div>
        
        <button type="submit" class="login-button" :disabled="loggingIn">
          <span v-if="!loggingIn">Login</span>
          <span v-else class="login-spinner">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="spinning">
              <polyline points="23 4 23 10 17 10"></polyline>
              <polyline points="1 20 1 14 7 14"></polyline>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
            </svg>
            Logging in...
          </span>
        </button>
      </form>
    </div>
  </div>

  <!-- Admin Dashboard (only shown when authenticated) -->
  <div v-else class="admin-container">
    <!-- Header -->
    <div class="admin-header">
      <div class="header-content">
        <div class="header-left">
          <svg xmlns="http://www.w3.org/2000/svg" class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="3" y1="9" x2="21" y2="9"></line>
            <line x1="9" y1="21" x2="9" y2="9"></line>
          </svg>
          <div>
            <h1 class="header-title">Admin Dashboard</h1>
            <p class="header-subtitle">Form Submissions Management</p>
          </div>
        </div>
        <div class="header-actions">
          <button @click="fetchSubmissions" class="refresh-button" :disabled="loading">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="{ 'spinning': loading }">
              <polyline points="23 4 23 10 17 10"></polyline>
              <polyline points="1 20 1 14 7 14"></polyline>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
            </svg>
            {{ loading ? 'Loading...' : 'Refresh' }}
          </button>
          <button @click="handleLogout" class="logout-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Logout
          </button>
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="stats-container">
      <div class="stat-card">
        <div class="stat-icon blue">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="8.5" cy="7" r="4"></circle>
            <polyline points="17 11 19 13 23 9"></polyline>
          </svg>
        </div>
        <div class="stat-content">
          <p class="stat-label">Total Submissions</p>
          <p class="stat-value">{{ submissions.length }}</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon green">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
          </svg>
        </div>
        <div class="stat-content">
          <p class="stat-label">Today</p>
          <p class="stat-value">{{ todayCount }}</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon orange">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </div>
        <div class="stat-content">
          <p class="stat-label">This Week</p>
          <p class="stat-value">{{ weekCount }}</p>
        </div>
      </div>
    </div>

    <!-- Search and Filters -->
    <div class="controls-container">
      <div class="search-box">
        <svg xmlns="http://www.w3.org/2000/svg" class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search by name, email, company..." 
          class="search-input"
        />
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <div class="loader"></div>
      <p>Loading submissions...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-container">
      <svg xmlns="http://www.w3.org/2000/svg" class="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <h3>Failed to load submissions</h3>
      <p>{{ error }}</p>
      <button @click="fetchSubmissions" class="retry-button">Try Again</button>
    </div>

    <!-- Data Table -->
    <div v-else-if="filteredSubmissions.length > 0" class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Company</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Services</th>
            <th>Message</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(submission, index) in filteredSubmissions" :key="submission._id">
            <td class="index-cell">{{ index + 1 }}</td>
            <td class="name-cell">{{ submission.name }}</td>
            <td>{{ submission.companyName || '-' }}</td>
            <td class="email-cell">
              <a :href="`mailto:${submission.email}`">{{ submission.email }}</a>
            </td>
            <td class="phone-cell">
              <a :href="`tel:${submission.contactNumber}`">{{ submission.contactNumber }}</a>
            </td>
            <td class="services-cell">
              <div class="services-badges">
                <span 
                  v-for="(service, idx) in submission.selectedOptions" 
                  :key="idx"
                  class="service-badge"
                >
                  {{ service }}
                </span>
              </div>
            </td>
            <td class="message-cell">
              <div class="message-preview" :title="submission.userMessage">
                {{ truncateMessage(submission.userMessage) }}
              </div>
            </td>
            <td class="date-cell">{{ formatDate(submission._id) }}</td>
            <td class="actions-cell">
              <button @click="viewDetails(submission)" class="action-button view">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Empty State -->
    <div v-else class="empty-container">
      <svg xmlns="http://www.w3.org/2000/svg" class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="8.5" cy="7" r="4"></circle>
        <line x1="18" y1="8" x2="23" y2="13"></line>
        <line x1="23" y1="8" x2="18" y2="13"></line>
      </svg>
      <h3>No submissions found</h3>
      <p v-if="searchQuery">Try adjusting your search criteria</p>
      <p v-else>No form submissions yet</p>
    </div>

    <!-- Detail Modal -->
    <div v-if="selectedSubmission" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>Submission Details</h2>
          <button @click="closeModal" class="close-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="modal-body">
          <div class="detail-group">
            <label>Name</label>
            <p>{{ selectedSubmission.name }}</p>
          </div>
          <div class="detail-group">
            <label>Company</label>
            <p>{{ selectedSubmission.companyName || '-' }}</p>
          </div>
          <div class="detail-group">
            <label>Email</label>
            <p><a :href="`mailto:${selectedSubmission.email}`">{{ selectedSubmission.email }}</a></p>
          </div>
          <div class="detail-group">
            <label>Phone</label>
            <p><a :href="`tel:${selectedSubmission.contactNumber}`">{{ selectedSubmission.contactNumber }}</a></p>
          </div>
          <div class="detail-group">
            <label>Services Requested</label>
            <div class="services-list">
              <span 
                v-for="(service, idx) in selectedSubmission.selectedOptions" 
                :key="idx"
                class="service-tag"
              >
                {{ service }}
              </span>
            </div>
          </div>
          <div class="detail-group">
            <label>Message</label>
            <p class="message-full">{{ selectedSubmission.userMessage }}</p>
          </div>
          <div class="detail-group">
            <label>Submitted At</label>
            <p>{{ formatDateFull(selectedSubmission._id) }}</p>
          </div>
          <div class="detail-group">
            <label>Submission ID</label>
            <p class="id-text">{{ selectedSubmission._id }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

// Authentication state
const isAuthenticated = ref(false);
const authToken = ref(null);
const loginForm = ref({
  username: '',
  password: ''
});
const loggingIn = ref(false);
const loginError = ref(null);

// Admin data
const submissions = ref([]);
const loading = ref(false);
const error = ref(null);
const searchQuery = ref('');
const selectedSubmission = ref(null);

// Check if already authenticated on mount
onMounted(() => {
  const savedToken = sessionStorage.getItem('adminToken');
  if (savedToken) {
    authToken.value = savedToken;
    isAuthenticated.value = true;
    fetchSubmissions();
  }
});

// Admin API base URL (can be configured via environment variable)
const ADMIN_API_BASE = import.meta.env.VITE_ADMIN_API_URL || window.location.origin;

// Login handler
const handleLogin = async () => {
  loggingIn.value = true;
  loginError.value = null;
  
  try {
    const response = await axios.post(`${ADMIN_API_BASE}/api/admin/login`, {
      username: loginForm.value.username,
      password: loginForm.value.password
    });
    
    if (response.data.status === 'success') {
      authToken.value = response.data.token;
      sessionStorage.setItem('adminToken', response.data.token);
      isAuthenticated.value = true;
      console.log('✅ Login successful');
      console.log('🔒 Using Admin API:', ADMIN_API_BASE);
      
      // Fetch submissions after successful login
      await fetchSubmissions();
    }
  } catch (err) {
    loginError.value = err.response?.data?.message || 'Login failed. Please try again.';
    console.error('❌ Login error:', err);
  } finally {
    loggingIn.value = false;
  }
};

// Logout handler
const handleLogout = () => {
  authToken.value = null;
  isAuthenticated.value = false;
  sessionStorage.removeItem('adminToken');
  submissions.value = [];
  loginForm.value = { username: '', password: '' };
  console.log('✅ Logged out');
};

// Fetch submissions from API (with authentication)
const fetchSubmissions = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    const response = await axios.get(`${ADMIN_API_BASE}/api/admin/submissions`, {
      headers: {
        'Authorization': `Bearer ${authToken.value}`
      }
    });
    submissions.value = response.data.data || [];
    console.log('✅ Loaded', submissions.value.length, 'submissions');
  } catch (err) {
    if (err.response?.status === 401) {
      // Unauthorized - token expired or invalid
      handleLogout();
      error.value = 'Session expired. Please login again.';
    } else {
      error.value = err.response?.data?.message || err.message || 'Failed to load submissions';
    }
    console.error('❌ Error loading submissions:', err);
  } finally {
    loading.value = false;
  }
};

// Computed properties
const filteredSubmissions = computed(() => {
  if (!searchQuery.value) return submissions.value;
  
  const query = searchQuery.value.toLowerCase();
  return submissions.value.filter(sub => 
    sub.name?.toLowerCase().includes(query) ||
    sub.email?.toLowerCase().includes(query) ||
    sub.companyName?.toLowerCase().includes(query) ||
    sub.contactNumber?.includes(query)
  );
});

const todayCount = computed(() => {
  const today = new Date().setHours(0, 0, 0, 0);
  return submissions.value.filter(sub => {
    const subDate = new Date(parseInt(sub._id.toString().substring(0, 8), 16) * 1000).setHours(0, 0, 0, 0);
    return subDate === today;
  }).length;
});

const weekCount = computed(() => {
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  weekAgo.setHours(0, 0, 0, 0);
  
  return submissions.value.filter(sub => {
    const subDate = new Date(parseInt(sub._id.toString().substring(0, 8), 16) * 1000);
    return subDate >= weekAgo;
  }).length;
});

// Helper functions
const formatDate = (objectId) => {
  const timestamp = parseInt(objectId.toString().substring(0, 8), 16) * 1000;
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const formatDateFull = (objectId) => {
  const timestamp = parseInt(objectId.toString().substring(0, 8), 16) * 1000;
  const date = new Date(timestamp);
  return date.toLocaleString('en-US', { 
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

const truncateMessage = (message) => {
  if (!message) return '-';
  return message.length > 50 ? message.substring(0, 50) + '...' : message;
};

const viewDetails = (submission) => {
  selectedSubmission.value = submission;
};

const closeModal = () => {
  selectedSubmission.value = null;
};
</script>

<style scoped>
/* Login Container */
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
}

.login-card {
  background: white;
  border-radius: 20px;
  padding: 3rem;
  max-width: 450px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.4s ease;
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-icon {
  width: 64px;
  height: 64px;
  color: #667eea;
  margin-bottom: 1rem;
}

.login-header h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
  font-family: 'Poppins', sans-serif;
}

.login-header p {
  color: #64748b;
  margin: 0;
  font-size: 0.95rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: #475569;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-group input {
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-group input:disabled {
  background: #f1f5f9;
  cursor: not-allowed;
}

.error-message {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: #fee2e2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  color: #dc2626;
  font-size: 0.875rem;
}

.error-message svg {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.login-button {
  padding: 0.875rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.login-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.login-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.login-spinner svg {
  width: 20px;
  height: 20px;
}

/* Container */
.admin-container {
  min-height: calc(100vh - 150px);
  background: #f8fafc;
  padding: 2rem;
}

/* Header */
.admin-header {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.header-icon {
  width: 48px;
  height: 48px;
  color: #3b82f6;
}

.header-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  font-family: 'Poppins', sans-serif;
}

.header-subtitle {
  font-size: 0.95rem;
  color: #64748b;
  margin: 0.25rem 0 0 0;
}

.header-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.refresh-button,
.logout-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
}

.refresh-button {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
}

.refresh-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.refresh-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.logout-button {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
}

.logout-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

.refresh-button svg,
.logout-button svg {
  width: 20px;
  height: 20px;
}

.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Stats Cards */
.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon.blue {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
}

.stat-icon.green {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.stat-icon.orange {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
}

.stat-icon svg {
  width: 28px;
  height: 28px;
  color: white;
}

.stat-content {
  flex: 1;
}

.stat-label {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0 0 0.25rem 0;
  font-weight: 500;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  font-family: 'Poppins', sans-serif;
}

/* Search and Controls */
.controls-container {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.search-box {
  position: relative;
  max-width: 500px;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: #94a3b8;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Loading */
.loading-container {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.loader {
  width: 48px;
  height: 48px;
  border: 4px solid #e2e8f0;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

/* Error */
.error-container {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.error-icon {
  width: 64px;
  height: 64px;
  color: #ef4444;
  margin-bottom: 1rem;
}

.error-container h3 {
  color: #1e293b;
  font-size: 1.5rem;
  margin: 0 0 0.5rem 0;
}

.error-container p {
  color: #64748b;
  margin: 0 0 2rem 0;
}

.retry-button {
  padding: 0.75rem 2rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.retry-button:hover {
  background: #2563eb;
  transform: translateY(-2px);
}

/* Table */
.table-container {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table thead {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
}

.data-table th {
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #475569;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid #e2e8f0;
}

.data-table td {
  padding: 1rem;
  border-bottom: 1px solid #f1f5f9;
  color: #334155;
  font-size: 0.9rem;
}

.data-table tbody tr {
  transition: background-color 0.2s ease;
}

.data-table tbody tr:hover {
  background-color: #f8fafc;
}

.index-cell {
  font-weight: 600;
  color: #64748b;
  width: 50px;
}

.name-cell {
  font-weight: 600;
  color: #1e293b;
}

.email-cell a,
.phone-cell a {
  color: #3b82f6;
  text-decoration: none;
}

.email-cell a:hover,
.phone-cell a:hover {
  text-decoration: underline;
}

.services-cell {
  max-width: 300px;
}

.services-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.service-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: #eff6ff;
  color: #3b82f6;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.message-cell {
  max-width: 250px;
}

.message-preview {
  color: #64748b;
  font-size: 0.875rem;
}

.date-cell {
  white-space: nowrap;
  color: #64748b;
  font-size: 0.875rem;
}

.actions-cell {
  width: 80px;
}

.action-button {
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #eff6ff;
  color: #3b82f6;
}

.action-button:hover {
  background: #3b82f6;
  color: white;
  transform: scale(1.1);
}

.action-button svg {
  width: 18px;
  height: 18px;
  display: block;
}

/* Empty State */
.empty-container {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.empty-icon {
  width: 64px;
  height: 64px;
  color: #cbd5e1;
  margin-bottom: 1rem;
}

.empty-container h3 {
  color: #1e293b;
  font-size: 1.5rem;
  margin: 0 0 0.5rem 0;
}

.empty-container p {
  color: #64748b;
  margin: 0;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
  animation: fadeIn 0.2s ease;
}

.modal-content {
  background: white;
  border-radius: 16px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e2e8f0;
}

.modal-header h2 {
  margin: 0;
  color: #1e293b;
  font-size: 1.5rem;
  font-family: 'Poppins', sans-serif;
}

.close-button {
  padding: 0.5rem;
  background: #f1f5f9;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.close-button:hover {
  background: #e2e8f0;
}

.close-button svg {
  width: 20px;
  height: 20px;
  color: #64748b;
  display: block;
}

.modal-body {
  padding: 2rem;
}

.detail-group {
  margin-bottom: 1.5rem;
}

.detail-group:last-child {
  margin-bottom: 0;
}

.detail-group label {
  display: block;
  font-weight: 600;
  color: #475569;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-group p {
  color: #1e293b;
  margin: 0;
  font-size: 1rem;
}

.detail-group a {
  color: #3b82f6;
  text-decoration: none;
}

.detail-group a:hover {
  text-decoration: underline;
}

.services-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.service-tag {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: #eff6ff;
  color: #3b82f6;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.875rem;
}

.message-full {
  white-space: pre-wrap;
  line-height: 1.6;
  color: #475569;
}

.id-text {
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  color: #64748b;
}

/* Responsive */
@media (max-width: 768px) {
  .admin-container {
    padding: 1rem;
  }

  .admin-header {
    padding: 1.5rem;
  }

  .header-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-left {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .header-icon {
    width: 40px;
    height: 40px;
  }

  .header-title {
    font-size: 1.5rem;
  }

  .header-actions {
    width: 100%;
    flex-direction: column;
  }

  .refresh-button,
  .logout-button {
    width: 100%;
    justify-content: center;
  }

  .stats-container {
    grid-template-columns: 1fr;
  }

  .table-container {
    overflow-x: auto;
  }

  .data-table {
    min-width: 900px;
  }

  .modal-overlay {
    padding: 1rem;
  }

  .modal-body {
    padding: 1.5rem;
  }
}
</style>
