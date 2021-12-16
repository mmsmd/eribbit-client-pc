<template>
  <div class="member-order-detail" v-if="order">
    <!-- 头部 -->
    <DetailAction :order="order"></DetailAction>
    <!-- 进度 -->
    <!-- 物流 -->
    <!-- 商品订单信息 -->
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import DetailAction from './components/detail-action.vue'
import { findOrderDetail } from '@/api/order.js'
export default {
  name: 'MemberDetail',
  components: {
    DetailAction
  },
  setup() {
    const route = useRoute()

    const order = ref(null)
    findOrderDetail(route.params.id).then(data => {
      order.value = data.result
    })

    return { order }
  }
}
</script>

<style scoped lang="less">
.member-order-detail {
  background: #fff;
  height: 100%;
}
</style>
