import context from './index'
import mockService from './mockService'
import axios from 'axios'
import Qs from 'qs'

const userMock = true
// 轮询接口不开启loading
const pollingUrl = [
  '/ocs/api/distribution_management/account/detail',
  '/mps/api/message'
]
// 超时时间
axios.defaults.timeout = 5000
// http请求拦截器
axios.interceptors.request.use(config => {
  if(pollingUrl.indexOf(config.url) === -1) {
    context.system.startLoading()
  }
  if(config.method === 'post' && config.url.indexOf('/uaa/oauth/token') >= 0) {
    config.data = Qs.stringify(config.data)
  }
  if(config.method === 'get') {
    if(config.url.indexOf('?') > 0) {
      config.url += '&time=' + new Date().getTime()
    } else {
      config.url += '?time=' + new Date().getTime()
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(config => {
  context.system.stopLoading()
  return config
}, error => {
  context.system.stopLoading()
  if(error.response.status === 401 && error.response.config.url !== '/uaa/oauth/token') {
    // context.user.logout()
    // context.router.go({name: 'login'})
  }
  return Promise.reject(error)
})

class HttpService {
  async request(method, url, ...args) {
    let mock = (userMock && mockService && mockService.execute(method, url))
    if(mock) {
      context.system.stopLoading()
      return Promise.resolve(mock)
    }
    return axios[method](url, ...args).then(response => {
      return Promise.resolve(response)
    }, error => {
      return Promise.reject(error)
    })
  }
  setToken(value) {
    if(value) {
      axios.defaults.headers.common['Authorization'] = value.token_type + ' ' + value.access_token
    } else {
      axios.defaults.headers.common['Authorization'] = 'Basic d2ViX2FwcDo='
    }
  }
  get(url, params) {
    return this.request('get', url, {params})
  }
  post(url, body, config) {
    return this.request('post', url, body, config)
  }
  put(url, body) {
    return this.request('put', url, body)
  }
  patch(url, body) {
    return this.request('patch', url, body)
  }
  delete(url, params) {
    return this.request('delete', url, {params})
  }
}
export default HttpService
