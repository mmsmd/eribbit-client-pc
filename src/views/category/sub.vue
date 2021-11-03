<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑   -->
      <SubBread></SubBread>
    </div>
  </div>
</template>

<script>
import SubBread from './components/sub-bread.vue'
export default {
  name: 'SubCategory',
  components: {
    SubBread
  }
}
</script>

<style></style>
