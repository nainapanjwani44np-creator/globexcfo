<template>
  <div class="blackground">
    <div class="homepage">
      <!-- HERO SECTION -->
      <section class="hero box">
        <h1>Get In Touch</h1>
        <p class="subheading">
          We welcome the opportunity to discuss how our financial expertise can support your business objectives. Please complete the form below, and our team will respond to your inquiry within 24 hours.
        </p>
      </section>

      <!-- FORM CONTAINER -->
      <div class="form-container">

        <h2 class="section-heading">Your Details</h2>

        <!-- Validation Error Banner -->
        <div v-if="showValidationError" class="validation-banner">
          <div class="banner-icon">⚠</div>
          <div class="banner-content">
            <h3 class="banner-title">Required Information Missing</h3>
            <p class="banner-text">Please review and complete the highlighted fields below to proceed with your submission.</p>
          </div>
        </div>

        <!-- Name Field -->
        <div class="form-group">
          <label>Name: <span class="required">*</span></label>
      <input 
        v-model="name" 
        type="text" 
        class="input" 
        :class="{ 'input-error': errors.name }"
        @blur="validateName"
      />
          <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
        </div>

        <!-- Company Name Field -->
        <div class="form-group">
          <label>Company Name:</label>
          <input v-model="companyName" type="text" class="input" />
        </div>

        <!-- Email Field -->
        <div class="form-group">
          <label>Email: <span class="required">*</span></label>
      <input 
        v-model="email" 
        type="email" 
        class="input"
        :class="{ 'input-error': errors.email }"
        @blur="validateEmail"
        placeholder="example@domain.com"
      />
          <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
        </div>

        <!-- Contact Number Field -->
        <div class="form-group">
          <label>Contact Number: <span class="required">*</span></label>
      <input 
        v-model="contactNumber" 
        type="text" 
        class="input"
        :class="{ 'input-error': errors.contactNumber }"
        @blur="validateContactNumber"
        @input="formatPhoneNumber"
        placeholder="+1234567890 or +911234567890"
      />
          <span v-if="errors.contactNumber" class="error-message">{{ errors.contactNumber }}</span>
          <span class="hint-text">Format: +[country code][number] (e.g., +1234567890)</span>
        </div>

        <!-- Service Options -->
        <div class="form-group services-section">
          <h2 class="section-heading">Services You're Interested In</h2>

          <div class="service-item">
            <input type="checkbox" id="service1" value="Virtual CFO Services" v-model="selectedOptions" />
            <label for="service1"><span class="checkbox-custom"></span>Virtual CFO Services</label>
          </div>
          <div class="service-item">
            <input type="checkbox" id="service2" value="Accounting & Bookkeeping" v-model="selectedOptions" />
            <label for="service2"><span class="checkbox-custom"></span>Accounting & Bookkeeping</label>
          </div>
          <div class="service-item">
            <input type="checkbox" id="service3" value="Budgeting, Forecasting & Reporting" v-model="selectedOptions" />
            <label for="service3"><span class="checkbox-custom"></span>Budgeting, Forecasting & Reporting</label>
          </div>
          <div class="service-item">
            <input type="checkbox" id="service4" value="Cash Flow & Working Capital Management" v-model="selectedOptions" />
            <label for="service4"><span class="checkbox-custom"></span>Cash Flow & Working Capital Management</label>
          </div>
          <div class="service-item">
            <input type="checkbox" id="service5" value="Financial Modelling & Valuation" v-model="selectedOptions" />
            <label for="service5"><span class="checkbox-custom"></span>Financial Modelling & Valuation</label>
          </div>
          <div class="service-item">
            <input type="checkbox" id="service6" value="Tax, Audit & Regulatory Compliance" v-model="selectedOptions" />
            <label for="service6"><span class="checkbox-custom"></span>Tax, Audit & Regulatory Compliance</label>
          </div>
          <div class="service-item">
            <input type="checkbox" id="service7" value="Company & LLP Formation Services" v-model="selectedOptions" />
            <label for="service7"><span class="checkbox-custom"></span>Company & LLP Formation Services</label>
          </div>
          <div class="service-item">
            <input type="checkbox" id="service8" value="SOPs, Internal Controls & Process Improvement" v-model="selectedOptions" />
            <label for="service8"><span class="checkbox-custom"></span>SOPs, Internal Controls & Process Improvement</label>
          </div>
        </div>

        <!-- Message Field -->
        <div class="form-group">
          <label>Message: <span class="char-count">{{ messageCharCount }}/500</span></label>
      <textarea 
        v-model="userMessage" 
        placeholder="Please describe your inquiry or requirements (maximum 500 characters)"
        :class="{ 'input-error': errors.userMessage }"
        @input="validateMessage"
        maxlength="500"
      ></textarea>
          <span v-if="errors.userMessage" class="error-message">{{ errors.userMessage }}</span>
        </div>

        <!-- Submit Button -->
        <button 
          @click="submit" 
          class="submit-btn"
          :disabled="isSubmitting"
        >
          <span v-if="!isSubmitting">Submit Inquiry</span>
          <span v-else class="submitting-text">
            <span class="spinner"></span>
            Processing...
          </span>
        </button>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

