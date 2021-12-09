<template>
  <div class="member-home">
    <!-- 概览 -->
    <HomeOverview></HomeOverview>
    <!-- 收藏 -->
    <HomePanel title="我的收藏">
      <GoodItem v-for="i in 4" :key="i" :goods="goods"></GoodItem>
    </HomePanel>
    <!-- 组件 -->
    <HomePanel title="我的足迹">
      <GoodItem v-for="i in 4" :key="i" :goods="goods"></GoodItem>
    </HomePanel>
    <!-- 猜你喜欢 -->
    <GoodsRelevant></GoodsRelevant>
  </div>
</template>

<script>
import HomeOverview from './components/home-overview.vue'
import HomePanel from './components/home-panel.vue'
import GoodsRelevant from '@/views/goods/components/goods-relevant.vue'
import GoodItem from '@/views/category/components/goods-item.vue'
export default {
  name: 'MemberHome',
  components: {
    HomeOverview,
    HomePanel,
    GoodsRelevant,
    GoodItem
  },
  setup() {
    const goods = {
      id: '1',
      name: '自煮火锅不排队 麦饭石不粘鸳鸯火锅',
      picture: 'https://yanxuan-item.nosdn.127.net/fcdcb840a0f5dd754bb8fd2157579012.jpg',
      desc: '清汤鲜香 红汤劲爽',
      price: '159.00'
    }
    return { goods }
  }
}
</script>

<style scoped lang="less">
:deep(.xtx-carousel) .carousel-btn.prev {
  left: 5px;
}
:deep(.xtx-carousel) .carousel-btn.next {
  right: 5px;
}
</style>
