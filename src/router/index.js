import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Home from '../views/Home.vue'
import Events from '../views/Events.vue'
import EventDetails from '../views/EventDetails.vue'
import Booking from '../views/Booking.vue'
import Profile from '../views/Profile.vue'
import History from '../views/History.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/home', component: Home, meta: { auth: true } },
  { path: '/events', component: Events, meta: { auth: true } },
  { path: '/events/:id', component: EventDetails, meta: { auth: true } },
  { path: '/booking/:id', component: Booking, meta: { auth: true } },
  { path: '/profile', component: Profile, meta: { auth: true } },
  { path: '/history', component: History, meta: { auth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const user = localStorage.getItem('eventUser')

  if (to.meta.auth && !user) return '/login'
  if (['/login', '/register'].includes(to.path) && user) {
    return '/home'
  }
})

export default router
