// 分类模块
import { topCategory } from '@/api/constance.js'
import { findAllCategory } from '@/api/category.js'
export default {
  namespaced: true,
  state() {
    return {
      // 分类信息集合，依赖topCategory重新设置，保证初始化就有数据，不会白瓶
      list: topCategory.map(item => ({ name: item }))
    }
  },
  // 修改分类数据
  mutations: {
    // payload 将来所有分类的集合
    setList(state, payload) {
      state.list = payload
    },
    // 定义show和hide函数，控制当前分类的二级分类的现实与隐藏
    show(state, id) {
      const currCategory = state.list.find(item => item.id === id)
      currCategory.open = true
    },
    hide(state, id) {
      const currCategory = state.list.find(item => item.id === id)
      currCategory.open = false
    }
  },
  // 获取分类
  actions: {
    async getList({ commit }) {
      // 获取分类数据
      const data = await findAllCategory()
      // 给每个分类加上控制二级分类显示隐藏的数据 top一级类目
      data.result.forEach(top => {
        top.open = false
      })
      // 修改分类数据
      commit('setList', data.result)
    }
  }
}
