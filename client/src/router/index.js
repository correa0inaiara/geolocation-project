import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
// import UsersPage from '@/pages/UsersPage.vue'
// import UsersView from '@/components/UsersView.vue'

const _routes = [
  { 
    path: '/', 
    name: 'home', 
    component: HomeView 
  },
  // { 
  //   path: '/users', 
  //   name: 'users', 
  //   component: UsersPage 
  // },
  // { 
  //   path: '/users/:id', 
  //   name: 'userId', 
  //   component: UsersView,
  //   props: true 
  // },
  // { 
  //   path: '/users/:id', 
  //   name: 'userId', 
  //   component: UsersView,
  //   props: true 
  // },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: _routes,
})

export default router