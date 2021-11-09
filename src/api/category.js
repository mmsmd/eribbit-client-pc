// 分类相关api接口函数

import request from '@/utils/request.js'

// 获取所有分类
export const findAllCategory = () => {
  return request('/home/category/head', 'get')
}

/**
 * 获取顶级类目信息（children属性--个格子分类，包含推荐商品）
 * @param {string} id -顶级类目id
 * @returns
 */
export const findTopCategory = id => {
  return request('/category', 'get', { id })
}

/**
 * 获取二级类目的筛选条件
 * @param {string} id -二级类目id
 * @returns
 */
export const findSubCategoryFilter = id => {
  return request('/category/sub/filter', 'get', { id })
}

/**
 * 获取分类下商品(带筛选条件)
 * @param {Object} params - 参考接口文档
 * @returns
 */
export const findSubCategoryGoods = params => {
  return request('/category/goods/temporary', 'post', params)
}
