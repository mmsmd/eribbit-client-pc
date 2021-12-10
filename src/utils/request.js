// 1.创建新的axios实例
// 2.请求拦截器 如果有token进行头部携带
// 3.响应拦截器 1.剥离无效数据 2.处理token失效
// 4.导出函数，调用当前axios实例发请求，返回值是Promise
import axios from 'axios'
import store from '@/store'
import router from '@/router'

// 导出基准地址，因为存在有些地方不是通过axios发请求的地方，同样需要使用基准地址，方便
export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
// 官网
// export const baseURL = 'https://apipc-xiaotuxian-front.itheima.net/'

const instance = axios.create({
  // axios配置,baseURL timeout
  baseURL,
  timeout: 5000
})

instance.interceptors.request.use(
  config => {
    // 拦截业务
    // 进行请求配置修改
    // 如果本地有token就在头部携带
    // 1.获取用户信息对象
    const { profile } = store.state.user
    // 2.判断是否有token
    if (profile.token) {
      // 3.设置token
      config.headers.Authorization = `Bearer ${profile.token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  // res => res.data 取出data数据，将来调用接口时候直接拿到就是后台数据
  res => res.data,
  err => {
    // 401，登录无效，进入该函数,跳转到登录页面
    if (err.response && err.response.status === 401) {
      // 1. 清空本地无效用户信息
      // 2. 跳转到登录页面，跳转需要穿参(当前路由地址) 给登录页面
      store.commit('user/setUser', {})
      // 当前路由地址
      // 1.在组件 `/user?a=10`  $route.path => /user 不行 需要拿完证路径 $route.fullPath === /user?a=10
      // 2.js模块中
      // vue2.0  router.currentRouter.fullPath 就是当前路由地址
      // vue3.0  router.currentRouter是ref响应式数据 router.currentRouter.value.fullPath
      // url有特殊字符需要转码uri  encodeURIComponent
      const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
      router.push('/login?redirectUrl=' + fullPath)
    }
    return Promise.reject(err)
  }
)

// 请求工具函数
export default (url, method, submitData) => {
  // 发请求：请求地址，请求方式，提交数据
  return instance({
    url,
    method,
    // 1.如果是get请求 使用params传递submitData
    // 2.如果不是get请求 使用data传递submitData
    // 动态插入 [] 设置动态key，可以写js表达式，js表达式结果当作key
    // method参数：get,Get,GET 转换成小写在来判断
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
