<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <!-- 账号 -->
          <el-form-item prop="username">
            <el-input placeholder="请输入账号" :prefix-icon="User"
              v-model="loginForm.username"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input type="password" placeholder="请输入密码" :prefix-icon="Lock"
              v-model="loginForm.password" show-password></el-input>
          </el-form-item>
          <!-- 登录按钮 -->
          <el-form-item>
            <el-button class="login_btn" type="primary" size="default" @click="login"
              :loading="loading">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
// 引入用户小仓库
import useUserStore from '@/store/modules/user'
// 引入路由器
import { useRouter, useRoute } from 'vue-router'
// 引入element-plus消息提示
import { ElNotification } from 'element-plus'
// 引入时间工具函数
import { getTime } from '@/utils/time'
// 引入表单验证规则
import { validateUsername, validatePassword } from '@/utils/validators'

// 获取用户小仓库
const userStore = useUserStore()
// 获取路由器
const $router = useRouter()
// 获取路由
const $route = useRoute()


// 收集账号与密码的数据
const loginForm = reactive({
  username: 'admin',
  password: '111111'
})
// 获取表单实例
const loginForms = ref()
// 定义变量控制按钮加载效果
let loading = ref<boolean>(false)

// 登录按钮回调
const login = async () => {
  // 保证全部表单校验通过后再发送请求
  // 验证失败会抛出错误，验证正确则执行下面的代码
  await loginForms.value.validate()

  loading.value = true
  // 点击按钮后，应该做什么：
  // 1.通知仓库发登录请求
  // 2.请求成功->首页展示数据的地方
  // 3.请求失败->弹出登录失败信息
  try {
    await userStore.userLogin(loginForm)

    // 编程式导航跳转到展示数据首页
    // 判断登录时，路由路径当中是否有query参数，如果有就往query参数跳转，没有则跳转到首页
    const redirect: any = $route.query.redirect
    $router.push({ path: redirect || '/' })

    // 登录成功提示框
    ElNotification({
      type: 'success',
      title: `Hi，${getTime()}好！`,
      message: '欢迎回来',
    })
    loading.value = false
  } catch (error) {
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
    loading.value = false
  }
}

// 表单验证规则
const rules = {
  username: [
    // { required: true, min: 5, max: 10, message: '用户名必须为5-10位', trigger: 'change' }
    { validator: validateUsername, trigger: 'change' }
  ],
  password: [
    // { required: true, min: 6, max: 15, message: '密码必须为6-15位', trigger: 'change' }
    { validator: validatePassword, trigger: 'change' }
  ]
}

</script>

<style lang="scss" scoped>
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat center center;
  background-size: cover;

  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat center center;
    background-size: cover;
    padding: 40px;

    h1 {
      color: white;
      font-size: 40px;
      font-weight: 700;
    }

    h2 {
      margin: 20px 0;
      color: white;
      font-size: 20px;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>