import { createRouter, createWebHistory } from 'vue-router';
import Register from '../pages/Register.vue';
import Login from '../pages/Login.vue';
import Dashboard from '../pages/Dashboard.vue';

const routes = [
  {
    path: '/',
    redirect: '/login', // Redirect root path to login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
