<template>
  <div>
    <el-card>
      <!-- 卡片顶部添加品牌按钮 -->
      <el-button type="primary" size="large" icon="Plus" @click="addTrademark">添加品牌</el-button>
      <!-- 表格组件：用于展示已有的平台数据 -->
      <el-table style="margin:20px 0px;" border :data="trademarkArr" v-loading="loading">
        <el-table-column label="序号" width="80px" align="center" type="index" />
        <el-table-column label="品牌名称" align="center" prop="name" />
        <el-table-column label="品牌LOGO" align="center">
          <template #="{ row }">
            <img :src="row.logo" alt="" style="width: 140px; height: 100px;">
          </template>
        </el-table-column>
        <el-table-column label="品牌操作" align="center">
          <template #="{ row }">
            <el-button type="warning" icon="Edit" size="small" @click="updatetTrademark(row)" />
            <el-popconfirm title="确认删除？" @confirm="removeTrademark(row.id)">
              <template #reference>
                <el-button type="danger" icon="Delete" size="small" />
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination v-model:current-page="pageNo" v-model:page-size="limit"
        :page-sizes="[3, 5, 7, 9]" :background="true"
        layout=" prev, pager, next, jumper, ->, sizes,total" :total="total"
        @current-change="changePageNo" @size-change="changeSize" />
    </el-card>
    <!-- 对话框组件：在添加品牌与修改已有品牌的业务使用的结构 -->
    <el-dialog v-model="dialogFormVisible" :title="trademarkParams.id ? '修改品牌' : '添加品牌'">
      <!-- 对话框表单 -->
      <el-form style="width: 80%;" :model="trademarkParams" :rules="rules" ref="trademarkFormRef">
        <el-form-item label="品牌名称" label-width="100px" prop="name">
          <el-input placeholder="请输入品牌名称" v-model="trademarkParams.name"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logo">
          <el-upload class="avatar-uploader" action="/api/admin/product/baseTradeMark/upload"
            :show-file-list="false" :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="trademarkParams.logo" :src="trademarkParams.logo" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <!-- 对话框底部 -->
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="confirm">确定</el-button>
          <el-button type="primary" @click="cancel">取消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>

</template>

<script setup lang='ts'>
import { onMounted, reactive, ref, nextTick } from 'vue'
// 引入获取品牌列表的接口
import { reqHasTrademark, reqAddOrUpdateTrademark, reqRemoveTrademark } from '@/api/product/trademark'
import type { Trademark } from '@/api/product/trademark/type'
// 引入上传图片的类型
import { ElMessage, type UploadProps } from 'element-plus'

// ***分页器相关：
// 当前页码
let pageNo = ref<number>(1)
// 每页条数
let limit = ref<number>(3)
// 存储已有品牌总数
let total = ref<number>(0)
// 当前页所展示的品牌
let trademarkArr = ref<Trademark[]>([])
// 加载状态
let loading = ref<boolean>(false)

// ***

// ***对话框相关
// 控制对话框显示与隐藏
let dialogFormVisible = ref<boolean>(false)
// 定义收集新增品牌信息
let trademarkParams = reactive<Trademark>({
  name: '',
  logo: ''
})
// 获取对话框表单的ref，用于校验对话框表单
let trademarkFormRef = ref<any>()
// ***

// 将获取已有品牌的接口封装为一个函数：在任何情况下获取数据，调用此函数
const getHasTrademark = async (pager = 1) => {
  // 加载状态
  loading.value = true
  // 当前页码
  pageNo.value = pager
  try {
    const result = await reqHasTrademark(pageNo.value, limit.value)
    if (result.code === 200) {
      total.value = result.data.total
      trademarkArr.value = result.data.records
    }
  } catch (error) {
    console.error('获取品牌列表失败:', error)
  } finally {
    // 加载状态
    loading.value = false
  }
}

// 当前页码发生变化时触发
// 对于当前页码发生变化的事件,组件pagination父组件回传了数据(当前的页码)
const changePageNo = (pager: number) => {
  getHasTrademark(pager)
}

