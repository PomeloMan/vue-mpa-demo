import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from '../../configs/nprogress'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/list'
  }, {
    path: '/list',
    component: () => import(/* webpackChunkName: "group-user" */ './list.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes: routes
})

// // 当路由进入前
router.beforeEach((to, from, next) => {
  NProgress.start();
  next()
})
// 当路由进入后：关闭进度条
router.afterEach(() => {
  NProgress.done()
})

export default router