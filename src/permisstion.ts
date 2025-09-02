// 路由鉴权：项目当中路由能否被访问的权限设置（某一个路由什么条件下能被访问，什么条件下不能被访问）
import router from '@/router'
// 引入进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 获取用户仓库的token数据，判断用户是否登录
import pinia from '@/store'
import useUserStore from '@/store/modules/user'
// 获取settings.js文件中的title
import settings from '@/setting'

// 获取用户仓库
const userStore = useUserStore(pinia)
// 进度条样式取消转圈
NProgress.configure({ showSpinner: false })

// 全局守卫：项目当中任意路由切换都会触发的钩子
// 全局前置守卫
router.beforeEach((to: any, _from: any, next: any) => {
  document.title = settings.title + ' - ' + to.meta.title
  // to：即将要访问的路由信息
  // from：从哪个路由来的信息
  // next：放行函数
  NProgress.start()
  // 获取token，判断用户是否登录
  const token = userStore.token
  if (token) {
    // 登录成功，访问login，重定向为home
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // 登录成功后访问其他6个路由（除了/login）
      // 判断是否有用户信息
      if (userStore.username) {
        next()
      } else {
        // 没有用户信息，在守卫这里发送获取用户信息的请求
        userStore.getUserInfo().then(() => {
          next({ ...to, replace: true })
        }).catch(() => {
          // 获取用户信息失败，或token过期，则应清空用户信息，并重定向到login（退出登录业务）
          userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        })
      }

    }

  } else {
    // 用户未登录判断
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }

})
// 全局后置守卫
router.afterEach((_to: any, _from: any) => {
  NProgress.done()
})

// 第一个问题：任意路由切换实现进度条业务  --nprogress

// 第二个问题：路由鉴权（路由组件访问权限的设置）
// 全部路由组件（7个路由）：登录|404|任意路由|首页（/home二级路由）|数据大屏|权限管理（3个子路由）|商品管理（4个子路由）
//
// 用户未登录时：可以访问login，其余6个路由不能访问（重定向为login）
// 用户登录成功时：不可以访问login（重定向为home），其余路由可以访问
// 利用token判断用户是否登录
//

// 第三个问题：登录成功后，访问其他路由，务必要带着用户信息
// 我们前面分析，难道要在每一个路由的onMounted中都发送获取用户信息的请求吗？
// 其实，我们只需要在全局前置守卫中设置发送一次请求，获取用户信息，然后每次路由切换都将带着用户信息
