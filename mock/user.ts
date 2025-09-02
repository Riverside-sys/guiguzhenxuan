// 用户账号信息列表
let aclUserList = [
  {
    id: 1,
    createTime: '2025-01-01 12:00:00',
    username: 'admin',
    password: '111111',
    name: '管理员',
    phone: '12345678901',
    roleName: '超级管理员，前台，后端，测试，保安',
    token: 'Admin Token',
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    routes: ['Acl', 'User', 'Role', 'Permission', 'Product', 'Trademark', 'Attr', 'Spu', 'Sku']
  },
  {
    id: 2,
    createTime: '2025-01-01 13:00:00',
    username: 'system',
    password: '111111',
    name: '系统管理员',
    phone: '12345678902',
    roleName: '系统管理员',
    token: 'System Token',
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    routes: ['Acl', 'User', 'Role', 'Product', 'Trademark', 'Attr']
  },
  {
    id: 3,
    createTime: '2025-01-01 14:00:00',
    username: 'lisi666',
    password: '111111',
    name: '李四',
    phone: '12345678903',
    roleName: '后端',
    token: 'Lisi666 Token',
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    routes: ['Acl', 'User', 'Role', 'Product', 'Trademark', 'Attr']
  },
  {
    id: 4,
    createTime: '2025-01-01 15:00:00',
    username: 'wangwu',
    password: '111111',
    name: '王五',
    phone: '12345678904',
    roleName: '前端',
    token: 'Wangwu Token',
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    routes: ['Acl', 'User', 'Role', 'Product', 'Trademark', 'Attr']
  },
  {
    id: 5,
    createTime: '2025-01-01 16:00:00',
    username: 'zhaoliu',
    password: '111111',
    name: '赵六',
    phone: '12345678905',
    roleName: '测试',
    token: 'Zhaoliu Token',
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    routes: ['Acl', 'User', 'Role', 'Product', 'Trademark', 'Attr']
  },
  {
    id: 6,
    createTime: '2025-01-01 17:00:00',
    username: 'qianqi',
    password: '111111',
    name: '钱七',
    phone: '12345678906',
    roleName: '前台',
    token: 'Qianqi Token',
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    routes: ['Acl', 'User', 'Role', 'Product', 'Trademark', 'Attr']
  },
  {
    id: 7,
    createTime: '2025-01-01 18:00:00',
    username: 'sunba',
    password: '111111',
    name: '孙八',
    phone: '12345678907',
    roleName: '保安',
    token: 'Sunba Token',
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    routes: ['Acl', 'User', 'Role', 'Product', 'Trademark', 'Attr']
  }
]

// 所有职位列表
let allRoleList = ['超级管理员', '系统管理员', '前端', '后端', '测试', '保安', '前台', '人事', '厨师']

