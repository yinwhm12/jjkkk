import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'

Vue.use(Router)
Vue.use(VueResource)
Vue.use(ElementUI)

Vue.http.interceptors.push((request,next) => {
  let host = ENV.HOST_URL
  if (request.url.indexOf(host) != 0){
    request.url = host + request.url
  }
  next()
})

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }
  ]
})
