import request from './network.js'

const baseURL = 'http://106.54.54.237:8000/api/hy';


export function getMultiData() {
  return request({
      url: baseURL + '/home/multidata',
  })
}

export function getGoodsData(type, page) {
  return request({
    url: baseURL + '/home/data',
    data: {
      type,
      page
    }
  })
}