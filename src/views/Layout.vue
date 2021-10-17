<template>
  <!-- 顶部通栏 -->
  <AppNavbar></AppNavbar>
  <!-- 头部组件 -->
  <AppHeader></AppHeader>
  <!-- 内容容器 -->
  <div class="app-body">
    <!-- 二级路由 -->
    <router-view></router-view>
  </div>
  <!-- 底部组件 -->
  <AppFooter></AppFooter>
</template>

<script>
import AppNavbar from '@/components/app-navbar.vue'
import AppHeader from '@/components/app-header.vue'
import AppFooter from '@/components/app-footer.vue'
export default {
  name: 'Layout',
  components: {
    AppNavbar,
    AppHeader,
    AppFooter
  }
}
</script>

<style lang="less" scpoed>
.app-body {
  min-height: 600px;
}
</style>
