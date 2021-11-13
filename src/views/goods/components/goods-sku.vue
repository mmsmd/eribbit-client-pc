<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <img
            :class="{ selected: val.selected, disabled: val.disabled }"
            @click="changeSku(item, val)"
            v-if="val.picture"
            :src="val.picture"
            :title="val.name"
            alt=""
          />
          <span
            :class="{ selected: val.selected, disabled: val.disabled }"
            @click="changeSku(item, val)"
            v-else
          >
            {{ val.name }}
          </span>
        </template>
      </dd>
    </dl>
  </div>
</template>
<script>
import powerSet from '@/vender/power-set.js'
const spliter = '★'
// 得到一个路径字典对象
const getPathMap = skus => {
  // 1. 得到所有的 sku 集合 props.goods.skus
  // 2. 从所有的 sku 中筛选出有效的sku
  // 3. 根据有效的sku使用 power-set 算法得到子集
  // 4. 根据子集往路径字典对象中存储 key-value
  const pathMap = {}
  skus.forEach(sku => {
    if (sku.inventory > 0) {
      // 计算当前有库存的sku的子集
      // 可选值数组
      const valueArr = sku.specs.map(val => val.valueName)
      // 可选值数组 子集
      const valueArrPowerSet = powerSet(valueArr)
      // 遍历子集，往 pathMap 插入子集
      valueArrPowerSet.forEach(arr => {
        // 根据 arr 得到字符串key，约定key是：['蓝色','美国'] ===> '蓝色★美国'
        const key = arr.join(spliter)
        // 给pathMap设置数据
        if (pathMap[key]) {
          pathMap[key].push(sku.id)
        } else {
          pathMap[key] = [sku.id]
        }
      })
    }
  })
  return pathMap
}
const getSelectedValues = specs => {
  const arr = []
  specs.forEach(item => {
    // 选中的按钮对象
    const selectedVal = item.values.find(val => val.selected)
    arr.push(selectedVal ? selectedVal.name : undefined)
  })
  return arr
}
// 更新按钮禁用状态
const updateDisabledStatus = (specs, pathMap) => {
  // 1.约定每个按钮状态由本身 disabled 数据控制
  specs.forEach((item, i) => {
    const selectedValues = getSelectedValues(specs)
    item.values.forEach(val => {
      // 2. 当前是否选中，如果选中忽略
      if (val.selected) return
      // 3. 如果不是选中，就拿着当前的值按照顺序套入选中的值数组
      selectedValues[i] = val.name
      // 4. 剔除 undefined 数据，按分隔符 ★ 拼接 key
      const key = selectedValues.filter(value => value).join(spliter)
      // 5. 去路径字典查找是否有数据，有可以点击，没有就禁用(true)
      val.disabled = !pathMap[key]
    })
  })
}
export default {
  name: 'GoodsSku',
  props: {
    goods: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const pathMap = getPathMap(props.goods.skus)
    // 组件初始化：更新按钮禁用状态
    updateDisabledStatus(props.goods.specs, pathMap)
    // 1.选中与取消选中，约定每个按钮都拥有自己选中状态数据 selected
    // 1.1 点击的是已选中，需要取消当前已点中
    // 1.2 点击的是未选中，把同一个规格的按钮改称未选中，当前点击的改成选中
    const changeSku = (item, val) => {
      // 当按钮是禁用时，阻止程序运行
      if (val.disabled) return
      // 如果不是禁用状态，正常运行
      if (val.selected) {
        val.selected = false
      } else {
        item.values.forEach(valItem => {
          valItem.selected = false
        })
        val.selected = true
      }
      // 点击按钮时：更新按钮禁用状态
      updateDisabledStatus(props.goods.specs, pathMap)
    }
    return { changeSku }
  }
}
</script>
<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