// Form Fields
const name = ref("");
const companyName = ref("");
const email = ref("");
const contactNumber = ref("");
const userMessage = ref("");
const selectedOptions = ref([]);

// Error Messages
const errors = ref({
  name: "",
  email: "",
  contactNumber: "",
  userMessage: ""
});

// Character count for message
const messageCharCount = computed(() => userMessage.value.length);

// Validation Functions

// Validate Name
const validateName = () => {
  if (!name.value.trim()) {
    errors.value.name = "Please enter your full name";
    return false;
  }
  errors.value.name = "";
  return true;
};

// Validate Email - Must contain @
const validateEmail = () => {
  if (!email.value.trim()) {
    errors.value.email = "Please provide a valid email address";
    return false;
  }
  
  // Check if email contains @
  if (!email.value.includes('@')) {
    errors.value.email = "Email address must contain '@' symbol (e.g., name@example.com)";
    return false;
  }
  
  // Additional email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    errors.value.email = "Please enter a valid email format (e.g., john@company.com)";
    return false;
  }
  
  errors.value.email = "";
  return true;
};

// Validate Contact Number - Only numbers and + allowed
const validateContactNumber = () => {
  if (!contactNumber.value.trim()) {
    errors.value.contactNumber = "Please provide a contact number";
    return false;
  }
  
  // Check if it contains only numbers and +
  const phoneRegex = /^[+]?[0-9]+$/;
  if (!phoneRegex.test(contactNumber.value)) {
    errors.value.contactNumber = "Contact number should contain only digits and '+' symbol (e.g., +911234567890)";
    return false;
  }
  
  // Check if it starts with + (international format)
  if (!contactNumber.value.startsWith('+')) {
    errors.value.contactNumber = "Please include country code with '+' prefix (e.g., +91 for India)";
    return false;
  }
  
  // Check length (international phone numbers: 7-15 digits after +)
  const digitsOnly = contactNumber.value.replace('+', '');
  if (digitsOnly.length < 7 || digitsOnly.length > 15) {
    errors.value.contactNumber = "Contact number must be between 7-15 digits including country code";
    return false;
  }
  
  errors.value.contactNumber = "";
  return true;
};

// Format phone number as user types
const formatPhoneNumber = (event) => {
  let value = contactNumber.value;
  // Remove any characters that are not + or digits
  value = value.replace(/[^+0-9]/g, '');
  
  // Ensure only one + at the beginning
  if (value.indexOf('+') > 0) {
    value = value.replace(/\+/g, '');
    value = '+' + value;
  }
  
  contactNumber.value = value;
};

// Validate Message - Max 500 characters
const validateMessage = () => {
  if (userMessage.value.length > 500) {
    const excess = userMessage.value.length - 500;
    errors.value.userMessage = `Message exceeds maximum length by ${excess} character${excess > 1 ? 's' : ''} (500 character limit)`;
    return false;
  }
  errors.value.userMessage = "";
  return true;
};

