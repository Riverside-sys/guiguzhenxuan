<template>
  <div class="header">
    <div class="header-lf">
      <span class="header-screening" @click="goHome">首页</span>
    </div>
    <div class="header-ct">
      <div class="header-ct-title">
        <span>智慧旅游可视化大数据展示平台</span>
        <div class="header-ct-warning">平台高峰预警信息（2条）</div>
      </div>
    </div>
    <div class="header-rg">
      <span class="header-download">统计报告</span>
      <span class="header-time">当前时间：{{ currentTime }}</span>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, onBeforeUnmount, onMounted } from 'vue'
// 引入路由
import { useRouter } from 'vue-router'
// 引入moment
import moment from 'moment'

// 获取路由实例
const router = useRouter()
// 存储当前时间
const currentTime = ref(moment().format('YYYY年MM月DD日 HH:mm:ss'))
// 时间计时器
let timer = ref(0)

// 跳转首页
const goHome = () => {
  router.push('/home')
}

// 定时更新当前时间
onMounted(() => {
  timer.value = setInterval(() => {
    currentTime.value = moment().format('YYYY年MM月DD日 HH:mm:ss')
  }, 1000)
})

// 组件卸载时清除计时器
onBeforeUnmount(() => {
  clearInterval(timer.value)
})

</script>

<style scoped lang="scss">
.header {
  display: flex;
  width: 100%;
  height: 38px;

  .header-lf,
  .header-rg {
    position: relative;
    width: 567px;
    height: 100%;
    background: url(@/views/screen/images/dataScreen-header-left-bg.png) no-repeat;
    background-size: 100% 100%;
  }

  .header-ct {
    position: relative;
    flex: 1;
    height: 100%;

    .header-ct-title {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 82px;
      font-family: YouSheBiaoTiHei;
      font-size: 32px;
      font-weight: 700;
      font-style: italic;
      line-height: 78px;
      color: #05e8fe;
      text-align: center;
      letter-spacing: 4px;
      background: url(@/views/screen/images/dataScreen-header-center-bg.png) no-repeat;
      background-size: 100% 100%;

      .header-ct-warning {
        position: absolute;
        bottom: -42px;
        left: 50%;
        width: 622px;
        height: 44px;
        font-family: YouSheBiaoTiHei;
        font-size: 14px;
        line-height: 44px;
        color: #ffffff;
        text-align: center;
        letter-spacing: 1px;
        background: url("@/views/screen/images/dataScreen-header-warn-bg.png") no-repeat;
        background-size: 100% 100%;
        transform: translateX(-50%);
      }
    }


  }

  .header-screening,
  .header-download {
    position: absolute;
    box-sizing: border-box;
    width: 136px;
    height: 42px;
    font-family: YouSheBiaoTiHei;
    font-size: 18px;
    font-weight: 700;
    font-style: italic;
    line-height: 42px;
    color: #29fcff;
    text-align: center;
    cursor: pointer;
    background-size: 100% 100%;
  }

  .header-screening {
    right: 0;
    padding-right: 4px;
    background: url(@/views/screen/images/dataScreen-header-btn-bg-l.png) no-repeat;
  }

  .header-download {
    left: 0;
    padding-left: 0px;
    background: url(@/views/screen/images/dataScreen-header-btn-bg-r.png) no-repeat;
  }

  .header-time {
    position: absolute;
    top: 0;
    right: 14px;
    width: 310px;
    font-family: YouSheBiaoTiHei;
    font-size: 17px;
    font-weight: 400;
    line-height: 38px;
    font-style: italic;
    font-weight: 700;
    color: #05e8fe;
    white-space: nowrap;
  }

}
</style>