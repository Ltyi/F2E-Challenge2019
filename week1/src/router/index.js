import { createRouter, createWebHashHistory } from 'vue-router'

// import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home')
  },
  {
    path: '/analytics',
    name: 'Analytics',
    component: () => import('../views/Analytics')
  },
  {
    path: '/mission',
    name: 'Mission',
    component: () =>
      import(/* webpackMode: "lazy", webpackChunkName: "Mission" */ '../views/Mission')
  },
  {
    path: '/rington',
    name: 'Rington',
    component: () => import('../views/Rington')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
