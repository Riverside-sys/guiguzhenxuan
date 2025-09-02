// 角色管理模块的接口
import request from "@/utils/request"
// 引入角色管理模块的ts类型
import type { RoleResponseData, RoleData, RolePermissionResponseData } from './type'



// 枚举地址
enum API {
  // 获取全部的职位接口
  ALLROLE_URL = '/admin/acl/role',
  // 新增职位接口
  ADDROLE_URL = '/admin/acl/role/save',
  // 修改职位接口
  UPDATEROLE_URL = '/admin/acl/role/update',
  // 删除职位接口
  DELETEROLE_URL = '/admin/acl/role/remove/',
  // 根据角色ID获取权限列表
  GETROLEPERMISSION_URL = '/admin/acl/role/permission'
}

// 获取职位列表
export const reqALLRoleList = (pageNo: number, limit: number, roleName: string) => request.get<any, RoleResponseData>(API.ALLROLE_URL, {
  params: {
    pageNo,
    limit,
    roleName
  }
})

// 添加职位与修改职位接口
export const reqAddOrUpdateRole = (data: RoleData) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEROLE_URL, data)
  } else {
    return request.post<any, any>(API.ADDROLE_URL, data)
  }
}

// 删除职位接口
export const reqDeleteRole = (id: number) => request.delete<any, any>(API.DELETEROLE_URL, {
  params: {
    id
  }
})

// 根据角色ID获取权限列表
export const reqGetRolePermission = (roleId: number) => request.get<any, RolePermissionResponseData>(API.GETROLEPERMISSION_URL, {
  params: {
    roleId
  }
})
