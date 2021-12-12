<template>
  <div class="member-order">
    <!-- 体验jsx语法 -->
    <XtxTabs v-model="activeName">
      <XtxTabsPanel label="选项卡0" name="first"></XtxTabsPanel>
      <XtxTabsPanel v-for="i in 4" :key="i" :label="`选项卡${i}`" :name="`name${i}`"
        >内容{{ 1 }}</XtxTabsPanel
      >
    </XtxTabs>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'MemberOrder',
  setup() {
    const activeName = ref('first')

    return { activeName }
  }
}
</script>

<style scoped lang="less"></style>
