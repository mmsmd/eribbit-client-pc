<template>
  <div class="member-order-detail" v-if="order">
    <!-- 头部 -->
    <DetailAction :order="order"></DetailAction>
    <!-- 进度 -->
    <DetailStep :order="order"></DetailStep>
    <!-- 物流 -->
    <suspense>
      <template #default>
        <DetailLogistics
          v-if="[3, 4, 5].includes(order.orderState)"
          :order="order"
        ></DetailLogistics>
      </template>
      <template #fallback>
        <div class="loading">loading...</div>
      </template>
    </suspense>
    <!-- 商品订单信息 -->
    <DetailInfo :order="order"></DetailInfo>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import DetailAction from './components/detail-action.vue'
import DetailStep from './components/detail-step.vue'
import DetailLogistics from './components/detail-logistics.vue'
import DetailInfo from './components/detail-info.vue'
import { findOrderDetail } from '@/api/order.js'
export default {
  name: 'MemberDetail',
  components: {
    DetailAction,
    DetailStep,
    DetailLogistics,
    DetailInfo
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
.loading {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  background-color: #f5f5f5;
  margin: 30px 50px 0;
}
</style>
