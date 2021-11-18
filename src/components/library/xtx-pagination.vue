<template>
  <div class="xtx-pagination">
    <a href="javascript:;" class="disabled">上一页</a>
    <span>...</span>
    <a href="javascript:;">3</a>
    <a href="javascript:;">4</a>
    <a href="javascript:;" class="active">5</a>
    <a href="javascript:;">6</a>
    <a href="javascript:;">7</a>
    <span>...</span>
    <a href="javascript:;">下一页</a>
  </div>
</template>
<script>
import { computed, ref } from 'vue'
export default {
  name: 'XtxPagination',
  setup() {
    // 需要数据
    // 1. 约定按钮个数为 5 个,如果成为动态需要设置为响应式数据
    const count = 5
    // 2. 当前页码
    const myCurrentPage = ref(1)
    // 3. 总页数 = 总条数 / 每页条数  (向上取整)
    const myTotal = ref(100)
    const myPageSize = ref(10)
    // 其他数据 (总页数，起始按钮，结束按钮，按钮数组) 依赖上面数据计算得到
    const pager = computed(() => {
      // 总页数
      const pageCount = Math.ceil(myTotal.value / myPageSize.value)
      // 按钮个数和当前页码 ===> 起始按钮，结束按钮，按钮数组
      // 1.理想情况:
      const offset = Math.floor(count / 2)
      let start = myCurrentPage.value - offset
      let end = start + count - 1
      // 2.如果起始页码 小于1 需要处理
      if (start < 1) {
        start = 1
        // prettier-ignore
        end = (start + count - 1) > pageCount ? pageCount : (start + count - 1)
      }
      // 3.如果结束页码 大于总页数 需要处理
      if (end > pageCount) {
        end = pageCount
        // prettier-ignore
        start = (end - count + 1) < 1 ? 1 : (end - count + 1)
      }
      // 按钮数组
      const btnArr = []
      for (let i = start; i <= end; i++) {
        btnArr.push(i)
      }
      // 提供计算属性数据
      return { pageCount, start, end, btnArr }
    })
    return { myCurrentPage, pager }
  }
}
</script>
<style scoped lang="less">
.xtx-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;
  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: @xtxColor;
    }
    &.active {
      background: @xtxColor;
      color: #fff;
      border-color: @xtxColor;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333;
      }
    }
  }
  > span {
    margin-right: 10px;
  }
}
</style>
