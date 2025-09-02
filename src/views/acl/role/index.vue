<template>
  <el-card>
    <el-form :inline="true" class="form">
      <el-form-item label="职位搜索">
        <el-input placeholder="请输入职位关键字" v-model="keyword" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default" :disabled="!keyword" @click="search">搜索</el-button>
        <el-button type="primary" size="default" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin-top: 10px;">
    <el-button type="primary" size="default" icon="Plus" @click="addRole">新增职位</el-button>
    <el-table border style="margin-top: 10px;" :data="allRole">
      <el-table-column type="index" align="center" label="#" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="职位名称" align="center" show-overflow-tooltip prop="roleName" />
      <el-table-column label="创建时间" align="center" show-overflow-tooltip prop="createTime" />
      <el-table-column label="更新时间" align="center" show-overflow-tooltip prop="updateTime" />
      <el-table-column label="操作" align="center" width="260px">
        <template #="{ row }">
          <el-button type="primary" size="small" @click="setPermission(row)">分配权限</el-button>
          <el-button type="warning" size="small" @click="editRole(row)">编辑</el-button>
          <el-popconfirm title="确定删除该职位吗？" @confirm="deleteRole(row.id)" width="200px">
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
      layout="prev, pager, next, jumper, ->, sizes, total" :total="total"
      @current-change="getHasRole" @size-change="getHasRole" />
  </el-card>
  <!-- 添加职位与编辑职位的结构：对话框 -->
  <el-dialog v-model="dialogFormVisible" :title="roleParams.id ? '编辑职位' : '新增职位'" width="500px">
    <el-form :model="roleParams" :rules="rules" ref="roleFormRef">
      <el-form-item label="职位名称" prop="roleName">
        <el-input placeholder="请输入职位名称" v-model="roleParams.roleName"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" size="default" @click="dialogFormVisible = false">取消</el-button>
      <el-button type="primary" size="default" @click="save">确定</el-button>
    </template>
  </el-dialog>
  <!-- 抽屉组件：分配职位的菜单权限、按钮权限 -->
  <el-drawer v-model="drawer">
    <template #header>
      <h4>分配菜单与按钮权限</h4>
    </template>
    <template #default>
      <!-- 树形控件 -->
      <el-tree style="max-width: 600px" :data="permissionList" show-checkbox node-key="id"
        default-expand-all :default-checked-keys="selectPermissionList" :props="defaultProps" />
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="drawer = false">取消</el-button>
        <el-button type="primary" @click="savePermission">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang='ts'>
import { ref, onMounted, reactive, nextTick } from 'vue';
// 引入角色管理模块的接口
import { reqAddOrUpdateRole, reqALLRoleList, reqDeleteRole, reqGetRolePermission } from '@/api/acl/role'
// 引入角色管理模块的类型
import type { RoleResponseData, RoleList, RoleData, RolePermissionResponseData, Permission } from '@/api/acl/role/type'
// 引入消息提示
import { ElMessage, ElMessageBox } from 'element-plus'
// 引入设置小仓库
import useSettingStore from '@/store/modules/setting'

// 获取设置小仓库
const settingStore = useSettingStore()

// 当前页码
let pageNo = ref<number>(1)
// 每页条数
let pageSize = ref<number>(5)
// 搜素职位关键字
let keyword = ref<string>('')
// 存储全部已有的职位
let allRole = ref<RoleList>([])
// 职位总个数
let total = ref<number>(0)
// 控制对话框的显示与隐藏
let dialogFormVisible = ref<boolean>(false)
// 收集新增岗位数据
let roleParams = reactive<RoleData>({
  roleName: ''
})
// 新增岗位的表单
let roleFormRef = ref<any>()
// 控制抽屉组件显示与隐藏
let drawer = ref<boolean>(false)
// 存储选择职位的权限数据
let permissionList = ref<Permission[]>([])
// 树节点配置代码
const defaultProps = {
  children: 'children',
  label: 'name',
}
// 准备一个数组，用于存储已选中的权限ID，将来在树节点中显示
let selectPermissionList = ref<number[]>([])


