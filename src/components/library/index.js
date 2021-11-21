// 插件：扩展vue原有功能：全局组件，自定义指令，挂载原型方法（没有全局过滤器）
// vue2.0 插件写法要素：导出一个对象，有install函数，默认传入vue构造函数，在vue基础上扩展
// vue3.0 插件写法要素：导出一个对象，有install函数，默认传入App应用实例，在app基础上扩展

import Message from './Message.js'

import defaultImg from '@/assets/images/200.png'
// import XtxSkeleton from './xtx-skeleton.vue'
// import XtxCarousel from './xtx-carousel.vue'
// import XtxMore from './xtx-more.vue'
// import XtxBread from '@/components/library/xtx-bread.vue'
// import XtxBreadItem from '@/components/library/xtx-bread-item.vue'

// 自动批量注册组件
// 1.使用 require 提供的函数 context 加载某一个目录下的所有 .vue 后缀的文件。
// 2.然后 context 函数会返回一个导入函数 importFn
// 3.它有一个属性 keys() 获取所有的文件路径
// 4.通过文件路径数组，通过遍历数组，再使用 importFn 根据路径导入组件对象
// 5.遍历的同时进行全局注册即可

// context() 参数 1.目录路径 2.是否加载子目录 3.所加载文件正则匹配
const importFn = require.context('./', false, /\.vue$/)

export default {
  install(app) {
    // 在app上进行扩展，app提供component directive
    // 如果要挂在原型，app.config.globalProperties.$http
    // app.component(XtxSkeleton.name, XtxSkeleton)
    // app.component(XtxCarousel.name, XtxCarousel)
    // app.component(XtxMore.name, XtxMore)
    // app.component(XtxBread.name, XtxBread)
    // app.component(XtxBreadItem.name, XtxBreadItem)、

    // 根据keys批量注册
    importFn.keys().forEach(path => {
      // 导入组件
      const component = importFn(path).default
      // 注册
      app.component(component.name, component)
    })

    // 定义指令
    defineDirective(app)

    // 定义原型函数
    app.config.globalProperties.$message = Message
  }
}

// 定义指令
const defineDirective = app => {
  // 1.图片懒加载指令
  // 原理：先存储图片地址 不能在src上，当图片进入可视区，将存储图片的地址设置给图片元素即可
  app.directive('lazy', {
    // 配置选项
    // vue2.0 监听使用指令的DOM是否创建好，使用钩子函数 inserted
    // vue3.0 的指令拥有的钩子函数和组件一样，使用钩子函数 mounted
    mounted(el, binding) {
      // 2.创建观察对象，观察当前使用指令的元素
      const observe = new IntersectionObserver(
        ([{ isIntersecting }]) => {
          if (isIntersecting) {
            // 停止观察
            observe.unobserve(el)
            // 3.把指令的值设置给el的src属性 binding.value就是指令的值
            el.src = binding.value
            // 4.处理图片加载失败
            el.onerror = () => {
              // 加载失败设置默认图 error是图片加载失败的事件 load 图片加载成功
              el.src = defaultImg
            }
          }
        },
        {
          threshold: 0
        }
      )
      // 开启观察
      observe.observe(el)
    }
  })
}
