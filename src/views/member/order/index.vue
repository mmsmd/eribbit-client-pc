<template>
  <div class="member-order">
    <!-- 体验jsx语法 -->
    <XtxTabs v-model="activeName" @tab-click="changeTab">
      <XtxTabsPanel label="选项卡0" name="first">内容0 </XtxTabsPanel>
      <XtxTabsPanel v-for="i in 4" :key="i" :label="`选项卡${i}`" :name="`name${i}`"
        >内容{{ i }}</XtxTabsPanel
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
    const changeTab = tab => {
      console.log(tab)
    }
    return { activeName, changeTab }
  }
}
</script>

<style scoped lang="less"></style>
