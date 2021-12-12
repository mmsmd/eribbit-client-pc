<template>
  <div class="xtx-tabs-panel">
    <slot />
  </div>
</template>
<script>
export default {
  // label 选项卡文字 name 选项卡唯一标识 <div class="xtx-tabs-panel">内容
  name: 'XtxTabsPanel',
  props: {
    label: {
      type: String,
      default: ''
    },
    name: {
      type: [String, Number],
      default: ''
    }
  }
}
</script>
