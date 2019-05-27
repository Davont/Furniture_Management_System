import request from '@/utils/request'
const api = 'http://47.98.33.249:3000'
/**
 * 订单api
 */

export function orderList(query) {
  return request({
    url: api + '/getOrderDetail',
    method: 'get',
    params: query
  })
}
export function getOrder(data) {
  return request({
    url: api + '/getOrderDetail/' + data.id,
    method: 'get',
    data
  })
}


export function createOrder(data) {
  return request({
    url: api + '/order',
    method: 'post',
    data
  })
}

export function updateOrder(data) {
  return request({
    url: api + '/order/' + data.id,
    method: 'post',
    data
  })
}
export function updateOrderStatus(data) {
  return request({
    url: api + '/orderStatus/' + data.id,
    method: 'post',
    data
  })
}
export function deleteOrder(data) {
  return request({
    url: api + '/deleteOrder/' + data.id,
    method: 'post',
    data
  })
}
