import Vue from 'vue'
import Router from 'vue-router'
// import Main from '@/components/Main'
// import Detail from '@/components/Detail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: () => import('@/components/Main')
    },
    {
      path: '/Detail',
      name: 'Detail',
      component: () => import('@/components/Detail')
    },
    {
      path: '/Join',
      name: 'Join',
      component: () => import('@/components/Join')
    }
  ]
})
