<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑   -->
      <SubBread></SubBread>
      <!-- 筛选区 -->
      <SubFilter></SubFilter>
      <!-- 测试复选框 -->
      <XtxCheckbox v-model="isAllChecked">全选</XtxCheckbox>{{ isAllChecked }}
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import SubBread from './components/sub-bread.vue'
import SubFilter from './components/sub-filter.vue'
export default {
  name: 'SubCategory',
  components: {
    SubBread,
    SubFilter
  },
  setup() {
    const isAllChecked = ref(true)
    return { isAllChecked }
  }
}
</script>

<style></style>
