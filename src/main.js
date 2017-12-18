// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import routes from './router'
import plugin from './assets/js/plugin'
import context from './service'
import './assets/js/mint-ui'
import './assets/style/base.scss'
import 'normalize.css'

Vue.config.productionTip = false
Vue.use(plugin);

(async function() {
  await context.initialize()
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router: routes(context.router),
    template: '<App/>',
    components: {App}
    // async created() {
    //   if(!online) {
    //     this.$router.replace({name: 'login'})
    //   } else if(this.$route.name === 'login') {
    //     this.$router.push({name: 'list'})
    //   }
    // }
  })
})()

