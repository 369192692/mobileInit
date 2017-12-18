import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import Http from './http'
import Local from './local'
import System from './system'
import User from './model/user'

Vue.use(Vuex)
Vue.use(Router)

class Context {
  constructor() {
    this.store = new Vuex.Store({state: {}})
    this.router = new Router({
      scrollBehavior(to, from, savedPosition) {
        return {x: 0, y: 0}
      }
    })
  }

  async initialize() {
    this.install('http', Http)
    this.install('local', Local)
    this.install('system', System)
    this.install('user', User)
    window.http = this.http
    return await this.user.start()
  }

  async install(name, Service) {
    this[name] = new Service({})
    Vue.set(this.store.state, name, this[name].store)
  }
}

export default new Context()
