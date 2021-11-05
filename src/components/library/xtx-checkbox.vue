<template>
  <div class="xtx-checkbox" @click="changeChecked()">
    <i v-if="checked" class="iconfont icon-checked"></i>
    <i v-else class="iconfont icon-unchecked"></i>
    <!-- 判断插槽是否有内容   -->
    <span v-if="$slots.default"><slot /></span>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
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
    const checked = ref(false)
    const changeChecked = () => {
      checked.value = !checked.value
      // 使用emit通知父组件数据改变
      emit('update:modelValue', checked.value)
    }
    // 使用侦听器，得到父组件传递数据，给checked
    watch(
      () => props.modelValue,
      () => {
        checked.value = props.modelValue
      },
      { immediate: true }
    )
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
