// 权限--用户模块接口
import request from '@/utils/request'
// 引入权限--用户类型
import type { UserResponseData, User } from './type'

// 用户模块接口地址
enum API {
  // 获取全部已有用户账号信息
  ALLUSER_URL = '/admin/acl/user',
  // 添加一个新的用户账号
  ADDUSER_URL = '/admin/acl/user/save',
  // 编辑已有的用户账号
  UPDATEUSER_URL = '/admin/acl/user/update',
  // 获取用户职位和所有职位列表
  GETUSERROLE_URL = '/admin/acl/user/toAssign',
  // 分配用户权限
  SETROLE_URL = '/admin/acl/user/doAssign',
  // 根据用户ID删除对应账号信息
  REMOVEUSER_URL = '/admin/acl/user/remove',
  // 根据用户ID数组删除多个账号信息
  REMOVEUSERLIST_URL = '/admin/acl/user/batchRemove',
  // 通过关键字搜索用户
  SEARCHUSER_URL = '/admin/acl/user/search'
}

// 获取用户账号信息的接口
export const reqAllUserInfo = (pageNo: number, limit: number) => request.get<any, UserResponseData>(API.ALLUSER_URL, {
  params: {
    pageNo,
    limit
  }
})

// 添加用户信息|编辑用户信息
export const reqAddOrUpdateUserInfo = (data: User) => {
  if (data.id) {
    // 编辑用户
    return request.put<any, any>(API.UPDATEUSER_URL, data)
  } else {
    // 新增用户
    return request.post<any, any>(API.ADDUSER_URL, data)
  }
}

// 获取用户职位和所有职位列表
export const reqGetUserRoleInfo = (userId: number) => request.get<any, any>(API.GETUSERROLE_URL, {
  params: {
    userId
  }
})

// 分配用户权限
export const reqSetUserRole = (userId: number, roleIdList: number[]) => request.post<any, any>(API.SETROLE_URL, {
  userId,
  roleIdList
})

// 根据用户ID删除对应账号信息
export const reqRemoveUser = (userId: number) => request.delete<any, any>(API.REMOVEUSER_URL, {
  params: {
    userId
  }
})
// 根据用户ID数组删除多个账号信息
export const reqRemoveUserList = (idList: number[]) => request.delete<any, any>(API.REMOVEUSERLIST_URL, {
  data: {
    idList
  }
})

// 通过关键字搜索用户
export const reqSearchUser = (pageNo: number, limit: number, keyword: string) => request.get<any, any>(API.SEARCHUSER_URL, {
  params: {
    pageNo,
    limit,
    keyword
  }
})
