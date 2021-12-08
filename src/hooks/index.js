// 提供复用逻辑的函数（钩子）
import { useIntersectionObserver, useIntervalFn } from '@vueuse/core'
import dayjs from 'dayjs'
import { ref, onUnmounted } from 'vue'
/**
 * 数据懒加载函数
 * @param {Element} target - DOM对象
 * @param {Function} apiFn - API函数
 */
export const useLazyData = apiFn => {
  const result = ref([])
  const target = ref(null)
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
          result.value = data.result
        })
      }
    },
    // 配置选项 只要相交的比例大于0，就触发
    {
      threshold: 0
    }
  )
  return { result, target }
}

/**
 * 支付倒计时函数
 * @param {Interger} countdown - 倒计时秒数
 */
export const usePayTime = () => {
  // 倒计时
  const time = ref(0)
  const timeText = ref('')
  const { pause, resume } = useIntervalFn(
    () => {
      time.value--
      timeText.value = dayjs.unix(time.value).format('mm分ss秒')
      if (time.value <= 0) {
        pause()
      }
    },
    1000,
    false
  )
  onUnmounted(() => {
    pause()
  })

  // 开启定时器 countdown - 倒计时秒数
  const start = countdown => {
    time.value = countdown
    timeText.value = dayjs.unix(time.value).format('mm分ss秒')
    resume()
  }
  return { start, timeText }
}
