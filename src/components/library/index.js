// 插件：扩展vue原有功能：全局组件，自定义指令，挂载原型方法（没有全局过滤器）
// vue2.0 插件写法要素：导出一个对象，有install函数，默认传入vue构造函数，在vue基础上扩展
// vue3.0 插件写法要素：导出一个对象，有install函数，默认传入App应用实例，在app基础上扩展

import XtxSkeleton from './xtx-skeleton.vue'
import XtxCarousel from './xtx-carousel.vue'
import XtxMore from './xtx-more.vue'
import defaultImg from '@/assets/images/200.png'

export default {
  install(app) {
    // 在app上进行扩展，app提供component directive
    // 如果要挂在原型，app.config.globalProperties.$http
    app.component(XtxSkeleton.name, XtxSkeleton)
    app.component(XtxCarousel.name, XtxCarousel)
    app.component(XtxMore.name, XtxMore)
    // 定义指令
    defineDirective(app)
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
