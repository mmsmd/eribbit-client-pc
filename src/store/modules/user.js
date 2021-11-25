// 用户模块
export default {
  namespaced: true,
  state() {
    return {
      // 用户信息
      profile: {
        id: '',
        avatar: '',
        nickname: '',
        account: '',
        mobile: '',
        token: ''
      },
      // 登录后回跳路径
      redirectUrl: '/'
    }
  },
  mutations: {
    // 修改用户信息,playload就是用户信息对象
    setUser(state, payload) {
      state.profile = payload
    },
    // 修改回调地址
    setRedirectUrl(state, url) {
      state.redirectUrl = url
    }
  }
}
