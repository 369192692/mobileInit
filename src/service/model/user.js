import context from '../index'

const LOGIN = '/uaa/oauth/token'
const ACCOUNT = '/ocs/api/distribution_management/user'
const CHANGE_PASSWORD = '/uaa/api/account/change_pwd'

class UserService {
  constructor(store) {
    this.store = store
    this.store.current = {}
  }

  get current() {
    return this.store.current
  }

  async start() {
    context.http.setToken()
    let user = context.local.getUser()
    if(user && user.password) {
      try {
        let account = await this.login(user.username, user.password)
        if(account) {
          this.store.user = account
          return true
        }
      } catch (error) {
        this.logout()
      }
    }
  }

  async login(username, password) {
    try {
      let result = await context.http.post(LOGIN, {username, password, appid: 'ODS', grant_type: 'password'}, {headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic d2ViX2FwcDo='}})
      context.local.setUser({username, password})
      context.http.setToken(result.data)
      return await this.getCurrentAccount()
    } catch (e) {
      return Promise.reject(e)
    }
  }

  logout() {
    this.store.current = {}
    context.local.setUser({})
    context.http.setToken()
  }

  async getCurrentAccount() {
    let result = await context.http.get(ACCOUNT)
    // TODO 开发环境改为result.data
    this.store.current = result
    return this.store.current
  }

  async changePassword(oldPassword, password) {
    return await context.http.post(CHANGE_PASSWORD, {oldPassword, password})
  }
}

export default UserService
