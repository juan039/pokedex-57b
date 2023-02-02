import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FavoritesView from '../views/FavoritesView.vue'
import LogInView from '../views/LogInView.vue'
import DetailView from '../views/DetailView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: FavoritesView
  },
  {
    path: '/login',
    name: 'login',
    component: LogInView
  },
  {
    path: '/details/:id',
    name: 'details',
    component: DetailView
  }
]

const router = new VueRouter({
  routes
})

const isLoggedIn = () => {
  return localStorage.getItem('token')
}

router.beforeEach((to, from, next) => {
  if(!isLoggedIn() && to.name !== 'login'){
      next({
          path: '/login'
      })
  }else next()
})

router.beforeEach((to, from, next) => {
  if(isLoggedIn() && to.name == 'login'){
      next({
          path: '/'
      })
  }else next()
})

export default router
