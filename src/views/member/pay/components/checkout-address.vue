<template>
  <div class="checkout-address">
    <div class="text">
      <div v-if="!showAddress" class="none">您需要先添加收货地址才可提交订单。</div>
      <ul v-if="showAddress">
        <li>
          <span>收<i />货<i />人：</span>{{ showAddress.receiver }}
        </li>
        <li>
          <span>联系方式：</span
          >{{ showAddress.contact.replace(/^(\d{3})\d{4}(\d{4})/, '$1****$2') }}
        </li>
        <li><span>收货地址：</span>{{ showAddress.fullLocation }}{{ showAddress.address }}</li>
      </ul>
      <a v-if="showAddress" href="javascript:;">修改地址</a>
    </div>
    <div class="action">
      <XtxButton class="btn" @click="visibleDialog = true">切换地址</XtxButton>
      <XtxButton class="btn">添加地址</XtxButton>
    </div>
  </div>
  <!-- 对话框组件 -->
  <XtxDialog title="切换收货地址" v-model:visible="visibleDialog">
    内容
    <template #footer>
      <XtxButton @click="visibleDialog = false" type="gray" style="margin-right:20px"
        >取消</XtxButton
      >
      <XtxButton @click="visibleDialog = false" type="primary">确认</XtxButton>
    </template>
  </XtxDialog>
</template>
<script>
import { ref } from 'vue'
import { XtxDialog } from '@/components/library/xtx-dialog.vue'
export default {
  name: 'CheckoutAddress',
  components: {
    XtxDialog
  },
  props: {
    // 收获地址列表
    list: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    // 1.找到默认收货地址
    // 2.没有默认收货地址，使用第一条收货地址
    // 3.如果没有数据，显示 请添加收货地址
    const showAddress = ref(null)
    const defaultAddress = props.list.find(item => item.isDefault === 0)
    if (defaultAddress) {
      showAddress.value = defaultAddress
    } else {
      if (props.list.length) {
        // 加个注释：忽略下面代码的检查eslint
        // eslint-disable-next-line vue/no-setup-props-destructure
        showAddress.value = props.list[0]
      }
    }

    // 显示隐藏
    const visibleDialog = ref(false)

    return { showAddress, visibleDialog }
  }
}
</script>
<style scoped lang="less">
.checkout-address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }
    > ul {
      flex: 1;
      padding: 20px;
      li {
        line-height: 30px;
        span {
          color: #999;
          margin-right: 5px;
          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
    > a {
      color: @xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }
  .action {
    width: 420px;
    text-align: center;
    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
</style>
