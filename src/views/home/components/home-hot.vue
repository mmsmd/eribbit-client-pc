<template>
  <div class="home-hot">
    <HomePanel title="人气推荐" subTitle="人气爆款，不容错过">
      <!-- 面板内容 -->
      <ul class="goods-list">
        <li v-for="item in list" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="" />
            <p class="name">{{ item.title }}</p>
            <p class="desc">{{ item.alt }}</p>
          </RouterLink>
        </li>
      </ul>
    </HomePanel>
  </div>
</template>

<script>
import { ref } from 'vue'
import { findHot } from '@/api/home.js'
import HomePanel from './home-panel.vue'
export default {
  name: 'HomeHot',
  components: {
    HomePanel
  },
  setup() {
    const list = ref([])
    findHot().then(data => {
      list.value = data.result
    })
    return { list }
  }
}
</script>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
