<template>
  <div class="container">
    <!-- 数据大屏展示内容区域 -->
    <div class="screen" ref="screen">
      <div class="header">
        <Header />
      </div>
      <div class="main">
        <div class="left">
          <div class="screenTop">
            <div class="screenMainTitle">
              <span>实时游客统计</span>
              <img src="@/views/screen/images/dataScreen-title.png" alt="" />
            </div>
            <div class="screenMainChart">
              <TouristRationChart />
            </div>
          </div>
          <div class="screenCenter">
            <div class="screenMainTitle">
              <span>男女比例</span>
              <img src="@/views/screen/images/dataScreen-title.png" alt="" />
            </div>
            <div class="screenMainChart">
              <SexRationChart />
            </div>
          </div>
          <div class="screenBottom">
            <div class="screenMainTitle">
              <span>年龄比例</span>
              <img src="@/views/screen/images/dataScreen-title.png" alt="" />
            </div>
            <div class="screenMainChart">
              <AgeRationChart />
            </div>
          </div>
        </div>
        <div class="center">
          <div class="dataScreen-map">
            <div class="dataScreen-map-title">景区实时客流量</div>
            <!-- 中国地图 -->
            <ChinaMapChart />
          </div>
          <div class="dataScreen-cb">
            <div class="screenMainTitle">
              <span>未来30天游客量趋势图</span>
              <img src="@/views/screen/images/dataScreen-title.png" alt="" />
            </div>
            <div class="screenMainChart">
              <!-- 未来30天游客量趋势图 -->
              <OverNext30Chart />
            </div>
          </div>
        </div>
        <div class="right">
          <div class="screenTop">
            <div class="screenMainTitle">
              <span>热门景区排行</span>
              <img src="@/views/screen/images/dataScreen-title.png" alt="" />
            </div>
            <div class="screenMainChart">
              <!-- 热门景区排行图表 -->
              <HotPlateChart />
            </div>
          </div>
          <div class="screenCenter">
            <div class="screenMainTitle">
              <span>年度游客量对比</span>
              <img src="@/views/screen/images/dataScreen-title.png" alt="" />
            </div>
            <div class="screenMainChart">
              <!-- 年度游客量对比图表 -->
              <AnnualUserChart />
            </div>
          </div>
          <div class="screenBottom">
            <div class="screenMainTitle">
              <span>预约渠道数据统计</span>
              <img src="@/views/screen/images/dataScreen-title.png" alt="" />
            </div>
            <div class="screenMainChart">
              <!-- 预约渠道数据统计图表 -->
              <PlateformSourceChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { onMounted, ref } from 'vue';
// 引入头部组件
import Header from './components/header/index.vue'
// 引入游客比例组件
import TouristRationChart from './components/main/tourist/index.vue'
// 引入性别比例组件
import SexRationChart from './components/main/sex/index.vue'
// 引入年龄比例组件
import AgeRationChart from './components/main/age/index.vue'
// 引入中国地图组件
import ChinaMapChart from './components/main/ChinaMap/index.vue'
// 引入未来30天游客量趋势图组件
import OverNext30Chart from './components/main/overNext30/index.vue'
// 引入热门景区排行组件
import HotPlateChart from './components/main/HotPlate/index.vue'
// 引入年度游客量对比组件
import AnnualUserChart from './components/main/AnnualUser/index.vue'
// 引入预约渠道数据统计组件
import PlateformSourceChart from './components/main/PlateformSource/index.vue'


// 获取屏幕的DOM元素
let screen = ref()

onMounted(() => {
  // 页面一挂载，先进行一次缩放并拉回左上角
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
})

// 获取缩放比例的函数
const getScale = (w = 1920, h = 1080) => {
  const ww = window.innerWidth / w
  const wh = window.innerHeight / h
  return ww < wh ? ww : wh
}

// 监听窗口大小的变化
window.onresize = () => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
}

