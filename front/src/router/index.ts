import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/modules/layout/components/AppLayout.vue'
import { useAuthStore } from '@/stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/auth/login'
    },
    {
      path: '/admin',
      component: AppLayout,
      meta: { requiresAuth: true, requiresAdmin: true },
      children: [
        {
          path: '',
          name: 'admin',
          component: () => import('@/modules/admin/views/AdminPage.vue'),
        },
      ],
    },
    {
      path: '/user',
      component: AppLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'user',
          component: () => import('@/modules/user/views/UserPage.vue'),
        },
      ]
    },
    {
      path: '/auth/login',
      name: 'login',
      component: () => import('@/modules/auth/views/LoginPage.vue'),
    },
    {
      path: '/pages/error',
      name: 'error',
      component: () => import('@/modules/auth/views/ErrorPage.vue'),
    },
    {
      path: '/pages/not-found',
      name: 'not-found',
      component: () => import('@/modules/common/views/NotFound.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const needsAuth = to.meta.requiresAuth;
  const needsAdmin = to.meta.requiresAdmin;

  if (needsAuth && !authStore.isAuthenticated) {
    next('/auth/login');
  } else if (needsAdmin && !authStore.isAdmin) {
    next('/user');
  } else {
    next();
  }
});

export default router