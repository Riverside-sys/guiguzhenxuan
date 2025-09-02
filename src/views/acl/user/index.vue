<template>
  <el-card style="height: 80px;">
    <el-form :inline="true" class="form">
      <el-form-item label="用户名：">
        <el-input placeholder="请输入搜素用户名" v-model="keyword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default" @click="searchUserClick">搜索</el-button>
        <el-button type="success" size="default" @click="resetClick">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin: 10px 0px;">
    <el-button type="primary" size="default" @click="addUserClick">添加用户</el-button>
    <el-button type="danger" size="default" @click="removeUserListClick">批量删除</el-button>
    <!-- table展示用户信息 -->
    <el-table @selection-change="handleSelectionChange" style="margin: 20px 0px;" border
      :data="userList">
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column label="ID" align="center" prop="id" width="80px"></el-table-column>
      <el-table-column label="用户名字" align="center" prop="name"
        show-overflow-tooltip></el-table-column>
      <el-table-column label="用户昵称" align="center" prop="username"
        show-overflow-tooltip></el-table-column>
      <el-table-column label="用户职位" align="center" prop="roleName"
        show-overflow-tooltip></el-table-column>
      <el-table-column label="电话" align="center" prop="phone"
        show-overflow-tooltip></el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime"
        show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" align="center" width="300px">
        <template #="{ row }">
          <el-button type="primary" size="small" @click="setRoleClick(row)">分配职位</el-button>
          <el-button type="warning" size="small" @click="updateUserClick(row)">编辑</el-button>
          <el-popconfirm :title="`您确定要删除${row.name}吗？`" width="280px"
            @confirm="removeUserClick(row.id)">
            <template #reference>
              <el-button type="danger" size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize"
      :page-sizes="[5, 7, 9, 11]" :background="true"
      layout="prev, pager, next, jumper, ->, sizes,total" :total="total"
      @current-change="getAllUserInfo" @size-change="getAllUserInfo" />
  </el-card>
  <!-- 抽屉结构1：完成添加新的用户账号|编辑已有的用户账号 -->
  <el-drawer v-model="drawer">
    <!-- 抽屉头部，动态展示标题 -->
    <template #header>
      <h4>{{ userInfo.id ? '编辑用户' : '添加用户' }}</h4>
    </template>
    <!-- 抽屉主体 -->
    <template #default>
      <el-form :model="userInfo" :rules="rules" ref="formRef">
        <el-form-item label="用户姓名" prop="name">
          <el-input placeholder="请输入用户姓名" v-model="userInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="username">
          <el-input placeholder="请输入用户昵称" v-model="userInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password" v-if="!userInfo.id">
          <el-input placeholder="请输入用户密码" v-model="userInfo.password"></el-input>
        </el-form-item>
        <el-form-item label="用户电话" prop="phone">
          <el-input placeholder="请输入用户电话" v-model="userInfo.phone"></el-input>
        </el-form-item>
      </el-form>
    </template>
    <!-- 抽屉底部 -->
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">取消</el-button>
        <el-button type="primary" @click="saveOrUpdateUserInfo">确认</el-button>
      </div>
    </template>
  </el-drawer>
  <!-- 抽屉结构2：分配用户权限 -->
  <el-drawer v-model="drawer2">
    <!-- 抽屉头部 -->
    <template #header>
      <h4>分配用户权限</h4>
    </template>
    <!-- 抽屉主体 -->
    <template #default>
      <el-form>
        <el-form-item label="用户姓名">
          <el-input v-model="userInfo.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="职位列表">
          <!-- 职位多选框 -->
          <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate"
            @change="handleCheckAllChange">全选</el-checkbox>
          <!-- 显示职位的复选框 -->
          <el-checkbox-group v-model="assignRoles" @change="handleCheckChange">
            <el-checkbox v-for="(item, index) in allRoleList" :key="index" :label="item">
              {{ item }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </template>
    <!-- 抽屉底部 -->
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">取消</el-button>
        <el-button type="primary" @click="saveRoleInfo">确认</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang='ts'>
import { ref, onMounted, nextTick } from 'vue'
// 引入用户模块接口
import { reqAllUserInfo, reqAddOrUpdateUserInfo, reqGetUserRoleInfo, reqSetUserRole, reqRemoveUser, reqRemoveUserList, reqSearchUser } from '@/api/acl/user'
// 引入用户类型
import type { User } from '@/api/acl/user/type'
// 引入消息提示
import { ElMessage } from 'element-plus'


// 分页器默认页码
let pageNo = ref<number>(1)
// 分页器一页展示几条数据
let pageSize = ref<number>(5)
// 用户总个数
let total = ref<number>(0)
// 用户列表
let userList = ref<User[]>([])
// 定义响应式数据控制抽屉的显示与隐藏
let drawer = ref<boolean>(false)
// 定义响应式数据控制分配用户权限的抽屉的显示与隐藏
let drawer2 = ref<boolean>(false)
// 收集用户信息的响应式数据
let userInfo = ref<User>({
  name: '',
  username: '',
  password: '',
  phone: ''
})
// 获取form表单实例
const formRef = ref<any>()
// 权限抽屉--多选框
let checkAll = ref<boolean>(false)
// 权限抽屉--多选框--是否半选
let isIndeterminate = ref<boolean>(true)
// 收集全部职位列表
let allRoleList = ref<any[]>([])
// 收集用户已有的职位列表
let assignRoles = ref<any[]>([])
// 准备一个数组存储批量删除的用户的ID
let removeUserList = ref<number[]>([])
// 存储搜索关键字
let keyword = ref<string>('')

// 获取全部已有的用户信息
const getAllUserInfo = async (pager = 1) => {
  // 收集当前页码
  pageNo.value = pager
  let result = await reqAllUserInfo(pageNo.value, pageSize.value)
  if (result.code === 200) {
    total.value = result.data.total
    userList.value = result.data.records
  }
}

// 组件挂载完毕
onMounted(() => {
  getAllUserInfo()
})

// 添加用户点击事件
const addUserClick = () => {
  // 显示抽屉
  drawer.value = true
  // 清空数据
  Object.assign(userInfo.value, {
    id: 0,
    name: '',
    username: '',
    password: '',
    phone: ''
  })
  // 清空表单校验
  nextTick(() => {
    formRef.value.clearValidate()
  })
}

// 编辑用户点击事件
const updateUserClick = (row: User) => {
  // 显示抽屉
  drawer.value = true
  // 存储收集已有的账号信息
  Object.assign(userInfo.value, row)
  // 清空表单校验
  nextTick(() => {
    formRef.value.clearValidate()
  })
}

// 抽屉框1--保存按钮点击事件
const saveOrUpdateUserInfo = async () => {
  // 点击保存按钮时，务必需要保证表单全部符合条件再发送请求
  await formRef.value.validate()
  let result: any = await reqAddOrUpdateUserInfo(userInfo.value)
  if (result.code === 200) {
    // 关闭抽屉
    drawer.value = false
    // 提示
    ElMessage.success(result.message)
    // 添加用户信息时，回到第一页；编辑用户信息时，停留在当前页
    getAllUserInfo(userInfo.value.id ? pageNo.value : 1)
    // 浏览器自动刷新一次
    window.location.reload()
  } else {
    // 关闭抽屉
    drawer.value = false
    // 提示
    ElMessage({
      type: 'error',
      message: userInfo.value.id ? '编辑失败' : '添加失败'
    })
  }
}

// 抽屉框1、2--取消按钮点击事件
const cancelClick = () => {
  // 关闭抽屉
  drawer.value = false
  // 关闭抽屉2
  drawer2.value = false
  // 清空数据
  Object.assign(userInfo.value, {
    name: '',
    username: '',
    password: '',
    phone: ''
  })
}

// 校验--用户姓名
const validateName = (_rule: any, value: any, callback: any) => {
  // 用户姓名不能为空
  if (value === '') {
    callback(new Error('用户姓名不能为空'))
  } else {
    callback()
  }
}

// 校验--用户昵称
const validateUsername = (_rule: any, value: any, callback: any) => {
  // 用户昵称长度至少5位
  if (value.trim().length < 5) {
    callback(new Error('用户昵称长度至少5位'))
  } else {
    callback()
  }
}

// 校验--用户密码
const validatePassword = (_rule: any, value: any, callback: any) => {
  // 用户密码长度至少6位
  if (value.trim().length < 6) {
    callback(new Error('用户密码长度至少6位'))
  } else {
    callback()
  }
}

// 校验--用户电话
const validatePhone = (_rule: any, value: any, callback: any) => {
  // 用户电话长度至少6位
  if (value.trim().length < 6) {
    callback(new Error('用户电话长度至少6位'))
  } else {
    callback()
  }
}

// 抽屉框--校验
const rules = {
  // 用户姓名
  name: [{ required: true, trigger: 'blur', validator: validateName }],
  // 用户昵称
  username: [{ required: true, trigger: 'blur', validator: validateUsername }],
  // 用户密码
  password: [{ required: true, trigger: 'blur', validator: validatePassword }],
  // 用户电话
  phone: [{ required: true, trigger: 'blur', validator: validatePhone }]
}

// 分配用户权限点击事件
const setRoleClick = async (row: User) => {
  // 显示抽屉
  drawer2.value = true
  // 存储已有的用户信息
  Object.assign(userInfo.value, row)
  // 获取用户职位和所有职位列表
  let result: any = await reqGetUserRoleInfo((row.id as number))
  if (result.code === 200) {
    allRoleList.value = result.data.allRolesList
    assignRoles.value = result.data.assignRoles
  }
}

// 抽屉框2--全选框事件
const handleCheckAllChange = (val: boolean) => {
  if (val) {
    assignRoles.value = allRoleList.value
  } else {
    assignRoles.value = []
  }
  isIndeterminate.value = !val
}

// 抽屉框2--多选框事件
const handleCheckChange = (val: string[]) => {
  if (val.length === allRoleList.value.length) {
    checkAll.value = true
    isIndeterminate.value = false
  } else {
    checkAll.value = false
    isIndeterminate.value = true
  }
}

// 抽屉框2--保存按钮点击事件
const saveRoleInfo = async () => {
  // let result: any = await reqSetUserRole((userInfo.value.id as number), assignRoles.value)
  // console.log(result)

  // 所有职位列表
  let allRoleList = ['超级管理员', '系统管理员', '前端', '后端', '测试', '保安', '前台', '人事', '厨师']
  // 根据所有职位列表遍历出已分配职位数组的id
  let roleIdList = assignRoles.value.map((item: any) => {
    return allRoleList.findIndex(item2 => item2 === item)
  })
  // 发送请求
  let result: any = await reqSetUserRole((userInfo.value.id as number), roleIdList)
  if (result.code === 200) {
    // 提示
    ElMessage.success(result.message)
    // 关闭抽屉
    drawer2.value = false
    // 再次发请求获取所有用户信息
    getAllUserInfo(pageNo.value)
  } else {
    // 提示
    ElMessage({
      type: 'error',
      message: '分配权限失败'
    })
  }
}

// 删除用户点击事件
const removeUserClick = async (userId: number) => {
  let result: any = await reqRemoveUser(userId)
  if (result.code === 200) {
    // 提示
    ElMessage.success(result.message)
    getAllUserInfo(userList.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    // 提示
    ElMessage({
      type: 'error',
      message: '删除失败'
    })
  }
}

// table复选框勾选时会触发的事件
const handleSelectionChange = (value: any) => {
  // 将勾选的复选框的ID存储到数组中
  removeUserList.value = value.map((item: any) => item.id)
  console.log(removeUserList.value)
}

// 批量删除按钮点击事件
const removeUserListClick = async () => {
  let result: any = await reqRemoveUserList(removeUserList.value)
  if (result.code === 200) {
    // 提示
    ElMessage.success(result.message)
    getAllUserInfo()
  } else {
    // 提示
    ElMessage({
      type: 'error',
      message: '批量删除失败'
    })
  }
}

// 搜索用户点击事件
const searchUserClick = async () => {
  let result: any = await reqSearchUser(pageNo.value, pageSize.value, keyword.value)
  if (result.code === 200) {
    ElMessage.success(result.message)
    userList.value = result.data.records
    total.value = result.data.total
  } else {
    ElMessage({
      type: 'error',
      message: '搜索失败'
    })
  }
}

// 重置按钮
const resetClick = () => {
  ElMessage.success('重置成功')
  keyword.value = ''
  getAllUserInfo()
}

</script>

<style scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>