// 提供复用逻辑的函数（钩子）
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'
/**
 * 数据懒加载函数
 * @param {Element} target - DOM对象
 * @param {Function} apiFn - API函数
 */
export const useLazyData = (target, apiFn) => {
  const result = ref([])
  // stop 停止观察是否进入或移出可视区域的行为
  const { stop } = useIntersectionObserver(
    // target 是观察的目标dom容器，必须是dom容器，而且是vue3.0方式绑定的dom对象
    target,
    // isIntersecting 是否进入可视区域，true是进入 false是移出
    // observerElement 被观察的dom
    ([{ isIntersecting }], observerElement) => {
      // 在此处可根据isIntersecting来判断，然后做业务
      if (isIntersecting) {
        stop()
        // 调用api函数，获取数据

        apiFn().then(data => {
          console.log(result)
          result.value = data.result
        })
      }
    }
  )
  return result
}
