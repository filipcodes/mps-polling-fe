// Composables
import { createRouter, createWebHistory } from 'vue-router'

// shorthand creating new views in the application. Insert a name of the file in the views dir and vue router simply creates the path
const viewNames = ['settings', 'home']

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue')
  }
]

viewNames.forEach((viewName) => {
  routes.push({
    path: `/${viewName}`,
    name: `${viewName}`,
    component: () =>
      import(
        `@/views/${viewName.charAt(0).toUpperCase() + viewName.slice(1)}.vue`
      )
  })
})

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
