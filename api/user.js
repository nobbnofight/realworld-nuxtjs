import { request } from '@/plugins/request'

// 登录
export const login = data => {
  return request({
    method: 'POST',
    url: '/api/users/login',
    data
  })
}

// 注册
export const register = data => {
  return request({
    method: 'POST',
    url: '/api/users',
    data
  })
}

// 更新内容
export const update = data => {
  return request({
    method: 'PUT',
    url: '/api/user',
    data
  })
}