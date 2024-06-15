// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { user } from '@/states/userState'
import { onAuthStateChanged, getAuth } from 'firebase/auth'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    meta: {
      redirectToSignIn: true
    }
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
    path: '/admin',
    name: 'admin',
    component: () => import('@/layouts/admin/AdminLayout.vue'),
    meta: {
      filipAuth: true
    },
    children: [
      {
        path: '/admin/users',
        name: 'userManagement',
        component: () => import('@/views/AdminUserManagement.vue')
      },
      {
        path: '/admin/polls',
        component: () => import('@/views/AdminPolls.vue')
      },
      {
        path: '/admin/history',
        component: () => import('@/views/AdminHistory.vue')
      },
      {
        path: '/admin/settings',
        component: () => import('@/views/AdminHistory.vue')
      }
    ]
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

  //! this is the part that checks if the user is signed in
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    console.log('guard1')
    //! if a user is signedIn, keep him going
    if (await getCurrentUser()) {
      next()
      //! if not, send him to the forbidden page
    } else {
      console.error('Gotta be logged in to access this. Sorry')
      next('/forbidden')
    }
    //! now in case of redirectIfLoggedIn, we check if the user is logged in
  } else if (to.matched.some((record) => record.meta.redirectIfLoggedIn)) {
    console.log('guard2')

    if (await getCurrentUser()) {
      //! in case that is so, we redirect to the dashboard
      next('/dashboard')
      //! in case Notification, we let him register
    } else {
      next()
    }
  } else if (to.matched.some((record) => record.meta.redirectToSignIn)) {
    console.log('guard3')

    next('/signIn')
  } else if (to.matched.some((record) => record.meta.filipAuth)) {
    console.log('guard4')

    if (await getCurrentUser()) {
      if (user.data.email === 'filipsipo@gmail.com') {
        console.log('welcome, lord filip')
        next()
      } else {
        console.error('You are not Filip. I hereby banish you')
        next('/forbidden')
      }
    } else {
      next('/forbidden')
    }
  } else {
    console.log('guard5')

    next()
  }
})

export default router
