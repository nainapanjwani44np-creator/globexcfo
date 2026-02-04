import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import Services from '../pages/Services.vue'
import Query from '../pages/Query.vue'
import Blogs from '../pages/Blogs.vue'
import Success from '../pages/Success.vue'
import Error from '../pages/Error.vue'
const routes = [
  { path:'/',component:Home},
  { path: '/Home', component: Home },
  { path: '/About', component: About },
  { path: '/Services', component: Services},
  { path: '/Query', component: Query},
  { path: '/Blogs', component: Blogs},
  { path: '/Success', component: Success},
  { path: '/Error', component: Error}
]

export default createRouter({
  history: createWebHistory(),
  routes
})
