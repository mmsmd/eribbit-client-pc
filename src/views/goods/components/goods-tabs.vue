<template>
  <div class="goods-tabs">
    <nav>
      <a
        @click="activeName = 'GoodsDetail'"
        :class="{ active: activeName === 'GoodsDetail' }"
        href="javascript:;"
        >商品详情</a
      >
      <a
        @click="activeName = 'GoodsComment'"
        :class="{ active: activeName === 'GoodsComment' }"
        href="javascript:;"
        >商品评价<span>(500+)</span></a
      >
    </nav>
    <!-- 切换内容的地方 -->
    <!-- 在vue中，动态切换组件，可以使用动态组件component组件 -->
    <!-- is属性用来决定component动态组件渲染为哪个组件，组件的名称 -->
    <!-- <GoodsDetail v-if="activeName === 'GoodsDetail'"></GoodsDetail>
    <GoodsComment v-if="activeName === 'GoodsComment'"></GoodsComment> -->
    <component :is="activeName"></component>
  </div>
</template>

<script>
import { ref } from 'vue'
import GoodsDetail from './goods-details.vue'
import GoodsComment from './goods-comment.vue'
export default {
  name: 'GoodsTabs',
  components: { GoodsDetail, GoodsComment },
  setup() {
    // activeName的值：GoodsDetail GoodsComment
    const activeName = ref('GoodsDetail')

    return { activeName }
  }
}
</script>

<style scoped lang="less">
.goods-tabs {
  min-height: 600px;
  background: #fff;
  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;
      > span {
        color: @priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
      &:first-child {
        border-right: 1px solid #f5f5f5;
      }
      &.active {
        &::before {
          content: '';
          position: absolute;
          left: 40px;
          bottom: -1px;
          width: 72px;
          height: 2px;
          background: @xtxColor;
        }
      }
    }
  }
}
</style>
