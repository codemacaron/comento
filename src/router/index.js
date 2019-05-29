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
      path: '/JoinPage1',
      name: 'JoinPage1',
      component: () => import('@/components/JoinPage1')
    },
    {
      path: '/JoinPage2',
      name: 'JoinPage2',
      component: () => import('@/components/JoinPage2')
    },
    {
      path: '/JoinPage3',
      name: 'JoinPage3',
      component: () => import('@/components/JoinPage3')
    },
    {
      path: '/JoinPage4',
      name: 'JoinPage4',
      component: () => import('@/components/JoinPage4')
    },
    {
      path: '/JoinPage5',
      name: 'JoinPage5',
      component: () => import('@/components/JoinPage5')
    }
  ]
})