export default [
  // 获取用户列表接口
  {
    url: "/api/admin/acl/user", // 请求地址
    method: "get", // 请求方式
    response: (request) => {
      // 获取分页参数，兼容 query 和 body（get 请求一般在 query）
      const { pageNo = 1, limit = 3 } = request.query || {};
      const list = aclUserList;
      const page = Number(pageNo);
      const size = Number(limit);
      const start = (page - 1) * size;
      const end = start + size;
      const pageList = list.slice(start, end);
      return {
        code: 200,
        message: '获取用户列表成功',
        data: {
          records: pageList,
          total: list.length,
          size,
          current: page
        },
        ok: true
      };
    },
  },

  // 新增用户接口
  {
    url: "/api/admin/acl/user/save",
    method: "post",
    response: ({ body }) => {
      // 获取请求体携带过来的用户信息
      const { name, username, password, phone } = body;

      // 简单验证
      if (!name || !username || !password || !phone) {
        return { code: 201, message: "用户名字、用户昵称和密码不能为空", data: null, ok: false };
      }

      // 检查用户名是否已存在
      if (aclUserList.some(user => user.username === username)) {
        return { code: 201, message: "用户昵称已存在", data: null, ok: false };
      }

      // 生成新的id（取当前最大id加1）
      const maxId = Math.max(...aclUserList.map(item => item.id));
      const newId = maxId + 1;

      // 获取当前时间
      const now = new Date();
      const createTime = now.toISOString().replace('T', ' ').substring(0, 19);

      // 生成token：用户名首字母大写 + Token
      const firstChar = username.charAt(0).toUpperCase();
      const restChars = username.slice(1);
      const token = `${firstChar}${restChars} Token`;

      // 创建新用户对象
      const newUser = {
        id: newId,
        createTime,
        username,
        password,
        name,
        phone,
        roleName: '',
        token,
        avatar:
          "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
        routes: []
      };

      // 添加到列表中
      aclUserList.push(newUser);

      // 返回成功信息
      return { code: 200, message: '新增用户成功', data: null, ok: true };
    },
  },

  // 修改用户接口
  {
    url: "/api/admin/acl/user/update",
    method: "put",
    response: ({ body }) => {
      // 获取请求体携带过来的用户信息
      const { id, name, username } = body;

      // 验证必要参数
      if (!id) {
        return { code: 201, message: "用户id不能为空", data: null, ok: false };
      }

      if (!name || !username) {
        return { code: 201, message: "用户名字和用户昵称不能为空", data: null, ok: false };
      }

      // 查找要修改的用户
      const index = aclUserList.findIndex(item => item.id === id);

      // 未找到对应用户
      if (index === -1) {
        return { code: 201, message: "用户不存在", data: null, ok: false };
      }

      // 检查用户名是否已被其他用户使用
      const usernameExists = aclUserList.some(user => user.username === username && user.id !== id);
      if (usernameExists) {
        return { code: 201, message: "用户昵称已被使用", data: null, ok: false };
      }

      // 更新用户信息，保留其他字段不变
      aclUserList[index] = {
        ...aclUserList[index],
        name,
        username
      };

      // 返回成功信息
      return { code: 200, message: '修改用户成功', data: null, ok: true };
    },
  },

  // 删除用户接口
  {
    url: "/api/admin/acl/user/remove",
    method: "delete",
    response: ({ query }) => {
      // 获取要删除的用户id
      const id = Number(query.userId);

      // 验证id是否存在
      if (!id) {
        return { code: 201, message: "用户id不能为空", data: null, ok: false };
      }

      // 查找要删除的用户索引
      const index = aclUserList.findIndex(item => item.id === id);

      // 未找到对应用户
      if (index === -1) {
        return { code: 201, message: "用户不存在", data: null, ok: false };
      }

      // 删除用户
      aclUserList.splice(index, 1);

      // 返回成功信息
      return { code: 200, message: '删除用户成功', data: null, ok: true };
    }
  },

  // 用户登录接口
  {
    url: "/api/user/login", // 请求地址
    method: "post", // 请求方式
    response: ({ body }) => {
      // 获取请求体携带过来的用户名与密码
      const { username, password } = body;
      // 调用获取用户信息函数,用于判断是否有此用户
      const checkUser = aclUserList.find(
        (item) => item.username === username && item.password === password
      );
      // 没有用户返回失败信息
      if (!checkUser) {
        return { code: 201, message: "账号或者密码不正确", data: null, ok: false };
      }
      // 如果有返回成功信息
      const { token } = checkUser;
      return { code: 200, message: '成功', data: { token }, ok: true };
    },
  },

  // 获取用户信息
  {
    url: "/api/user/info",
    method: "get",
    response: (request) => {
      // 获取请求头携带token
      const token = request.headers.token;
      // 查看用户信息是否包含有次token用户
      const checkUser = aclUserList.find((item) => item.token === token);
      // 没有返回失败的信息
      if (!checkUser) {
        return { code: 203, message: '服务异常', data: null, ok: false };
      }
      //如果有返回成功信息
      return { code: 200, message: '成功', data: { checkUser }, ok: true };
    },
  },

  // 根据用户ID获取用户职位和所有职位列表接口
  {
    url: "/api/admin/acl/user/toAssign",
    method: "get",
    response: ({ query }) => {
      // 获取用户ID
      const userId = Number(query.userId);

      // 验证ID是否存在
      if (!userId) {
        return { code: 201, message: "用户ID不能为空", data: null, ok: false };
      }

      // 查找用户
      const user = aclUserList.find(item => item.id === userId);

      // 未找到对应用户
      if (!user) {
        return { code: 201, message: "用户不存在", data: null, ok: false };
      }

      // 获取用户的职位列表（如果有多个职位，按逗号分隔）
      const assignRoles = user.roleName ? user.roleName.split('，') : [];

      // 返回用户职位和所有职位列表
      return {
        code: 200,
        message: '获取用户职位成功',
        data: {
          assignRoles,
          allRolesList: allRoleList
        },
        ok: true
      };
    }
  },

  // 分配用户权限接口
  {
    url: "/api/admin/acl/user/doAssign",
    method: "post",
    response: ({ body }) => {
      // 获取用户ID和职位ID数组
      const { userId, roleIdList } = body;

      // 验证必要参数
      if (!userId) {
        return { code: 201, message: "用户ID不能为空", data: null, ok: false };
      }

      if (!roleIdList || !Array.isArray(roleIdList)) {
        return { code: 201, message: "职位ID列表不能为空且必须是数组", data: null, ok: false };
      }

      // 查找用户
      const userIndex = aclUserList.findIndex(item => item.id === Number(userId));

      // 未找到对应用户
      if (userIndex === -1) {
        return { code: 201, message: "用户不存在", data: null, ok: false };
      }

      // 根据职位ID获取职位名称
      const selectedRoles = roleIdList.map(id => {
        const index = Number(id);
        return index >= 0 && index < allRoleList.length ? allRoleList[index] : null;
      }).filter(role => role !== null);

      // 更新用户的roleName，使用中文顿号连接
      aclUserList[userIndex].roleName = selectedRoles.join('，');

      // 返回成功信息
      return { code: 200, message: '分配用户权限成功', data: null, ok: true };
    }
  },

  // 批量删除用户接口
  {
    url: "/api/admin/acl/user/batchRemove",
    method: "delete",
    response: ({ body }) => {
      // 获取要删除的用户ID数组
      const { idList } = body;

      // 验证ID数组是否存在且为数组
      if (!idList || !Array.isArray(idList) || idList.length === 0) {
        return { code: 201, message: "用户ID列表不能为空且必须是数组", data: null, ok: false };
      }

      // 将字符串ID转换为数字ID
      const userIds = idList.map(id => Number(id));

      // 记录删除成功的用户数量
      let successCount = 0;

      // 遍历删除用户
      userIds.forEach(id => {
        const userIndex = aclUserList.findIndex(item => item.id === id);
        if (userIndex !== -1) {
          aclUserList.splice(userIndex, 1);
          successCount++;
        }
      });

      // 返回成功信息
      return {
        code: 200,
        message: `成功删除${successCount}个用户`,
        data: null,
        ok: true
      };
    }
  },

  // 关键字搜索用户接口
  {
    url: "/api/admin/acl/user/search",
    method: "get",
    response: ({ query }) => {
      // 获取分页参数和关键字
      const { pageNo = 1, limit = 3, keyword = '' } = query;

      // 转换参数类型
      const page = Number(pageNo);
      const size = Number(limit);
      const searchKeyword = String(keyword).toLowerCase();

      // 根据关键字过滤用户列表
      let filteredList = aclUserList;

      // 如果有关键字，则进行过滤
      if (searchKeyword) {
        filteredList = aclUserList.filter(user =>
          user.username.toLowerCase().includes(searchKeyword)
        );
      }

      // 计算分页
      const total = filteredList.length;
      const start = (page - 1) * size;
      const end = start + size;
      const pageList = filteredList.slice(start, end);

      // 返回搜索结果和分页信息
      return {
        code: 200,
        message: '搜索用户成功',
        data: {
          records: pageList,
          total,
          size,
          current: page,
          searchCount: true,
          pages: Math.ceil(total / size)
        },
        ok: true
      };
    }
  }
]

