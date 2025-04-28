import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CreditsView from '@/views/CreditsView.vue'
// import UsersPage from '@/pages/UsersPage.vue'
// import UsersView from '@/components/UsersView.vue'

const _routes = [
  { 
    path: '/', 
    name: 'Home', 
    component: HomeView 
  },
  { 
    path: '/credits', 
    name: 'Credits', 
    component: CreditsView
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