// 登录接口需要携带参数的ts类型
export interface loginForm {
  username: string
  password: string
}

// 登录接口返回数据类型
interface dataType {
  token?: string
}

export interface loginResponseData {
  code: number
  message: string
  data: dataType
  ok: boolean
}

// 定义服务器返回用户信息相关的数据类型
interface user {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: string[]
  token: string

}
export interface userResponseData {
  code: number
  message: string
  data: user
  ok: boolean
}