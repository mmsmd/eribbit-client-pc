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
