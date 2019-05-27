import request from '@/utils/request'
const api = 'http://47.98.33.249:3000'
/**
 *
 * 登录api
 */
export function login(data) {
  return request({
    url: api + '/login',
    method: 'post',
    // data: {
    //   login_name: data.username,
    //   login_password: data.password,
    // }
    data
  })
}

export function getInfo(token) {
  return request({
    url: api + '/login/info',
    method: 'get',
    token
  })
}

export function
logout() {
  return request({
    url: api + '/login/logout',
    method: 'post'
  })
}
/**
 * 用户api
 */

export function usersList(query) {
  return request({
    url: api + '/getUsersDetail',
    method: 'get',
    params: query
  })
}



export function createUsers(data) {
  return request({
    url: api + '/users',
    method: 'post',
    data
  })
}

export function getUsers(id) {
  return request({
    url: api + '/getUsersDetail/' + id,
    method: 'get',
    id
  })
}

export function updateUsers(data) {
  return request({
    url: api + '/users/' + data.id,
    method: 'post',
    data
  })
}
export function updateUsersTotal(data) {
  return request({
    url: api + '/updateUsersTotal/' + data.id,
    method: 'post',
    data
  })
}
export function returnsUsersTotal(data) {
  return request({
    url: api + '/returnsUsersTotal/' + data.id,
    method: 'post',
    data
  })
}

export function deleteUsers(data) {
  console.log(data.id)
  return request({
    url: api + '/deleteUsers/' + data.id,
    method: 'post',
    data
  })
}
