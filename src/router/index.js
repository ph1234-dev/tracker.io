import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import DailySummaryView from "@/views/DailySummaryView.vue"
import DailyRecordView from "@/views/DailyRecordView.vue"
import StoreView from "@/views/StoreView.vue"
import NotFound from "@/views/NotFound.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'login',
    //   component: LoginView
    // },
    {
      path: '/',
      name: 'tracker',
      component: HomeView,
    },
    {
      path: '/tracker/:date',
      name: 'daily_summary',
      component: DailySummaryView,
    },
    {
      path: '/store',
      name: 'store_food',
      component: StoreView
    },
    {
      path: '/record',
      name: 'daily_actual_record',
      component: DailyRecordView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: "/:catchAll(.*)",
      component: NotFound
    }
  ]
})

export default router