</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: url(./images/bg.png) no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: 100% 100%;
  background-size: cover;

  .screen {
    position: fixed;
    left: 50%;
    top: 50%;
    transform-origin: left top;
    width: 1920px;
    height: 1080px;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .header {
      width: 100%;
      height: 38px;
    }

    .main {
      box-sizing: border-box;
      display: flex;
      flex: 1;
      width: 100%;
      padding: 12px 42px 20px;

      .left {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-right: 40px;
        width: 394px;
        height: 100%;

        .screenTop,
        .screenCenter,
        .screenBottom {
          position: relative;
          box-sizing: border-box;
          width: 100%;
          padding-top: 54px;
        }

        .screenTop {
          height: 37%;
          background: url("@/views/screen/images/dataScreen-main-lt.png") no-repeat;
          background-size: 100% 100%;
        }

        .screenCenter {
          height: 30%;
          background: url("@/views/screen/images/dataScreen-main-lc.png") no-repeat;
          background-size: 100% 100%;
        }

        .screenBottom {
          height: 27%;
          background: url("@/views/screen/images/dataScreen-main-lb.png") no-repeat;
          background-size: 100% 100%;
        }

      }

      .center {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        margin-right: 40px;

        .dataScreen-map {
          position: relative;
          box-sizing: border-box;
          flex: 1;
          width: 100%;
          margin-top: 78px;

          .dataScreen-map-title {
            position: absolute;
            top: 10px;
            left: 0;
            z-index: 99;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            width: 270px;
            height: 25px;
            padding-left: 30px;
            font-size: 14px;
            color: #ffffff;
            letter-spacing: 5px;
            background: url("@/views/screen/images/map-title-bg.png") no-repeat;
            background-size: 100% 100%;
          }

          .dataScreen-alarm {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 99;
            box-sizing: border-box;
            width: 100%;
            height: 76px;
            padding: 2px 30px;
            overflow: hidden;
            background: url("@/views/screen/images/dataScreen-warn-bg.png") no-repeat;
            background-size: 100% 100%;

            .map-item {
              display: flex;
              align-items: center;
              height: 37px;
              cursor: pointer;

              img {
                width: 15px;
                height: 15px;
                margin-top: 3px;
                margin-right: 6px;
              }

              span {
                font-size: 18px;
                color: rgb(255 183 0 / 74.7%);
              }
            }
          }
        }

        .dataScreen-cb {
          position: relative;
          box-sizing: border-box;
          width: 100%;
          height: 252px;
          padding-top: 54px;
          background: url("@/views/screen/images/dataScreen-main-cb.png") no-repeat;
          background-size: 100% 100%;
        }
      }

      .right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 394px;
        height: 100%;

        .screenTop,
        .screenCenter,
        .screenBottom {
          position: relative;
          box-sizing: border-box;
          width: 100%;
          padding-top: 54px;
        }

        .screenTop {
          height: 37%;
          background: url("@/views/screen/images/dataScreen-main-rt.png") no-repeat;
          background-size: 100% 100%;
        }

        .screenCenter {
          height: 30%;
          background: url("@/views/screen/images/dataScreen-main-rc.png") no-repeat;
          background-size: 100% 100%;
        }

        .screenBottom {
          height: 27%;
          background: url("@/views/screen/images/dataScreen-main-rb.png") no-repeat;
          background-size: 100% 100%;
        }

      }
    }

    .screenMainTitle {
      position: absolute;
      top: 1px;
      left: 0;
      display: flex;
      flex-direction: column;

      span {
        margin-bottom: 12px;
        font-family: YouSheBiaoTiHei;
        font-size: 16px;
        line-height: 16px;
        color: #ffffff;
        font-weight: 700;
        font-style: italic;
        letter-spacing: 1px;
      }

      img {
        width: 68px;
        height: 7px;
      }
    }

    .screenMainChart {
      width: 100%;
      height: 100%;
    }
  }
}
</style>