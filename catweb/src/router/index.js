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
import ReadArticle from '../components/read_article.vue'
import ArticleList from '../components/article_list.vue'
import UserInfo from '../components/userInfo.vue'
import Search from '../components/search.vue'

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
  mode: 'hash',
  base: __dirname,
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
        },{
          name: 'read_article',
          path: 'read_article',
          component: ReadArticle
        }, {
          name: 'articles',
          path: 'article_list',
          component: ArticleList
        }, {
          name: 'posts',
          path: 'post_list',
          component: ArticleList
        }, {
          name: 'outsides',
          path: 'outsides_list',
          component: ArticleList
        }, {
          name: 'subject',
          path: 'subject',
          component: Mian,
          children: [
            {
              name: 'chinese',
              path: 'chinese_list',
              component: ArticleList
            }, {
              name: 'math',
              path: 'math_list',
              component: ArticleList
            }, {
              name: 'english',
              path: 'english_list',
              component: ArticleList
            },
          ]
        },
        {
          name: 'userInfo',
          path: 'userInfo',
          component: UserInfo
        },
        {
          name: 'search',
          path: 'search',
          component: Search
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
      window.localStorage.removeItem('userEmail')
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

Date.prototype.format = function (format) {
  var date = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S+": this.getMilliseconds()
  };
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1
        ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
    }
  }
  return format;
}

Vue.filter("stampToTimeFull", (timestamp) => {
  "use strict";
  if (!timestamp) {
    return ""
  }
  let newDate = new Date()
  newDate.setTime(timestamp * 1000)
  return newDate.format('yyyy-MM-dd hh:mm:ss')
})

Vue.filter('time', function (value) {
  let newDate = new Date()
  newDate.setTime(value * 1000)
  return newDate.format('yyyy/MM/dd hh:mm:ss')
  // return new Date(parseInt(value) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
})
