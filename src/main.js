import Vue from 'vue'
import Router from 'vue-router'
import App from './App'
import Home from './Home'

import Eagle, { Options } from 'eagle.js'
import 'eagle.js/dist/eagle.css'
import hljs from 'highlight.js'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import slideshows from './slideshows/slideshows.js'
/* eslint-disable no-new */
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Eagle)
Vue.use(Router)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.config.productionTip = false
Options.hljs = hljs

let routes = []
slideshows.list.forEach(function (slideshow) {
  routes.push({
    path: '/' + slideshow.infos.path,
    component: slideshow
  })
})
routes.push({ path: '*', component: Home })

let router = new Router({
  routes
})

new Vue({
  el: '#app',
  router,
  render: h => h('App'),
  components: { App }
})
