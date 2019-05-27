import request from '@/utils/request'
const api = 'http://47.98.33.249:3000'
/**
 * 退货订单api
 */

export function returnsList(query) {
  return request({
    url: api + '/getReturnsDetail',
    method: 'get',
    params: query
  })
}



export function createReturns(data) {
  return request({
    url: api + '/returns',
    method: 'post',
    data
  })
}

export function updateReturns(data) {
  return request({
    url: api + '/returns/' + data.id,
    method: 'post',
    data
  })
}

export function deleteReturns(data) {
  return request({
    url: api + '/deleteReturns/' + data.id,
    method: 'post',
    data
  })
}
