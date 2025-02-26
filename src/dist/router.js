import { createRouter, createWebHistory, RouteRecordRaw } from 'https://unpkg.com/vue-router@4';
import Home from './Home.vue';
import About from './About.vue';

const routes = [
  {
    path: '/',
    name: 'Home - Seja bem-vindo',
    component: Home,
  },
  {
    // usar esse padrão para sub-paginas
    // gera lazy load, é mais performático
    path: '/about',
    name: 'about',
    component: About,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;