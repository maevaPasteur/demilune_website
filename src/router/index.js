import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About'
import Login from '../views/Login'
import Admin from '../views/Admin'

Vue.use(VueRouter);

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/connexion',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
