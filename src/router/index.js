import { createRouter, createWebHashHistory } from 'vue-router'

const Layout = () => import('@/views/Layout.vue')
const Home = () => import('@/views/home/index.vue')
const TopCategory = () => import('@/views/category/index.vue')
const SubCategory = () => import('@/views/category/sub.vue')
const Goods = () => import('@/views/goods/index.vue')

const Login = () => import('@/views/login/index.vue')

const routes = [
  //  一级路由布局容器
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home },
      { path: '/category/:id', component: TopCategory },
      { path: '/category/sub/:id', component: SubCategory },
      { path: '/product/:id', component: Goods }
    ]
  },
  { path: '/login', component: Login }
]

// Vue2.0 new VueRouter({}) 创建路由实例
// Vue3.0 createRouter({}) 创建路由实例
const router = createRouter({
  // 使用hash路由模式
  history: createWebHashHistory(),
  routes,
  // 每次切换路由时，滚动到页面顶部
  scrollBehavior() {
    // vue2.0是x和y，3.0是left和top
    return { left: 0, top: 0 }
  }
})

export default router
