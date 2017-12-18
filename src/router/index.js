import context from '../service'
import login from '../views/login/index.vue'
import page1 from '../views/page1/index.vue'
import page2 from '../views/page2/index.vue'
import page3 from '../views/page3/index.vue'
const ROUTS = [login, page1, page2, page3]

const config = {
  footVisible: false,
  keepAlive: true
}

const mixin = function(source, target) {
  let result = {}
  Reflect.ownKeys(source).forEach(key => {
    result[key] = Reflect.has(target, key) ? target[key] : source[key]
  })
  return result
}

export default function(router) {
  const originPush = router.push
  let isPush = false
  router.push = function(...args) {
    isPush = true
    originPush.apply(router, args)
  }
  router.addRoutes(ROUTS.map(component => {
    return {
      name: component.name,
      path: component.path,
      component,
      meta: mixin(config, component)
    }
  }))
  router.addRoutes([{
    path: '/',
    redirect: '/login'
  }])
  router.beforeEach((to, from, next) => {
    next()
    // 登录验证
    // if('id' in context.user.current && to.name === 'login') {
    //   next({name: 'list'})
    // } else if('id' in context.user.current || to.name === 'login') {
    //   next()
    // } else {
    //   next({name: 'login'})
    // }
  })
  router.afterEach(route => {
    context.system.keepAlive = route.meta.keepAlive
    context.system.footVisible = route.meta.footVisible
    context.system.isPush = isPush
    if(isPush) {
      document.body.scrollTop = 0
    }
    isPush = false
  })
  return router
}
