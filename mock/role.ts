// 职位列表
let roleList = [
  {
    id: 1,
    roleName: '超级管理员',
    createTime: '2024-01-01',
    updateTime: '2024-01-01'
  },
  {
    id: 2,
    roleName: '系统管理员',
    createTime: '2024-01-01',
    updateTime: '2024-01-01'
  },
  {
    id: 3,
    roleName: '前端',
    createTime: '2024-01-01',
    updateTime: '2024-01-01'
  },
  {
    id: 4,
    roleName: '后端',
    createTime: '2024-01-01',
    updateTime: '2024-01-01'
  },
  {
    id: 5,
    roleName: '测试',
    createTime: '2024-01-01',
    updateTime: '2024-01-01'
  },
  {
    id: 6,
    roleName: '保安',
    createTime: '2024-01-01',
    updateTime: '2024-01-01'
  },
  {
    id: 7,
    roleName: '前台',
    createTime: '2024-01-01',
    updateTime: '2024-01-01'
  },
  {
    id: 8,
    roleName: '人事',
    createTime: '2024-01-01',
    updateTime: '2024-01-01'
  },
  {
    id: 9,
    roleName: '厨师',
    createTime: '2024-01-01',
    updateTime: '2024-01-01'
  },
  {
    id: 10,
    roleName: '保洁',
    createTime: '2024-01-01',
    updateTime: '2024-01-01'
  },
  {
    id: 11,
    roleName: '司机',
    createTime: '2024-01-01',
    updateTime: '2024-01-01'
  },
  {
    id: 12,
    roleName: '绘画师',
    createTime: '2024-01-01',
    updateTime: '2024-01-01'
  },
  {
    id: 13,
    roleName: '销售',
    createTime: '2024-01-01',
    updateTime: '2024-01-01'
  },
  {
    id: 14,
    roleName: '会计',
    createTime: '2024-01-01',
    updateTime: '2024-01-01'
  },
  {
    id: 15,
    roleName: '秘书',
    createTime: '2024-01-01',
    updateTime: '2024-01-01'
  }
]

// 所有权限
let allPermissionList = [
  {
    id: 1,
    name: '全部数据',
    level: 1,
    select: true,
    children: [
      {
        id: 2,
        name: '首页',
        level: 2,
        select: true
      },
      {
        id: 3,
        name: '数据大屏',
        level: 2,
        select: true
      },
      {
        id: 4,
        name: '权限管理',
        level: 2,
        select: true,
        children: [
          {
            id: 6,
            name: '用户管理',
            level: 3,
            select: true
          },
          {
            id: 7,
            name: '角色管理',
            level: 3,
            select: true
          },
          {
            id: 8,
            name: '菜单管理',
            level: 3,
            select: true
          },
        ],
      },
      {
        id: 5,
        name: '商品管理',
        level: 2,
        select: true,
        children: [
          {
            id: 9,
            name: '品牌管理',
            level: 3,
            select: true
          },
          {
            id: 10,
            name: '属性管理',
            level: 3,
            select: true
          },
          {
            id: 11,
            name: 'SPU管理',
            level: 3,
            select: true
          },
          {
            id: 12,
            name: 'SKU管理',
            level: 3,
            select: true
          }
        ]
      },
    ]
  }
]

// 部分权限
let partPermissionList = [
  {
    id: 1,
    name: '全部数据',
    level: 1,
    select: false,
    children: [
      {
        id: 2,
        name: '首页',
        level: 2,
        select: true
      },
      {
        id: 3,
        name: '数据大屏',
        level: 2,
        select: true
      },
      {
        id: 4,
        name: '权限管理',
        level: 2,
        select: false,
        children: [
          {
            id: 6,
            name: '用户管理',
            level: 3,
            select: true
          },
          {
            id: 7,
            name: '角色管理',
            level: 3,
            select: true
          },
          {
            id: 8,
            name: '菜单管理',
            level: 3,
            select: false
          },
        ],
      },
      {
        id: 5,
        name: '商品管理',
        level: 2,
        select: false,
        children: [
          {
            id: 9,
            name: '品牌管理',
            level: 3,
            select: true
          },
          {
            id: 10,
            name: '属性管理',
            level: 3,
            select: true
          },
          {
            id: 11,
            name: 'SPU管理',
            level: 3,
            select: false
          },
          {
            id: 12,
            name: 'SKU管理',
            level: 3,
            select: false
          }
        ]
      },
    ]
  }
]

