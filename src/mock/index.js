import Mock from 'mockjs'
import qs from 'qs'

// 基本配置
Mock.setup({
  // 随机延时 500 - 1000 毫秒 ，模拟网路延时
  timeout: '500-1000'
})

// 拦截接口
// 1.接口地址规则
// 2.请求方式
// 3.返回数据（函数返回数据）

// 模拟我的收藏
Mock.mock(/\/member\/collect/, 'get', config => {
  const queryString = config.url.split('?')[1]
  const queryObject = qs.parse(queryString)
  const items = []
  for (let i = 0; i < +queryObject.pageSize; i++) {
    items.push(
      Mock.mock({
        id: '@id',
        name: '@ctitle(10,20)',
        desc: '@ctitle(5,10)',
        price: '@float(100,200,2,2)',
        // https://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/clothes_goods_7.jpg
        picture: `https://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/clothes_goods_${Mock.mock(
          '@integer(1,8)'
        )}.jpg`
      })
    )
  }
  return {
    msg: '获取收藏商品成功',
    result: {
      counts: 35,
      pageSize: +queryObject.pageSize,
      page: +queryObject.page,
      items
    }
  }
})

// 模拟我的足迹
Mock.mock(/\/member\/browseHistory/, 'get', config => {
  const queryString = config.url.split('?')[1]
  const queryObject = qs.parse(queryString)
  const items = []
  for (let i = 0; i < +queryObject.pageSize; i++) {
    items.push(
      Mock.mock({
        id: '@id',
        name: '@ctitle(10,20)',
        desc: '@ctitle(5,10)',
        price: '@float(100,200,2,2)',
        // https://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/clothes_goods_7.jpg
        picture: `https://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/clothes_goods_${Mock.mock(
          '@integer(1,8)'
        )}.jpg`
      })
    )
  }
  return {
    msg: '获取足迹商品成功',
    result: {
      counts: 35,
      pageSize: +queryObject.pageSize,
      page: +queryObject.page,
      items
    }
  }
})
