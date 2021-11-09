<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑   -->
      <SubBread></SubBread>
      <!-- 筛选区 -->
      <SubFilter @filter-change="filterChange"></SubFilter>
      <!-- 商品面板（排序+列表） -->
      <!-- 排序 -->
      <div class="goods-list">
        <SubSort @sort-change="sortChange"></SubSort>
        <!-- 列表 -->
        <ul>
          <li v-for="goods in goodsList" :key="goods">
            <GoodsItem :goods="goods" />
          </li>
        </ul>
        <!-- 无限加载组件 -->
        <XtxInfiniteLoading
          :loading="loading"
          :finished="finished"
          @infinite="getData"
        ></XtxInfiniteLoading>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import SubBread from './components/sub-bread.vue'
import SubFilter from './components/sub-filter.vue'
import SubSort from './components/sub-sort.vue'
import GoodsItem from './components/goods-item.vue'
import { findSubCategoryGoods } from '../../api/category.js'
import { useRoute } from 'vue-router'
export default {
  name: 'SubCategory',
  components: {
    SubBread,
    SubFilter,
    SubSort,
    GoodsItem
  },
  setup() {
    const route = useRoute()
    // 加载状态
    const loading = ref(false)
    // 是否加载完毕
    const finished = ref(false)
    // 商品列表数据
    const goodsList = ref([])
    // 请求参数
    let reqParams = {
      page: 1,
      pageSize: 20
    }
    const getData = () => {
      loading.value = true
      // 设置二级分类ID
      reqParams.categoryId = route.params.id
      findSubCategoryGoods(reqParams).then(({ result }) => {
        // 获取数据成功
        if (result.items.length) {
          // 有数据-追加数据
          goodsList.value.push(...result.items)
          // 将page改成下一页
          reqParams.page++
        } else {
          // 没有数据加载完成
          finished.value = true
        }
        loading.value = false
      })
    }
    // 在更改了二级分类的时候重新加载数据
    watch(
      () => route.params.id,
      newVal => {
        if (newVal && `/category/sub/${newVal}` === route.path) {
          finished.value = false
          goodsList.value = [] // 列表为空，加载更多组件顶上来，进入可视区，进行加载数据
          reqParams = {
            page: 1,
            pageSize: 20
          }
        }
      }
    )
    // 1.更改排序组件的筛选数据，重新请求
    const sortChange = sortParams => {
      finished.value = false
      // 合并请求参数，保留之前的参数
      reqParams = { ...reqParams, ...sortParams }
      reqParams.page = 1
      goodsList.value = []
    }
    // 2.更改筛选组件的筛选数据，重新请求
    const filterChange = filterParams => {
      finished.value = false
      // 合并请求参数，保留之前的参数
      reqParams = { ...reqParams, ...filterParams }
      reqParams.page = 1
      goodsList.value = []
    }

    return { loading, finished, goodsList, getData, sortChange, filterChange }
  }
}
</script>

<style lang="less" scoped>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
