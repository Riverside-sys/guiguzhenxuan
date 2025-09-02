// 账号信息的ts类型
interface ResponseData {
  code: number,
  message: string,
  ok: boolean
}
// 代表一个账号信息的ts类型
export interface User {
  id?: number,
  createTime?: string,
  username: string,
  password: string,
  name: string,
  phone: string,
  roleName?: string,
  token?: string
}
// 获取全部用户信息接口返回的数据ts类型
export interface UserResponseData extends ResponseData {
  data: {
    records: User[],
    total: number,
    size: number,
    current: number
  }
}