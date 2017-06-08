import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/HomePage'
import AboutPage from '@/pages/AboutPage'
import GithubPage from '@/pages/GithubPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPage
    },
    {
      path: '/github',
      name: 'github',
      component: GithubPage
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
