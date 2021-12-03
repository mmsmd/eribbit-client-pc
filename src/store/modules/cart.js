import { getNewCartGoods, mergeCart, findCart, insertCart } from '@/api/cart.js'
// 购物车模块
export default {
  namespaced: true,
  state() {
    return {
      // 购物车商品内容
      list: []
    }
  },
  getters: {
    // 有效商品列表
    validList(state) {
      return state.list.filter(goods => goods.stock > 0 && goods.isEffective)
    },
    // 有效商品总件数
    validTotal(state, getters) {
      return getters.validList.reduce((p, c) => p + c.count, 0)
    },
    // 有效商品总金额
    validAmount(state, getters) {
      return getters.validList.reduce((p, c) => p + parseInt(c.nowPrice * 100) * c.count, 0) / 100
    },
    // 无效商品列表
    invalidList(state) {
      return state.list.filter(goods => goods.stock <= 0 && !goods.isEffective)
    },
    // 已选商品列表
    selectedList(state, getters) {
      return getters.validList.filter(item => item.selected)
    },
    // 已选商品总件数
    selectedTotal(state, getters) {
      return getters.selectedList.reduce((p, c) => p + c.count, 0)
    },
    // 已选商品总金额
    selectedAmount(state, getters) {
      return (
        getters.selectedList.reduce((p, c) => p + Math.round(c.nowPrice * 100) * c.count, 0) / 100
      )
    },
    // 是否全选
    isCheckAll(state, getters) {
      return (
        getters.selectedList.length !== 0 &&
        getters.selectedList.length === getters.validList.length
      )
    }
  },
  mutations: {
    // 加入购物车
    insertCart(state, payload) {
      // 约定加入购物车字段必须和后端保持一致 payload对象 的字段
      // id,skuid,name,attrsText,picture,price,nowPrice,selected,stock,count,isEffectives
      // 插入数据规则：
      // 1. 先找购物车中是否有相同商品
      // 2. 如果有相同商品，先查询其数量，累加到payload上，将原来商品删除，再保存到最新位置
      // 3. 如果没有相同商品，保存在最新位置即可
      const sameIndex = state.list.findIndex(goods => goods.skuId === payload.skuId)
      if (sameIndex > -1) {
        const count = state.list[sameIndex].count
        payload.count += count
        // 删除原来的
        state.list.splice(sameIndex, 1)
      }
      // 追加新的
      state.list.unshift(payload)
    },
    // 修改购物车商品
    updateCart(state, goods) {
      // goods商品信息：nowPrice,stock,isEffective
      // goods商品对象的字段不固定，对象中有哪些字段就改哪些字段，字段的值合理才改
      // goods商品对象必须有skuId
      const updateGoods = state.list.find(item => item.skuId === goods.skuId)
      for (const key in goods) {
        if (goods[key] !== undefined && goods[key] !== null && goods[key] !== '') {
          updateGoods[key] = goods[key]
        }
      }
    },
    // 删除购物车商品
    deleteCart(state, skuId) {
      const index = state.list.findIndex(item => item.skuId === skuId)
      state.list.splice(index, 1)
    },
    // 设置购物车
    setCart(state, payload) {
      // payload为空数组就清空，如果有值就设置
      state.list = payload
    }
  },
  actions: {
    // 合并购物车
    async mergeCart(ctx) {
      const cartLsit = ctx.state.list.map(goods => {
        // 准备合并参数
        return {
          skuId: goods.skuId,
          selected: goods.selected,
          count: goods.count
        }
      })
      await mergeCart(cartLsit)
      // 合并成功,清空本地购物车
      ctx.commit('setCart', [])
    },
    // 修改规格
    updateCartSku(ctx, { oldSkuId, newSku }) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // TODO 已登录
        } else {
          // 未登录
          // 1.找出旧的商品信息
          // 2.删除旧的商品数据
          // 3.根据新的sku信息和旧的商品信息，合并成一条新的购物车商品数据
          // 4.添加新的商品
          const oldGoods = ctx.state.list.find(item => item.skuId === oldSkuId)
          ctx.commit('deleteCart', oldSkuId)
          const { skuId, price: nowPrice, specsText: attrsText, inventory: stock } = newSku
          const newGoods = { ...oldGoods, skuId, nowPrice, attrsText, stock }
          ctx.commit('insertCart', newGoods)
          resolve()
        }
      })
    },
    // 批量删除
    batchDeleteCart(ctx, isClear) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // TODO 已登录
        } else {
          // 未登录
          // 找出选中的商品列表，遍历调用删除的mutations
          // isClear 为 true 删除失效商品列表，否则删除选中商品
          ctx.getters[isClear ? 'invalidList' : 'selectedList'].forEach(item => {
            ctx.commit('deleteCart', item.skuId)
          })
          resolve()
        }
      })
    },
    // 全选与取消全选
    checkAllCart(ctx, selected) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // TODO 已登录
        } else {
          // 未登录
          ctx.getters.validList.forEach(goods => {
            ctx.commit('updateCart', { skuId: goods.skuId, selected })
          })
          resolve()
        }
      })
    },
    // 修改购物车（选中状态，数量）
    // payload 需要：skuId（必须），selected ，count（可能）
    updateCart(ctx, payload) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // TODO 已登录
        } else {
          // 未登录
          ctx.commit('updateCart', payload)
          resolve()
        }
      })
    },
    // 加入购物车
    insertCart(ctx, payload) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
          insertCart({ skuId: payload.skuId, count: payload.count })
            .then(() => {
              return findCart()
            })
            .then(data => {
              ctx.commit('setCart', data.result)
              resolve()
            })
        } else {
          // 未登录
          ctx.commit('insertCart', payload)
          resolve()
        }
      })
    },
    // 获取商品列表
    findCart(ctx) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
          findCart().then(data => {
            ctx.commit('setCart', data.result)
            resolve()
          })
        } else {
          // 未登录
          // 同时发送请求（有几件商品发几个请求） 等所有请求成功，一并去修改本地数据
          // Promise.all(promise数组).then((dataList)=>{}) 同时发送请求，所有请求成功，得到所有成功结果
          const promiseArr = ctx.state.list.map(goods => {
            return getNewCartGoods(goods.skuId)
          })
          // dataList成功结果的集合，数据顺序和promiseArr顺序一致，它又是根据state.list而来
          Promise.all(promiseArr).then(dataList => {
            // 更新本地购物车
            dataList.forEach((data, i) => {
              ctx.commit('updateCart', { skuId: ctx.state.list[i].skuId, ...data.result })
            })
            // 调用resolve代表操作成功
            resolve()
          })
        }
      })
    },
    // 删除购物车
    deleteCart(ctx, payload) {
      // payload:skuId
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // TODO 已登录
        } else {
          // 未登录
          ctx.commit('deleteCart', payload)
          resolve()
        }
      })
    }
  }
}
