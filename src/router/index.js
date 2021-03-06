import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store'
import { h } from 'vue'

const Layout = () => import('@/views/Layout.vue')
const Home = () => import('@/views/home/index.vue')
const TopCategory = () => import('@/views/category/index.vue')
const SubCategory = () => import('@/views/category/sub.vue')
const Goods = () => import('@/views/goods/index.vue')
const Cart = () => import('@/views/cart/index.vue')

const Login = () => import('@/views/login/index.vue')
const LoginCallback = () => import('@/views/login/callback.vue')

const Checkout = () => import('@/views/member/pay/checkout.vue')
const Pay = () => import('@/views/member/pay/index.vue')
const PayResult = () => import('@/views/member/pay/result.vue')

const MemberLayout = () => import('@/views/member/Layout.vue')
const MemberHome = () => import('@/views/member/home/index.vue')
const MemberOrder = () => import('@/views/member/order/index.vue')
const MemberDetail = () => import('@/views/member/order/detail.vue')

const routes = [
  //  一级路由布局容器
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home },
      { path: '/category/:id', component: TopCategory },
      { path: '/category/sub/:id', component: SubCategory },
      { path: '/product/:id', component: Goods },
      { path: '/cart', component: Cart },
      { path: '/member/checkout', component: Checkout },
      { path: '/member/pay', component: Pay },
      { path: '/pay/callback', component: PayResult },
      {
        path: '/member',
        component: MemberLayout,
        children: [
          { path: '/member', component: MemberHome },
          // { path: '/member/order', component: MemberOrder },
          // { path: '/member/order/:id', component: MemberDetail }
          {
            path: '/member/order',
            // 创建一个RouterView容器形成嵌套关系
            component: { render: () => h(<RouterView />) },
            children: [
              { path: '', component: MemberOrder },
              { path: ':id', component: MemberDetail }
            ]
          }
        ]
      }
    ]
  },
  { path: '/login', component: Login },
  { path: '/login/callback', component: LoginCallback }
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

// 前置导航守卫
router.beforeEach((to, from, next) => {
  // 需要登录的路由，地址是以 /member 开头
  const { profile } = store.state.user
  if (!profile.token && to.path.startsWith('/member')) {
    return next('/login?redirectUrl=' + encodeURIComponent(to.fullPath))
  }
  next()
})

export default router
