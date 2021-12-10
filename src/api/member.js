import request from '@/utils/request.js'

/**
 * 获取收藏分页数据
 * @param {Integer} collectType - 收藏类型，1为商品，2为专题，3为品牌
 * @returns
 */
export const findCollect = ({ page = 1, pageSize = 10, collectType = 1 }) => {
  return request('/member/collect', 'get', { page, pageSize, collectType })
}

/**
 * 获取足迹分页数据
 * @returns
 */
export const findHistory = ({ page = 1, pageSize = 10 }) => {
  return request('/member/browseHistory', 'get', { page, pageSize })
}