export default [
  // 获取职位列表接口
  {
    url: "/api/admin/acl/role", // 请求地址
    method: "get", // 请求方式
    response: (request) => {
      // 获取分页参数和角色名称，兼容 query 和 body（get 请求一般在 query）
      const { pageNo = 1, limit = 3, roleName = '' } = request.query || {};
      const page = Number(pageNo);
      const size = Number(limit);
      const keyword = String(roleName).toLowerCase();

      // 根据角色名称过滤列表
      let filteredList = roleList;
      if (keyword) {
        filteredList = roleList.filter(role =>
          role.roleName.toLowerCase().includes(keyword)
        );
      }

      // 计算分页
      const total = filteredList.length;
      const start = (page - 1) * size;
      const end = start + size;
      const pageList = filteredList.slice(start, end);

      return {
        code: 200,
        message: '获取职位列表成功',
        data: {
          records: pageList,
          total,
          size,
          current: page,
          pages: Math.ceil(total / size)
        },
        ok: true
      };
    },
  },

  // 新增职位接口
  {
    url: "/api/admin/acl/role/save",
    method: "post",
    response: ({ body }) => {
      // 获取请求体携带过来的职位信息
      const { roleName } = body;

      // 简单验证
      if (!roleName) {
        return { code: 201, message: "职位名称不能为空", data: null, ok: false };
      }

      // 检查职位名称是否已存在
      if (roleList.some(role => role.roleName === roleName)) {
        return { code: 201, message: "职位名称已存在", data: null, ok: false };
      }

      // 生成新的id（取当前最大id加1）
      const maxId = Math.max(...roleList.map(item => item.id));
      const newId = maxId + 1;

      // 获取当前时间
      const now = new Date();
      const currentDate = now.toISOString().split('T')[0];

      // 创建新职位对象
      const newRole = {
        id: newId,
        roleName,
        createTime: currentDate,
        updateTime: currentDate
      };

      // 添加到列表中
      roleList.push(newRole);

      // 返回成功信息
      return { code: 200, message: '新增职位成功', data: null, ok: true };
    },
  },

  // 修改职位接口
  {
    url: "/api/admin/acl/role/update",
    method: "put",
    response: ({ body }) => {
      // 获取请求体携带过来的职位信息
      const { id, roleName } = body;

      // 验证必要参数
      if (!id) {
        return { code: 201, message: "职位ID不能为空", data: null, ok: false };
      }

      if (!roleName) {
        return { code: 201, message: "职位名称不能为空", data: null, ok: false };
      }

      // 查找要修改的职位
      const index = roleList.findIndex(item => item.id === id);

      // 未找到对应职位
      if (index === -1) {
        return { code: 201, message: "职位不存在", data: null, ok: false };
      }

      // 检查职位名称是否已被其他职位使用
      const roleNameExists = roleList.some(role => role.roleName === roleName && role.id !== id);
      if (roleNameExists) {
        return { code: 201, message: "职位名称已被使用", data: null, ok: false };
      }

      // 获取当前时间
      const now = new Date();
      const currentDate = now.toISOString().split('T')[0];

      // 更新职位信息，保留其他字段不变
      roleList[index] = {
        ...roleList[index],
        roleName,
        updateTime: currentDate
      };

      // 返回成功信息
      return { code: 200, message: '修改职位成功', data: null, ok: true };
    },
  },

  // 删除职位接口
  {
    url: "/api/admin/acl/role/remove",
    method: "delete",
    response: ({ query }) => {
      // 获取要删除的职位id
      const id = Number(query.id);

      // 验证id是否存在
      if (!id) {
        return { code: 201, message: "职位ID不能为空", data: null, ok: false };
      }

      // 查找要删除的职位索引
      const index = roleList.findIndex(item => item.id === id);

      // 未找到对应职位
      if (index === -1) {
        return { code: 201, message: "职位不存在", data: null, ok: false };
      }

      // 删除职位
      roleList.splice(index, 1);

      // 返回成功信息
      return { code: 200, message: '删除职位成功', data: null, ok: true };
    }
  },

  // 获取角色权限接口
  {
    url: "/api/admin/acl/role/permission",
    method: "get",
    response: ({ query }) => {
      // 获取角色ID
      const roleId = Number(query.roleId);

      // 验证角色ID是否存在
      if (!roleId) {
        return { code: 201, message: "角色ID不能为空", data: null, ok: false };
      }

      // 根据角色ID返回不同的权限列表
      // 当ID为1（超级管理员）时，返回所有权限
      // 其他角色返回部分权限
      if (roleId === 1) {
        return {
          code: 200,
          message: '获取角色权限成功',
          data: allPermissionList,
          ok: true
        };
      } else {
        return {
          code: 200,
          message: '获取角色权限成功',
          data: partPermissionList,
          ok: true
        };
      }
    }
  }
]
