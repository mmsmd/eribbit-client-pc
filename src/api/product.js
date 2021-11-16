// 商品相关API函数
import request from '@/utils/request.js'

/**
 * 获取商品详情
 * @param {String} id - 商品ID
 */
export const findGoods = id => {
  return request('/goods', 'get', { id })
}

/**
 * 获取 相关推荐 | 猜你喜欢 商品
 * @param {String} id - 商品ID，传入-相关推荐，不传-猜你喜欢
 * @returns {Integer} limit - 商品数量
 */
export const findRelevantGoods = ({ id, limit = 16 }) => {
  return request('/goods/relevant', 'get', { id, limit })
}

/**
 * 获取 热销榜单数据
 * @param {String} id - 商品ID
 * @returns {Integer} limit - 商品数量
 * @returns {Integer} type - 热销类型，1为24小时，2为周榜，3为总榜，默认为1
 */
export const findGoodsHot = ({ id, limit = 3, type = 1 }) => {
  return request('/goods/hot', 'get', { id, limit, type })
}
