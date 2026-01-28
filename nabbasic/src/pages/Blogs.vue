<template>
    <div v-if="blogs && blogs.length" class="container">
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
