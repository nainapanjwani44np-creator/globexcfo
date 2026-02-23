import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import Services from '../pages/Services.vue'
import Query from '../pages/Query.vue'
import Blogs from '../pages/Blogs.vue'
import Success from '../pages/Success.vue'
import Error from '../pages/Error.vue'
import ComingSoon from '../pages/ComingSoon.vue'
import Admin from '../pages/Admin.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/Home', component: Home },
  { path: '/About', component: About },
  { path: '/Services', component: Services },
  { path: '/Query', component: Query },
  { path: '/Blogs', component: Blogs },
  { path: '/Success', component: Success },
  { path: '/Error', component: Error },
  { path: '/ComingSoon', component: ComingSoon },

  // Internal access — path is not publicly documented
  { path: '/gx-s7dx3pxx', component: Admin },

  // Redirect old /Admin path to home so scanners get nothing
  { path: '/Admin', redirect: '/' },
  { path: '/admin', redirect: '/' },

  // 404 fallback
  { path: '/:pathMatch(.*)*', component: Error }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
