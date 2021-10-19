<template>
  <!-- 首页入口 -->
  <div class="home-entry">
    <div class="container">
      <!-- 左侧分类 -->
      <HomeCategory></HomeCategory>
      <!-- 轮播图 -->
      <HomeBanner></HomeBanner>
    </div>
  </div>
  <!-- 新鲜好物 -->
  <HomeNew></HomeNew>
  <!-- 人气推荐 -->
  <HomeHot></HomeHot>
  <!-- 使用transition组件 -->
  <button @click="show = true">显示</button>
  <button @click="show = false">隐藏</button>
  <Transition>
    <div v-show="show" style="width:100px;height:100px;background:red"></div>
  </Transition>
</template>

<script>
import { ref } from 'vue'
import HomeCategory from './components/home-category.vue'
import HomeBanner from './components/home-banner.vue'
import HomeNew from './components/home-new.vue'
import HomeHot from './components/home-hot.vue'
export default {
  name: 'HomePage',
  components: {
    HomeCategory,
    HomeBanner,
    HomeNew,
    HomeHot
  },
  setup() {
    const show = ref(true)
    return { show }
  }
}
</script>

<style lang="less" scoped>
// 进入 vue2.0 v-enter v-enter-active v-enter-to
// 进入 vue3.0 v-enter-from v-enter-active v-enter-to
// 如果需要多组动画，可以给transition加上name属性 name="xxx"
// 则进入写法：xxx-enter-from xxx-enter-active xxx-enter-to
.v-enter-from {
  opacity: 0;
}
.v-enter-active {
  transition: all 2s;
}
.v-enter-to {
  opacity: 1;
}
// 离开 vue2.0 v-leave v-leave-active v-leave-to
// 离开 vue3.0 v-leave-from v-leave-active v-leave-to
// 如果需要多组动画，可以给transition加上name属性 name="xxx"
// 则离开写法：xxx-leave-from xxx-leave-active xxx-leave-to
.v-leave-from {
  opacity: 1;
}
.v-leave-active {
  transition: all 2s;
}
.v-leave-to {
  opacity: 0;
}
</style>