// 每页条数发生变化时触发
const changeSize = () => {
  // 当每页条数改变时，页码重置为1
  getHasTrademark()
}

// 组件挂载完毕--发一次获取品牌的请求
onMounted(() => {
  getHasTrademark()
})

// 添加品牌
const addTrademark = () => {
  // 对话框显示
  dialogFormVisible.value = true
  // 清空上一次收集的数据
  trademarkParams.id = ''
  trademarkParams.name = ''
  trademarkParams.logo = ''
  // 清空上一次表单的校验结果，因为点击添加按钮之前，表单还没有渲染，因此需要使用nextTick
  nextTick(() => {
    // 清空表单的校验规则
    trademarkFormRef.value.clearValidate()
  })
}

// 编辑品牌
const updatetTrademark = (row: Trademark) => {
  // 清空上一次表单校验结果
  nextTick(() => {
    // 清空表单的校验规则
    trademarkFormRef.value.clearValidate()
  })
  // 对话框显示
  dialogFormVisible.value = true
  // // 展示已有品牌的数据
  // trademarkParams.name = row.name
  // trademarkParams.logo = row.logo
  // // 获取品牌id
  // trademarkParams.id = row.id
  // ES6语法合并对象
  Object.assign(trademarkParams, row)
}

// 对话框底部--确认按钮
const confirm = async () => {
  // 发请求之前，对整个表单进行校验
  await trademarkFormRef.value.validate()

  let result: any = await reqAddOrUpdateTrademark(trademarkParams)
  if (result.code === 200) {
    // 弹出提示信息
    ElMessage({
      type: 'success',
      message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功'
    })
    // 重新获取品牌
    getHasTrademark(trademarkParams.id ? pageNo.value : 1)
    // 关闭对话框
    dialogFormVisible.value = false
  } else {
    // 关闭对话框
    dialogFormVisible.value = false
    // 弹出提示信息
    ElMessage({
      type: 'error',
      message: trademarkParams.id ? '修改品牌失败' : '添加品牌失败'
    })
  }

}

// 对话框底部--取消按钮
const cancel = () => {
  // 关闭对话框
  dialogFormVisible.value = false
}

// 上传logo图片之前触发的钩子，我们在这里进行类型约束和大小限制
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // 要求：上传文件格式是png|jpg|gif，大小在4MB以内
  if (rawFile.type === 'image/png' || rawFile.type === 'image/jpeg' || rawFile.type === 'image/gif') {
    // 大小限制
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传的图片大小不能超过4MB'
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传的图片格式不正确'
    })
    return false
  }
}

// 上传logo图片成功后触发的钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  // response即为当前这次上传图片post请求服务器返回的数据
  // response.data是收集到的上传图片的地址
  trademarkParams.logo = response.data
  // logo图片上传成功后，清除对应的校验结果
  trademarkFormRef.value.clearValidate('logo')
}

// 品牌名称校验规则
const validateName = (_rule: any, value: any, callback: any) => {
  // 自定义校验规则
  if (value.trim().length >= 2) {
    callback()
  } else {
    callback(new Error('品牌名称不能小于2个字符'))
  }
}

// 品牌logo校验规则
const validateLogo = (_rule: any, value: any, callback: any) => {
  // value即为当前收集到的logo地址，如果图片上传成功，value有值，否则为空
  if (value) {
    callback()
  } else {
    callback(new Error('请上传品牌logo'))
  }
}

// 对话框表单校验规则
const rules = {
  name: [
    { required: true, trigger: 'blur', validator: validateName }
  ],
  logo: [
    { required: true, validator: validateLogo }
  ]
}

// 气泡确认框确定按钮的回调
const removeTrademark = async (id: number) => {
  // 点击确定按钮删除已有品牌的请求
  let result = await reqRemoveTrademark(id)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除品牌成功'
    })
    // 重新获取品牌
    getHasTrademark(trademarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: '删除品牌失败'
    })
  }
}

</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>