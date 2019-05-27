import request from '@/utils/request'
const api = 'http://47.98.33.249:3000'


export function businessList() {
  return request({
    url: api + '/getBusinessDetail',
    method: 'get',
  })
}
export function getBusiness(data) {
  return request({
    url: api + '/getBusinessDetail/' + data.id,
    method: 'get',
  })
}


export function createBusiness(data) {
  return request({
    url: api + '/business',
    method: 'post',
    data
  })
}

export function updateBusiness(data) {
  return request({
    url: api + '/business/' + data.id,
    method: 'post',
    data
  })
}
export function updateBusinessTotal(data) {
  return request({
    url: api + '/updateBusinessTotal/' + data.id,
    method: 'post',
    data
  })
}
export function returnsBusinessTotal(data) {
  return request({
    url: api + '/returnsBusinessTotal/' + data.id,
    method: 'post',
    data
  })
}
export function deleteBusiness(data) {
  console.log(data.id)
  return request({
    url: api + '/deleteBusiness/' + data.id,
    method: 'post',
    data
  })
}
