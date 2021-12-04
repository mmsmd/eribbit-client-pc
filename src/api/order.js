// 订单相关的API函数

import request from '@/utils/request.js'

/**
 * 结算页面-生成订单-根据购物车选中商品
 * @returns
 */
export const createOrder = () => {
  return request('/member/order/pre', 'get')
}
