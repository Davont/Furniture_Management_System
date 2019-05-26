import request from '@/utils/request'
const api = 'http://localhost:3000'


export function goodsList(query) {
  return request({
    url: api + '/getGoodsDetail',
    method: 'get',
  })
}



export function createGoods(data) {
  return request({
    url: api + '/goods',
    method: 'post',
    data
  })
}

export function updateGoods(data) {
  return request({
    url: api + '/goods/' + data.id,
    method: 'post',
    data
  })
}
export function deleteGoods(data) {
  console.log(data.id)
  return request({
    url: api + '/deleteGoods/' + data.id,
    method: 'post',
    data
  })
}
/**
 * 图片上传
 */
export function upload(data) {
  console.log(data.id)
  return request({
    url: api + '/upload',
    method: 'post',
    data
  })
}
