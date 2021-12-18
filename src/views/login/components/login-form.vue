<template>
  <div class="account-box">
    <div class="toggle">
      <a @click="isMsgLogin = false" href="javascript:;" v-if="isMsgLogin">
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
      <a @click="isMsgLogin = true" href="javascript:;" v-else>
        <i class="iconfont icon-msg"></i> 使用短信登录
      </a>
    </div>
    <Form
      ref="formCom"
      class="form"
      :validation-schema="schema"
      v-slot="{ errors }"
      autocomplete="off"
    >
      <template v-if="!isMsgLogin">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field
              :class="{ error: errors.account }"
              v-model="form.account"
              name="account"
              type="text"
              placeholder="请输入用户名"
            />
          </div>
          <div class="error" v-if="errors.account">
            <i class="iconfont icon-warning" />{{ errors.account }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <Field
              :class="{ error: errors.password }"
              v-model="form.password"
              name="password"
              type="password"
              placeholder="请输入密码"
            />
          </div>
          <div class="error" v-if="errors.password">
            <i class="iconfont icon-warning" />{{ errors.password }}
          </div>
        </div>
      </template>
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field
              :class="{ error: errors.mobile }"
              v-model="form.mobile"
              name="mobile"
              type="text"
              placeholder="请输入手机号"
            />
          </div>
          <div class="error" v-if="errors.mobile">
            <i class="iconfont icon-warning" />{{ errors.mobile }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <Field
              :class="{ error: errors.code }"
              v-model="form.code"
              name="code"
              type="text"
              placeholder="请输入验证码"
            />
            <span @click="send()" class="code">
              {{ time === 0 ? '发送验证码' : `${time}秒后发送` }}
            </span>
          </div>
          <div class="error" v-if="errors.code">
            <i class="iconfont icon-warning" />{{ errors.code }}
          </div>
        </div>
      </template>
      <div class="form-item">
        <div class="agree">
          <Field as="XtxCheckbox" name="isAgree" v-model="form.isAgree" />
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
        <div class="error" v-if="errors.isAgree">
          <i class="iconfont icon-warning" />{{ errors.isAgree }}
        </div>
      </div>
      <a @click="login()" href="javascript:;" class="btn">登录</a>
    </Form>
    <div class="action">
      <a
        href="https://graph.qq.com/oauth2.0/authorize?client_id=101984921&response_type=token&scope=all&redirect_uri=http%3A%2F%2Frabbit.mmsmd.top%2F%23%2Flogin%2Fcallback"
      >
        <img
          src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
          alt=""
        />
      </a>

      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>

<script>
import { onUnmounted, reactive, ref, watch } from 'vue'
import { Form, Field } from 'vee-validate'
import schema from '@/utils/vee-validate-schema.js'
import Message from '@/components/library/Message.js'
import { userAccountLogin, userMobileLoginMsg, userMobileLogin } from '@/api/user.js'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { useIntervalFn } from '@vueuse/core'

export default {
  name: 'LoginForm',
  components: { Form, Field },
  setup() {
    // 切换短信登录数据
    const isMsgLogin = ref(false)
    // 表单数据对象
    const form = reactive({
      isAgree: true,
      account: null,
      password: null,
      mobile: null,
      code: null
    })

    // vee-validate 校验基本步骤
    // 1. 导入 Form 和 Field 组件，将 form 和 input 进行替换，需要加上name用来指定将来的校验规则函数
    // 2. Field需要进行数据绑定,字段名称最好和后台接口需要的一致
    // 3. 定义 Field的name 属性指定的校验规则函数 ，Form的validation-schema接收定义好的校验规则，是个对象
    // 4. 自定义组件需要校验必须先支持 v-model 然后Field使用as指定组件名称

    const mySchema = {
      // 校验函数有规则：返回true就是校验成功，返回一个字符串就是失败，字符串就是错误提示
      account: schema.account,
      password: schema.password,
      mobile: schema.mobile,
      code: schema.code,
      isAgree: schema.isAgree
    }

    // 监听 isMsgLogin重置表单 (数据+清楚校验结果)
    const formCom = ref(null)
    watch(isMsgLogin, () => {
      // 重置数据
      form.isAgree = true
      form.account = null
      form.password = null
      form.mobile = null
      form.code = null
      // v-if销毁 v-show不销毁，隐藏
      // 如果没有销毁Field组件，之前校验结果不会销毁
      // Form组件提供了一个 resetForm函数清楚校验结果
      formCom.value.resetForm()
    })

    // setup中获取组件实例 proxy
    // const { proxy } = getCurrentInstance()
    // proxy.$message({ text: '11' })

    // 需要在点击登录的时候，对整体表单进行校验
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const login = async () => {
      // Form组件提供了一个 validate 函数，做整体表单校验，返回的是一个 Promise
      const valid = await formCom.value.validate()
      if (valid) {
        try {
          let data = null
          if (isMsgLogin.value) {
            // **手机号登录
            // 2.1 准备一个API做手机号登录
            // 2.2 调用API函数
            // 2.3 成功；存储用户信息 + 跳转至来源页或者首页 + 消息提示
            // 2.4 失败：消息提示
            const { mobile, code } = form
            data = await userMobileLogin({ mobile, code })
          } else {
            // **账号登录
            // 1. 准备一个API做账号登录
            // 2. 调用API函数
            // 3. 成功；存储用户信息 + 跳转至来源页或者首页 + 消息提示
            // 4. 失败：消息提示
            const { account, password } = form
            data = await userAccountLogin({ account, password })
          }
          // 存储用户信息
          const { id, account, avatar, mobile, nickname, token } = data.result
          store.commit('user/setUser', { id, account, avatar, mobile, nickname, token })
          // 登录成功，合并购物车
          store.dispatch('cart/mergeCart').then(() => {
            // 2.跳转
            router.push(route.query.redirectUrl || '/')
            // 消息提示
            Message({ type: 'success', text: '登录成功' })
          })
        } catch (e) {
          // 失败提示
          if (e.response.data) {
            Message({ type: 'error', text: e.response.data.message || '登录失败' })
          }
        }
      }
    }

    // pause 暂停 ，resume 开启
    // useIntervalFn(回调函数，执行间隔，是否立即开启)
    const time = ref(0)
    const { pause, resume } = useIntervalFn(
      () => {
        time.value--
        if (time.value <= 0) {
          pause()
        }
      },
      1000,
      false
    )
    onUnmounted(() => {
      pause()
    })

    // 1. 发送验证码
    // 1.1 绑定发送验证码按钮点击事件
    // 1.2 校验手机号，如果校验成功，发送短信(定义API)，请求成功开启60s倒计时，倒计时结束前不能点击，结束后恢复原样
    // 1.3 校验失败，显示失败的校验样式
    const send = async () => {
      const valid = mySchema.mobile(form.mobile)
      if (valid === true) {
        // 通过
        // 没有倒计时，才能发送
        if (time.value === 0) {
          await userMobileLoginMsg(form.mobile)
          Message({ type: 'success', text: '发送成功' })
          time.value = 60
          resume()
        }
      } else {
        // 失败，使用vee错误函数显示错误信息 setFieldError(字段，错误信息)
        formCom.value.setFieldError('mobile', valid)
      }
    }

    // 初始化qq登录按钮（官方）
    // 1. 准备span有id = qqLoginBtn
    // 2. QC.Login({btnId:"qqLoginBtn"})
    // onMounted(() => {
    //   QC.Login({ btnId: 'qqLoginBtn' })
    // })

    return { isMsgLogin, form, schema: mySchema, login, formCom, send, time }
  }
}
</script>

<style scoped lang="less">
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @xtxColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: @priceColor;
          }
          &.active,
          &:focus {
            border-color: @xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
