// 插件：扩展vue原有功能：全局组件，自定义指令，挂载原型方法（没有全局过滤器）
// vue2.0 插件写法要素：导出一个对象，有install函数，默认传入vue构造函数，在vue基础上扩展
// vue3.0 插件写法要素：导出一个对象，有install函数，默认传入App应用实例，在app基础上扩展

import XtxSkeleton from './xtx-skeleton.vue'
import XtxCarousel from './xtx-carousel.vue'
import XtxMore from './xtx-more.vue'

export default {
  install(app) {
    // 在app上进行扩展，app提供component directive
    // 如果要挂在原型，app.config.globalProperties.$http
    app.component(XtxSkeleton.name, XtxSkeleton)
    app.component(XtxCarousel.name, XtxCarousel)
    app.component(XtxMore.name, XtxMore)
  }
}
