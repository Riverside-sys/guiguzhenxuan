<template>
  <el-card>
    <div class="box">
      <img :src="userStore.avatar" alt="" class="avatar">
      <div class="bottom">
        <h3 class="title">{{ getTime() }}好，{{ userStore.username }}</h3>
        <p class="desc">后台人员管理系统</p>
      </div>
    </div>
  </el-card>
  <div class="welcome">
    <svg-icon name="welcome" width="600px" height="600px" />
  </div>
</template>

<script setup lang='ts'>
// 引入用户仓库，获取当前用户的头像、昵称
import useUserStore from '@/store/modules/user'
// 引入时间工具函数
import { getTime } from '@/utils/time'

// 获取用户仓库
const userStore = useUserStore()

</script>

<style lang="scss" scoped>
.box {
  display: flex;

  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  .bottom {
    margin-left: 20px;

    .title {
      font-size: 30px;
      font-weight: 900;
      margin-bottom: 30px;
    }

    .desc {
      font-style: italic;
      color: #999;
    }
  }
}

.welcome {
  margin-top: 50px;
  display: flex;
  justify-content: center;
}
</style>