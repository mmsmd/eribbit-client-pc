// 分类相关api接口函数

import request from '@/utils/request.js'

// 获取所有分类
export const findAllCategory = () => {
  return request('/home/category/head', 'get')
}
