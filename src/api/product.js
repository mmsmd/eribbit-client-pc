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

/**
 * 查询商品评价信息
 * @param {string} id - 商品ID
 * @returns
 */
export const findGoodsCommentInfo = id => {
  // axios遇到http,https开头的地址，不会加上基准地址
  return request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`, 'get')
}