// 组件挂载完毕
onMounted(() => {
  getHasRole()
})

// 获取职位列表
const getHasRole = async (pager = 1) => {
  // 修改当前页码
  pageNo.value = pager
  let result: RoleResponseData = await reqALLRoleList(pageNo.value, pageSize.value, keyword.value)
  if (result.code === 200) {
    allRole.value = result.data.records
    total.value = result.data.total
  }
}

// 搜索点击事件
const search = async () => {
  // 根据搜索关键字搜索
  try {
    await getHasRole()
    ElMessage.success('搜索成功')
  } catch (error) {
    ElMessage.error('搜索失败')
  }
  // 清空搜索关键字
  keyword.value = ''
}

// 重置点击事件
const reset = () => {
  settingStore.refresh = !settingStore.refresh
  ElMessage.success('重置成功')
}

// 新增职位点击事件
const addRole = () => {
  // 对话框显示
  dialogFormVisible.value = true
  // 清空对话框表单收集的数据
  Object.assign(roleParams, {
    id: 0,
    roleName: ''
  })
  // 清空上一次表单校验结果
  nextTick(() => {
    roleFormRef.value.clearValidate()
  })
}

// 编辑职位点击事件
const editRole = (row: RoleData) => {
  // 对话框显示
  dialogFormVisible.value = true
  // 存储已有的职位--带有ID的
  Object.assign(roleParams, row)
  // 清空上一次表单校验结果
  nextTick(() => {
    roleFormRef.value.clearValidate()
  })
}

// 自定义校验规则的回调
const validateRoleName = (_rule: any, value: any, callback: any) => {
  if (value.trim().length >= 2) {
    callback()
  } else {
    callback(new Error('职位名称至少两位'))
  }
}

// 职位校验规则
const rules = {
  roleName: [{ required: true, trigger: 'blur', validator: validateRoleName }]
}

// 新增|编辑岗位确定按钮
const save = async () => {
  // 表单校验结果通过后再发请求
  await roleFormRef.value.validate()
  // 添加|编辑岗位
  let result: any = await reqAddOrUpdateRole(roleParams)
  if (result.code === 200) {
    ElMessage.success(result.message)
    // 关闭对话框
    dialogFormVisible.value = false
    // 重新获取职位列表
    getHasRole(roleParams.id ? pageNo.value : 1)
  } else {
    ElMessage.error(result.message)
  }

}

// 分配权限点击事件
const setPermission = async (row: RoleData) => {
  // 抽屉组件显示
  drawer.value = true
  // 收集当前职位的数据
  Object.assign(roleParams, row)
  // 获取当前职位的权限列表
  let result: RolePermissionResponseData = await reqGetRolePermission((row.id as number))
  if (result.code === 200) {
    permissionList.value = result.data
    selectPermissionList.value = filterPermissionList(permissionList.value, [])
  }
}

// 过滤权限列表--递归过滤出 最底层和没有子权限被选中的权限ID
const filterPermissionList = (allData: any, initArr: any) => {
  allData.forEach((item: any) => {
    if (item.select && item.level === 3) {
      initArr.push(item.id)
    }
    if (item.select && !item.children) {
      initArr.push(item.id)
    }
    if (item.children && item.children.length > 0) {
      filterPermissionList(item.children, initArr)
    }
  })

  return initArr
}

// 分配权限保存按钮
const savePermission = () => {
  ElMessageBox.alert('不好意思，暂时只能查看权限，不能分配权限~', '提示', {
    confirmButtonText: 'OK'
  })
  // 抽屉组件隐藏
  drawer.value = false
}

// 删除职位
const deleteRole = async (id: number) => {
  let result: any = await reqDeleteRole(id)
  if (result.code === 200) {
    ElMessage.success(result.message)
    // 重新获取职位列表
    getHasRole(allRole.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage.error(result.message)
  }
}
</script>



<style scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}
</style>