// Validate entire form
const validateForm = () => {
  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isContactValid = validateContactNumber();
  const isMessageValid = validateMessage();
  
  return isNameValid && isEmailValid && isContactValid && isMessageValid;
};

// Send data to backend
async function sendData(data) {
  console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #3b82f6');
  console.log('%c📤 SENDING DATA TO BACKEND', 'color: #3b82f6; font-weight: bold; font-size: 14px');
  console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #3b82f6');
  console.log('📍 File: Query.vue:~276 (sendData function)');
  console.log('⏰ Time:', new Date().toISOString());
  console.log('🌐 Environment:', import.meta.env.MODE);
  
  console.log('\n📡 API REQUEST DETAILS:');
  console.log('   Method: POST');
  console.log('   Endpoint: /api/query');
  console.log('   Content-Type: application/json');
  console.log('   Base URL:', window.location.origin);
  console.log('   Full URL:', window.location.origin + '/api/query');
  
  console.log('\n📋 REQUEST PAYLOAD:');
  console.table(data);
  console.log('   Raw JSON:', JSON.stringify(data, null, 2));
  
  try {
    console.log('\n⏳ Sending request...');
    const startTime = performance.now();
    
    const response = await axios.post('/api/query', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const endTime = performance.now();
    const duration = (endTime - startTime).toFixed(2);
    
    console.log('\n✅ RESPONSE RECEIVED');
    console.log('   Status Code:', response.status);
    console.log('   Status Text:', response.statusText);
    console.log('   Response Time:', duration + 'ms');
    console.log('\n📦 RESPONSE DATA:');
    console.table(response.data);
    console.log('   Raw Response:', JSON.stringify(response.data, null, 2));
    
    if (response.data.environment) {
      console.log('\n💾 DATABASE INFO:');
      console.log('   Environment:', response.data.environment);
      console.log('   Database:', response.data.database || 'N/A');
      console.log('   Collection:', response.data.collection || 'N/A');
      console.log('   Inserted ID:', response.data.insertedId || 'N/A');
    }
    
    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #10b981');
    console.log('%c✅ DATA SENT SUCCESSFULLY', 'color: #10b981; font-weight: bold; font-size: 14px');
    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #10b981');
    console.log('\n');
    
    return response.data;
  } catch (error) {
    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #ef4444');
    console.log('%c❌ ERROR OCCURRED', 'color: #ef4444; font-weight: bold; font-size: 14px');
    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #ef4444');
    console.log('📍 File: Query.vue:~320 (catch block)');
    console.log('⏰ Error Time:', new Date().toISOString());
    
    console.error('\n❌ ERROR DETAILS:');
    console.error('   Error Message:', error.message);
    console.error('   Error Name:', error.name);
    
    if (error.response) {
      console.error('\n📡 SERVER RESPONSE:');
      console.error('   Status Code:', error.response.status);
      console.error('   Status Text:', error.response.statusText);
      console.error('   Response Data:', error.response.data);
      console.error('   Response Headers:', error.response.headers);
    } else if (error.request) {
      console.error('\n📡 REQUEST INFO:');
      console.error('   No response received from server');
      console.error('   Request:', error.request);
    } else {
      console.error('\n⚠️  REQUEST SETUP ERROR:');
      console.error('   ', error.message);
    }
    
    console.error('\n📋 DATA THAT FAILED TO SEND:');
    console.table(data);
    
    console.error('\n🔍 TROUBLESHOOTING:');
    if (error.response?.status === 500) {
      console.error('   - Server error occurred');
      console.error('   - Check server logs in terminal');
      console.error('   - Verify MongoDB connection');
    } else if (error.response?.status === 404) {
      console.error('   - API endpoint not found');
      console.error('   - Verify backend server is running');
    } else if (!error.response) {
      console.error('   - Cannot reach server');
      console.error('   - Check if backend is running on port 3000');
      console.error('   - Check network connection');
    }
    
    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #ef4444');
    console.log('\n');
    
    throw error;
  }
}

// Form submission state
const isSubmitting = ref(false);
const showValidationError = ref(false);

// Submit Form
const submit = async () => {
  console.clear(); // Clear previous logs for clarity
  console.log('%c╔════════════════════════════════════════════════════════════════════╗', 'color: #8b5cf6; font-weight: bold');
  console.log('%c║             FORM SUBMISSION STARTED - Query.vue                   ║', 'color: #8b5cf6; font-weight: bold');
  console.log('%c╚════════════════════════════════════════════════════════════════════╝', 'color: #8b5cf6; font-weight: bold');
  console.log('📍 File: Query.vue:~293 (submit function)');
  console.log('⏰ Submission Time:', new Date().toISOString());
  console.log('🌐 Page URL:', window.location.href);
  console.log('🖥️  User Agent:', navigator.userAgent.substring(0, 80) + '...');
  
  console.log('\n📝 FORM DATA COLLECTED:');
  console.log('   Name:', name.value || '(empty)');
  console.log('   Company:', companyName.value || '(empty)');
  console.log('   Email:', email.value || '(empty)');
  console.log('   Contact Number:', contactNumber.value || '(empty)');
  console.log('   Services Selected:', selectedOptions.value.length, 'items');
  if (selectedOptions.value.length > 0) {
    selectedOptions.value.forEach((service, idx) => {
      console.log(`      ${idx + 1}. ${service}`);
    });
  } else {
    console.log('      (none selected)');
  }
  console.log('   Message Length:', userMessage.value.length, 'characters');
  console.log('   Message:', userMessage.value ? userMessage.value.substring(0, 100) + (userMessage.value.length > 100 ? '...' : '') : '(empty)');
  
  // Validate all fields before submission
  console.log('\n🔍 STEP 1: Validating Form...');
  if (!validateForm()) {
    console.log('%c⚠️  VALIDATION FAILED', 'color: #f59e0b; font-weight: bold; font-size: 13px');
    console.log('❌ Form validation errors detected:');
    if (errors.value.name) console.log('   - Name:', errors.value.name);
    if (errors.value.email) console.log('   - Email:', errors.value.email);
    if (errors.value.contactNumber) console.log('   - Contact:', errors.value.contactNumber);
    if (errors.value.userMessage) console.log('   - Message:', errors.value.userMessage);
    
    showValidationError.value = true;
    // Auto-hide after 5 seconds
    setTimeout(() => {
      showValidationError.value = false;
    }, 5000);
    
    // Scroll to first error
    const firstError = document.querySelector('.input-error');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstError.focus();
    }
    
    console.log('⏸️  Submission stopped due to validation errors\n');
    return;
  }
  
  console.log('✅ All fields validated successfully');
  
  try {
    console.log('\n🔄 STEP 2: Preparing Submission...');
    isSubmitting.value = true;
    showValidationError.value = false;
    console.log('   Submit button disabled');
    console.log('   Loading state activated');
    
    let formData = {
      name: name.value,
      companyName: companyName.value,
      email: email.value,
      contactNumber: contactNumber.value,
      selectedOptions: selectedOptions.value,
      userMessage: userMessage.value
    };
    
    console.log('\n📦 FORM DATA OBJECT CREATED:');
    console.log('   Object keys:', Object.keys(formData).join(', '));
    console.log('   Total fields:', Object.keys(formData).length);
    console.log('\n   Complete FormData:');
    console.table(formData);
    
    console.log('\n🚀 STEP 3: Sending to Backend...');
    const result = await sendData(formData);
    
    console.log('\n✅ STEP 4: Backend Response Successful');
    console.log('   Response:', result);
    
    console.log('\n🔀 STEP 5: Redirecting to Success Page...');
    console.log('   Target: /Success');
    console.log('%c╔════════════════════════════════════════════════════════════════════╗', 'color: #10b981; font-weight: bold');
    console.log('%c║                  FORM SUBMITTED SUCCESSFULLY! ✓                    ║', 'color: #10b981; font-weight: bold');
    console.log('%c╚════════════════════════════════════════════════════════════════════╝', 'color: #10b981; font-weight: bold');
    console.log('\n');
    
    router.push('/Success');
  } catch (error) {
    isSubmitting.value = false;
    console.log('\n❌ STEP 4: Backend Request Failed');
    console.error('%c╔════════════════════════════════════════════════════════════════════╗', 'color: #ef4444; font-weight: bold');
    console.error('%c║                    SUBMISSION FAILED                               ║', 'color: #ef4444; font-weight: bold');
    console.error('%c╚════════════════════════════════════════════════════════════════════╝', 'color: #ef4444; font-weight: bold');
    console.error('📍 Error Location: Query.vue:~370 (submit catch block)');
    console.error('🚫 Submission Error:', error.message);
    console.error('   Full Error Object:', error);
    
    console.log('\n🔀 Redirecting to Error Page...');
    console.log('   Target: /Error');
    console.log('\n');
    
    router.push('/Error');
  }
};

