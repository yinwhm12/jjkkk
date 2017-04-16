import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
// import Head from '../components/publish/head.vue'
import board from '../components/publish/board.vue'
import welcome from '../components/Welcome.vue'
import Mian from '../components/publish/main.vue'
import WriteView from '../components/write.vue'

import 'element-ui/lib/theme-default/index.css'

Vue.use(Router)
Vue.use(VueResource)
Vue.use(ElementUI)

const NotFound = {
  template: '<p>Page not found </p>'
}

const About = {
  template: '<p>about page</p>'
}


export  default  new Router({
  // mode: 'hash',
  // base: _dirname,
  routes: [
    {
      path: '/home',
      component: Mian,
      children: [
        {
          name: 'board',
          path: '/',
          component: board
        },
        {
          name: 'welcome',
          path: 'welcome',
          component: welcome
        }, {
          name: 'write_article',
          path: 'article',
          component: WriteView
        }
      ]
    }, {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/not_found',
      name: 'not_found',
      component: NotFound
    }
  ]
})

Vue.http.interceptors.push((request, next) => {
  var xtoken = sessionStorage.getItem("token")
  if (xtoken) {
    request.headers.set('Authorization', xtoken)
  }
  let host = ENV.HOST_URL
  if (request.url.indexOf(host) !== 0) {
    request.url = host + request.url
  }
  next((response) => {
    if (response.status === 401) {
      // Router.routes.push({path: '/home/board'})
      Vue.prototype.$message({
        message: '请登录!',
        type: 'warning'
      })

    } else if (response.status !== 200) {
      let message = response.status !== 0 ? response.body : "请检查网络"
      Vue.prototype.$message({
        message: message,
        type: 'warning'
      })
    }
    return response
  })
})
