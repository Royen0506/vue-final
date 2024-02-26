import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'UserView',
    component: () => import('../views/FrontView/UserView.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('../views/FrontView/HomeView.vue')
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('../views/FrontView/AboutView.vue')
      }
    ]
  },

  {
    path: '/dashboard',
    component: () => import('../views/Dashboard/AdminView.vue'),
    children: [
      {
        path: 'products',
        name: 'AdminProducts',
        component: () => import('../views/Dashboard/AdminProducts.vue')
      },
      {
        path: 'orders',
        name: 'AdminOrders',
        component: () => import('../views/Dashboard/AdminOrders.vue')
      },
      {
        path: 'coupons',
        name: 'AdminCoupons',
        component: () => import('../views/Dashboard/AdminCoupons.vue')
      },
      {
        path: 'news',
        name: 'AdminNews',
        component: () => import('../views/Dashboard/AdminNews.vue')
      }
    ]
  },

  {
    path: '/AdminLogin',
    name: 'AdminLogin',
    component: () => import('../views/Dashboard/AdminLogin.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  routes
})

export default router
