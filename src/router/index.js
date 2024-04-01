// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { user } from '@/states/userState'
import { onAuthStateChanged, getAuth } from 'firebase/auth'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue')
  },
  {
    path: '/signIn',
    component: () => import('@/views/SignIn.vue'),
    meta: {
      redirectIfLoggedIn: true
    }
  },
  {
    path: '/dashboard',
    component: () => import('@/views/AtendeeDashboard.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/forbidden',
    component: () => import('@/views/PageForbidden.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/PageNotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener()
        resolve(user)
      },
      reject
    )
  })
}

router.beforeEach(async (to, from, next) => {
  // checks if the "to" route requires authentication

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // if a user is signedIn
    if (await getCurrentUser()) {
      next()
    } else {
      console.error('Gotta be logged in to access this. Sorry')
      next('/forbidden')
    }
  } else if (to.matched.some((record) => record.meta.redirectIfLoggedIn)) {
    if (await getCurrentUser()) {
      next('/dashboard')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