</script>

<style scoped>
.homepage {
  font-family: "Inter", sans-serif;
  max-width: 1200px;
  margin: auto;
  padding: 40px;
  background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%);
  min-height: 100vh;
  line-height: 1.7;
  color: #1e293b;
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

.hero > * {
  position: relative;
  z-index: 1;
}

.hero h1 {
  font-family: 'Poppins', sans-serif;
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1rem;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 10px rgba(59, 130, 246, 0.3);
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero .subheading {
  font-family: 'Inter', sans-serif;
  font-size: 1.15rem;
  font-weight: 500;
  margin-bottom: 0;
  line-height: 1.7;
  color: #334155;
}

/* Form Container */
.form-container {
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  border-left: 3px solid #3b82f6;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(59, 130, 246, 0.2);
  position: relative;
  overflow: hidden;
}

.form-container::after {
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

.form-container > * {
  position: relative;
  z-index: 1;
}

/* Section Heading */
.section-heading {
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e40af;
  margin-bottom: 25px;
  padding-left: 20px;
  position: relative;
}

.section-heading::before {
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

/* Form Group */
.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
}

/* Input Fields */
.input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid rgba(59, 130, 246, 0.3);
  border-radius: 8px;
  background: rgba(191, 219, 254, 0.4);
  font-size: 1rem;
  font-family: 'Inter', sans-serif;
  color: #1e293b;
  transition: all 0.3s ease;
  outline: none;
}

.input:focus {
  border-color: #3b82f6;
  background: rgba(219, 234, 254, 0.6);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input::placeholder {
  color: #64748b;
}

/* Textarea */
textarea {
  width: 100%;
  min-height: 120px;
  padding: 12px 16px;
  border: 2px solid rgba(59, 130, 246, 0.3);
  border-radius: 8px;
  background: rgba(191, 219, 254, 0.4);
  font-size: 1rem;
  font-family: 'Inter', sans-serif;
  color: #1e293b;
  transition: all 0.3s ease;
  outline: none;
  resize: vertical;
}

textarea:focus {
  border-color: #3b82f6;
  background: rgba(219, 234, 254, 0.6);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

textarea::placeholder {
  color: #64748b;
}

/* Services Section */
.services-section {
  margin-top: 35px;
  margin-bottom: 35px;
}

/* Service Items (Checkboxes) */
.service-item {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.service-item input[type="checkbox"] {
  display: none;
}

.service-item label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 1rem;
  color: #334155;
  font-weight: 500;
  transition: color 0.2s ease;
  margin-bottom: 0;
}

.service-item label:hover {
  color: #1e40af;
}

.checkbox-custom {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(59, 130, 246, 0.5);
  border-radius: 4px;
  margin-right: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(191, 219, 254, 0.3);
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.service-item input[type="checkbox"]:checked + label .checkbox-custom {
  background: linear-gradient(135deg, #3b82f6, #60a5fa);
  border-color: #3b82f6;
}

.service-item input[type="checkbox"]:checked + label .checkbox-custom::after {
  content: '✓';
  color: white;
  font-size: 14px;
  font-weight: bold;
}

button.bg-blue-600 {
  width: 100%;
  font-weight: 600;
  font-size: 1.1rem;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.08);
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
  margin-top: 1.2rem;
}

button.bg-blue-600:hover {
  background: linear-gradient(90deg, #60a5fa 0%, #6366f1 100%);
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.15);
}

input[type="checkbox"] {
  accent-color: #6366f1;
  width: 1.1em;
  height: 1.1em;
  margin-right: 0.5em;
}

.space-y-1 > div {
  display: flex;
  align-items: center;
  background: #f3f4f6;
  padding: 0.4rem 0.7rem;
  border-radius: 6px;
  transition: background 0.2s;
}

.space-y-1 > div:hover {
  background: #e0e7ff;
}

/* Validation Styles */
/* Required Field Indicator */
.required {
  color: #ef4444;
  font-weight: bold;
  margin-left: 4px;
}

/* Input Error State */
.input-error {
  border-color: #ef4444 !important;
  background: rgba(254, 226, 226, 0.3) !important;
}

/* Error Message */
.error-message {
  display: block;
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 6px;
  margin-bottom: 4px;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
}

/* Hint Text */
.hint-text {
  display: block;
  color: #64748b;
  font-size: 0.825rem;
  margin-top: 0.25rem;
  font-style: italic;
}

/* Character Count */
.char-count {
  float: right;
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
}

textarea.input-error {
  border-color: #ef4444 !important;
  background: #fef2f2 !important;
}

label {
  display: block;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.25rem;
  font-size: 0.95rem;
}

/* Success state for valid inputs */
input:valid:not(:placeholder-shown),
textarea:valid:not(:placeholder-shown) {
  border-color: #10b981;
}

/* Disabled button state when form is invalid */
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Validation Banner Styles */
/* Validation Banner */
.validation-banner {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border: 2px solid #f59e0b;
  border-left: 4px solid #f59e0b;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);
  animation: slideDown 0.4s ease-out;
  margin-bottom: 25px;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.banner-icon {
  font-size: 2rem;
  line-height: 1;
  flex-shrink: 0;
}

.banner-content {
  flex: 1;
}

.banner-title {
  font-family: 'Poppins', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: #92400e;
  margin: 0 0 0.5rem 0;
}

.banner-text {
  font-size: 0.95rem;
  font-family: 'Inter', sans-serif;
  color: #78350f;
  margin: 0;
  line-height: 1.5;
}

/* Submit Button Enhanced */
/* Submit Button */
.submit-btn {
  width: 100%;
  padding: 14px 32px;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #3b82f6, #60a5fa);
  border: 2px solid #3b82f6;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
  position: relative;
  overflow: hidden;
}

.submit-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  border-color: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(59, 130, 246, 0.5);
}

.submit-btn:active:not(:disabled) {
  transform: translateY(0);
}

.submit-btn:disabled {
  background: linear-gradient(135deg, #93c5fd, #bfdbfe);
  border-color: #93c5fd;
  cursor: not-allowed;
  opacity: 0.7;
}

.submitting-text {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

/* Spinner Animation */
.spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Smooth focus on error fields */
.input-error:focus,
textarea.input-error:focus {
  border-color: #f87171 !important;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

/* Responsive Banner */
/* Responsive Styles */
@media (max-width: 768px) {
  .homepage {
    padding: 25px;
  }

  .box {
    padding: 25px;
  }

  .form-container {
    padding: 25px;
  }

  .hero h1 {
    font-size: 2rem;
  }

  .hero .subheading {
    font-size: 1rem;
  }

  .section-heading {
    font-size: 1.3rem;
  }
}

@media (max-width: 480px) {
  .homepage {
    padding: 20px;
  }

  .box {
    padding: 20px;
  }

  .form-container {
    padding: 20px;
  }

  .hero h1 {
    font-size: 1.75rem;
  }

  .validation-banner {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.75rem;
  }
  
  .banner-icon {
    font-size: 2.5rem;
  }

  .submit-btn {
    font-size: 0.9rem;
    padding: 12px 24px;
  }
}
</style>