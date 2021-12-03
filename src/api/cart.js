// 封装购物车相关的API函数
import request from '@/utils/request.js'

/**
 * 获取商品 最新价格 库存 是否有效
 * @param {String} skuId - SKU Id
 * @returns
 */
export const getNewCartGoods = skuId => {
  return request(`/goods/stock/${skuId}`, 'get')
}

/**
 * 获取商品对应sku数据
 * @param {String} skuId - SKU ID
 * @returns
 */
export const getGoodsSku = skuId => {
  return request(`/goods/sku/${skuId}`, 'get')
}

/**
 * 合并购物车
 * @param {array<object>} cartList - 购物车信息列表
 * @param {String} object.skuId - SKU ID
 * @param {Boolean} object.selected - 选中状态
 * @param {Integer} object.count - 数量
 * @returns
 */
export const mergeCart = cartList => {
  return request('/member/cart/merge', 'post', cartList)
}

/**
 * 获取登录后的购物车列表
 * @returns Promise
 */
export const findCart = () => {
  return request('/member/cart', 'get')
}
