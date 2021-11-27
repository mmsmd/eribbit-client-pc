// 购物车模块
export default {
  namespaced: true,
  state() {
    return {
      // 购物车商品内容
      list: []
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
    }
  },
  actions: {
    // 加入购物车
    insertCart(ctx, payload) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // TODO 已登录
        } else {
          // 未登录
          ctx.commit('insertCart', payload)
          resolve()
        }
      })
    }
  }
}
