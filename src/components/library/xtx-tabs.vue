<script>
export default {
  name: 'XtxTabs',
  render() {
    // 返回的内容会进行渲染
    // 1.在Babel帮助下，可以写vue中写jsx语法
    // 2.数据的使用
    const name = 'tom'
    const title = 'tom 222'
    // 3.事件如何绑定
    const say = () => {
      console.log('hi jsx')
    }
    // 4.定义一个jsx对象
    const sub = [<sub>123</sub>, <sub>456</sub>]

    return (
      <h1 title={title} onClick={say}>
        {name}
        {sub}
      </h1>
    )
  }
}
</script>

<style scoped lang="less"></style>
