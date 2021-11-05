<template>
  <div class="xtx-checkbox" @click="changeChecked()">
    <i v-if="checked" class="iconfont icon-checked"></i>
    <i v-else class="iconfont icon-unchecked"></i>
    <!-- 判断插槽是否有内容   -->
    <span v-if="$slots.default"><slot /></span>
  </div>
</template>

<script>
import { useVModel } from '@vueuse/core'
// vue3的v-model语法糖 ====》 :modelValue + @update:modelValue
export default {
  name: 'XtxCheckbox',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    // 使用useVModel 实现双向数据绑定
    // 1.使用props接收modelValue
    // 2.使用useVModel包装props中的modelValue属性数据
    // 3.在使用check.value就是使用父组件数据
    // 4.在使用checked.value = '数据' 赋值，触发emit('update:modelValue','数据')函数
    const checked = useVModel(props, 'modelValue', emit)
    const changeChecked = () => {
      const newVal = !checked.value
      // 通知父组件
      checked.value = newVal
      // 让组件支持change事件
      emit('change', newVal)
    }
    return { checked, changeChecked }
  }
}
</script>

<style scoped lang="less">
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: @xtxColor;
    ~ span {
      color: @xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>
