import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login'
import signup from '../components/signup'
import user_signup from '../components/user_signup'
import users from '../components/users'
import reportees from '../components/reportees'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/signup',
    name: 'signup',
    component: signup
  },
  {
    path: '/user_signup',
    name: 'user_signup',
    component: user_signup
  },
  {
    path: '/users',
    name: 'users',
    component: users
  },
  {
    path: '/reportees/:userId',
    name: 'reportees',
    component: reportees,
    props: true
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
