// 订单相关的API函数

import request from '@/utils/request.js'

/**
 * 结算页面-生成订单-根据购物车选中商品
 * @returns
 */
export const createOrder = () => {
  return request('/member/order/pre', 'get')
}

/**
 * 添加收货地址
 * @param {object} form - 参考接口文档
 * @returns
 */
export const addAddress = form => {
  return request('/member/address', 'post', form)
}
