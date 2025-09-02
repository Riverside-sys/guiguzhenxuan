interface ResponseData {
  code: number,
  message: string,
  ok: boolean
}

// 职位数据类型
export interface RoleData {
  id?: number,
  roleName: string,
  createTime?: string,
  updateTime?: string
}

// 职位列表数据类型
export type RoleList = RoleData[]

// 获取全部职位列表的接口返回的数据类型
export interface RoleResponseData extends ResponseData {
  data: {
    records: RoleList,
    total: number,
    size: number,
    current: number,
    pages: number
  }
}

// 权限列表数据类型--递归
export interface Permission {
  id: number,
  name: string,
  level: number,
  select: boolean,
  children?: Permission[]
}

// 获取角色权限接口返回的数据类型
export interface RolePermissionResponseData extends ResponseData {
  data: Permission[]
}

