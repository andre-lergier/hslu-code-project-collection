import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import store from '@/store';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Signup from '../views/Signup.vue';
import NewProject from '../views/NewProject.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/new-project',
    name: 'New Project',
    component: NewProject,
    meta: {
      auth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => (to.meta.auth && !store.state.token ? next('/login') : next()));

export default router;
