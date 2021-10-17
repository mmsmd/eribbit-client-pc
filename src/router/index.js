import { createRouter, createWebHashHistory } from 'vue-router'

const Layout = () => import('@/views/Layout.vue')
const Home = () => import('@/views/home/index.vue')
const routes = [
  //  一级路由布局容器
  {
    path: '/',
    component: Layout,
    children: [{ path: '/', component: Home }]
  }
]

// Vue2.0 new VueRouter({}) 创建路由实例
// Vue3.0 createRouter({}) 创建路由实例
const router = createRouter({
  // 使用hash路由模式
  history: createWebHashHistory(),
  routes
})

export default router
