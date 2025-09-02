// 引入小仓库
import { defineStore } from 'pinia'
// 引入接口
import { reqLogin, reqUserInfo } from '@/api/user'
// 引入类型
import type { loginForm, loginResponseData } from '@/api/user/type'
import type { UserState } from './types/type'
// 引入ref
import { ref } from 'vue'
// 引入操作本地存储的工具方法
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
// 引入路由（常量路由、异步路由、任意路由）
/* 因为我们要根据路由动态生成菜单，因此得先拿到路由信息，这里我们把路由信息放在pinia仓库中，这样每一个组件都能访问 */
import { constantRoute, asyncRoute, anyRoute } from '@/router/routes'
// 引入路由器
import router from '@/router'
// 引入lodash数组深拷贝方法
// @ts-ignore
import cloneDeep from 'lodash/cloneDeep'

// 过滤异步路由的方法
function filterAsyncRoutes(asyncRoute: any, routes: any) {
  return asyncRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children) {
        item.children = filterAsyncRoutes(item.children, routes)
      }
      return true
    }
  })
}

// 创建用户相关的小仓库
const useUserStore = defineStore('UserStore', () => {
  // state
  const token = ref<UserState['token']>(GET_TOKEN() || '')  // 用户唯一标识token
  const menuRoutes = ref<UserState['menuRoutes']>(constantRoute)  // 路由信息（数组）
  const username = ref<UserState['username']>('')  // 用户名
  const avatar = ref<UserState['avatar']>('')  // 用户头像

  // 用户登录的方法
  const userLogin = async (loginForm: loginForm) => {
    // 发送登录请求
    const result: loginResponseData = await reqLogin(loginForm)
    // 登录成功
    if (result.code === 200) {
      // pinia仓库存储一下token
      token.value = (result.data.token as string)
      // 由于pinia仓库不是持久化存储的，所以我们本地存储token
      SET_TOKEN(token.value)
      // 能保证当前async函数返回一个成功的promise
      return 'success'
    } else {
      return Promise.reject(new Error((result as any).message))
    }
  }

  // 获取用户信息的方法
  const getUserInfo = async () => {
    // 获取用户信息，并存储到仓库中（用户头像、名字）
    const result: any = await reqUserInfo()
    // console.log(result.data.checkUser.routes)
    // 如果获取用户信息成功，则存储到仓库中
    if (result.code === 200) {
      username.value = result.data.checkUser.username
      avatar.value = result.data.checkUser.avatar
      // 从异步路由中过滤出账号拥有的路由
      let userAsyncRoutes = filterAsyncRoutes(cloneDeep(asyncRoute), result.data.checkUser.routes)
      // // 菜单的数据
      menuRoutes.value = [...constantRoute, ...userAsyncRoutes, ...anyRoute];
      // 目前路由器只注册了常量路由，用户计算完毕异步路由后、任意路由后，需要路由动态追加
      [...userAsyncRoutes, ...anyRoute].forEach((route: any) => {
        router.addRoute(route)
      })
      return 'success'
    } else {
      return Promise.reject(new Error(result.message))
    }
  }

  // 退出登录的方法
  const userLogout = () => {
    // 我们这个项目没有退出登录接口（一般要通知服务器本地用户唯一标识符失效）
    token.value = ''
    username.value = ''
    avatar.value = ''
    REMOVE_TOKEN()  // 本地存储的token也清空
  }

  // 返回
  return {
    token,
    menuRoutes,
    username,
    avatar,
    userLogin,
    getUserInfo,
    userLogout
  }
})

export default useUserStore
