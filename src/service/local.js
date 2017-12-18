const USER = 'user'
const getCookie = function(key) {
  if(document.cookie.length > 0) {
    let start = document.cookie.indexOf(key + '=')
    if(start !== -1) {
      start = start + key.length + 1
      let end = document.cookie.indexOf(';', start)
      if(end === -1) end = document.cookie.length
      return unescape(document.cookie.substring(start, end))
    }
  }
  return ''
}

const setCookie = function(key, value) {
  let dt = new Date()
  dt.setDate(dt.getDate() + 30)
  document.cookie = key + '=' + escape(value) + ';expires=' + dt.toGMTString()
}

class LocalService {
  get(key) {
    if(window.localStorage) {
      return window.localStorage.getItem(key)
    } else {
      return getCookie(key)
    }
  }

  set(key, value) {
    if(window.localStorage) {
      window.localStorage.setItem(key, value)
    } else {
      setCookie(key, value)
    }
  }

  getJson(key) {
    let value = this.get(key)
    return value ? JSON.parse(value) : null
  }

  setJson(key, value) {
    this.set(key, JSON.stringify(value))
  }

  getUser() {
    return this.getJson(USER)
  }

  setUser(user) {
    this.setJson(USER, user)
  }
}
export default LocalService
